// ================= nucléosome réel : histones et ADN d'après la structure cristallographique 1KX5 =================
// Les données (nucleosome-data.js, produites par tools/mk-nucleosome.py) sont exprimées dans le repère d'une unité « nucléosome » de la fibre (genes.js, ub) :
// chaque nucléosome du jeu est donc une copie de la structure à 1,9 Å (Davey et al., 2002 ; histones de xénope, 147 pb), posée sur le tracé de la fibre.
//  - nuFr(U,j,k) : repère de la paire de bases k de l'unité j. Sur le nucléosome, c'est le repère réel ; sur l'ADN de liaison, un ADN B droit dont la torsion est ajustée
//    pour se raccorder au nucléosome suivant, et dont les premières et dernières paires glissent vers les extrémités réelles ;
//  - ncOv(W,k) : squelette sucre-phosphate réel de la paire k (les bases sont celles de la séquence du génome, posées dans le repère réel) ;
//  - ncH(W,za) : les huit histones, selon la distance : huit lobes, puis le tracé des carbones α (hélices épaisses), puis tous les atomes près du vaisseau,
//    avec les contacts polaires directs histone–ADN et les molécules d'eau qui font le pont (pointillés).
const NCT=['H3','H4','H2A','H2B'],NCN=["P","OP1","OP2","O5'","C5'","C4'","O4'","C3'","O3'","C2'","C1'"],NCP=[-1,0,0,0,3,4,5,5,7,7,9],
NCA={A:['alanine','alanine'],R:['arginine','arginine'],N:['asparagine','asparagine'],D:['aspartate','aspartate'],C:['cystéine','cysteine'],Q:['glutamine','glutamine'],E:['glutamate','glutamate'],G:['glycine','glycine'],H:['histidine','histidine'],
 I:['isoleucine','isoleucine'],L:['leucine','leucine'],K:['lysine','lysine'],M:['méthionine','methionine'],F:['phénylalanine','phenylalanine'],P:['proline','proline'],S:['sérine','serine'],T:['thréonine','threonine'],W:['tryptophane','tryptophan'],Y:['tyrosine','tyrosine'],V:['valine','valine']},
NCE={C:[.36,[.5,.5,.56,1]],N:[.35,[.25,.45,1,1]],O:[.33,[.95,.22,.2,1]],S:[.42,[.95,.8,.2,1]]};
let NC=0;
const ncB=(s,T)=>{let b=atob(s),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return new T(u.buffer)},
ncL=()=>{if(NC)return NC;let D=NCD,Q=D.Q,F=ncB(D.F,Int16Array),fr=[],k,TP={},hx={},X=[],E=[],B=[],R=[],AR=[],ai=0,pi=0,P=ncB(D.P,Int8Array),Dd=ncB(D.D,Int8Array),DB=[[],[]],di=0;
  for(k=0;k<147;k++){let o=k*9,ex=[F[o+3]/1e4,F[o+4]/1e4,F[o+5]/1e4],ez=[F[o+6]/1e4,F[o+7]/1e4,F[o+8]/1e4];fr.push({o:[F[o]/100,F[o+1]/100,F[o+2]/100],ex,ey:cr(ez,ex),ez})}
  for(let a in D.AA){let[sc,rg]=D.AA[a].split('/'),n=['N','CA','C','O'],pa=[-1,0,1,2];sc&&sc.split(',').forEach(s=>{let[x,y]=s.split('.');pa.push(n.indexOf(y));n.push(x)});TP[a]={n,pa,rg:rg?rg.split(',').map(s=>s.split('.').map(x=>n.indexOf(x))):[]}}
  D.H.forEach(([c,a,b])=>{for(let r=a;r<=b;r++)hx[c+'_'+r]=1});
  D.S.forEach((seq,c)=>{let pc=-1;for(let r=0;r<seq.length;r++){let t=TP[seq[r]],i0=ai,bd=[];
      t.n.forEach((n,j)=>{let pr=j?i0+t.pa[j]:pc;if(pr<0)X.push(D.PX[c*3]*Q,D.PX[c*3+1]*Q,D.PX[c*3+2]*Q);else X.push(X[pr*3]+P[pi]*Q,X[pr*3+1]+P[pi+1]*Q,X[pr*3+2]+P[pi+2]*Q),bd.push(pr,ai);pi+=3;E.push(n[0]);AR.push(R.length);ai++});
      t.rg.forEach(([a,b])=>bd.push(i0+a,i0+b));R.push({c,n:D.N0[c]+r,a:seq[r],i:i0,m:t.n.length,b:bd,h:hx[c+'_'+(D.N0[c]+r)]|0,e:i0+t.n.length-1});pc=i0+2}});
  for(let s=0;s<2;s++){let po=0;for(let r=0;r<147;r++){let q={};NCN.forEach((n,j)=>{let pr=j?q[NCN[NCP[j]]]:po,x=pr?[pr[0]+Dd[di]*Q,pr[1]+Dd[di+1]*Q,pr[2]+Dd[di+2]*Q]:[D.DX[s*3]*Q,D.DX[s*3+1]*Q,D.DX[s*3+2]*Q];
        if(j==1||j==2){if(Dd[di]||Dd[di+1]||Dd[di+2])q[n]=x}else q[n]=x;di+=3});q.OP1||(q.P5=q.P,delete q.P);po=q["O3'"];DB[s].push(q)}}      // extrémité 5′ : pas de phosphate
  let lobe=D.S.map((seq,c)=>{let m=[0,0,0],n=0;R.forEach(r=>{if(r.c==c&&r.h)m=ad(m,[X[r.i*3+3],X[r.i*3+4],X[r.i*3+5]]),n++});return ml(m,1/n)}),rg={};D.RG.forEach(([c,n])=>rg[c+'_'+n]=1);
  let C=ncB(D.C,Int16Array),W=ncB(D.W,Int16Array),ct={};for(let i=0;i<C.length;i+=4)ct[AR[C[i]]]=1;
  return NC={fr,X:new Float32Array(X),E,R,AR,DB,C,W,lobe,rg,ct}},
