// ================= nucléotides à l'échelle des atomes : ADN, ARN et liaisons hydrogène =================
// Deux usages du même modèle :
//  - en vol libre dans le noyau : quand le vaisseau passe sous 4,5 nm près du gène, les paires de bases voisines sont dessinées atome par atome (ntFF, appelé par atom() de genes.js),
//    avec la séquence réelle, les liaisons hydrogène en pointillés et, sur les nucléosomes, une arginine d'histone dans le petit sillon là où il se tourne vers l'octamère ;
//  - une vue guidée (SXQ.nt, moteur de snrnp.js) qui explique pas à pas le nucléotide, le brin, les paires, l'empilement, les sillons, l'ADN autour des histones, la méthylation et l'ARN.
// Géométrie. Bases : coordonnées du repère standard de la paire de bases (Olson et al., 2001), en ångströms ; x pointe vers le grand sillon, z suit le brin I de 5′ vers 3′.
// Squelette sucre-phosphate : nucléotide idéal calculé hors du jeu (longueurs, angles et torsions canoniques ; fermeture exacte vers le nucléotide suivant par la symétrie de l'hélice) :
// forme B pour l'ADN (36° et 3,38 Å par paire, sucre C2′-endo), forme A pour l'ARN (32,7° et 2,81 Å, paire déplacée de 4,5 Å et inclinée de 16°, sucre C3′-endo).
// Seuls les hydrogènes des liaisons hydrogène des bases sont dessinés. Sur le nucléosome, l'ADN suit la superhélice du jeu : chaque paire est idéale, les jonctions entre paires sont approchées.
const NTB={      // base : atomes « nom x y », puis liaisons
 A:["C1' -2.479 5.346,N9 -1.291 4.498,C8 .024 4.897,N7 .877 3.902,C5 .071 2.771,C6 .369 1.398,N6 1.611 .909,N1 -.668 .532,C2 -1.912 1.023,N3 -2.32 2.29,C4 -1.267 3.124","N9-C8,C8-N7,N7-C5,C5-C6,C6-N6,C6-N1,N1-C2,C2-N3,N3-C4,C4-C5,C4-N9"],
 G:["C1' -2.477 5.399,N9 -1.289 4.551,C8 .023 4.962,N7 .87 3.969,C5 .071 2.833,C6 .424 1.46,O6 1.554 .955,N1 -.7 .641,C2 -1.999 1.087,N2 -2.949 .139,N3 -2.342 2.364,C4 -1.265 3.177","N9-C8,C8-N7,N7-C5,C5-C6,C6-O6,C6-N1,N1-C2,C2-N2,C2-N3,N3-C4,C4-C5,C4-N9"],
 C:["C1' -2.477 5.402,N1 -1.285 4.542,C2 -1.472 3.158,O2 -2.628 2.709,N3 -.391 2.344,C4 .837 2.868,N4 1.875 2.027,C5 1.056 4.275,C6 -.023 5.068","N1-C2,C2-O2,C2-N3,N3-C4,C4-N4,C4-C5,C5-C6,C6-N1"],
 T:["C1' -2.481 5.354,N1 -1.284 4.5,C2 -1.462 3.135,O2 -2.562 2.608,N3 -.298 2.407,C4 .994 2.897,O4 1.944 2.119,C5 1.106 4.338,C7 2.466 4.961,C6 -.024 5.057","N1-C2,C2-O2,C2-N3,N3-C4,C4-O4,C4-C5,C5-C7,C5-C6,C6-N1"],
 U:["C1' -2.481 5.354,N1 -1.284 4.5,C2 -1.462 3.131,O2 -2.563 2.608,N3 -.302 2.397,C4 .989 2.884,O4 1.935 2.094,C5 1.089 4.311,C6 -.024 5.053","N1-C2,C2-O2,C2-N3,N3-C4,C4-O4,C4-C5,C5-C6,C6-N1"]},
NTK={      // squelette, pour une adénine (décalé ensuite sur le C1′ de chaque base)
 B:"O4' -2.54 5.942 -1.292,C2' -2.377 6.517 .963,C3' -3.209 7.594 .267,C4' -2.976 7.328 -1.193,C5' -1.96 8.198 -1.785,O5' -.801 8.246 -.956,P .374 9.175 -1.34,OP1 -.13 10.572 -1.386,OP2 1.542 8.838 -.488,O3' -4.575 7.469 .558",
 A:"O4' -2.083 6.664 -.38,C2' -3.077 5.46 1.413,C3' -2.425 6.726 1.928,C4' -2.368 7.595 .693,C5' -1.311 8.679 .707,O5' 0 8.124 .938,P 1.293 9.06 .973,OP1 .978 10.251 1.802,OP2 2.468 8.219 1.312,O3' -3.115 7.327 3.014,O2' -4.474 5.629 1.293"},
