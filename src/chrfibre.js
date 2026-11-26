// ================= la fibre de chromatine le long des chromosomes =================
// De loin, un chromosome est un tube (nucleus.js : un nœud par mégabase). Quand le vaisseau passe sous 300 nm près d'un tube, les deux mégabases voisines sont
// remplacées par leur chaîne de nucléosomes (chrOn → chrFib), que tout le reste sait déjà détailler : nucléosome et histones (nucleosome.js), ADN, atomes (nucleotides.js).
// La chaîne de chaque mégabase est tirée au hasard, mais toujours de la même façon (graine = chromosome et mégabase) :
//  - elle est découpée en domaines en boucle de 120 à 380 kb ; chaque boucle part d'un pied posé sur l'axe du tube et y revient (anneau de cohésine, deux CTCF) ;
//  - dans une boucle, la chaîne suit une courbe qui remplit un globule dont le rayon suit la taille du domaine (plus petit sur le X inactif) ;
//  - chaque unité (nucléosome et son ADN de liaison, 197 pb) est choisie parmi sept orientations, pour suivre la courbe sans traverser les nucléosomes déjà posés.
// Ce qui est réaliste : les tailles (nucléosome, pas de 197 pb, taille des domaines) et l'absence de fibre régulière de 30 nm. Le tracé lui-même et la position des boucles sont inventés.
// Les gènes, éléments régulateurs et îlots CpG de la fenêtre sont demandés à l'API UCSC (chrAn) : s'ils arrivent, la chaîne est recalculée avec ses couleurs et ses régions sans nucléosome.
const CHW=2;let chHi=0;
function chrMb(c,m,U,AN){let N=CN[c],P=N.p,n=P.length,g=wyG(c*131+m*7+3),X=t=>cat(P[max(0,m-1)],P[m],P[min(n-1,m+1)],P[min(n-1,m+2)],t),a=m*1e6,b=a+1e6,cc=TG.cc,ci=0,D=[],x=a,G=new Map,
   key=q=>floor(q[0]/.012)+'_'+floor(q[1]/.012)+'_'+floor(q[2]/.012),near=q=>{let s=0,i,j,k,l;for(i=-1;i<2;i++)for(j=-1;j<2;j++)for(k=-1;k<2;k++)if(l=G.get((floor(q[0]/.012)+i)+'_'+(floor(q[1]/.012)+j)+'_'+(floor(q[2]/.012)+k)))for(let o of l)ds(o,q)<.0108&&s++;return s};
  while(x<b){let s=120e3+g()*260e3|0;if(b-x-s<90e3)s=b-x;D.push([x,x+s]);x+=s}
  D=D.map(([ga,gb],d)=>{let fa=(ga-a)/1e6,fb=(gb-a)/1e6,B=X(fa),B1=X(fb),T=nm(sb(X(min(1,fa+.02)),X(max(0,fa-.02)))),r=.081*cbrt((gb-ga)/25e4)*(N.xi?.72:1),nu=(gb-ga)/197,n1=nu*.00105/r,h=[g()*TAU,g()*TAU,g()*TAU],
      C=ma(X((fa+fb)/2),rot(pp(T),T,g()*TAU),r*.85),L=f=>ad(C,ml([sin(TAU*n1*f+h[0]),sin(TAU*n1*1.31*f+h[1]),sin(TAU*n1*1.71*f+h[2])],r*.68));AN.push([B,T]);
    return{ga,gb,gd:f=>f<.07?lp(B,L(.07),ss(f/.07)):f<.9?L(f):f<.96?lp(L(.9),B,ss((f-.9)/.06)):lp(B,B1,(f-.96)/.04)}});
  let d=0,gd=q=>{while(D[d+1]&&q>=D[d].gb)d++;let o=D[d];return o.gd(cl((q-o.ga)/(o.gb-o.ga),0,1))},Pq=P[m],t=nm(sb(gd(a+2e3),Pq)),u=pp(t),k,B,o;x=a;
  while(x<b){while(cc[ci]&&cc[ci].e<=x)ci++;
    let e=cc[ci],gap=e?e.s-x:1e9,ty=gap>=147,nn=gap<=0?min(e.e,b)-x:ty?min(197,gap,b-x):min(gap,b-x),tg=b-x<2400?P[min(n-1,m+1)]:gd(x+nn),W={g:x,n:nn,cr:gap<=0?ci:-1,mb:m,dm:d};B=0;      // les derniers nucléosomes visent le nœud suivant
    for(k=0;k<9;k++){o=ty?{P:Pq,t,u:rot(u,t,(k+g())*TAU/9),ty:1}:{P:Pq,t:nm(ad(t,[(g()-.5)*1.2,(g()-.5)*1.2,(g()-.5)*1.2])),ty:0};if(!ty)o.u=pp(o.t);
      let w=ub(o,nn),c0=ty?ad(ma(Pq,o.u,RS),ml(cr(o.t,o.u),-.002)):ma(Pq,o.t,nn*.00017),s=-ds(w[0],tg)-(ty&&b-x>2400?near(c0)*.05:0);if(!B||s>B[0])B=[s,o,w,c0]}
    Object.assign(W,B[1]);W.c=B[3];W.f=fU(x,x+nn);U.push(W);if(ty){let h=key(W.c),l=G.get(h);l||G.set(h,l=[]);l.push(W.c)}
    Pq=B[2][0];t=B[2][1];u=ty?ml(B[2][2],-1):B[2][2];x+=nn}}
