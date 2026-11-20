// ================= corps de Cajal : assemblage des snRNP à l'échelle moléculaire =================
// Mode guidé (drapeau SX, comme RX et NX) : huit étapes, de l'arrivée d'un snRNP U5 au tri-snRNP U4/U6·U5.
// Chaque ARN est dessiné nucléotide par nucléotide (teintes chaudes) ; chaque protéine est une sphère de sa couleur (teintes froides),
// de rayon proportionnel à la racine cubique de sa masse. Les structures secondaires sont schématiques : les longueurs sont exactes
// (U4 141 nt, U5 116 nt, U6 107 nt : Mabin et al., RNA 2021), le nombre de paires de bases est approché, le scaRNA U85 est abrégé.
// Unité de la scène : le nanomètre, dans un repère (X à droite, Y en haut, Z vers la caméra) posé dans le corps de Cajal au lancement.
const Lsx0=Ly(M2,1e9,0,{sx:1}),Lsx1=Ly(MD,1e9,0,{sx:1}),dSx0=dy(Lsx0,2400,[0,0,0],1),dSx1=dy(Lsx1,2400,[0,0,0],1),
CBS=NU.filter(o=>o.i=='cb').map(o=>o.a),
kc=h=>[(h>>16)/255,(h>>8&255)/255,(h&255)/255,1],kd=(c,k)=>[c[0]*k,c[1]*k,c[2]*k,1],kh=h=>'#'+('00000'+h.toString(16)).slice(-6),
SXR={U5:0xf28c28,U4:0xf2c230,U6:0xee5a44,sca:0xefe6c8},      // ARN
SXP={      // protéines : [masse en kDa, couleur] ; Sm en bleu, LSm en vert, U4/U6 en violet, U5 en rose, tri-snRNP en turquoise, scaRNP en vert-jaune et brun, facteurs d'assemblage en gris
 SmD1:[13,0x4f8ff0],SmD2:[13.5,0x62aaf5],SmF:[9.7,0x9ad7fa],SmE:[11,0x7ec3f7],SmG:[8.5,0x5a7de0],SmD3:[14,0x2f58b8],SmB:[24,0x3b6fd9],
 LSm4:[15,0x1fa187],LSm8:[10,0x63d6b4],LSm2:[11,0x2bb89a],LSm3:[12,0x159078],LSm6:[9,0x8fe3c8],LSm5:[10,0x0f7d68],LSm7:[12,0x45c9a6],
 SNU13:[14,0xc9b6ff],PRPF31:[55,0x8a5cf0],PRPF3:[77,0x6a3fd0],PRPF4:[58,0xa07be8],PPIH:[19,0xddd0ff],SART3:[110,0xaeb4bd],
 PRPF8:[274,0xd6537f],SNRNP200:[245,0xe87aa0],EFTUD2:[109,0xc44a9a],PRPF6:[107,0xf09cc0],SNRNP40:[39,0xb0407a],DDX23:[96,0xf5b8d0],TXNL4A:[17,0xa03a6a],CD2BP2:[38,0x9aa0a8],
 SART1:[90,0x35c4d6],USP39:[65,0x68d8e6],SNRNP27:[19,0x9ae6f0],
 FBL:[34,0xa6d94a],NOP56:[66,0x7fb83a],NOP58:[60,0xc3e67a],DKC1:[58,0xb58a5a],NOP10:[7.7,0xd0a87a],NHP2:[17,0x9c7447],GAR1:[22,0xe0c39e],WRAP53:[59,0x7d7f8c]},
SXN={SmB:'SmB/B′',FBL:'FBL (fibrillarine)',DKC1:'DKC1 (dyskérine)',WRAP53:'TCAB1 (WRAP53)',SNU13:'SNU13 (15.5K)'},      // noms affichés quand ils diffèrent du symbole
RSM=['SmD1','SmD2','SmF','SmE','SmG','SmD3','SmB'],RLS=['LSm2','LSm3','LSm6','LSm5','LSm7','LSm4','LSm8'],
sxr=n=>.066*cbrt(SXP[n][0]*1e3),      // rayon (nm) d'une protéine globulaire
// ---- construction des ARN (positions des nucléotides, en nm) ----
// hélice de type A : axe partant de P le long de d ; e : côté du brin montant ; segs : nombre de paires, ou [a,b] pour une boucle interne (a nt côté montant, b côté descendant) ;
// loop : nt de la boucle terminale (0 : hélice ouverte, formée par deux ARN). Rend A (brin montant), B (brin descendant, de bas en haut), L (boucle), pr (paires).
sxH=(P,d,e,segs,loop)=>{let f=cr(d,e),h=0,th=0,A=[],B=[],L=[],pr=[],rad=(a,k)=>ad(ml(e,cos(a)*.95*k),ml(f,sin(a)*.95*k));
  for(let s of segs){if(s.length){let[a,b]=s,hh=max(a,b,1)*.33,j,t;
      for(j=0;j<a;j++)t=(j+1)/(a+1),A.push(ad(ma(P,d,h+t*hh),rad(th+t*.5,1+.8*sin(PI*t))));
      for(j=0;j<b;j++)t=(j+1)/(b+1),B.push(ad(ma(P,d,h+t*hh),rad(th+2.5+t*.5,1+.8*sin(PI*t))));h+=hh;th+=.5}
    else for(let k=0;k<s;k++)pr.push([A.length,B.length]),A.push(ad(ma(P,d,h),rad(th,1))),B.push(ad(ma(P,d,h),rad(th+2.5,1))),h+=.28,th+=TAU/11}
  if(loop){let a=A[A.length-1],b=B[B.length-1],c=ma(P,d,h),w=ml(e,dt(sb(b,a),e)<0?-1:1),r=max(.85,(loop+2)*.55/TAU),p0=asin(.8/r),o=ma(c,d,r*cos(p0));        // boucle terminale : un anneau dans le plan (d, e), pour rester lisible de face
    for(let j=0;j<loop;j++){let g=p0+(TAU-2*p0)*(j+1)/(loop+1);L.push(ad(ma(o,d,-r*cos(g)),ml(w,-r*sin(g))))}}
  return{A,B,L,pr}},