NTKB="C1'-O4',C1'-C2',C2'-C3',C3'-C4',C4'-O4',C3'-O3',C4'-C5',C5'-O5',O5'-P,P-OP1,P-OP2",
NTH={A:[['N6','C6']],G:[['N2','C2'],['N1','C6','C2']],C:[['N4','C4']],T:[['N3','C2','C4']],U:[['N3','C2','C4']]},      // hydrogènes polaires : amine (deux H) ou N–H du cycle (un H)
NTX={A:'T',T:'A',G:'C',C:'G',U:'A'},
NTHB={A:[[0,'H6','O4'],[1,'H3','N1']],T:[[1,'H6','O4'],[0,'H3','N1']],U:[[1,'H6','O4'],[0,'H3','N1']],G:[[1,'H4','O6'],[0,'H1','N3'],[0,'H2','O2']],C:[[0,'H4','O6'],[1,'H1','N3'],[1,'H2','O2']]},      // [brin donneur, hydrogène, accepteur]
NTE={C:[.36,[.5,.5,.56,1]],N:[.35,[.25,.45,1,1]],O:[.33,[.95,.22,.2,1]],P:[.44,[1,.55,.05,1]],H:[.2,[.95,.95,.95,1]]},      // rayon dessiné (Å) et couleur de chaque élément
NTC2={},NTY=[1.7,1.5,.45,1],
Lqs=Ly(M1,1e9,0,{G:2}),dQs=dy(Lqs,16000,[0,0,0],.1),
// modèle d'un nucléotide : atomes {n nom, e élément, q position, bs atome de la base} et liaisons ; f : 'B' (ADN) ou 'A' (ARN)
ntM=(b,f)=>{let k=b+f,m=NTC2[k];if(m)return m;let a=[],bd=[],ix={},add=(n,q,e,bs)=>{ix[n]=a.length;a.push({n,e:e||n[0],q,bs})},lk=s=>s.split(',').forEach(t=>{let[i,j]=t.split('-');bd.push([ix[i],ix[j]])}),u2=v=>{let l=hypot(v[0],v[1]);return[v[0]/l,v[1]/l]};
  NTB[b][0].split(',').forEach(s=>{let[n,x,y]=s.split(' ');add(n,[+x,+y,0],0,n!="C1'")});lk(NTB[b][1]);
  for(let[N,c1,c2]of NTH[b]){let n=a[ix[N]].q,c=a[ix[c1]].q;
    if(c2){let d=a[ix[c2]].q,v=u2([2*n[0]-c[0]-d[0],2*n[1]-c[1]-d[1]]);add('H'+N[1],[n[0]+v[0]*1.01,n[1]+v[1]*1.01,0],'H',1);bd.push([ix[N],a.length-1])}
    else for(let s of[1,-1]){let v=u2([n[0]-c[0],n[1]-c[1]]),co=.5,si=s*.866;add('H'+N[1]+(s>0?1:2),[n[0]+(v[0]*co-v[1]*si)*1.01,n[1]+(v[0]*si+v[1]*co)*1.01,0],'H',1);bd.push([ix[N],a.length-1])}}
  let c1=a[0].q,sx=c1[0]+2.479,sy=c1[1]-5.346;NTK[f].split(',').forEach(s=>{let[n,x,y,z]=s.split(' ');add(n,[+x+sx,+y+sy,+z],n=='P'?'P':'O'==n[0]?'O':'C')});lk(NTKB+",C1'-"+(ix.N9!=null?'N9':'N1')+(f=='A'?",C2'-O2'":''));
  return NTC2[k]={a,bd,ix}},
