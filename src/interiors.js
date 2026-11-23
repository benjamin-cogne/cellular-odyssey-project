// ================= trois intérieurs de plus : lysosome (toutes les cellules), dyade et disque intercalaire (cardiomyocyte) =================
// Même mécanisme que la mitochondrie, le réticulum, le Golgi et le sarcomère : une entrée dans ENT (interact.js), un constructeur qui dessine les pièces fixes
// sur les couches Lx0, Lx1, Lxc et Lxa (translucide) et pose les colliders des fiches dans OC, une animation accrochée à oT, des voies de réactions ajoutées à RXP.
// Tailles réelles ; formes schématiques (des billes). Les textes (fiches, voies) sont dans interiors-text.js.
const Lin=Ly(M1,1e9,0,{rg:1}),dIn=dy(Lin,400,[0,0,0],1),
 inF=(n,i)=>{let y=1-2*(i+.5)/n,r=sqrt(1-y*y),t=i*2.39996;return[r*cos(t),y,r*sin(t)]},      // i-ième de n points répartis sur une sphère
 inH=(a,b)=>{let v=sin(a*127.1+b*311.7+3.1)*43758.5453;return v-floor(v)},
 inC=(a,b,r,i)=>OC.push({a,b,r,i,q:lp(a,b,.5),R:ds(a,b)/2+r,sf:1}),
 INV=[];      // lysosome : pompes à protons [position, direction vers la lumière]
// ---------------- lysosome ----------------
function mkLys(m){let c=m.a,R=m.r-.004,i,k,q,d,n=Math.round(12.566*R*R/.00023),g=wyG(Math.round(c[0]*977+c[1]*131+c[2]*71)),rv=()=>{let v;do v=[g()*2-1,g()*2-1,g()*2-1];while(ln(v)>1);return v};
  Object.assign(m,{c,X:[1,0,0],Y:[0,1,0],Z:[0,0,1],s:[R,R,R],zx:.03,xt:'⇤ Sortir du lysosome'});INV.length=0;
  for(i=0;i<n;i++){d=inF(n,i);q=ma(c,d,R-.004);                                                                      // tapis de sucres des protéines LAMP, sous la membrane
    if(i%Math.round(n/11)==3){for(k=0;k<6;k++){let t=pp(d),w=cr(d,t),a=k*TAU/6;S(Lx0,ad(ma(c,d,R-.003),ad(ml(t,.005*cos(a)),ml(w,.005*sin(a)))),.0028,K(0xd94))}sc(ma(c,d,R-.004),.008,'lvt');INV.push([ma(c,d,R-.006),ml(d,-1)]);continue}      // pompe à protons V-ATPase : anneau du secteur V0
    if(i%29==7){S(Lx0,q,.0042,K(0x59d));S(Lx0,ma(q,pp(d),.006),.0042,K(0x47b));sc(q,.007,'ltr');continue}                                  // transporteurs de sortie
    S(Lx0,q,.0028+.001*inH(i,1),K(i%3?0x8cb:0xadc));Cy(Lxc,ma(c,d,R),q,.0007,K(0x7a9));i%14||sc(q,.005,'lgx')}
  for(i=0;i<130;i++){q=ma(c,rv(),R*.8);S(Lx1,q,.003+.0018*g(),K([0x6c5,0xc96,0x9ad,0xdb5][i%4]));i%3||sc(q,.006,'lhy')}                    // hydrolases acides
  q=ma(c,nm([.6,.2,.3]),R*.45);for(i=0;i<70;i++)S(Lx0,ma(q,rv(),.026),.0042,K(i%9?0xc5b:0xe8d));for(i=0;i<5;i++)S(Lx1,ma(q,inF(5,i),.031),.0045,K(0x6c5));sc(q,.032,'lgg');      // particule de glycogène en cours de digestion, et ses α-glucosidases
  for(i=0;i<3;i++){q=ma(c,nm([-.5+i*.4,-.6,.3-i*.5]),R*.5);El(Lxa,q,[.022+.004*i,0,0],[0,.022+.004*i,0],[0,0,.022+.004*i],K(0xcb7,.55));for(k=0;k<5;k++)S(Lx0,ma(q,rv(),.012),.003,K(0x9ab));sc(q,.024+.004*i,'liv')}      // vésicules internes
  q=ma(c,nm([-.5,.5,-.4]),R*.5);for(i=0;i<26;i++)S(Lx0,ma(q,rv(),.02),.0036,K(i%2?0xdc6:0xfe8));sc(q,.024,'lch');                                                                // gouttelette d'esters de cholestérol
  if(CT>1){q=ma(c,nm([.2,-.5,-.7]),R*.55);for(i=0;i<60;i++)S(Lx0,ma(q,rv(),.03),.005+.003*g(),K(i%3?0x752:0x963));sc(q,.036,'llf')}                                          // lipofuscine (cellules qui ne se divisent plus)
  if(CT>2){q=ma(c,nm([-.2,.1,.8]),R*.5);El(Lx0,q,[.04,0,0],[0,.022,0],[0,0,.022],K(0x944));for(i=-2;i<3;i++)Cy(Lxc,ad(q,[i*.012,-.02,0]),ad(q,[i*.012,.02,0]),.0025,K(0xb76));sc(q,.036,'lmi')}      // reste de mitochondrie (mitophagie)
  return ma(c,[0,0,1],R*.2)}