sxHn=h=>h.A.concat(h.L,h.B.slice().reverse()),                                                    // nucléotides d'une tige-boucle, de 5′ en 3′
sxHp=(h,b)=>h.pr.map(([i,j])=>[b+i,b+h.A.length+h.L.length+h.B.length-1-j]),                      // ses paires, numérotées à partir de b
sxG=(a,b,n,w)=>{let c=ds(a,b),l=(n+1)*.55,h=l>c?sqrt(l*l-c*c)*.45:0,o=[];for(let j=0;j<n;j++){let t=(j+1)/(n+1);o.push(ma(lp(a,b,t),w,h*sin(PI*t)))}return o},      // brin simple de n nt entre a et b, bombé vers w
sxT=(a,d,n)=>{let o=[];for(let j=0;j<n;j++)o.push(ma(a,d,.55*(j+1)));return o},                    // brin simple droit
// snRNA U5 (116 nt) : tige 1 (trois hélices, deux boucles internes) coiffée de la boucle 1 (nt 36–46), site Sm, tige-boucle 3′
mU5=(()=>{let h=sxH([0,0,0],[0,1,0],[-1,0,0],[8,[4,4],8,[5,6],8],11),P=[[-2.1,-.6,0],[-1.5,-.2,0]].concat(sxHn(h)),i;
  for(i=0;i<4;i++)P.push([1.6+i*.95,-.2,.8+i*.55]);for(i=0;i<9;i++)P.push([5.2,0,2.2-i*.55]);P.push([6.4,-.2,-2.8],[7.6,-.2,-3]);        // le brin passe devant l'anneau Sm, le traverse (site Sm, nt 85–93) et ressort derrière
  let g=sxH([10.6,0,-3],[0,1,0],[-1,0,0],[8],4);P=P.concat(sxHn(g),[[12.3,-.7,-3]]);return{P,pr:sxHp(h,2).concat(sxHp(g,95))}})(),
// snRNA U4 (141 nt) et U6 (107 nt) appariés : la tige II (à gauche), la tige-boucle 5′ de U4 (en haut) et la tige I (à droite) partent d'une même jonction, à l'origine
mDi=(()=>{let s2=sxH([-1.5,0,0],[-1,0,0],[0,1,0],[16],0),s1=sxH([1.5,0,0],[1,0,0],[0,-1,0],[8],0),sl=sxH([0,1.5,0],[0,1,0],[-1,0,0],[6,[5,2],4],5),
   t3=sxH([8,-6,0],[0,-1,0],[-1,0,0],[13],7),t4=sxH([17.4,-6,-3],[0,-1,0],[-1,0,0],[4],5),u5=sxH([20,.6,0],[1,0,0],[0,-1,0],[7],6),U4=[],U6,i,tl;
  for(i=0;i<16;i++)U4.push(s2.B[15-i]);                                                             // nt 1–16 : brin de la tige II
  U4=U4.concat(sxG(U4[15],sl.A[0],3,[-.7,.7,0]),sxHn(sl));                                          // nt 17–19, puis tige-boucle 5′ (20–51) et son coude en K
  U4=U4.concat(sxG(sl.B[0],s1.A[0],4,[.7,.7,0]),s1.A);                                              // nt 52–55, puis brin de la tige I (56–63)
  U4=U4.concat(sxG(s1.A[7],t3.A[0],17,[-.6,-.8,0]),sxHn(t3));                                       // région centrale (64–80), tige-boucle 3′ (81–113)
  for(i=0;i<4;i++)U4.push([9.2+i*.95,-6,.3+i*.6]);for(i=0;i<9;i++)U4.push([12.9,-6,2.2-i*.55]);     // nt 114–117, puis site Sm (118–126) à travers l'anneau
  U4.push([14.1,-6,-2.8],[15.3,-6,-3]);U4=U4.concat(sxHn(t4));                                      // tige-boucle terminale (129–141)
  U6=sxHn(u5);U6=U6.concat(sxG(u5.B[0],s1.B[7],32,[.2,1,0]),s1.B.slice().reverse());                // U6 : tige-boucle 5′ (1–20), brin libre avec ACAGAGA (21–52), brin de la tige I (53–60)
  U6=U6.concat(sxG(s1.B[0],s2.A[0],4,[0,-1,0]),s2.A);tl=sxT(s2.A[15],[-.8,.6,0],18).map((q,j)=>[q[0],q[1],j>12?(j-12)*.48:q[2]]);U6=U6.concat(tl);       // nt 61–64, brin de la tige II (65–80), queue 3′ (81–98)
  for(i=0;i<9;i++)U6.push([tl[17][0]-.9,tl[17][1]+.65,2.2-i*.55]);                                  // ses neuf dernières uridines traversent l'anneau LSm
  let x2=[],x1=[];for(i=0;i<16;i++)x2.push([15-i,64+i]);for(i=0;i<8;i++)x1.push([55+i,59-i]);
  return{U4,U6,p4:sxHp(sl,19).concat(sxHp(t3,80),sxHp(t4,128)),p6:sxHp(u5,0),x:x2.concat(x1)}})(),