// repère d'une unité → monde : p(point en Å), v(vecteur)
ncM=W=>{let P=W.P,t=W.t,u=W.u,A=cr(t,u);return{p:q=>[P[0]+(t[0]*q[0]+u[0]*q[1]+A[0]*q[2])*1e-4,P[1]+(t[1]*q[0]+u[1]*q[1]+A[1]*q[2])*1e-4,P[2]+(t[2]*q[0]+u[2]*q[1]+A[2]*q[2])*1e-4],
   v:q=>[t[0]*q[0]+u[0]*q[1]+A[0]*q[2],t[1]*q[0]+u[1]*q[1]+A[1]*q[2],t[2]*q[0]+u[2]*q[1]+A[2]*q[2]]}},
ncRf=(W,k)=>{let f=ncL().fr[k],M=ncM(W);return{o:M.p(f.o),ex:M.v(f.ex),ey:M.v(f.ey),ez:M.v(f.ez)}},      // repère réel de la paire k d'un nucléosome
ncWr=a=>a-TAU*Math.round(a/TAU),
// partie droite d'une unité (ADN de liaison) : phase de départ p, torsion par paire tw, décalages d0/d1 et axes z0/z1 vers les extrémités réelles voisines
nuSp=(U,j)=>{let W=U[j],ks=W.ty?147:0,n=W.n-ks,S={p:W.g*.5984,tw:.5984};if(n<1)return S;let[P,T,N]=ub(W,ks),B=cr(T,N),fp=W.ty?ncRf(W,146):j>0&&U[j-1].n>0?nuFr(U,j-1,U[j-1].n-1):0,X=U[j+1];
  if(fp)S.p=atan2(dt(fp.ex,B),dt(fp.ex,N)),S.d0=sb(ma(fp.o,fp.ez,.000338),P),S.z0=fp.ez;
  if(X&&X.ty){let fe=ncRf(X,0),m=n+1;S.tw=.5984+ncWr(atan2(dt(fe.ex,B),dt(fe.ex,N))-S.p-.5984*m)/m;S.d1=sb(ma(fe.o,fe.ez,-.000338),ub(W,W.n-1)[0]);S.z1=fe.ez}return S},
nuFr=(U,j,k)=>{let W=U[j];if(W.ty&&k<147)return ncRf(W,k);let ks=W.ty?147:0,S=W.sp||(W.sp=nuSp(U,j)),[P,T,N]=ub(W,k),B=cr(T,N),a=S.p+(k-ks+1)*S.tw,w0=S.d0?max(0,1-(k-ks)/8):0,w1=S.d1?max(0,1-(W.n-1-k)/8):0,o=P,ez=T;
  if(w0>0)o=ma(o,S.d0,w0),ez=lp(ez,S.z0,w0*.8);if(w1>0)o=ma(o,S.d1,w1),ez=lp(ez,S.z1,w1*.8);ez=nm(ez);let ex=ad(ml(N,cos(a)),ml(B,sin(a)));ex=nm(ma(ex,ez,-dt(ex,ez)));return{o,ex,ey:cr(ez,ex),ez}},
