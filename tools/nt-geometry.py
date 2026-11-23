# Nucléotide idéal en forme B (ADN) et en forme A (ARN) dans le repère standard de la paire de bases (Olson et al., 2001).
# Bases : coordonnées standard. Squelette sucre-phosphate : départ sur un nucléotide réel (1LCD), puis ajustement aux longueurs,
# angles et torsions canoniques, avec fermeture exacte vers le nucléotide suivant par la symétrie hélicoïdale.
# Usage : python3 tools/nt-geometry.py 1LCD.pdb   (numpy, scipy ; 1LCD : complexe répresseur lac–ADN, fourni par exemple avec les tests de Biopython)
# Écrit bk.json : squelettes « B » + base (ADN) et « A » + base (ARN) ; ceux de l'adénine sont recopiés dans NTK (src/nucleotides.js).
import numpy as np, json, sys
from scipy.optimize import least_squares
B={ # repère standard de la base (Å), z = 0
'A':{"C1'":(-2.479,5.346),'N9':(-1.291,4.498),'C8':(0.024,4.897),'N7':(0.877,3.902),'C5':(0.071,2.771),'C6':(0.369,1.398),'N6':(1.611,0.909),'N1':(-0.668,0.532),'C2':(-1.912,1.023),'N3':(-2.320,2.290),'C4':(-1.267,3.124)},
'G':{"C1'":(-2.477,5.399),'N9':(-1.289,4.551),'C8':(0.023,4.962),'N7':(0.870,3.969),'C5':(0.071,2.833),'C6':(0.424,1.460),'O6':(1.554,0.955),'N1':(-0.700,0.641),'C2':(-1.999,1.087),'N2':(-2.949,0.139),'N3':(-2.342,2.364),'C4':(-1.265,3.177)},
'C':{"C1'":(-2.477,5.402),'N1':(-1.285,4.542),'C2':(-1.472,3.158),'O2':(-2.628,2.709),'N3':(-0.391,2.344),'C4':(0.837,2.868),'N4':(1.875,2.027),'C5':(1.056,4.275),'C6':(-0.023,5.068)},
'T':{"C1'":(-2.481,5.354),'N1':(-1.284,4.500),'C2':(-1.462,3.135),'O2':(-2.562,2.608),'N3':(-0.298,2.407),'C4':(0.994,2.897),'O4':(1.944,2.119),'C5':(1.106,4.338),'C7':(2.466,4.961),'C6':(-0.024,5.057)},
'U':{"C1'":(-2.481,5.354),'N1':(-1.284,4.500),'C2':(-1.462,3.131),'O2':(-2.563,2.608),'N3':(-0.302,2.397),'C4':(0.989,2.884),'O4':(1.935,2.094),'C5':(1.089,4.311),'C6':(-0.024,5.053)}}
RB={'A':[('N9','C8'),('C8','N7'),('N7','C5'),('C5','C6'),('C6','N6'),('C6','N1'),('N1','C2'),('C2','N3'),('N3','C4'),('C4','C5'),('C4','N9')],
'G':[('N9','C8'),('C8','N7'),('N7','C5'),('C5','C6'),('C6','O6'),('C6','N1'),('N1','C2'),('C2','N2'),('C2','N3'),('N3','C4'),('C4','C5'),('C4','N9')],
'C':[('N1','C2'),('C2','O2'),('C2','N3'),('N3','C4'),('C4','N4'),('C4','C5'),('C5','C6'),('C6','N1')],
'T':[('N1','C2'),('C2','O2'),('C2','N3'),('N3','C4'),('C4','O4'),('C4','C5'),('C5','C7'),('C5','C6'),('C6','N1')],
'U':[('N1','C2'),('C2','O2'),('C2','N3'),('N3','C4'),('C4','O4'),('C4','C5'),('C5','C6'),('C6','N1')]}
BK=["O4'","C2'","C3'","C4'","C5'","O5'","P","OP1","OP2","O3'"]
def v3(b): return {k:np.array([x,y,0.]) for k,(x,y) in B[b].items()}
def ang(a,b,c):
    u=a-b;w=c-b;return np.degrees(np.arccos(np.dot(u,w)/np.linalg.norm(u)/np.linalg.norm(w)))
def tor(a,b,c,d):
    b0=a-b;b1=c-b;b2=d-c;b1n=b1/np.linalg.norm(b1);v=b0-np.dot(b0,b1n)*b1n;w=b2-np.dot(b2,b1n)*b1n
    return np.degrees(np.arctan2(np.dot(np.cross(b1n,v),w),np.dot(v,w)))