// snRNA U6 seul : sa région centrale se replie en tige-boucle interne
mU6=(()=>{let a=sxH([0,0,0],[0,1,0],[-1,0,0],[7],6),b=sxH([10.5,0,0],[0,1,0],[-1,0,0],[14],6),P=sxHn(a);
  P=P.concat(sxG(a.B[0],b.A[0],32,[0,-1,0]),sxHn(b));let tl=sxT(b.B[0],[1,0,0],12).map((q,j)=>[q[0],q[1],j>6?(j-6)*.48:q[2]]);P=P.concat(tl);
  for(let i=0;i<9;i++)P.push([tl[11][0]+1.1,tl[11][1],2.2-i*.55]);return{P,pr:sxHp(a,0).concat(sxHp(b,52))}})(),
// scaRNA U85, abrégé : domaine C/D (tige terminale ; boîte C, guide et boîte D dans la boucle) puis domaine H/ACA (deux tiges-boucles à poche, boîte H entre les deux, ACA au bout).
// k : repères [début, fin[ des régions mises en valeur
mSc=(()=>{let c=sxH([0,0,0],[-1,0,0],[0,1,0],[5],26),h1=sxH([3,12,0],[-1,0,0],[0,-1,0],[6,[6,6],5],8),h2=sxH([8.5,13.5,0],[1,0,0],[0,-1,0],[6,[6,6],5],6),P=sxHn(c),a,b;
  P=P.concat(sxG(c.B[0],h1.A[0],16,[1,.2,0]));a=P.length;P=P.concat(sxHn(h1),sxG(h1.B[0],h2.A[0],5,[0,1,0]));b=P.length;P=P.concat(sxHn(h2),sxT(h2.B[0],[.3,1,0],5));
  return{P,pr:sxHp(c,0).concat(sxHp(h1,a),sxHp(h2,b)),a,k:{C:[5,11],g:[11,23],D:[23,27],po:[a+6,a+12],cab:[a+19,a+23],H:[a+42,a+47],aca:[b+41,b+44]}}})(),
sxE=(q,S)=>{let c=cos(S[2]),s=sin(S[2]);return[S[0]+q[0]*c-q[1]*s,S[1]+q[0]*s+q[1]*c,q[2]]},      // pose d'une particule : [x, y, rotation autour de Z]
sxLp=(A,B,t)=>[A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t,A[2]+(B[2]-A[2])*t],
sxW=q=>{let M=SX;return ad(M.O,ad(ad(ml(M.X,q[0]*1e-3),ml(M.Y,q[1]*1e-3)),ml(M.Z,q[2]*1e-3)))},  // scène (nm) → monde (µm)
sxA=(a,s,w=.16)=>cl((a-s)/w,0,1),                                                                  // avancement d'un événement dans la boucle d'animation
sxL=(q,s,c)=>{let l=QL[nxl],v=sb(q,E),w=dt(v,vf);if(!l||w<=0)return;nxl++;l.style.display='';l.className=c?'ql '+c:'ql';l.textContent!=s&&(l.textContent=s);l.style.left=fx*dt(v,vr)/w*50+50+'%';l.style.top=50-fy*dt(v,vu)/w*50+'%'},
// ---- dessin ----
// un ARN : squelette en tubes, une bille par nucléotide, barreaux pour les paires ; hi : nucléotides mis en valeur {indice: [couleur, rayon]}
sxD1=(P,pr,hex,hi)=>{let col=kc(hex),bk=kd(col,.62),ru=[.8,.8,.74,1],W=P.map(sxW),i,h;
  for(i=0;i<W.length;i++)i&&dT(dSx1,W[i-1],W[i],.0002,bk),h=hi&&hi[i],dS(dSx0,W[i],h?h[1]*1e-3:.00033,h?h[0]:col);
  for(let[a,b]of pr)dT(dSx1,W[a],W[b],.0001,ru);return W},