// une paire de bases. F : position locale (Å) → monde ; b : base du brin I. o = {f forme, S et T : dessin d'une sphère et d'un bâton, k échelle (monde par Å),
//  s1, s2 : 0 pour ne pas dessiner un brin ; hb : avancement des liaisons hydrogène (0 à 1) ; me : méthyle sur le C5 des cytosines (0 à 1) ; c(brin, atome, base) : couleur imposée ; gr : squelette en gris}
// Retourne les positions utiles : g(brin, nom d'atome), hb [[H, accepteur]].
ntPr=(F,b,o)=>{let f=o.f||'B',b2=f=='A'&&b=='A'?'U':NTX[b],M=[ntM(b,f),ntM(b2,f)],W=[0,1].map(s=>M[s].a.map(a=>!a.bs&&o.ov&&o.ov(s,a.n)||F(s?[a.q[0],-a.q[1],-a.q[2]]:a.q))),      // ov : squelette réel (nucléosome)
   k=o.k,bb=[b,b2],H=[],
   col=(s,a)=>{let c=o.c&&o.c(s,a,bb[s]);if(c)return c;c=NTE[a.e][1];if(a.e=='C')c=a.bs?lp(c,BC[bb[s]=='U'?'T':bb[s]]||c,.62).concat(1):o.gr?[.33,.35,.4,1]:c;else if(o.gr&&!a.bs&&a.e!='P')c=lp(c,[.35,.36,.4],.45).concat(1);return c};
  for(let s=0;s<2;s++){if(s?o.s2===0:o.s1===0)continue;let C=M[s].a.map(a=>col(s,a));
    M[s].a.forEach((a,i)=>o.S(W[s][i],NTE[a.e][0]*k*(a.n=="O2'"&&o.o2?1.5:1),C[i]));M[s].bd.forEach(([i,j])=>o.T(W[s][i],W[s][j],.11*k,kd(lp(C[i],C[j],.5),.75)));
    if(o.me>0&&bb[s]=='C'){let A=M[s].a,x=M[s].ix,c5=A[x.C5].q,c4=A[x.C4].q,c6=A[x.C6].q,v=nm([2*c5[0]-c4[0]-c6[0],2*c5[1]-c4[1]-c6[1],0]),q=[c5[0]+v[0]*1.5,c5[1]+v[1]*1.5,0],w=F(s?[q[0],-q[1],0]:q);o.S(w,.5*k*o.me,NTY);o.T(W[s][x.C5],w,.11*k,kd(NTY,.7))}}
  if(o.s1!==0&&o.s2!==0)for(let[d,h,ac]of NTHB[b]){let A=M[d].a,e=W[1-d][M[1-d].ix[ac]],bi=-1,bd=1e9;A.forEach((a,i)=>{if(a.n.startsWith(h)&&a.e=='H'){let x=ds(W[d][i],e);x<bd&&(bd=x,bi=i)}});
    H.push([W[d][bi],e]);let n=o.hb==null?1:o.hb;for(let j=1;j<4;j++)n*3>=j-.5&&o.S(lp(W[d][bi],e,j/4),.085*k,NTY)}
  return{g:(s,n)=>W[s][M[s].ix[n]],hb:H,b2}},
// une arginine d'histone dans le petit sillon (placement schématique) : F est le repère de la paire ; retourne la position du carbone du groupe guanidinium
NTR=[['C',-12,2.4,2.8],['C',-10.5,2.4,2.6],['C',-9.8,1.1,2.2],['C',-8.3,1.2,2],['N',-7.4,0,1.7],['C',-6.1,0,1.7],['N',-5.4,1.1,1.7],['N',-5.4,-1.1,1.7]],
ntAr=(F,o)=>{let W=NTR.map(a=>F([a[1],a[2],a[3]])),c=[1.25,.6,1.05,1];NTR.forEach((a,i)=>{o.S(W[i],NTE[a[0]][0]*o.k,a[0]=='C'?c:NTE.N[1]);i&&i<7&&o.T(W[i-1],W[i],.11*o.k,kd(c,.7))});o.T(W[5],W[7],.11*o.k,kd(c,.7));
  for(let i of[6,7])for(let j=1;j<4;j++)o.S(lp(W[i],F([-2.5,i<7?2.4:-2.6,1.7]),j/4),.085*o.k,NTY);return W[5]};
// ---------- vol libre : une paire de bases autour du vaisseau. P, T, N, B : point de l'axe et repère de la paire (genes.js) ; th : phase de l'hélice ; s : base ; pv : paire précédente
const NFO={k:1e-4,S:(q,r,c)=>dS(dQs,q,r,c),T:(a,b,r,c)=>dCy(dQ,a,b,r,c)};
function ntFF(Fm,g,s,pv,ov){let{o,ex,ey,ez}=Fm,F=q=>[o[0]+(ex[0]*q[0]+ey[0]*q[1]+ez[0]*q[2])*1e-4,o[1]+(ex[1]*q[0]+ey[1]*q[1]+ez[1]*q[2])*1e-4,o[2]+(ex[2]*q[0]+ey[2]*q[1]+ez[2]*q[2])*1e-4],
   kn=NTX[s]&&s!='U',b=kn?s:'ACGT'[(g*7+(g>>3))&3],r;NFO.gr=!kn;NFO.c=kn?0:(st,at)=>at.e=='C'&&at.bs?[.42,.44,.5,1]:0;NFO.ov=ov;r=ntPr(F,b,NFO);r.b=b;r.kn=kn;r.F=F;r.P=o;r.ex=ex;
  if(pv)dCy(dQ,pv.g(0,"O3'"),r.g(0,'P'),.11e-4,[.6,.4,.2,1]),dCy(dQ,r.g(1,"O3'"),pv.g(1,'P'),.11e-4,[.6,.4,.2,1]);return r}