def dang(x,t): return (x-t+180)%360-180
def kabsch(P,Q):  # R,t : R@P+t ≈ Q
    pc=P.mean(0);qc=Q.mean(0);H=(P-pc).T@(Q-qc);U,S,Vt=np.linalg.svd(H);d=np.sign(np.linalg.det(Vt.T@U.T));R=Vt.T@np.diag([1,1,d])@U.T;return R,qc-R@pc
# ---- nucléotides réels (1LCD, modèle 1)
def read(fn):
    res={};
    for l in open(fn):
        if l.startswith('ENDMDL'):break
        if l.startswith('ATOM') and l[17:20].strip() in('DA','DG','DC','DT'):
            res.setdefault((l[21],int(l[22:26]),l[17:20].strip()[1]),{})[l[12:16].strip()]=np.array([float(l[30:38]),float(l[38:46]),float(l[46:54])])
    return res
def start(fn,base):
    out=[]
    R=read(fn)
    for (ch,n,b),at in R.items():
        if b!=base or 'P' not in at or (ch,n+1) not in {(c,m) for (c,m,_) in R}:continue
        std=v3(base);ks=[k for k in std if k in at]
        Rm,t=kabsch(np.array([at[k] for k in ks]),np.array([std[k] for k in ks]))
        rms=np.sqrt(((np.array([Rm@at[k]+t for k in ks])-np.array([std[k] for k in ks]))**2).sum(1).mean())
        out.append((rms,{k:Rm@at[k]+t for k in BK}))
    return out
def screw(tw,rise,xd=0.,inc=0.):
    # symétrie hélicoïdale exprimée dans le repère de la paire : la paire est déplacée de xd sur x et inclinée de inc autour de y... (forme A)
    c,s=np.cos(np.radians(inc)),np.sin(np.radians(inc))
    Rt=np.array([[1,0,0],[0,c,-s],[0,s,c]])          # inclinaison : rotation autour de l'axe x (grand axe du sillon)
    F=lambda q:Rt@q+np.array([xd,0,0])               # repère de la paire -> repère de l'hélice
    Fi=lambda q:Rt.T@(q-np.array([xd,0,0]))
    a=np.radians(tw);Rz=np.array([[np.cos(a),-np.sin(a),0],[np.sin(a),np.cos(a),0],[0,0,1]])
    return (lambda q:Fi(Rz@F(q)+np.array([0,0,rise]))),F