// une protéine en q (nm). g : 0 absente, 0–1 en approche depuis la direction v, 1 en place, 1–2 en partance
sxD2=(n,q,g,v,lab)=>{if(!(g>0)||g>=2)return;let k=g<1?(1-ss(g))*16:ss(g-1)*24,w=sxW(k?ma(q,v||[0,1,0],k):q),r=sxr(n)*1e-3;dS(dSx0,w,r,kc(SXP[n][1]));lab===0||sxL(ma(w,vu,r*1.05+.0006),SXN[n]||n);return w},
// un anneau de sept protéines centré en C, face à la caméra de départ (le brin le traverse le long de Z) ; lab : nom de chaque protéine, sinon nom de l'anneau
sxD3=(names,C,lab,nm0)=>{names.forEach((n,i)=>{let f=PI/2-i*TAU/7;sxD2(n,[C[0]+cos(f)*3,C[1]+sin(f)*3,C[2]],1,0,lab?1:0)});lab||sxL(sxW([C[0],C[1]+5.2,C[2]]),nm0)},
sxCap=(q,hex,s)=>{let w=sxW(q);dS(dSx0,w,.00055,kc(hex));s&&sxL(ma(w,vu,-.0011),s,'r')},
// ---- les particules ----
HI5=(m,p)=>{let o={};for(let i=84;i<93;i++)o[i]=[[1,.82,.55,1],.36];if(m)o[44]=[[.55,1,.3,1],.6];if(p)o[45]=[[.3,.95,1,1],.6];return o},
// snRNP U5 : S pose, o = {m, p : C45 méthylée, U46 isomérisée ; sm : noms des Sm ; pr : {nom: g} protéines propres}
sxU5=(S,o)=>{let P=mU5.P.map(q=>sxE(q,S)),W=sxD1(P,mU5.pr,SXR.U5,HI5(o.m,o.p)),e=x=>sxE(x,S),g=o.pr||{},v=(x,y)=>nm(sxE([x,y,0],[0,0,S[2]]));
  sxCap(e([-2.9,-1,0]),0xff4fd8,o.q?0:'coiffe m³G');sxD3(RSM,P[88],o.sm,'anneau Sm');o.sm&&sxL(ma(W[88],vu,-.0058),'site Sm, au centre de l\'anneau','r');sxL(ma(W[0],vu,-.0024),'snRNA U5','e');
  o.l1&&sxL(ma(W[40],vu,.0012),'boucle 1','r');o.m&&!o.q&&sxL(ma(W[44],vr,.0016),'Cm45','r');o.p&&!o.q&&sxL(ma(W[45],vr,.0016),'Ψ46','r');
  sxD2('PRPF8',e([-4.9,9.6,0]),g.PRPF8,v(-1,.3));sxD2('EFTUD2',e([4.2,7.6,.5]),g.EFTUD2,v(-1,.3));sxD2('SNRNP200',e([-10.6,16.3,0]),g.SNRNP200,v(-1,.3));
  sxD2('SNRNP40',e([7.9,11.6,0]),g.SNRNP40,v(1,.6));sxD2('PRPF6',e([-7.5,2.3,0]),g.PRPF6,v(-1,-.5));sxD2('DDX23',e([-1.2,17.2,0]),g.DDX23,v(.2,1));
  sxD2('TXNL4A',e([3,13.2,0]),g.TXNL4A,v(1,1));sxD2('CD2BP2',e([-12.3,5.6,0]),g.CD2BP2,v(-1,-.2));return{P,W}},
// scaRNP U85 : o = {cd, ha : protéines des deux domaines, 1 nommées, 2 sans nom}. Dans le repère de la particule, le guide C/D est à gauche (x ≈ −6), la poche H/ACA en haut (x ≈ 0,3 ; y ≈ 13,7)
sxSc=(S,o)=>{let P=mSc.P.map(q=>sxE(q,S)),hi={},K=mSc.k,i,e=x=>sxE(x,S),m=(r,c,w)=>{for(i=r[0];i<r[1];i++)hi[i]=[c,w]};
  m(K.C,[1,.75,.4,1],.4);m(K.g,[1,1,1,1],.36);m(K.D,[1,.75,.4,1],.4);m(K.po,[1,1,1,1],.36);m(K.cab,[.7,.8,1,1],.4);m(K.H,[1,.6,.6,1],.4);m(K.aca,[1,.6,.6,1],.4);
  let W=sxD1(P,mSc.pr,SXR.sca,hi);sxL(ma(W[33],vu,-.0022),'scaRNA U85','e');sxL(ma(W[8],vu,.0012),'boîte C','r');sxL(ma(W[25],vu,-.0012),'boîte D','r');sxL(ma(W[K.H[0]+2],vu,.0014),'boîte H','r');sxL(ma(W[K.cab[0]+1],vu,.0016),'boîte CAB','r');sxL(ma(W[K.aca[0]+1],vr,.0018),'ACA','r');
  let c=o.cd>1?0:1,h=o.ha>1?0:1;
  if(o.cd){sxD2('FBL',e([-6,5.6,0]),1,0,c);sxD2('FBL',e([-4.6,-5.8,0]),1,0,0);sxD2('NOP58',e([-1,5.9,0]),1,0,c);sxD2('NOP56',e([-.4,-5.9,0]),1,0,c);sxD2('SNU13',e([1.6,-.2,2.4]),1,0,c)}
  if(o.ha){sxD2('DKC1',e([.3,12,-3]),1,0,h);sxD2('GAR1',e([-2.4,8.9,-1.5]),1,0,h);sxD2('NOP10',e([2.7,9.3,-1.5]),1,0,h);sxD2('NHP2',e([-4.4,14.9,-1]),1,0,h);sxD2('WRAP53',e([-8.3,12,0]),1,0,h);
    sxD2('DKC1',e([11.2,13.5,-3]),1,0,0);sxD2('GAR1',e([13.8,10.4,-1.5]),1,0,0);sxD2('NOP10',e([9.2,10.6,-1.5]),1,0,0);sxD2('NHP2',e([15.6,16.3,-1]),1,0,0)}
  return{P,W}},