ENT.lys=[.008,'le lysosome',mkLys,'Entrée comme le contenu d\'un endosome ou d\'un autophagosome qui fusionne avec le lysosome (licence narrative). Ici, tout est acide : pH 4,5 à 5.'];
RXN.lys=`le lysosome`;
// ---------------- dyade et disque intercalaire : cardiomyocyte ----------------
let DYB=0;      // dyade visitée : ses pièces animées
if(CT>2){
// --- dyade : tubule T (lumière au-dessous), fente de 15 nm, citerne du réticulum (au-dessus) ---
function mkDya(m){let[q,Y,X]=m.D||CDL.reduce((a,b)=>ds(a[0],m.a)<ds(b[0],m.a)?a:b),Z=cr(X,Y),c=ma(q,Y,-.0275),W=(u,y,v)=>ad(c,ad(ad(ml(X,u),ml(Y,y)),ml(Z,v))),ty=v=>-.1075+sqrt(max(0,.01-v*v)),i,k,s,R=[],V=[],N=[],SK=[];      // ty : hauteur de la surface du tubule
  Object.assign(m,{c,X,Y,Z,s:[.2,.11,.2],cy:1,zx:.03,xt:'⇤ Sortir de la dyade'});
  for(i=0;i<7;i++)for(s of[-1,1]){let u=-.093+.031*i,v=s*.0155;R.push([u,v]);sc(W(u,.002,v),.012,'ryr')}                                                                 // quatorze récepteurs de la ryanodine, en deux rangs
  for(let[u,v]of[[-.062,0],[0,.0155],[.062,0],[.031,-.0155]]){V.push([u,v]);S(Lx0,W(u,ty(v)-.008,v),.0045,K(0xb85));sc(W(u,ty(v),v),.007,'dcv')}                         // canaux Cav1.2 du tubule (bille : sous-unité α2δ, côté lumière)
  for(let[u,v]of[[-.14,.03],[-.14,-.03],[.14,.03],[.14,-.03],[0,.045],[0,-.045]]){let a=W(u,ty(v),v),b=W(u,.0075,v*.8);Cy(Lxc,a,b,.0013,K(0xa6d));S(Lx0,a,.003,K(0xa6d));S(Lx0,b,.0026,K(0xc8e));inC(a,b,.004,'jph')}      // junctophiline 2
  for(let[u,v]of[[-.12,.06],[.12,-.06],[.03,.075]]){let a=W(u,ty(v),v);N.push(a);for(k=0;k<4;k++){let g=k*TAU/4;S(Lx0,ad(a,ad(ml(X,.004*cos(g)),ml(Z,.004*sin(g)))),.003,K(0xe6f))}sc(a,.008,'dnx')}      // échangeur NCX
  for(i=0;i<14;i++){let[u,v]=R[i],pr=W(u,.0085,v),g=wyG(i+5);S(Lx0,pr,.002,K(0x7ad));for(k=0;k<9;k++){let nx=ad(pr,[(g()-.5)*.012,0,0]);nx=ad(nx,ad(ml(Y,.0035),ad(ml(X,(g()-.5)*.009),ml(Z,(g()-.5)*.009))));    // calséquestrine : chaînes accrochées par la triadine et la junctine
      S(Lx0,nx,.0031,K(k%2?0xc64:0xd86));pr=nx}i%2||sc(W(u,.03,v),.012,'csq')}
  for(let[u,v]of[[-.09,.07],[.09,.07],[-.09,-.07],[.09,-.07]]){let a=W(u,.046,v),b=W(u*1.25,.1,v*1.35);Cy(Lxc,a,b,.016,K(0xcb6));                                         // tubules du réticulum longitudinal, pompes SERCA2a et phospholamban
    for(k=0;k<7;k++){let t=.15+.12*k,g=k*2.4,o=lp(a,b,t),e=nm(ad(ml(X,cos(g)),ml(Z,sin(g)))),P=ma(o,e,.0175);S(Lx0,P,.0042,K(0x49f));S(Lx0,ma(P,Y,.005),.002,K(0xf8c));SK.push(P);k%2||sc(P,.007,'dsr')}}
  sc(W(0,-.1075,0),.07,'dtl');sc(W(.15,-.1075,0),.07,'dtl');sc(W(-.15,-.1075,0),.07,'dtl');for(i=0;i<6;i++)sc(W(-.16+.064*i,.03,(i%2?.1:-.1)),.014,'dsl');
  DYB={W,R,V,N,SK,ty};return W(0,-.004,.07)}
// --- disque intercalaire : notre membrane (dessous), l'espace entre les deux cellules, la membrane voisine (dessus) ---
function mkIcd(m){let Y=dt(sb(m.a,Cc),A0)>0?A0:ml(A0,-1),X=pp(Y),Z=cr(X,Y),E0=ma(Cc,Y,Rc+42),h=sb(p,E0),l,c,i,k,s,g=wyG(77),W=(u,y,v)=>ad(c,ad(ad(ml(X,u),ml(Y,y)),ml(Z,v))),mb=K(0xca6,.42);
  h=sb(h,ml(Y,dt(h,Y)));l=ln(h);c=ad(E0,ml(h,l>5?5/l:1));Object.assign(m,{c,X,Y,Z,s:[.22,.046,.22],cy:1,zx:.02,pl:'icd',xt:'⇤ Sortir du disque intercalaire'});
  for(s of[-1,1])El(Lxa,W(0,s*.013,0),ml(X,.235),ml(Y,.0026),ml(Z,.235),mb);                                                                                             // les deux membranes
  // plaque de jonction communicante : les deux membranes se rapprochent à 3,5 nm ; canaux de deux connexons de six connexines
  {let cu=-.095,cv=.02;for(s of[-1,1])El(Lxa,W(cu,s*.0074,cv),ml(X,.06),ml(Y,.0056),ml(Z,.06),K(0xca6,.5));
   for(i=-6;i<=6;i++)for(k=-6;k<=6;k++){let u=.0095*(i+k/2),v=.0095*k*.866;if(hypot(u,v)>.05)continue;for(s of[-1,1])for(let j=0;j<6;j++){let a=j*TAU/6;S(Lx0,W(cu+u+.0032*cos(a),s*.0042,cv+v+.0032*sin(a)),.0017,K(s<0?0x2dc:0x4be))}}
   for(i=0;i<10;i++){let a=i*TAU/10;sc(W(cu+.062*cos(a),0,cv+.062*sin(a)),.012,'gjp')}
   for(i=0;i<7;i++){let a=i*TAU/7+.3;for(s of[-1,1]){let q=W(cu+.085*cos(a),s*.013,cv+.085*sin(a));for(k=0;k<4;k++){let b=k*TAU/4;S(Lx0,ad(q,ad(ml(X,.0034*cos(b)),ml(Z,.0034*sin(b)))),.003,K(0xec3))}s<0&&sc(q,.008,'nvp')}}}      // canaux Nav1.5 autour de la plaque (périnexus)
  // desmosome : cadhérines (desmogléine 2, desmocolline 2) croisées au milieu ; plaque dense et desmine côté cytoplasme
  {let cu=.1,cv=.06;for(i=0;i<150;i++){let a=g()*TAU,r=.05*sqrt(g()),u=cu+r*cos(a),v=cv+r*sin(a),s=i%2?1:-1,tu=(g()-.5)*.008,tv=(g()-.5)*.008;
     for(k=0;k<5;k++)S(Lx0,W(u+tu*k/4,s*(.0125-.0036*k),v+tv*k/4),.0022,K(i%4<2?0xd74:0xeb5));i%12||sc(W(u,0,v),.008,'dcd');
     if(i<70){S(Lx1,W(u,s*(.019+.006*g()),v),.0032,K(i%2?0x96c:0x6b7));Cy(Lxc,W(u,s*.028,v),W(u+tu*2,s*.041,v+tv*2),.0014,K(0x58c))}}
   for(s of[-1,1]){for(i=0;i<5;i++)Cy(Lxc,W(cu-.07,s*.043,cv-.04+.02*i),W(cu+.07,s*.043,cv-.03+.02*i),.005,K(0x9a7));sc(W(cu,s*.034,cv),.02,'dpl')}}
  // jonction adhérente : N-cadhérine, caténines, filaments d'actine du dernier sarcomère
  {let cu=.02,cv=-.12;for(i=0;i<90;i++){let a=g()*TAU,r=.06*sqrt(g()),u=cu+r*cos(a),v=cv+r*sin(a),s=i%2?1:-1;for(k=0;k<5;k++)S(Lx0,W(u+.0012*k*(i%4<2?1:-1),s*(.0125-.0033*k),v),.002,K(0x49e));i%10||sc(W(u,0,v),.008,'ncd');
     S(Lx1,W(u,s*.0185,v),.0028,K(0xe95));i%3||S(Lx1,W(u+.004,s*.024,v),.0034,K(0xb7d));i%4||(Cy(Lxc,W(u,s*.027,v),W(u,s*.046,v),.0035,K(0xe89)),inC(W(u,s*.027,v),W(u,s*.046,v),.005,'nca'))}}
  return W(cl(dt(sb(p,c),X),-.15,.15),0,cl(dt(sb(p,c),Z),-.15,.15))}
ENT.dya=[.006,'la dyade',mkDya,'Vous voici dans la fente de la dyade, entre le tubule T (en dessous) et la citerne du réticulum (au-dessus). Les membranes se traversent (licence narrative) : descendez dans la lumière du tubule, montez dans celle du réticulum.'];
ENT.icd=ENT.gjn=ENT.dsm=ENT.fad=[.005,'le disque intercalaire',mkIcd,'Vous voici entre les deux cellules, dans un espace d\'une vingtaine de nanomètres. Dessous, la membrane de notre cellule ; dessus, celle de la voisine. Les membranes sont dessinées translucides pour laisser voir ce qui s\'y accroche de l\'autre côté.'];
Object.assign(RXN,{dya:`la dyade`,icd:`le disque intercalaire`,gjn:`le disque intercalaire`,dsm:`le disque intercalaire`,fad:`le disque intercalaire`});
// on propose d'entrer dans la dyade dès que le vaisseau en est tout près (elle est serrée entre tubule T, réticulum et myofibrilles)
{const b0=btT,DYO=CDL.map(D=>({a:D[0],b:D[0],r:.13,i:'dya',q:D[0],R:.13,D}));btT=()=>{b0();if(RX||NX||SX||ORG||AP||PM||reg!=1||ct>=0||!go||eC&&eC.i!='myf')return;let b=0,bd=3*z+.3;      // seuil large : une dyade est souvent enfouie entre les myofibrilles
   for(let o of DYO){let d=ds(p,o.a)-o.r;if(d<bd)bd=d,b=o}if(b){eC=b;let e=$('ent');e.style.display='block';e.textContent='⇥ Entrer dans '+ENT.dya[1]}}}
}
// ---------------- animation des trois intérieurs ----------------
{const o0=oT;oT=()=>{o0();dIn.n=0;let o=ORG;if(!o||AP)return up(dIn);let i,k,n=0,t=sT%7,W=o.c;dIn.c=p;
  if(o.i=='lys'){for(let[q,d]of INV)for(k=0;k<4;k++){let a=(sT*.5+k/4+inH(q[0]*99,k))%1;dS(dO,ad(ma(q,d,.03*a),[.004*sin(sT+k),.004*cos(sT*1.3+k),0]),.0007,[2.4,2.6,3,1])}up(dO)}      // protons pompés vers la lumière
  else if(o.i=='dya'&&DYB){let B=DYB,ap=t>1&&t<1.7,ry=t>1.12&&t<2.3,load=t<1.15?1:t<2.3?1-.55*ss((t-1.15)/1.1):.45+.55*ss((t-2.3)/3),c0=[1,.5,.1,1];                    // potentiel d'action, puis libération, puis repompage
    for(let[u,v]of B.R){let q=B.W(u,.002,v),r=ry?.0042:.003;for(k=0;k<4;k++)dS(dIn,B.W(u+(k&1?1:-1)*.0068,.0015,v+(k&2?1:-1)*.0068),.0062,ry?[.5,1.5,.75,1]:[.3,.62,.42,1]);dS(dIn,B.W(u,.006,v),r,ry?[1.4,.9,.2,1]:[.2,.4,.3,1])}
    for(let[u,v]of B.V)for(k=0;k<4;k++){let g=k*TAU/4,r=ap?.0042:.003;dS(dIn,B.W(u+r*cos(g),B.ty(v)+.0005,v+r*sin(g)),.003,ap?[1.4,.7,.2,1]:[.8,.42,.12,1]);ap&&k<2&&dS(dO,B.W(u,B.ty(v)-.006+.012*((sT*2+k/2)%1),v),.0009,c0)}
    for(i=0;i<70;i++){let a=inH(i,1)*TAU,r=.085*sqrt(inH(i,2));dS(dO,B.W(-.19+.38*inH(i,3)+.003*sin(sT+i),-.1075+r*sin(a)+.002*cos(sT*1.2+i),r*cos(a)),.0009,c0)}                                    // Ca²⁺ dans la lumière du tubule (milieu extérieur)
    for(i=0;i<110*load;i++)dS(dO,B.W(-.19+.38*inH(i,5)+.002*sin(sT*1.1+i),.012+.03*inH(i,6),-.19+.38*inH(i,7)+.002*cos(sT+i)),.0009,c0)                                                              // Ca²⁺ dans la lumière du réticulum
    if(t>1.12&&t<5.5)for(i=0;i<260;i++){let h=inH(i,9),t0=1.12+h*1.1,age=t-t0,[u,v]=B.R[i%14],a=inH(i,11)*TAU,d;if(age<0)continue;d=.035*age**.7;                                                    // nuage libéré dans la fente, puis repompé
      if(t>2.4+2.8*inH(i,13)){let P=B.SK[i%B.SK.length],e=ss((t-2.4-2.8*inH(i,13)+.5)/.5),q0=B.W(u+d*cos(a),-.002+.006*h,v+d*sin(a));e<1&&dS(dO,lp(q0,i%4?P:B.N[i%3],e),.0009,c0);continue}
      dS(dO,B.W(u+d*cos(a),-.002+.006*h+(d>.1?(h-.4)*(d-.1)*.8:0),v+d*sin(a)),.0009,c0)}
    up(dO)}
  else if(o.pl=='icd'){for(i=0;i<90;i++){let u=-.2+.4*inH(i,1),v=-.2+.4*inH(i,2);dS(dO,ad(o.c,ad(ad(ml(o.X,u+.003*sin(sT+i)),ml(o.Y,-.009+.018*inH(i,3))),ml(o.Z,v+.003*cos(sT*1.2+i)))),.0009,i%3?[1,.85,.2,1]:[1,.5,.1,1])}up(dO)}up(dIn)}}      // Na⁺ et Ca²⁺ du milieu extérieur