// étiquettes et fiche de la paire la plus proche du vaisseau (AT.np, rempli par atom())
let ntOn=0,ntHi=0;
function ntD(){let A=AT&&AT.za&&!SX&&!RX&&!NX&&!PM&&reg>1?AT:0;if(!AT&&dQs.n)dQs.n=0;if(!A){ntOn&&(ntOn=0,SX||RX||NX||QL.forEach(e=>e.style.display='none'));return}ntOn=1;nxl=0;
  ntHi||(ntHi=1,say('Échelle des atomes : chaque paire de bases est dessinée avec ses liaisons hydrogène (pointillés jaunes). Le bouton « ⌬ Nucléotides » les explique pas à pas.',10));
  let r=A.np;if(r){let m=lp(r.g(0,"C1'"),r.g(1,"C1'"),.5),n=r.hb.length;sxL(lp(r.g(0,'N1'),r.g(0,'C4'),.5),r.kn?r.b:'?');sxL(lp(r.g(1,'N1'),r.g(1,'C4'),.5),r.kn?r.b2:'?');
    sxL(ma(m,vu,-z*.55),n+' liaisons hydrogène','e');sxL(ma(r.P,r.ex,.0011),'grand sillon','r');sxL(ma(r.P,r.ex,-.0011),'petit sillon','r');sxL(ma(r.g(0,'P'),vu,z*.3),'phosphate','r')}
  let h=A.nr;h&&h.d<.003&&sxL(ma(h.q,vu,z*.35),NCT[h.r.c&3]+' · '+NCA[h.r.a][LG]+' '+h.r.n,'e');for(let i=nxl;i<QL.length;i++)QL[i].style.display='none'}
function ntI(){let r=AT.np,h=AT.nr;if(h&&(!r||h.d<AT.bn))return ncI(h);if(!r)return 0;
  if(!r.kn)return['Paire de bases (séquence non chargée)','La séquence de cette région n\'a pas pu être chargée : les bases dessinées ici sont un exemple. Chaque paire associe une grande base (purine : A ou G) et une petite (pyrimidine : T ou C), retenues par des liaisons hydrogène (pointillés).'];
  return/[AT]/.test(r.b)?['Paire A–T : deux liaisons hydrogène','Adénine et thymine se font face. Deux liaisons hydrogène les retiennent (pointillés) : un hydrogène porté par un azote est attiré par un oxygène ou un azote de la base d\'en face. Le méthyle de la thymine pointe dans le grand sillon. Chaque liaison est faible ; ce sont leur nombre et surtout l\'empilement des bases qui tiennent la double hélice.']
   :['Paire G–C : trois liaisons hydrogène','Guanine et cytosine se font face, retenues par trois liaisons hydrogène (pointillés) : une de plus que la paire A–T. La paire occupe pourtant la même largeur entre les deux sucres, ce qui permet à n\'importe quelle séquence de tenir dans la même double hélice.']}
{const n0=nuI;nuI=()=>AT&&AT.za&&(AT.np||AT.nr)&&TG.nd<.012&&ntI()||n0()}
// ---------- vue guidée
const NSO={k:1e-4,S:(q,r,c)=>dS(dSx0,q,r,c),T:(a,b,r,c)=>dT(dSx1,a,b,r,c)},
ntFr=(O,ex,ey,ez)=>q=>sxW([O[0]+(ex[0]*q[0]+ey[0]*q[1]+ez[0]*q[2])*.1,O[1]+(ex[1]*q[0]+ey[1]*q[1]+ez[1]*q[2])*.1,O[2]+(ex[2]*q[0]+ey[2]*q[1]+ez[2]*q[2])*.1]),
ntFc=O=>ntFr(O,[0,1,0],[1,0,0],[0,0,-1]),      // paire vue de face : grand sillon vers le haut
// hélice droite d'axe ez partant de O (nm) : seq bases du brin I, a0 angle de départ, o options de ntPr (+ f forme, n1 : brin I seul) ; retourne les paires dessinées et leurs repères
ntHx=(O,ez,u,seq,a0,o)=>{let v=cr(ez,u),A=o.f=='A',tw=(A?32.73:36)*PI/180,ri=A?.281:.338,R=[],pv,c=cos(.279),s=sin(.279);
  for(let i=0;i<seq.length;i++){let a=a0+i*tw,hx=ad(ml(u,cos(a)),ml(v,sin(a))),hy=cr(ez,hx),C=ma(O,ez,ri*i),ex=hx,ey=hy,e3=ez;if(A)C=ma(C,hx,-.45),ey=ad(ml(hy,c),ml(ez,s)),e3=ad(ml(hy,-s),ml(ez,c));
    let F=ntFr(C,ex,ey,e3),r=ntPr(F,seq[i],o);r.F=F;r.C=C;r.ex=ex;if(pv){o.s1!==0&&o.T(pv.g(0,"O3'"),r.g(0,'P'),.11e-4,[.6,.4,.2,1]);o.s2!==0&&o.T(r.g(1,"O3'"),pv.g(1,'P'),.11e-4,[.6,.4,.2,1])}R.push(pv=r)}return R},