// snRNP U4 et U6 dans le repère du di-snRNP. o = {u6 : 0 absent, entre 0 et 1 en cours d'appariement, 1 apparié ; S6 : pose de U6 seul ; pr ; sm ; ls}
HI4=(()=>{let o={},i;for(i=117;i<126;i++)o[i]=[[1,.93,.6,1],.36];for(i=25;i<30;i++)o[i]=[[1,1,.85,1],.38];for(i=43;i<45;i++)o[i]=[[1,1,.85,1],.38];return o})(),
HI6=(()=>{let o={},i;for(i=40;i<47;i++)o[i]=[[1,.85,.8,1],.4];return o})(),
sxDi=o=>{let g=o.pr||{},W4=sxD1(mDi.U4,mDi.p4,SXR.U4,HI4),P6,W6;
  sxCap(ad(mDi.U4[0],[-.9,-.6,0]),0xff4fd8,o.q?0:'coiffe m³G');sxD3(RSM,mDi.U4[121],o.sm,'anneau Sm');sxL(ma(W4[96],vu,-.0022),'snRNA U4','e');
  o.kt&&sxL(ma(W4[27],vr,-.002),'coude en K','r');o.fr&&(sxL(ma(W4[7],vu,.0016),'brin de la tige II','r'),sxL(ma(W4[59],vu,-.0016),'brin de la tige I','r'));
  sxD2('SNU13',[2.7,3.4,0],g.SNU13,[1,.2,0]);sxD2('PRPF31',[3.3,7.6,0],g.PRPF31,[.6,1,0]);
  if(o.u6){let t=ss(o.u6);P6=mU6.P.map((q,i)=>sxLp(sxE(q,o.S6),mDi.U6[i],t));W6=sxD1(P6,t<.5?mU6.pr:mDi.p6,SXR.U6,HI6);
    if(t>.7)for(let[a,b]of mDi.x)dT(dSx1,W4[a],W6[b],.0001,[.8,.8,.74,1]);
    sxCap(ad(P6[0],[.3,-1,0]),0x4fe0ff,o.q?0:'coiffe γ-méthyle');sxD3(RLS,P6[102],o.ls,'anneau LSm2–8');sxL(ma(W6[30],vu,-.002),'snRNA U6','e');o.q||sxL(ma(W6[43],vu,.0014),'ACAGAGA','r');
    t>.95&&!o.q&&(sxL(sxW([-3.5,2,0]),'tige II','r'),sxL(sxW([2.6,-2,0]),'tige I','r'));
    sxD2('SART3',sxLp(sxE([11.8,8.4,0],o.S6),[-10.6,1.6,0],t),g.SART3,[-.6,1,0]);
    sxD2('PRPF3',[-4.2,-4.5,0],g.PRPF3,[-.3,-1,0]);sxD2('PRPF4',[-9.2,-6.3,0],g.PRPF4,[-.3,-1,0]);sxD2('PPIH',[-13.1,-8,0],g.PPIH,[-.3,-1,0])}
  return{W4,W6}},
// ---- les huit étapes : T durée de la boucle (s), z taille de la vue, c point visé (nm), leg légende, d(a) dessin ----
SXT=[['Un snRNP U5 revient du cytoplasme','corps de Cajal','Le snRNA U5 (116 nucléotides, orange) a été transcrit par l\'ARN polymérase II, puis exporté. Dans le cytoplasme, le complexe SMN a refermé autour de son site Sm, une suite d\'uridines, un anneau de sept protéines Sm rangées dans l\'ordre D1–D2–F–E–G–D3–B ; l\'enzyme TGS1 a ensuite hyperméthylé sa coiffe en triméthylguanosine (m³G, rose vif). Ces deux marques sont le signal de retour : la snurportine 1 et l\'importine β ramènent la particule dans le noyau, où elle fait d\'abord étape dans le corps de Cajal. C\'est là que ses nucléotides vont être retouchés.'],
 ['Méthylation d\'un ribose par un scaRNP à boîtes C/D','corps de Cajal','Le scaRNA U85 (crème, dessin abrégé) est un guide double. Son domaine à boîtes C/D s\'apparie à la boucle 1 de U5 et place la fibrillarine devant la cytosine 45 : un groupe méthyle passe de la S-adénosylméthionine au 2′-OH du ribose, qui devient Cm45. La fibrillarine travaille avec NOP56, NOP58 et SNU13, qui reconnaît le coude formé par les boîtes C et D.'],
 ['Pseudouridylation par le domaine H/ACA','corps de Cajal','Le domaine H/ACA du même scaRNA forme une poche d\'appariement autour de l\'uridine voisine, U46. La dyskérine détache la base, la retourne et la rattache par son carbone 5 : c\'est une pseudouridine (Ψ46), qui offre une liaison hydrogène de plus. La dyskérine travaille avec NOP10, NHP2 et GAR1. La boîte CAB, lue par TCAB1 (WRAP53), retient le scaRNP dans le corps de Cajal. La boucle 1 ainsi retouchée tiendra les deux exons dans le spliceosome.'],
 ['Le snRNP U5 se complète','corps de Cajal','Les protéines propres à U5 rejoignent le cœur de la particule : PRPF8, la plus grande protéine du spliceosome (274 kDa), et la GTPase EFTUD2 (Snu114), préassemblées dans le cytoplasme avec l\'aide des chaperons HSP90 et R2TP ; l\'hélicase SNRNP200 (Brr2) les rejoint dans le noyau ; puis SNRNP40, PRPF6, DDX23 (Prp28), TXNL4A (Dim1) et CD2BP2. Le snRNP U5 de 20S est prêt.'],
 ['Le snRNP U4','corps de Cajal','Le snRNA U4 (141 nucléotides, doré) est revenu du cytoplasme avec son anneau Sm et sa coiffe triméthylée, lui aussi. SNU13 (15.5K) se fixe la première, sur le coude en K de la tige-boucle 5′ ; sans elle, ni PRPF31 (61K), qui arrive ensuite, ni plus tard le complexe PRPF3–PRPF4–PPIH ne peuvent se lier. Deux brins de U4 restent libres : ils attendent U6.'],
 ['Le snRNP U6','corps de Cajal','Le snRNA U6 (107 nucléotides, corail) n\'est jamais sorti du noyau : transcrit par l\'ARN polymérase III, il porte une coiffe γ-monométhyl-phosphate (bleu clair) ; ses nucléotides ont été retouchés par des snoARN, vraisemblablement lors d\'un passage par le nucléole. Sa queue d\'uridines traverse l\'anneau LSm2–8, cousin de l\'anneau Sm. Seul, U6 replie sa région centrale en une tige-boucle interne. SART3 (p110, l\'équivalent de Prp24 chez la levure) s\'y fixe. La séquence ACAGAGA lira plus tard le site donneur de l\'intron.'],
 ['U4 et U6 s\'apparient : le di-snRNP','corps de Cajal','SART3 rapproche les deux particules. La tige-boucle interne de U6 s\'ouvre et ses brins s\'apparient à ceux de U4 en deux hélices, la tige II et la tige I, de part et d\'autre de la tige-boucle 5′ de U4. Ainsi appariée, U6 reste inactive jusqu\'au spliceosome. Le complexe PRPF3–PRPF4–PPIH vient ensuite se fixer sur le duplex, du côté de la tige II.'],
 ['Le tri-snRNP U4/U6·U5','corps de Cajal','Le snRNP U5 s\'arrime au di-snRNP : PRPF6 fait le pont en touchant PRPF31. Trois protéines propres au tri-snRNP s\'ajoutent, SART1 (Snu66), USP39 (Sad1) et SNRNP27. SART3 et CD2BP2 repartent servir à un autre tour. La particule (≈ 1,8 MDa : trois ARN et une trentaine de protéines) quitte le corps de Cajal pour les speckles et les gènes en cours de transcription. Après chaque épissage, U4, U5 et U6 se séparent et reviennent ici se réassembler.']],