def build(base,form,x0):
    std=v3(base);N='N9' if base in'AG' else 'N1';X='C4' if base in'AG' else 'C2'
    rna=form=='A'
    S,F=screw(32.73,2.81,-4.5,16.) if rna else screw(36.,3.38)
    names=BK+(["O2'"] if rna else [])
    def get(x):
        d=dict(std);d.update({k:x[3*i:3*i+3] for i,k in enumerate(names)});return d
    Bd=[("C1'","C2'",1.529 if rna else 1.521),("C2'","C3'",1.523 if rna else 1.518),("C3'","C4'",1.524 if rna else 1.528),("C4'","O4'",1.451 if rna else 1.446),("O4'","C1'",1.414 if rna else 1.420),
        ("C3'","O3'",1.423 if rna else 1.431),("C4'","C5'",1.510),("C5'","O5'",1.440),("O5'","P",1.593),("P","OP1",1.485),("P","OP2",1.485)]+([("C2'","O2'",1.413)] if rna else [])
    An=[("O4'","C1'","C2'",105.8 if rna else 105.9),("C1'","C2'","C3'",101.5 if rna else 102.5),("C2'","C3'","C4'",102.7 if rna else 103.1),("C3'","C4'","O4'",104.5 if rna else 106.0),("C4'","O4'","C1'",109.6 if rna else 110.1),
        ("O4'","C1'",N,108.5 if rna else 108.0),("C2'","C1'",N,112.0 if rna else 114.3),("C2'","C3'","O3'",113.7 if rna else 109.4),("C4'","C3'","O3'",113.0 if rna else 109.7),("C3'","C4'","C5'",115.5 if rna else 114.1),
        ("O4'","C4'","C5'",109.2 if rna else 109.3),("C4'","C5'","O5'",111.0 if rna else 110.9),("C5'","O5'","P",120.9),("O5'","P","OP1",108.1),("O5'","P","OP2",108.3),("OP1","P","OP2",119.6)]+([("C1'","C2'","O2'",108.4),("C3'","C2'","O2'",110.7)] if rna else [])
    P0,nm_=(18.,38.) if rna else (162.,38.)
    nu=[nm_*np.cos(np.radians(P0+144*(j-2))) for j in range(5)]
    To=[("C4'","O4'","C1'","C2'",nu[0],.3),("O4'","C1'","C2'","C3'",nu[1],.3),("C1'","C2'","C3'","C4'",nu[2],.3),("C2'","C3'","C4'","O4'",nu[3],.3),("C3'","C4'","O4'","C1'",nu[4],.3),
        ("O4'","C1'",N,X,-158. if rna else -108.,TW),("P","O5'","C5'","C4'",178. if rna else 176.,.03),("O5'","C5'","C4'","C3'",54. if rna else 48.,.03),("C5'","C4'","C3'","O3'",82. if rna else 128.,.03)]
    def res(x):
        d=get(x);r=[]
        for a,b,l in Bd:r.append((np.linalg.norm(d[a]-d[b])-l)*20)
        for a,b,c,t in An:r.append((ang(d[a],d[b],d[c])-t)*.5)
        for a,b,c,e,t,w in To:r.append(dang(tor(d[a],d[b],d[c],d[e]),t)*w)
        Pn,O5n,O1n,O2n,C5n=S(d['P']),S(d["O5'"]),S(d['OP1']),S(d['OP2']),S(d["C5'"])
        r.append((np.linalg.norm(d["O3'"]-Pn)-1.607)*20)
        r+= [(ang(d["C3'"],d["O3'"],Pn)-119.7)*.5,(ang(d["O3'"],Pn,O5n)-104.0)*.5,(ang(d["O3'"],Pn,O1n)-107.4)*.5,(ang(d["O3'"],Pn,O2n)-108.3)*.5]
        r+= [dang(tor(d["C4'"],d["C3'"],d["O3'"],Pn),-153. if rna else -176.)*TW,dang(tor(d["C3'"],d["O3'"],Pn,O5n),-71. if rna else -95.)*TW,dang(tor(d["O3'"],Pn,O5n,C5n),-68. if rna else -62.)*TW]
        h=F(d['P']);r.append((np.hypot(h[0],h[1])-(8.75 if rna else 8.91))*3)
        if not rna and PT:r+=[dang(np.degrees(np.arctan2(h[1],h[0])),94.9)*.2,(h[2]+2.19)*2]
        return np.array(r)
    s=least_squares(res,x0,xtol=1e-12,ftol=1e-12,max_nfev=4000)
    return get(s.x),s,S,F,names
def report(d,S,F,names,base,form):
    N='N9' if base in'AG' else 'N1';X='C4' if base in'AG' else 'C2';Pn=S(d['P']);O5n=S(d["O5'"]);C5n=S(d["C5'"])
    # torsions du squelette : alpha de ce nucléotide = O3'(i-1)-P-O5'-C5' ; O3'(i-1) = S^-1(O3')
    # on calcule plutôt celles du pas i -> i+1, identiques par symétrie
    al=tor(d["O3'"],Pn,O5n,C5n);be=tor(d['P'],d["O5'"],d["C5'"],d["C4'"]);ga=tor(d["O5'"],d["C5'"],d["C4'"],d["C3'"]);de=tor(d["C5'"],d["C4'"],d["C3'"],d["O3'"])
    ep=tor(d["C4'"],d["C3'"],d["O3'"],Pn);ze=tor(d["C3'"],d["O3'"],Pn,O5n);chi=tor(d["O4'"],d["C1'"],d[N],d[X])
    nu=[tor(d["C4'"],d["O4'"],d["C1'"],d["C2'"]),tor(d["O4'"],d["C1'"],d["C2'"],d["C3'"]),tor(d["C1'"],d["C2'"],d["C3'"],d["C4'"]),tor(d["C2'"],d["C3'"],d["C4'"],d["O4'"]),tor(d["C3'"],d["C4'"],d["O4'"],d["C1'"])]
    Pp=np.degrees(np.arctan2(nu[4]+nu[1]-nu[3]-nu[0],2*nu[2]*(np.sin(np.radians(36))+np.sin(np.radians(72)))))%360
    h=F(d['P']);rP=np.hypot(h[0],h[1]);h1=F(d["C1'"])
    print(f"{form}-{base}: link O3'-P {np.linalg.norm(d[chr(79)+chr(51)+chr(39)]-Pn):.3f}  alpha {al:.0f} beta {be:.0f} gamma {ga:.0f} delta {de:.0f} eps {ep:.0f} zeta {ze:.0f} chi {chi:.0f}  P(pucker) {Pp:.0f}  rayon P {rP:.2f}  rayon C1' {np.hypot(h1[0],h1[1]):.2f}  P-P intrabrin {np.linalg.norm(d['P']-Pn):.2f}")