ntO=o=>Object.assign({},NSO,o),NTL=[[LG?'carbon':'carbone','#8a8a96'],[LG?'nitrogen':'azote','#4070f0'],['oxygène','#e83a34'],[LG?'phosphorus':'phosphore','#f08a10'],['hydrogène','#eeeeee'],['liaison hydrogène','#ffe45e']],
ntRole=(s,a,b)=>{let n=a.n,k=b+n;return a.e=='H'?[.5,.75,1.9,1]:/^(AN7|GN7|GO6|TO4|UO4|AN3|GN3|TO2|CO2|UO2)$/.test(k)?[1.8,.3,.25,1]:/^(AN6|CN4|GN2)$/.test(k)?[.3,.55,1.8,1]:k=='TC7'?NTY:a.e=='P'?[.5,.32,.12,1]:[.3,.31,.35,1]},
NTD='CGCGAATTCGCG',ntW=()=>performance.now()*.00025,      // rotation lente des hélices

NTS=[
 {k:'nt',T:9,z:.00052,c:[0,0],leg:NTL.slice(0,4),d:a=>{let r=ntPr(ntFc([-.6,.12,0]),'A',ntO({s2:0})),g=n=>r.g(0,n),m=lp(g("C1'"),g("C4'"),.5);sxL(ma(g('P'),vu,.00017),'phosphate','e');sxL(ma(m,vu,-.00022),'désoxyribose','e');sxL(ma(g('C5'),vu,.00027),'base : adénine','e');
   for(let i=1;i<6;i++)sxL(ma(g('C'+i+"'"),vr,i<4?-.00009:.00009),i+'′','r');sxL(ma(g("O3'"),vr,-.00014),'3′-OH','r')}},
 {k:'st',T:10,z:.0008,c:[.2,.5],leg:NTL.slice(0,4),d:a=>{let R=ntHx([0,0,0],[0,1,0],[0,0,1],'ACGT',-1.2,ntO({s2:0})),t=(a*1.3)%1,i=min(2,t*3|0),x=R[i].g(0,"O3'"),y=R[i+1].g(0,'P');dS(dSx0,lp(x,y,t*3-i),.00005,NTY);
   sxL(ma(R[0].g(0,'P'),vu,-.00022),'extrémité 5′','e');sxL(ma(R[3].g(0,"O3'"),vu,.00022),'extrémité 3′','e');sxL(ma(lp(R[1].g(0,"O3'"),R[2].g(0,'P'),.5),vr,.0004),'liaison phosphodiester','r');R.forEach((r,i)=>sxL(r.g(0,i%3?'N3':'C5'),'ACGT'[i]))}},
 {k:'at',T:11,z:.00078,c:[0,.1],leg:NTL,d:a=>{let r=ntPr(ntFc([0,0,0]),'A',ntO({hb:ss(sxA(a,.12,.4))}));sxL(ma(r.g(0,'C5'),vu,.00032),'adénine');sxL(ma(r.g(1,'C5'),vu,.00032),'thymine');
   if(a>.5){sxL(ma(lp(r.hb[0][0],r.hb[0][1],.5),vu,.00012),'N6–H ··· O4','e');sxL(ma(lp(r.hb[1][0],r.hb[1][1],.5),vu,-.00012),'N1 ··· H–N3','e')}sxL(sxW([0,.52,0]),'côté du grand sillon','r');sxL(sxW([0,-.42,0]),'côté du petit sillon','r')}},
 {k:'gc',T:11,z:.00078,c:[0,.1],leg:NTL,d:a=>{let r=ntPr(ntFc([0,0,0]),'G',ntO({hb:ss(sxA(a,.12,.4))}));sxL(ma(r.g(0,'C5'),vu,.00032),'guanine');sxL(ma(r.g(1,'C5'),vu,.00032),'cytosine');
   if(a>.5){sxL(ma(lp(r.hb[0][0],r.hb[0][1],.5),vu,.00012),'O6 ··· H–N4','e');sxL(lp(r.hb[1][0],r.hb[1][1],.5),'N1–H ··· N3','e');sxL(ma(lp(r.hb[2][0],r.hb[2][1],.5),vu,-.00012),'N2–H ··· O2','e')}}},
 {k:'iso',T:12,h:1,z:.00078,c:[0,.1],leg:NTL.slice(0,5),d:a=>{let b='ATGC'[min(3,a*4|0)],r=ntPr(ntFc([0,0,0]),b,ntO({})),x=r.g(0,"C1'"),y=r.g(1,"C1'");dS(dSx0,x,.00006,[2,2,2,1]);dS(dSx0,y,.00006,[2,2,2,1]);dT(dSx1,x,y,.000012,[1.5,1.5,1.5,1]);
   sxL(ma(lp(x,y,.5),vu,.00012),'C1′ – C1′ : '+(ds(x,y)*1e4).toFixed(1).replace('.',LG?'.':',')+' Å','e');sxL(sxW([0,-.3,0]),b+' – '+r.b2)}},
 {k:'hel',T:14,z:.0019,c:[.3,1.85],pit:.12,leg:NTL.slice(0,4),d:a=>{let R=ntHx([0,0,0],[0,1,0],[0,0,1],NTD,ntW(),ntO({hb:1}));sxL(ma(R[0].g(0,'P'),vu,-.0003),'5′','e');sxL(ma(R[11].g(0,"O3'"),vu,.0003),'3′','e');sxL(ma(R[0].g(1,"O3'"),vu,-.0003),'3′','e');sxL(ma(R[11].g(1,'P'),vu,.0003),'5′','e');
   sxL(sxW([1.75,2.2,0]),'3,4 Å entre deux paires','r');sxL(sxW([1.75,1.6,0]),'un tour : environ 10,5 paires','r')}},
 {k:'grv',T:14,z:.0019,c:[.3,1.85],pit:.12,leg:[['accepteur de liaison hydrogène','#f0524a'],['donneur (N–H)','#5a8cf0'],['méthyle de la thymine','#ffe45e']],d:a=>{let R=ntHx([0,0,0],[0,1,0],[0,0,1],NTD,.35+.5*sin(ntW()*1.2),ntO({hb:0,c:ntRole})),r=R[5],q=R[8];
   sxL(sxW(ma(r.C,r.ex,1.25)),'grand sillon','e');sxL(sxW(ma(q.C,q.ex,-1.15)),'petit sillon','e')}},
 {k:'nuc',T:14,z:.003,c:[-.8,2.6],leg:[['arginine d\'une histone','#f08ad0'],['histones','#7f8fb8'],['liaison hydrogène','#ffe45e']],d:a=>{let pv,o=ntO({gr:1}),n=0;HXO.forEach(([h,q])=>dS(dSx0,sxW(q),.0016,kd(kc(HXH[h]),.42)));
   for(let i=58;i<96;i++){let{C,N,B}=hxC(i),T=cr(N,B),an=i*TAU/10.2+1.2+PI,ex=ad(ml(N,cos(an)),ml(B,sin(an))),F=ntFr(C,ex,cr(T,ex),T),r=ntPr(F,'GCATTAGCAT'[i%10],o);
     if(pv)o.T(pv.g(0,"O3'"),r.g(0,'P'),.11e-4,[.6,.4,.2,1]),o.T(r.g(1,"O3'"),pv.g(1,'P'),.11e-4,[.6,.4,.2,1]);pv=r;
     if(dt(ex,N)>.955){let w=ntAr(F,o);n++<1&&(sxL(ma(w,vu,.0005),'arginine dans le petit sillon','e'),sxL(sxW(ma(C,N,1.5)),'grand sillon, vers l\'extérieur','r'))}}
   sxL(sxW([0,0,0]),'histones')}},
 {k:'m5c',T:12,z:.00095,c:[.2,.5],leg:[['méthyle (5-méthylcytosine)','#ffe45e'],['liaison hydrogène','#ffe45e']],d:a=>{let m=ss(sxA(a,.15,.35)),R=ntHx([0,0,0],[0,1,0],[0,0,1],'ACGT',-.95,ntO({me:m,gr:1}));
   m>.5&&(sxL(sxW([1.2,.62,0]),'méthyle sur le carbone 5','e'),sxL(sxW([1.2,.4,0]),'dans le grand sillon','r'))}},
 {k:'rna',T:14,z:.0016,c:[.4,1.3],pit:.12,leg:[['oxygène 2′ du ribose','#ff5ad0'],['carbones de l\'uracile','#c06a70']],d:a=>{let R=ntHx([0,0,0],[0,1,0],[0,0,1],'GCAUCGAUGC',ntW(),ntO({f:'A',o2:1,c:(s,at)=>at.n=="O2'"?[2,.3,1.5,1]:0}));
   sxL(ma(R[4].g(0,"O2'"),vr,.0004),'2′-OH','e');sxL(sxW([1.9,1.7,0]),'forme A : environ 11 paires par tour','r');sxL(sxW([1.9,1.2,0]),'2,8 Å entre deux paires','r')}}],