function chrFib(){let T=TG,U=[];T.AN=[];for(let m=T.ai;m<T.ai+T.aw;m++)chrMb(T.ac,m,U,T.AN);T.U=U;fibGeo();AT=0;dQ.n=0;$('lb').style.display=T.G.length?'flex':'none';$('lbm').style.display='none'}
async function chrAn(T){await new Promise(r=>setTimeout(r,800));if(TG!==T)return;
  try{let[x,y,w]=await Promise.all([trk('mane',T.c,T.a,T.b),trk('encodeCcreCombined',T.c,T.a,T.b),trk('cpgIslandExt',T.c,T.a,T.b)]);if(TG!==T)return;
    T.G=x.filter(v=>v.maneStat=='MANE Select').map(pM);T.cc=y.map(pC).sort((x,y)=>x.s-y.s);T.cp=w.map(v=>[v.chromStart,v.chromEnd,v.cpgNum]);T.main=T.G[0];T.an=1;chrFib();
    say('Annotations de cette région chargées : '+T.G.length+' gènes, '+T.cc.length+' éléments régulateurs. La chaîne est recolorée.',6)}catch(e){}}
function chrOn(c,i){let N=CN[c],n=N.p.length,ai=cl(i-1,0,max(0,n-1-CHW)),aw=min(CHW,n-1-ai),ci=N.ci,C=N.p[min(n-1,ai+1)],lab='chr'+cnm(ci)+' · '+ai+'–'+(ai+aw)+' Mb';if(aw<1)return;
  clr(Lkh);clr(Lkn);TG={lab,sub:'',c:'chr'+cnm(ci),s:ai*1e6,e:(ai+aw)*1e6,ci,a:ai*1e6,b:(ai+aw)*1e6,G:[],cc:[],cp:[],on:0,N:C,M:C,C,Rl:.14,auto:1,ac:c,ai,aw,ri:-1,xi:-1};SQC={};
  CHS=[c,ai,aw];drawChr(1);chrFib();POI[NP]=[lab,()=>TG.M];chrAn(TG);
  chHi||(chHi=1,say('Le chromosome se résout en sa chaîne de nucléosomes : un point par nucléosome, repliée en domaines en boucle. Rétrécissez encore : le nucléosome et ses histones, l\'ADN, puis les atomes.',11))}