SXS=[
 {T:9,z:.0062,c:[3.5,5.5],leg:['U5'].concat(RSM),d:a=>{sxU5([-(1-ss(sxA(a,.02,.4)))*30,0,0],{sm:1,l1:1})}},
 {T:12,z:.0145,c:[8.5,11],leg:['U5','sca','FBL','NOP56','NOP58','SNU13'],d:a=>{let g=sxA(a,.62,.2),u=sxU5([0,0,0],{m:g>=1,l1:1}),S=[mU5.P[44][0]+7.1+(1-ss(sxA(a,.03,.3)))*26,mU5.P[44][1]+2.96,.5],s=sxSc(S,{cd:1,ha:2});        // particule inclinée : son guide touche la boucle 1, le reste s'écarte de l'anneau Sm
   if(a>.4)for(let k=0;k<5;k++)dT(dSx1,s.W[15+k],u.W[46-k],.0001,[.8,.8,.74,1]);
   if(a>.5&&g<1){let q=sxLp(sxE([-6,5.6,0],S),u.P[44],ss(g));dS(dSx0,sxW(q),.0005,[.6,1,.3,1]);sxL(ma(sxW(q),vu,.0012),'CH₃','r')}
   a>.45&&sxL(sxW(sxE([-9.2,7.6,0],S)),g<1?'SAM (donneur de méthyle)':'SAH','r')}},
 {T:12,z:.0125,c:[3,13],leg:['U5','sca','DKC1','NOP10','NHP2','GAR1','WRAP53'],d:a=>{let t=ss(sxA(a,.03,.32)),g=sxA(a,.55,.2),A=[mU5.P[44][0]+7.1,mU5.P[44][1]+2.96,.5],B=[mU5.P[45][0]+2.1,mU5.P[45][1]+14.9,PI],S=sxLp(A,B,t),u=sxU5([0,0,0],{m:1,p:g>.5}),s=sxSc(S,{cd:2,ha:1}),K=mSc.k.po[0];
   if(t>=1)for(let k=0;k<3;k++)dT(dSx1,s.W[K+k],u.W[49-k],.0001,[.8,.8,.74,1]),dT(dSx1,s.W[K+3+k],u.W[43-k],.0001,[.8,.8,.74,1]);        // la poche s'apparie de part et d'autre de U46
   if(g>0&&g<1){dS(dSx0,sxW(ma(u.P[45],[.8,.55,.3],sin(PI*g)*1.6)),.00055,[.3,.95,1,1]);sxL(sxW(ma(u.P[45],[1,-.4,0],3.4)),'rotation de la base','r')}}},
 {T:13,z:.0105,c:[-1,8.5],leg:['U5'].concat('PRPF8,EFTUD2,SNRNP200,SNRNP40,PRPF6,DDX23,TXNL4A,CD2BP2'.split(',')),d:a=>{let t=sxA(a,.04,.22);
   sxU5([0,0,0],{m:1,p:1,pr:{PRPF8:t,EFTUD2:t,SNRNP200:sxA(a,.24),SNRNP40:sxA(a,.34),PRPF6:sxA(a,.4),DDX23:sxA(a,.5),TXNL4A:sxA(a,.6),CD2BP2:sxA(a,.7)}})}},
 {T:11,z:.0098,c:[5.5,-1.5],leg:['U4'].concat(RSM,['SNU13','PRPF31']),d:a=>{sxDi({sm:1,kt:1,fr:1,pr:{SNU13:sxA(a,.12,.2),PRPF31:sxA(a,.45,.2)}})}},
 {T:10,z:.0092,c:[0,-.5],leg:['U6'].concat(RLS,['SART3']),d:a=>{let S=[-11,-1,0],P=mU6.P.map(q=>sxE(q,S)),W=sxD1(P,mU6.pr,SXR.U6,HI6);
   sxCap(ad(P[0],[-.6,-1,0]),0x4fe0ff,'coiffe γ-méthyle');sxD3(RLS,P[102],1);sxL(ma(W[30],vu,-.002),'snRNA U6','e');sxL(ma(W[43],vu,-.0016),'ACAGAGA','r');sxL(ma(W[68],vr,-.003),'tige-boucle interne','r');sxL(ma(W[96],vu,-.0016),'queue d\'uridines','r');
   sxD2('SART3',sxE([11.8,8.4,0],S),sxA(a,.2,.3),[.4,1,0])}},
 {T:14,z:.0125,c:[1.5,-.5],leg:['U4','U6','SNU13','PRPF31','SART3','PRPF3','PRPF4','PPIH'],d:a=>{let t=sxA(a,.25,.3),k=1-ss(sxA(a,.03,.2));
   sxDi({u6:max(t,.001),S6:[-36-k*14,9,0],kt:t<1,fr:t<=0,pr:{SNU13:1,PRPF31:1,SART3:1,PRPF3:sxA(a,.62),PRPF4:sxA(a,.66),PPIH:sxA(a,.7)}})}},
 {T:15,z:.0165,c:[5.5,7],leg:['U4','U6','U5','PRPF6','PRPF31','SART1','USP39','SNRNP27','SART3','CD2BP2'],d:a=>{let k=(1-ss(sxA(a,.05,.3)))*30,o=1+sxA(a,.62,.25);
   sxDi({u6:1,q:1,S6:[0,0,0],pr:{SNU13:1,PRPF31:1,SART3:o,PRPF3:1,PRPF4:1,PPIH:1}});
   sxU5([15.8+k,7.8+k*.5,0],{m:1,p:1,q:1,pr:{PRPF8:1,EFTUD2:1,SNRNP200:1,SNRNP40:1,PRPF6:1,DDX23:1,TXNL4A:1,CD2BP2:o}});
   sxD2('SART1',[1,12.6,0],sxA(a,.42),[-.3,1,0]);sxD2('USP39',[-4.7,11.4,0],sxA(a,.48),[-.6,1,0]);sxD2('SNRNP27',[-8.6,8.4,0],sxA(a,.54),[-1,.6,0])}}];
