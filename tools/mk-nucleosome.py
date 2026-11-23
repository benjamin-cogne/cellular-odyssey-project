# Nucléosome réel pour le jeu : transforme la structure cristallographique 1KX5 (Davey et al., 2002 ; 1,9 Å ; histones de xénope, ADN α-satellite humain de 147 pb)
# en src/nucleosome-data.js.   Usage : python3 tools/mk-nucleosome.py 1KX5.pdb      (numpy ; fichier : https://files.rcsb.org/download/1KX5.pdb)
# Tout est exprimé dans le repère d'une unité « nucléosome » du jeu (genes.js, ub) : x = tangente d'entrée t, y = normale u, z = t × u, origine au point d'entrée P, en ångströms.
# Contenu :
#  - F : repère de chacune des 147 paires de bases (origine, axe x vers le grand sillon, axe z le long du brin I), ajusté sur les bases réelles ;
#  - P : atomes lourds des huit histones, codés par leur écart au parent (liaison) ; l'ordre des atomes de chaque acide aminé est celui de la table AA ;
#  - D : squelette sucre-phosphate réel des deux brins (les bases sont redessinées par le jeu selon la séquence du génome) ;
#  - C : contacts polaires directs histone–ADN (N ou O de la protéine à 3,3 Å au plus d'un N ou O de l'ADN) ; W : molécules d'eau qui font le pont entre les deux ;
#  - H : hélices α (fiches HELIX du fichier).
import numpy as np,sys,base64,json,collections
PDB=sys.argv[1];OUT=sys.argv[2] if len(sys.argv)>2 else 'src/nucleosome-data.js'
A3={'ALA':'A','ARG':'R','ASN':'N','ASP':'D','CYS':'C','GLN':'Q','GLU':'E','GLY':'G','HIS':'H','ILE':'I','LEU':'L','LYS':'K','MET':'M','PHE':'F','PRO':'P','SER':'S','THR':'T','TRP':'W','TYR':'Y','VAL':'V'}
# chaîne latérale : atome.parent ; après « / » : liaisons qui ferment un cycle
AA={'G':'','A':'CB.CA','S':'CB.CA,OG.CB','C':'CB.CA,SG.CB','V':'CB.CA,CG1.CB,CG2.CB','T':'CB.CA,OG1.CB,CG2.CB','L':'CB.CA,CG.CB,CD1.CG,CD2.CG','I':'CB.CA,CG1.CB,CG2.CB,CD1.CG1',
 'M':'CB.CA,CG.CB,SD.CG,CE.SD','P':'CB.CA,CG.CB,CD.CG/CD.N','F':'CB.CA,CG.CB,CD1.CG,CD2.CG,CE1.CD1,CE2.CD2,CZ.CE1/CZ.CE2','Y':'CB.CA,CG.CB,CD1.CG,CD2.CG,CE1.CD1,CE2.CD2,CZ.CE1,OH.CZ/CZ.CE2',
 'W':'CB.CA,CG.CB,CD1.CG,CD2.CG,NE1.CD1,CE2.CD2,CE3.CD2,CZ2.CE2,CZ3.CE3,CH2.CZ2/NE1.CE2,CH2.CZ3','H':'CB.CA,CG.CB,ND1.CG,CD2.CG,CE1.ND1,NE2.CD2/CE1.NE2','D':'CB.CA,CG.CB,OD1.CG,OD2.CG',
 'E':'CB.CA,CG.CB,CD.CG,OE1.CD,OE2.CD','N':'CB.CA,CG.CB,OD1.CG,ND2.CG','Q':'CB.CA,CG.CB,CD.CG,OE1.CD,NE2.CD','K':'CB.CA,CG.CB,CD.CG,CE.CD,NZ.CE','R':'CB.CA,CG.CB,CD.CG,NE.CD,CZ.NE,NH1.CZ,NH2.CZ'}
BKN=['N','CA','C','O'];BKP={'CA':'N','C':'CA','O':'C'}
DN=["P","OP1","OP2","O5'","C5'","C4'","O4'","C3'","O3'","C2'","C1'"];DP={"OP1":"P","OP2":"P","O5'":"P","C5'":"O5'","C4'":"C5'","O4'":"C4'","C3'":"C4'","O3'":"C3'","C2'":"C3'","C1'":"C2'"}
STD={ # bases dans le repère standard (Olson et al., 2001)
'A':{'N9':(-1.291,4.498),'C8':(0.024,4.897),'N7':(0.877,3.902),'C5':(0.071,2.771),'C6':(0.369,1.398),'N6':(1.611,0.909),'N1':(-0.668,0.532),'C2':(-1.912,1.023),'N3':(-2.320,2.290),'C4':(-1.267,3.124)},
'G':{'N9':(-1.289,4.551),'C8':(0.023,4.962),'N7':(0.870,3.969),'C5':(0.071,2.833),'C6':(0.424,1.460),'O6':(1.554,0.955),'N1':(-0.700,0.641),'C2':(-1.999,1.087),'N2':(-2.949,0.139),'N3':(-2.342,2.364),'C4':(-1.265,3.177)},
'C':{'N1':(-1.285,4.542),'C2':(-1.472,3.158),'O2':(-2.628,2.709),'N3':(-0.391,2.344),'C4':(0.837,2.868),'N4':(1.875,2.027),'C5':(1.056,4.275),'C6':(-0.023,5.068)},
'T':{'N1':(-1.284,4.500),'C2':(-1.462,3.135),'O2':(-2.562,2.608),'N3':(-0.298,2.407),'C4':(0.994,2.897),'O4':(1.944,2.119),'C5':(1.106,4.338),'C7':(2.466,4.961),'C6':(-0.024,5.057)}}
def kabsch(P,Q):
    pc=P.mean(0);qc=Q.mean(0);H=(P-pc).T@(Q-qc);U,S,Vt=np.linalg.svd(H);d=np.sign(np.linalg.det(Vt.T@U.T));R=Vt.T@np.diag([1,1,d])@U.T;t=qc-R@pc
    return R,t,float(np.sqrt((((R@P.T).T+t-Q)**2).sum(1).mean()))