// squelette réel de la paire k : (brin, nom d'atome) → position, ou rien si l'atome manque (phosphate de l'extrémité 5′)
ncOv=(W,k)=>{let D=ncL().DB,M=ncM(W),a=D[0][k],b=D[1][146-k];return(s,n)=>{let q=(s?b:a)[n];return q&&M.p(q)}},
ncCol=(e,c)=>e=='C'?lp(NCE.C[1],kc(HXH[c&3]),.6).concat(1):NCE[e][1],
NHO={k:1e-4};
// les huit histones d'une unité. za : échelle des atomes. Retourne le résidu atomique le plus proche du vaisseau : {r, q position de son extrémité, d distance}
function ncH(W,za,Rr){let N=ncL(),d=ds(W.c,p),M=ncM(W),best=0;if(d>Rr+.008)return 0;
  if(d>.017){N.lobe.forEach((q,c)=>dS(dQs,M.p(q),.0014,kd(kc(HXH[c&3]),.8)));return 0}
  let X=W.wx;if(!X){X=W.wx=new Float32Array(N.X.length);for(let i=0;i<X.length;i+=3){let q=M.p([N.X[i],N.X[i+1],N.X[i+2]]);X[i]=q[0];X[i+1]=q[1];X[i+2]=q[2]}}
  let at=i=>[X[i*3],X[i*3+1],X[i*3+2]],on=new Uint8Array(N.R.length),pc=0,pcc=-1;
  N.R.forEach((r,ri)=>{let ca=at(r.i+1),col=kd(kc(HXH[r.c&3]),.9);
    if(za&&ds(ca,p)<.0068&&dQs.n<15200&&dQ.n<34000){on[ri]=1;for(let i=r.i;i<r.i+r.m;i++)dS(dQs,at(i),NCE[N.E[i]][0]*1e-4,ncCol(N.E[i],r.c));
      for(let i=0;i<r.b.length;i+=2)dCy(dQ,at(r.b[i]),at(r.b[i+1]),.11e-4,kd(ncCol('C',r.c),.75));let q=at(r.e),e=ds(q,p);if(!best||e<best.d)best={r,q,d:e,W}}
    else if(pcc==r.c&&dQ.n<35500)dCy(dQ,pc,ca,r.h?.00017:.00007,col);
    pc=ca;pcc=r.c});
  if(za){for(let i=0;i<N.C.length;i+=4)if(on[N.AR[N.C[i]]]){let a=at(N.C[i]),b=M.p([N.C[i+1]/100,N.C[i+2]/100,N.C[i+3]/100]);for(let j=1;j<4;j++)dS(dQs,lp(a,b,j/4),.085e-4,NTY)}
    for(let i=0;i<N.W.length;i+=7)if(on[N.AR[N.W[i]]]){let a=at(N.W[i]),w=M.p([N.W[i+1]/100,N.W[i+2]/100,N.W[i+3]/100]),b=M.p([N.W[i+4]/100,N.W[i+5]/100,N.W[i+6]/100]);dS(dQs,w,.26e-4,[1.5,.5,.45,1]);
      for(let j=1;j<3;j++)dS(dQs,lp(a,w,j/3),.07e-4,[.7,.95,1.6,1]),dS(dQs,lp(w,b,j/3),.07e-4,[.7,.95,1.6,1])}}
  return best}
// fiche d'un résidu d'histone
const NCX={'0_4':'Lysine 4 de H3 : triméthylée (H3K4me3) aux promoteurs actifs.','0_9':'Lysine 9 de H3 : acétylée sur la chromatine active, triméthylée (H3K9me3) dans l\'hétérochromatine, où HP1 la reconnaît.','0_10':'Sérine 10 de H3 : phosphorylée par Aurora B pendant la mitose.',
 '0_27':'Lysine 27 de H3 : acétylée aux enhancers et aux promoteurs actifs, triméthylée (H3K27me3) par PRC2 sur les gènes réprimés.','0_36':'Lysine 36 de H3 : triméthylée dans le corps des gènes transcrits.','0_79':'Lysine 79 de H3 : méthylée par DOT1L, sur la face du nucléosome et non sur une queue.',
 '1_16':'Lysine 16 de H4 : son acétylation (H4K16ac) gêne le contact de la queue de H4 avec le nucléosome voisin.'},
ncTl=r=>{let t=r.c&3,n=r.n;return t==0?n<38:t==1?n<25:t==2?n<14||n>118:n<29};
function ncI(o){let r=o.r,t=r.c&3,k=t+'_'+r.n,N=ncL(),s=NCA[r.a][LG];
  return['Histone '+NCT[t]+' · '+s+' '+r.n+(ncTl(r)?(LG?' (tail)':' (queue)'):''),
   (NCX[k]?NCX[k]+' ':'')+(N.rg[r.c+'_'+r.n]?'Cette arginine plonge dans le petit sillon de l\'ADN, là où il se tourne vers les histones. ':N.ct[N.AR[r.i]]?'Ce résidu touche directement l\'ADN (pointillés jaunes). ':'')
   +(ncTl(r)?'Il fait partie d\'une queue de l\'histone : un segment souple, riche en lysines et en arginines, qui dépasse du nucléosome et porte la plupart des marques. ':'Il fait partie du cœur replié de l\'histone, fait de trois hélices α. ')
   +'Les atomes sont ceux de la structure du nucléosome à 1,9 Å (histones de xénope, presque identiques aux histones humaines) ; les points rouges isolés sont des molécules d\'eau qui relient une histone à l\'ADN.']}