let SXK=[],sxHi=0,hxHi=0;      // blocs de décor masqués pendant le mode ; conseil déjà affiché
// ---- moteur commun aux vues guidées à l'échelle du nanomètre. Une vue (SXQ[clé]) fournit : S étapes {T, z, c, leg, d(a), k, h}, T textes [titre, lieu, texte],
// ti titre, in texte d'accueil, su texte du bilan, sc et sz cadrage du bilan, sd dessin du bilan, o() origine de la scène, solo : 1 pour masquer tout le décor ----
const SXQ={sn:{S:SXS,T:SXT,ti:'Assemblage des snRNP',
 in:'Huit étapes à l\'échelle du nanomètre : un snRNP U5 revient du cytoplasme, deux de ses nucléotides sont retouchés par un scaRNP, puis U4, U6 et U5 sont réunis en tri-snRNP, la pièce que le spliceosome attend. Les ARN sont dessinés nucléotide par nucléotide, en teintes chaudes ; chaque protéine est une sphère de sa couleur, en teintes froides, d\'autant plus grosse que la protéine est lourde. Glissez pour tourner autour de la scène, molette ou pincement pour zoomer. Les repliements des ARN sont schématiques.',
 su:'En réunissant snRNP, scaRNP et facteurs d\'assemblage dans un petit volume, le corps de Cajal accélère chaque rencontre. Bilan : trois ARN (U4, U5, U6), deux anneaux Sm, un anneau LSm et une trentaine de protéines forment le tri-snRNP, qui apporte au spliceosome son cœur catalytique. Des variants de PRPF3, PRPF4, PRPF6, PRPF8, PRPF31 ou SNRNP200 causent des rétinites pigmentaires dominantes ; ceux de RNU4-2, le gène du snRNA U4, un trouble du neurodéveloppement.',
 sc:[5.5,7],sz:.018,sd:()=>{sxDi({u6:1,q:1,S6:[0,0,0],pr:{SNU13:1,PRPF31:1,PRPF3:1,PRPF4:1,PPIH:1}});sxU5([15.8,7.8,0],{m:1,p:1,q:1,pr:{PRPF8:1,EFTUD2:1,SNRNP200:1,SNRNP40:1,PRPF6:1,DDX23:1,TXNL4A:1}});sxD2('SART1',[1,12.6,0],1);sxD2('USP39',[-4.7,11.4,0],1);sxD2('SNRNP27',[-8.6,8.4,0],1)},
 o:()=>{let C=CBS.reduce((a,b)=>ds(a,p)<ds(b,p)?a:b),O=ds(p,C)<.14?p.slice():ma(C,nm(sb(p,C)),.12);SXK=Lnb.ch.concat(Lnbc.ch).filter(h=>h.A>0&&ds(h.c,O)<h.r+.1);return O}}},        // dans le corps de Cajal ; ses billes voisines s'effacent
sxLg=k=>k.pop?k:[SXR[k]?(k=='sca'?'scaRNA U85':'snRNA '+k):SXN[k]||k,kh(SXR[k]||SXP[k][1])];      // entrée de légende : clé d'un ARN ou d'une protéine, ou [nom, couleur]