ch=collections.OrderedDict();wat=[];helix=[]
for l in open(PDB):
    if l.startswith('HELIX'):helix.append((l[19],int(l[21:25]),int(l[33:37])))
    if l.startswith('ATOM') and l[16] in ' A':ch.setdefault(l[21],collections.OrderedDict()).setdefault(int(l[22:26]),{'r':l[17:20].strip()})[l[12:16].strip()]=np.array([float(l[30:38]),float(l[38:46]),float(l[46:54])])
    if l.startswith('HETATM') and l[17:20]=='HOH':wat.append(np.array([float(l[30:38]),float(l[38:46]),float(l[46:54])]))
RS=41.8;PHI=1.866*2*np.pi
# repère de l'unité du jeu : superhélice gauche de rayon 41,8 Å, 25,9 Å par tour, 1,866 tour pour 147 pb (genes.js : RS, PHI, ub).
# Ces valeurs sont celles du meilleur ajustement d'une superhélice régulière sur les 147 origines de paires de 1KX5 (écart quadratique moyen 2,4 Å).
ideal=np.array([[RS*np.sin(a),RS*(1-np.cos(a)),-25.94*a/(2*np.pi)] for a in [k/147*PHI for k in range(147)]])
best=None
for SI,SJ in ('IJ','JI'):      # l'ADN est palindromique : on prend pour brin I celui dont le sens 5'→3' suit le tracé du jeu
    I,J=ch[SI],ch[SJ];ki=sorted(I);FR=[]
    for i in ki:      # repères des paires : résidu i du brin I apparié au résidu -i du brin J
        a,b=I[i],J[-i];ba,bb=a['r'][1],b['r'][1];P=[];Q=[]
        for n,(x,y) in STD[ba].items():
            if n in a:P.append([x,y,0]);Q.append(a[n])
        for n,(x,y) in STD[bb].items():
            if n in b:P.append([x,-y,0]);Q.append(b[n])
        R,t,rms=kabsch(np.array(P),np.array(Q));FR.append((t,R,rms))
    real=np.array([f[0] for f in FR]);R0,t0,rms=kabsch(real,ideal)
    if best is None or rms<best[2]:best=(R0,t0,rms,SI,SJ,FR,real)
R0,t0,rms,SI,SJ,FR,real=best;ch['I'],ch['J']=ch[SI],ch[SJ];I,J=ch['I'],ch['J']
print('brin I du jeu : chaîne',SI,'; gabarit des paires : rms moyen',round(np.mean([f[2] for f in FR]),2),'Å, max',round(max(f[2] for f in FR),2))
print('ajustement sur la superhélice du jeu : rms',round(rms,2),'Å')
X=lambda q:R0@q+t0
dev=np.linalg.norm((R0@real.T).T+t0-ideal,axis=1);print('écart au tracé idéal : entrée',round(dev[0],1),'sortie',round(dev[-1],1),'max',round(dev.max(),1))
i8=lambda a:base64.b64encode(np.array(a,dtype=np.int8).tobytes()).decode();i16=lambda a:base64.b64encode(np.array(a,dtype='<i2').tobytes()).decode()
out={}
# F : origine (×100) puis axes x et z (×10000)
F=[]
for t,R,_ in FR:
    Rw=R0@R;F+=[round(v*100) for v in X(t)]+[round(v*1e4) for v in Rw[:,0]]+[round(v*1e4) for v in Rw[:,2]]
out['F']=i16(F)
# ---- protéines
Q=.02;ords={k:BKN+[s.split('.')[0] for s in v.split('/')[0].split(',') if s] for k,v in AA.items()};par={k:dict(BKP,**{s.split('.')[0]:s.split('.')[1] for s in v.split('/')[0].split(',') if s}) for k,v in AA.items()}
PA=[];PX=[];seqs=[];starts=[];miss=0;patoms=[]   # patoms : (position transformée, élément, chaîne, résidu, nom) pour les contacts
for c in 'ABCDEFGH':
    res=ch[c];ks=sorted(res);seq='';prevC=None;first=1
    for k in ks:
        r=res[k];aa=A3[r['r']];seq+=aa;pos={}
        for n in ords[aa]:
            if n in r:g=np.round(X(r[n])/Q)
            else:miss+=1;g=pos[par[aa][n]]
            pos[n]=g
            if n=='N':
                if first:PX+=[int(v) for v in g];first=0;d=np.zeros(3)
                else:d=g-prevC
            else:d=g-pos[par[aa][n]]
            if np.abs(d).max()>127:raise SystemExit('écart trop grand '+c+str(k)+n)
            PA+=[int(v) for v in d]
            if n in r:patoms.append((g*Q,n[0],c,k,n,aa))
        prevC=pos['C']
    seqs.append(seq);starts.append(ks[0])