PT=0
TW=float(sys.argv[2]) if len(sys.argv)>2 else .12      # poids des torsions canoniques (valeur utilisée pour le jeu)
if __name__=='__main__':
    fn=sys.argv[1];out={}
    for base in'AGCT':
        st=sorted(start(fn,base),key=lambda t:t[0]);best=None
        for rms,x in st[:6]:
            x0=np.concatenate([x[k] for k in BK]);d,s,S,F,names=build(base,'B',x0)
            if best is None or s.cost<best[1].cost:best=(d,s,S,F,names)
        d,s,S,F,names=best;print('cost',round(s.cost,4),'n start',len(st));report(d,S,F,names,base,'B');out['B'+base]={k:[round(float(v),3) for v in d[k]] for k in names}
        if base=='A':
            # chiralité : volumes signés
            cv=lambda a,b,c,e:float(np.dot(d[b]-d[a],np.cross(d[c]-d[a],d[e]-d[a])))
            print(' chiral C1 (O4,C2,N9)',round(cv("C1'","O4'","C2'",'N9'),2),' C4 (O4,C3,C5)',round(cv("C4'","O4'","C3'","C5'"),2),' C3 (C2,C4,O3)',round(cv("C3'","C2'","C4'","O3'"),2))
    # ARN : départ sur la solution B de la même base (T -> U), O2' placé côté O3'
    for base in'AGCU':
        d0=out['B'+('T' if base=='U' else base)];c2=np.array(d0["C2'"]);c1=np.array(v3(base)["C1'"]);c3=np.array(d0["C3'"]);o3=np.array(d0["O3'"])
        n=np.cross(c1-c2,c3-c2);n/=np.linalg.norm(n);side=np.sign(np.dot(o3-c3,n));o2=c2+1.41*(side*n*.8+.6*(2*c2-c1-c3)/np.linalg.norm(2*c2-c1-c3))/np.linalg.norm(side*n*.8+.6*(2*c2-c1-c3)/np.linalg.norm(2*c2-c1-c3))
        x0=np.concatenate([np.array(d0[k]) for k in BK]+[o2]);d,s,S,F,names=build(base,'A',x0);print('cost',round(s.cost,4));report(d,S,F,names,base,'A')
        cv=lambda a,b,c,e:float(np.dot(d[b]-d[a],np.cross(d[c]-d[a],d[e]-d[a])))
        print(' chiral C2 (C1,C3,O2)',round(cv("C2'","C1'","C3'","O2'"),2),' C3 (C2,C4,O3)',round(cv("C3'","C2'","C4'","O3'"),2),' C1 (O4,C2,N)',round(cv("C1'","O4'","C2'",'N9' if base in 'AG' else 'N1'),2))
        print(' torsion O2-C2-C3-O3',round(tor(d["O2'"],d["C2'"],d["C3'"],d["O3'"]),0),' H-bond distances base pair check')
        out['A'+base]={k:[round(float(v),3) for v in d[k]] for k in names}
    for form,base in(('B','A'),('A','A')):
        S,F=screw(32.73,2.81,-4.5,16.) if form=='A' else screw(36.,3.38);P=np.array(out[form+base]['P']);Q=P*np.array([1,-1,-1]);Sk=lambda q,k:(q if k==0 else Sk(S(q),k-1))
        import itertools
        # P du brin II aux pas voisins : on avance le brin I à la place (distance invariante)
        dd=[]
        for k in range(0,9):
            a_=Sk(P,k);dd.append((k,round(float(np.linalg.norm(a_-Q)),1),round(float((a_[0]+Q[0])/2),1)))
        print(form,'P(I,i+k)-P(II,i) :',dd)
        dd=[]
        for k in range(0,9):
            a_=Sk(Q,k);dd.append((k,round(float(np.linalg.norm(a_-P)),1),round(float((a_[0]+P[0])/2),1)))
        print(form,'P(II,i+k)-P(I,i) :',dd)
    json.dump(out,open('bk.json','w'))