function sxN(k){let M=SX,Q=M.Q,n=Q.S.length;M.st=cl(M.st+k,0,n);$('pm').scrollTop=0;M.t=0;M.pz=0;M.ta=0;M.yaw=M.pit=0;let S=Q.S[M.st],T=Q.T[M.st],w=innerWidth<innerHeight?1.35:1;        // écran en hauteur : vue un peu plus large
  if(!S){M.Ct=sxW([Q.sc[0],Q.sc[1],0]);M.zt=Q.sz*w;$('pmt').textContent=Q.ti+' — bilan';$('pmx').textContent=Q.su;
    $('pmo').innerHTML=rxBtn('Rejouer','Sr')+rxBtn('Sommaire','Sm')+rxBtn('Terminer','Sq');return}
  M.Ct=sxW([S.c[0],S.c[1],S.c[2]||0]);M.zt=S.z*w;
  $('pmt').textContent=(M.st+1)+'/'+n+' · '+T[0];$('pmx').textContent=T[2];{let b=document.createElement('b');b.className='pw';b.textContent='◎ '+T[1]+' — ';$('pmx').prepend(b)}
  {let l=document.createElement('span');l.className='sxl';l.innerHTML=S.leg.map(sxLg).map(([t,c])=>'<span><i style="background:'+c+'"></i>'+esc(t)+'</span>').join('');$('pmx').append(l)}
  mgSx(M.q,S.k);
  $('pmo').innerHTML=rxBtn('⏸ Pause','Sz')+(M.st?rxBtn('◂ Précédent','Sb'):'')+rxBtn('Suivant ▸','Sn')+rxBtn('Sommaire','Sm')+rxBtn('Quitter','Sq')}
function sxGo(q){let Q=SXQ[q],X=nm(cr(f,u)),O;AP=0;SXK=[];O=Q.o();document.body.classList.add('rx');
  SX={q,Q,solo:Q.solo,st:-1,t:0,ta:0,yaw:0,pit:0,O,X,Y:cr(X,f),Z:ml(f,-1),Cc:p.slice(),Ct:O,fb:f.slice(),ub:cr(X,f),p0:p,fs:f,us:u,z0:z,zt:0,zx:.09,pz:0};vel=0;
  cap.style.opacity=0;shp.forEach(h=>h.A=0);SXK.forEach(h=>h.A=0);        // le vaisseau s'efface
  $('hl').style.display=mk.style.display='none';for(let k of['ent','pmb','xit','gui','bld','tcy','rxb','nxb','hr'])$(k).style.display='none';
  $('pm').style.display='block';$('pm').classList.remove('mn');$('pmc').style.display='none';sxN(1)}
function sxEnd(){let M=SX;document.body.classList.remove('rx');z=M.z0;p=M.p0;f=M.fs;u=M.us;SX=0;dSx0.n=dSx1.n=0;QL.forEach(e=>e.style.display='none');shp.forEach(h=>h.A=1);SXK.forEach(h=>h.A=1);SXK=[];
  $('pm').style.display='none';$('hl').style.display='flex';$('hr').style.display=mk.style.display='';hT=0}
function sxS(d){let M=SX,S=M.Q.S[M.st];M.yaw-=(tjx+(keys.ArrowRight|0)-(keys.ArrowLeft|0))*d*1.5;M.pit=cl(M.pit+(tjy+(keys.ArrowUp|0)-(keys.ArrowDown|0))*d,-1.3,1.3);
  if(tzm)M.zt=0,z=cl(z*2**(tzm*1.5*d),.0015,M.zx);if(M.zt){z*=(M.zt/z)**min(1,d*2.6);abs(z/M.zt-1)<.01&&(M.zt=0)}
  M.pz||(M.t+=d);if(S){M.ta=min(M.t/S.T,1);if(M.t>S.T*(S.h||1.45))M.t=0}        // l'état final reste affiché un moment, puis la boucle se rejoue
  M.Cc=lp(M.Cc,M.Ct,min(1,d*4.5));let v=rot(M.fb,M.ub,M.yaw),r=nm(cr(M.ub,v));v=rot(v,r,M.pit*.8);f=v;u=nm(cr(v,r));p=ad(M.Cc,innerWidth>innerHeight?ml(vr,-z*1.6):ml(vu,z*.9));vel=0;nI=0}
function sxD(){let M=SX,S=M.Q.S[M.st];nxl=0;dSx0.n=dSx1.n=0;dSx0.c=dSx1.c=M.O;
  if(S)S.d(M.ta,S);else M.Q.sd();
  for(let i=nxl;i<QL.length;i++)QL[i].style.display='none';up(dSx0);up(dSx1)}
// écran d'accueil d'une vue (appelé par son bouton)
function sxIn(q){if(!go||PM||RX||NX||SX||AP)return;let Q=SXQ[q];$('pm').style.display='block';$('pm').classList.remove('mn');$('pmc').style.display='none';$('pmt').textContent=Q.ti;$('pmx').textContent=Q.in;
  $('pmo').innerHTML=rxBtn('Commencer','Sg'+q)+rxBtn('Fermer','Sx')}
{const h0=$('pmo').onclick;$('pmo').onclick=e=>{let b=e.target.closest('button'),r=b&&b.dataset.r,M=SX;if(!r||r[0]!='S')return h0(e);
  if(r=='Sx')return $('pm').style.display='none';if(r[1]=='g')return sxGo(r.slice(2));if(!M)return;
  if(r=='Sq')return sxEnd();if(r=='Sr'){M.st=-1;return sxN(1)}if(r=='Sb')return sxN(-1);
  if(r=='Sm'){M.pz=1;$('pmt').textContent=M.Q.ti+' — sommaire';$('pmx').textContent='';$('pmo').innerHTML=M.Q.T.map((T,i)=>rxBtn((i+1)+' · '+T[0],'Sj'+i)).join('')+rxBtn('Bilan','Sj'+M.Q.S.length);return}        // aller directement à une étape
  if(r[1]=='j'){M.st=+r.slice(2)-1;return sxN(1)}
  if(r=='Sz'){M.pz=!M.pz;b.textContent=M.pz?'▶ Reprendre':'⏸ Pause';return}sxN(1)}}
$('sxb').onclick=()=>sxIn('sn');