print('protéines : atomes',len(PA)//3,'manquants',miss,'résidus',sum(map(len,seqs)))
out['P']=i8(PA);out['PX']=PX;out['S']=seqs;out['N0']=starts
out['H']=[['ABCDEFGH'.index(c),a,b] for c,a,b in helix if c in 'ABCDEFGH']
# ---- squelette de l'ADN : brin I dans l'ordre des paires ; brin J dans son propre sens 5'→3' (résidus -73..73), l'appariement i ↔ -i est refait par le jeu
DA=[];DX=[];datoms=[]
for s,cn in enumerate('IJ'):
    res=ch[cn];prevO3=None;first=1
    for k in sorted(res):
        r=res[k];pos={}
        for n in DN:
            if n in r:g=np.round(X(r[n])/Q)
            else:g=None
            if n=='P':
                if g is None:g=np.round(X(r["O5'"])/Q)      # extrémité 5' sans phosphate : P confondu avec O5' (le jeu ne dessine pas un atome confondu avec son parent)
                if first:DX+=[int(v) for v in g];first=0;d=np.zeros(3)
                else:d=g-prevO3
            else:
                if g is None:g=pos[DP[n]]
                d=g-pos[DP[n]]
            pos[n]=g
            if np.abs(d).max()>127:raise SystemExit('écart ADN trop grand '+cn+str(k)+n+str(d))
            DA+=[int(v) for v in d]
        prevO3=pos["O3'"]
        for n,v in r.items():
            if n!='r' and n[0] in 'NO':datoms.append((X(v),s,k,n))
out['D']=i8(DA);out['DX']=DX
# ---- contacts polaires directs et ponts par l'eau
dn=np.array([d[0] for d in datoms]);pp=[p for p in patoms if p[1] in 'NO'];pn=np.array([p[0] for p in pp]);idx={(p[2],p[3],p[4]):i for i,p in enumerate(patoms)}
C=[];nb=0;byres=collections.Counter()
for i,p in enumerate(pp):
    d=np.linalg.norm(dn-p[0],axis=1);j=int(d.argmin())
    if d[j]<=3.3:
        C+=[idx[(p[2],p[3],p[4])]]+[round(v*100) for v in dn[j]];byres[p[5]]+=1;nb+=datoms[j][3] in("OP1","OP2","O5'","O3'","O4'")
print('contacts directs histone–ADN (≤ 3,3 Å) :',len(C)//4,'dont sur le squelette',nb,'; par acide aminé',dict(byres.most_common(6)))
W=[];
for w in wat:
    w=X(w);dp=np.linalg.norm(pn-w,axis=1);dd=np.linalg.norm(dn-w,axis=1);a=int(dp.argmin());b=int(dd.argmin())
    if dp[a]<=3.2 and dd[b]<=3.2:W+=[idx[(pp[a][2],pp[a][3],pp[a][4])]]+[round(v*100) for v in w]+[round(v*100) for v in dn[b]]
print('molécules d\'eau en pont (≤ 3,2 Å des deux côtés) :',len(W)//7,'sur',len(wat))
out['C']=i16(C);out['W']=i16(W)
# arginines dont le groupe guanidinium est dans le petit sillon : à moins de 4 Å d'un O2, N3 ou O4' des deux brins
mg=[(d[0],d[1]) for d in datoms if d[3] in('O2','N3',"O4'")];mgp=np.array([m[0] for m in mg]);arg=[];rg=[]
for p in patoms:
    if p[5]=='R' and p[4]=='CZ':
        d=np.linalg.norm(mgp-p[0],axis=1);st={mg[j][1] for j in np.where(d<4.5)[0]}
        if len(st)==2:arg.append('HHHH'[0]+'%s%d'%({'A':'3','E':'3','B':'4','F':'4','C':'2A','G':'2A','D':'2B','H':'2B'}[p[2]],p[3]));rg.append(['ABCDEFGH'.index(p[2]),p[3]])
print('arginines dans le petit sillon (CZ à moins de 4,5 Å des deux brins) :',len(arg),' '.join(arg))
out['RG']=rg
js="// ================= nucléosome réel : données =================\n// FICHIER GÉNÉRÉ par tools/mk-nucleosome.py à partir de la structure 1KX5 (Davey et al., 2002) : ne pas le modifier à la main. Voir ce script pour le format.\nconst NCD="+json.dumps(dict(out,AA=AA,Q=Q),separators=(',',':'))+";\n"
open(OUT,'w').write(js);print('écrit',OUT,len(js),'octets')