NTT=[
 ['Un nucléotide','la brique de l\'ADN','Trois parties : un phosphate, un sucre à cinq carbones (le désoxyribose, numérotés de 1′ à 5′) et une base, ici l\'adénine. La base s\'accroche au carbone 1′, le phosphate au carbone 5′ ; le carbone 3′ porte l\'hydroxyle qui recevra le nucléotide suivant. Carbone en gris (teinté de la couleur de la base dans son cycle), azote en bleu, oxygène en rouge, phosphore en orange. Les hydrogènes ne sont pas dessinés, sauf ceux qui feront des liaisons hydrogène.'],
 ['Un brin','quatre nucléotides','Les nucléotides s\'enchaînent par des liaisons phosphodiester : le phosphate relie le carbone 3′ d\'un sucre au carbone 5′ du suivant. Le brin a donc un sens, de son extrémité 5′ à son extrémité 3′ : c\'est dans ce sens que les polymérases l\'allongent et que l\'on écrit une séquence. Chaque phosphate porte une charge négative : l\'ADN est un acide.'],
 ['La paire A–T','deux liaisons hydrogène','Une liaison hydrogène unit un hydrogène porté par un azote (le donneur, légèrement positif) à un oxygène ou un azote de la base d\'en face (l\'accepteur, légèrement négatif). Entre l\'adénine et la thymine il y en a deux : N6–H···O4 et N3–H···N1. Dans la géométrie de référence utilisée ici, les deux atomes lourds sont à 3 Å environ l\'un de l\'autre. Une liaison hydrogène est bien plus faible qu\'une liaison covalente : quelques kilocalories par mole isolée, et seulement 0,5 à 1,5 dans l\'eau, où les mêmes groupes pourraient se lier à l\'eau.'],
 ['La paire G–C','trois liaisons hydrogène','Entre la guanine et la cytosine, trois liaisons hydrogène : N4–H···O6, N1–H···N3 et N2–H···O2. Les donneurs et les accepteurs ne coïncident que pour ces partenaires : c\'est ce qui fait la règle A avec T, G avec C, et donc la copie fidèle d\'un brin à partir de l\'autre.'],
 ['Deux paires, une seule forme','A–T, T–A, G–C, C–G','Chaque paire associe une grande base à deux cycles (purine : A ou G) et une petite à un cycle (pyrimidine : T ou C). La distance entre les carbones 1′ des deux sucres reste presque la même (environ 10,5 Å ; 10,7 à 10,8 dans la géométrie de référence dessinée ici), quelle que soit la paire et quel que soit son sens : n\'importe quelle séquence tient dans la même double hélice.'],
 ['La double hélice','douze paires de bases','Les deux brins s\'enroulent en hélice droite, tête-bêche : l\'un monte de 5′ vers 3′, l\'autre descend. Les paires s\'empilent à plat, à 3,4 Å l\'une de l\'autre, et l\'hélice fait un tour toutes les 10,5 paires environ en solution. Les liaisons hydrogène assurent la spécificité, mais c\'est surtout l\'empilement des bases qui stabilise la double hélice.'],
 ['Deux sillons','lire l\'ADN sans l\'ouvrir','Les sucres d\'une paire ne sont pas face à face : il en résulte un grand sillon (environ 12 Å de large) et un petit sillon (environ 6 Å). Le bord des bases y reste accessible. Dans le grand sillon, le motif d\'accepteurs (rouge), de donneurs (bleu) et du méthyle de la thymine (jaune) distingue les quatre paires A–T, T–A, G–C et C–G ; dans le petit sillon, il les distingue beaucoup moins bien. C\'est pourquoi tant de protéines lisent la séquence par le grand sillon. Dans le petit sillon des régions riches en A–T, des molécules d\'eau s\'alignent en une colonne ordonnée.'],
 ['Autour des histones','un quart de tour de nucléosome','Sur le nucléosome, 147 paires de bases font 1,65 tour autour de huit histones. L\'ADN y est un peu plus vrillé qu\'à l\'état libre (10,2 paires par tour contre 10,5). Toutes les dix paires environ, le petit sillon se tourne vers les histones : une arginine (rose) s\'y glisse dans dix de ces quatorze sillons, attirée par un sillon d\'autant plus négatif qu\'il est étroit. Les histones tiennent surtout le squelette de sucres et de phosphates, directement ou par des molécules d\'eau : dans la structure à 1,9 Å, qui en compte plus de 3 000, les ponts par l\'eau sont à peu près aussi nombreux que les liaisons hydrogène directes. Les bases étant peu lues, presque n\'importe quelle séquence peut s\'enrouler. Les séquences riches en A et T reviennent pourtant de préférence là où le petit sillon regarde vers l\'intérieur. Séquence et emplacement des arginines sont ici des exemples.'],
 ['Le méthyle de la cytosine','un site CpG méthylé','Sur un site CpG, les deux cytosines portent un méthyle sur leur carbone 5. Ce méthyle pointe dans le grand sillon et ne touche pas aux trois liaisons hydrogène avec la guanine : la marque se lit sans ouvrir l\'ADN, par exemple par MeCP2. Mais elle a un coût : en perdant son groupe amine, une cytosine devient un uracile, que la cellule reconnaît comme anormal et retire ; une 5-méthylcytosine devient une thymine, base normale, et l\'erreur passe plus facilement. Les sites CpG méthylés sont des points chauds de mutation : dans un recensement de 1988, 35 % des mutations ponctuelles responsables de maladies génétiques touchaient un dinucléotide CpG, presque toutes des transitions C vers T ou G vers A.'],
 ['Et l\'ARN ?','une double hélice d\'ARN','Deux différences chimiques : le ribose porte un hydroxyle sur son carbone 2′ (rose), et l\'uracile remplace la thymine (il lui manque le méthyle). L\'hydroxyle 2′ impose au sucre une autre forme, et à l\'hélice la forme A : plus large et plus tassée, environ 11 paires par tour et 2,8 Å entre deux paires, avec un grand sillon étroit et profond. Au cœur de l\'ARN polymérase II, l\'ARN naissant reste apparié à l\'ADN sur 7 à 9 paires. Dans l\'ARN, G peut aussi s\'apparier à U par une paire décalée, dite bancale.']];