function chrOff(){[Lq0,Lq0c,Lq1,Lq1h,Lq1c,Lqm].forEach(clr);TG=0;CHS=0;drawChr(1);AT=0;dQ.n=0;$('lb').style.display='none'}
// appelé par nvT : faut-il poser, déplacer ou retirer la fenêtre de chaîne ?
function chrT(){if(PM||AP||RX||NX||SX||reg<2||ORG||ct>=0)return;let au=TG&&TG.auto,b=0,i,j,k,l;
  if(au&&(z>.45||ds(p,TG.C)>1.2))return chrOff();if(TG.U&&!au&&ds(p,TG.C)<TG.Rl+.6||ln(p)<GR+.35)return;      // un locus choisi par le joueur, ou le locus détaillé du gène de la cellule : on n'y touche pas
  for(i=-1;i<2;i++)for(j=-1;j<2;j++)for(k=-1;k<2;k++)if(l=NH.get((floor(p[0]/.4)+i)+'_'+(floor(p[1]/.4)+j)+'_'+(floor(p[2]/.4)+k)))for(let o of l){let e=ds(o[2],p);if(!b||e<b[0])b=[e,o]}
  if(!b||z>.3||b[0]>.4)return;
  let[c,m]=b[1];if(au&&TG.ac==c&&m>=TG.ai&&m<=TG.ai+TG.aw)return;chrOn(c,m)}
// fiches propres à la chaîne : pied de boucle, domaine tant que le vaisseau est plus gros qu'un nucléosome, puis nucléosome (aussi dans un locus choisi par le joueur)
{const n0=nuI,cd=()=>{let T=TG,ci=T.ci;return['Chromosome '+cnm(ci)+' · '+T.ai+'–'+(T.ai+T.aw)+' Mb : la chaîne de nucléosomes',
   'Le tube s\'est résolu en sa chaîne de nucléosomes : chaque point est un nucléosome, soit environ 200 paires de bases. Ce n\'est pas une fibre régulière de 30 nm : dans le noyau, la chromatine est une chaîne désordonnée de 5 à 24 nm de diamètre, plus ou moins tassée (12 à 52 % du volume selon les endroits). Elle se replie en domaines en boucle de quelques centaines de kilobases (185 kb en médiane dans une lignée humaine), dont le pied est tenu par un anneau de cohésine (bleu) entre deux protéines CTCF. D\'une cellule à l\'autre, les limites de ces domaines varient. Ici, les tailles sont réalistes, mais le tracé de la chaîne et la place des boucles sont tirés au hasard. Rétrécissez pour voir un nucléosome.']},
  nc=W=>{let o=n0();return['Nucléosome · '+TG.c+':'+nf(W.g+1),'147 paires de bases d\'ADN enroulées autour de huit histones : deux exemplaires de H3 (bleu), H4 (vert), H2A (jaune) et H2B (rouge). On décrit classiquement 1,65 tour ; en suivant l\'axe de l\'ADN dans la structure à 1,9 Å utilisée ici, on en mesure près de 1,9. Chaque histone a un cœur de trois hélices et une queue souple qui dépasse du disque. La sphère violette est l\'histone de liaison H1, posée là où l\'ADN entre et sort (0,8 à 1 par nucléosome selon les mesures) : elle n\'est pas détaillée en atomes. Jusqu\'au nucléosome suivant, 30 à 60 paires de bases d\'ADN de liaison. Rétrécissez encore : sous 4,5 nm, les atomes apparaissent.'+(o?' '+o[0]+'.':'')]};
 nuI=()=>{let T=TG;if(T&&T.U&&!(AT&&AT.za)){if(T.auto){let a=T.AN.find(q=>ds(q[0],p)<.022+.5*z);if(a)return I.coh;if(z>.03&&T.nd<.2)return cd()}let W=T.U[T.ni];if(W&&W.ty&&z<.03&&T.nd<.012)return nc(W)}return n0()}}