SXQ.nt={S:NTS,T:NTT,ti:'Nucléotides et liaisons hydrogène',solo:1,zn:.0004,sc:[.3,1.85],sz:.0021,o:()=>p.slice(),sd:()=>{ntHx([0,0,0],[0,1,0],[0,0,1],NTD,.4,ntO({hb:1}))},
 in:'Dix étapes à l\'échelle de l\'ångström : un nucléotide, un brin, les paires A–T et G–C et leurs liaisons hydrogène, l\'empilement en double hélice, les deux sillons, l\'ADN enroulé autour des histones, la méthylation de la cytosine, puis l\'ARN. Les atomes sont dessinés en boules et bâtons, les liaisons hydrogène en pointillés jaunes. Glissez pour tourner autour de la scène, molette ou pincement pour zoomer. Les bases suivent la géométrie de référence des paires de bases ; le squelette est un nucléotide idéal en forme B (forme A pour l\'ARN).',
 su:'L\'information tient dans une règle d\'appariement, portée par des liaisons faibles et réversibles : les deux brins se séparent sans rien casser, et chacun suffit à refaire l\'autre. Tout le reste de ce noyau en dépend : la réplication, la transcription, la lecture des séquences par les protéines et celle des marques comme la méthylation.'};
// ---------- bouton
{const b0=btT;btT=()=>{b0();if(RX||NX||SX)return;$('ntb').style.display=go&&!PM&&!AP&&!ORG&&reg>1&&ct<0&&(AT||ln(p)<GR+.3&&z<.03)?'block':'none'};$('ntb').onclick=()=>sxIn('nt')}
