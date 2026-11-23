// ================= influx cardiaque : du canal ionique au cœur entier =================
// Vue guidée (moteur SXQ de snrnp.js), ouverte par le bouton « ⚡ Suivre l'influx cardiaque » du cardiomyocyte. Dix-huit étapes.
// Tout est dessiné à sa taille réelle (1 unité = 1 µm) autour d'un même point, HBO : un cardiomyocyte du milieu de la paroi antéro-latérale du ventricule gauche.
// Les premières scènes (membrane, dyade, filaments, sarcomère, jonction communicante, cellules, tissu) sont posées dans le repère de cette cellule
// (fA : axe de la fibre, fB : vers la base du cœur, fN : vers l'épicarde). Le cœur entier est construit autour, en millimètres, dans son propre repère
// (hLx : vers la gauche, hLy : de la pointe vers la base, hLz : vers l'avant), puis placé pour que la cellule suivie soit dans sa paroi : le zoom arrière est donc continu.
// Ce qui est exact : les tailles, les durées, l'ordre des événements, les valeurs citées dans les textes (voir la liste des sources).
// Ce qui est schématique : la forme des protéines (des billes), la forme du cœur (des ellipsoïdes et des tubes), le tracé du réseau de Purkinje,
// les courbes de l'oscilloscope et de l'électrocardiogramme (dessinées à la main pour avoir la bonne allure et les bonnes durées).
if(CT>2){
const HBO=[0,-4e5,0],
 LhB=Ly(M4,1e9,0,{sx:1,ex:1}),LhGs=Ly(M2,1e9,0,{sx:1,ex:1,al:1}),LhS=Ly(M2,1e9,0,{sx:1,ex:1}),LhT=Ly(MK,1e9,0,{sx:1,ex:1}),LhG=Ly(M4,1e9,0,{sx:1,ex:1,al:1}),LhGt=Ly(MW,1e9,0,{sx:1,ex:1,al:1}),
 Lhd0=Ly(M1,1e9,0,{sx:1,ex:1}),Lhd1=Ly(MK,1e9,0,{sx:1,ex:1}),Lhd2=Ly(M3,1e9,0,{sx:1,ex:1}),Lhd3=Ly(M3,1e9,0,{sx:1,ex:1,al:1}),
 dHb=dy(Lhd0,5200,HBO,1e7),dHt=dy(Lhd1,2600,HBO,1e7),dHo=dy(Lhd2,120,HBO,1e7),dHe=dy(Lhd3,40,HBO,1e7),
 // ---- repère du cœur (mm) et ellipsoïdes qui le composent ----
 hLy=nm([-.5,.75,-.43]),hLx=(v=>nm(sb(v,ml(hLy,dt(v,hLy)))))([.88,.3,-.3]),hLz=cr(hLx,hLy),
 hI=v=>[dt(v,hLx),dt(v,hLy),dt(v,hLz)],ARL=[-6,12,6],PRL=ad(ARL,hI([15,13,19])),                                                  // axes du monde → repère du cœur ; racines de l'aorte et du tronc pulmonaire
 ELV={c:[0,-28,0],s:[31,52,31]},ERV={c:[-24,-20,15],s:[30,44,26]},ECO={c:ad(ARL,hI([10,-4,17])),s:[15,21,13]},ERA={c:[-40,20,6],s:[22,26,20]},ELA={c:[16,24,-20],s:[27,19,20]},
 ERP={c:ad(ARL,hI([-19,14,13])),s:[13,9,9]},ELP={c:ad(ARL,hI([32,18,2])),s:[12,8,8]},
 eQ=(e,th,v,ro=1)=>{let s=sqrt(max(0,1-v*v))*ro;return[e.c[0]+e.s[0]*s*cos(th),e.c[1]+e.s[1]*v*ro,e.c[2]+e.s[2]*s*sin(th)]},      // point d'un ellipsoïde (ro = 1 : sa surface)
 eF=(e,q)=>hypot((q[0]-e.c[0])/e.s[0],(q[1]-e.c[1])/e.s[1],(q[2]-e.c[2])/e.s[2]),                                                 // < 1 : dedans
 eN=(e,q)=>nm([(q[0]-e.c[0])/e.s[0]**2,(q[1]-e.c[1])/e.s[1]**2,(q[2]-e.c[2])/e.s[2]**2]),
 hR=q=>ad(ad(ml(hLx,q[0]),ml(hLy,q[1])),ml(hLz,q[2])),                                                                              // repère du cœur → axes du monde
 FQ=eQ(ELV,1.08,-.1,.86),hW=q=>ad(HBO,ml(hR(sb(q,FQ)),1e3)),hA=(q,x,y,w)=>ad(q,[x*1e3,y*1e3,w*1e3]),                               // mm du cœur → monde ; décalage anatomique (gauche, haut, avant)
 fN=hR(eN(ELV,FQ)),fA=nm(cr(hLy,fN)),fB=cr(fN,fA),lc=(x,y,w)=>ad(HBO,ad(ad(ml(fA,x),ml(fB,y)),ml(fN,w||0))),nq=(x,y,w)=>lc(x*1e-3,y*1e-3,(w||0)*1e-3),      // repère de la cellule : µm, nm
 PV=hW([0,0,0]),PA=hW([-12,20,-8]),HM_V=new Float32Array(16),HM_A=new Float32Array(16),HC0=hA(hW([-6,-6,4]),12,-4,0),THS=atan2(15,-24),      // pivots des ventricules et des oreillettes ; côté de la cloison
 HG={},HP=[],HCS=[],HL={},
 // ---- écriture des blocs fixes ----
 gE=(g,q,X,Y,Z,c)=>g.s.push(X[0],Y[0],Z[0],q[0],X[1],Y[1],Z[1],q[1],X[2],Y[2],Z[2],q[2],c[0],c[1],c[2],c[3]),
 gS=(g,q,r,c)=>g.j.push(r,0,0,q[0],0,r,0,q[1],0,0,r,q[2],c[0],c[1],c[2],c[3]),
 gC=(g,a,b,r,c)=>{let y=sb(b,a),x=pp(y),w=cr(x,nm(y));g.t.push(x[0]*r,y[0],w[0]*r,a[0],x[1]*r,y[1],w[1]*r,a[1],x[2]*r,y[2],w[2]*r,a[2],c[0],c[1],c[2],c[3])},
 gP=(g,P,r,c,r1)=>P.forEach((q,i)=>{let ra=r1==null?r:r+(r1-r)*i/(P.length-1);gS(g,q,ra,c);i&&gC(g,P[i-1],q,ra,c)}),                // tube le long d'un chemin, éventuellement effilé
 gEl=(g,e,c,k=1)=>gE(g,hW(e.c),ml(hLx,e.s[0]*k*1e3),ml(hLy,e.s[1]*k*1e3),ml(hLz,e.s[2]*k*1e3),c),
 hSm=(P,n=6)=>{let o=[],m=P.length-1;for(let i=0;i<m;i++)for(let k=0;k<n;k++)o.push(cat(P[max(0,i-1)],P[i],P[i+1],P[min(m,i+2)],k/n));o.push(P[m]);return o},
 gK=(n,g,piv,al,mt)=>{HG[n]=[[al?LhG:LhB,g.s],[al?LhGs:LhS,g.j],[al?LhGt:LhT,g.t]].filter(e=>e[1].length).map(([L,a])=>{let h=mkch(L,a,0,piv.slice());h.A=0;h.m=mt||0;return h})},
 gN=()=>({s:[],j:[],t:[]}),
 sP=(e,A,ro,n=7)=>{let o=[];for(let i=0;i<A.length-1;i++)for(let k=0;k<n;k++){let t=k/n;o.push(eQ(e,A[i][0]+(A[i+1][0]-A[i][0])*t,A[i][1]+(A[i+1][1]-A[i][1])*t,ro))}let l=A[A.length-1];o.push(eQ(e,l[0],l[1],ro));return o},      // chemin à la surface d'un ellipsoïde, donné par (angle, hauteur)
 gro=(v,s)=>{let th=s>0?1.08:5.2;for(let i=0;i<70;i++,th+=s*.022)if(eF(ERV,eQ(ELV,th,v))<1)return th-s*.03;return NaN},                    // sillon interventriculaire : là où la surface du ventricule gauche rencontre le droit
 // ---- courbes ----
 vAP=t=>{if(t<0)return-85;let P=22-22*min(1,t/260)**2+13*xe(-t/4)-9*bmp(t,12,8),R=1/(1+xe(-(t-292)/13));return-85+(P+85)*(1-xe(-t/.45))*(1-R)},      // potentiel d'action ventriculaire (ms → mV)
 cCa=t=>t<4?0:(1-xe(-(t-4)/14))*xe(-(t-4)/170)*1.27,cFo=t=>t<10?0:(1-xe(-(t-10)/60))**2*xe(-(t-10)/130)*2.9,                         // calcium libre et force, de 0 à 1
 ecg=t=>.14*bmp(t,62,26)-.09*bmp(t,171,7)+1.05*bmp(t,192,9)-.22*bmp(t,212,8)+.3*bmp(t,457,50),                                      // électrocardiogramme (ms → mV), un battement de 860 ms
 vSA=t=>{t=(t%860+860)%860;return t<14?-40+48*ss(t/14):t<150?8-70*ss((t-14)/136):-62+22*((t-150)/710)**1.3},                           // cellule du nœud sinusal
 cVe=t=>ss((t-205)/90)*(1-ss((t-470)/130)),cAt=t=>ss((t-75)/55)*(1-ss((t-170)/90)),                                                  // contraction des ventricules, des oreillettes (0 à 1)
 mix=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t,1],
 R0=[.45,.12,.14,1],FL=[1.9,1.6,.6,1],PL=[1.12,.5,.16,1],hCo=d=>d<0?R0:d<.12?mix(R0,FL,d/.12):d<.7?mix(FL,PL,(d-.12)/.58):PL,      // repos, front, plateau
 // ---- écriture des blocs animés ----
 hS=(q,r,c)=>dS(dSx0,q,r,c),hB=(q,r,c)=>dS(dHb,q,r,c),hT=(a,b,r,c)=>dCy(dHt,a,b,r,c),hLn=(a,b,r,c)=>dCy(dSx1,a,b,r,c),
 hE=(h,q,X,Y,Z,c)=>{if(h.n>=h.cap)return;let F=h.f,o=h.n++*16,C=h.c;F[o]=X[0];F[o+1]=Y[0];F[o+2]=Z[0];F[o+3]=q[0]-C[0];F[o+4]=X[1];F[o+5]=Y[1];F[o+6]=Z[1];F[o+7]=q[1]-C[1];F[o+8]=X[2];F[o+9]=Y[2];F[o+10]=Z[2];F[o+11]=q[2]-C[2];F[o+12]=c[0];F[o+13]=c[1];F[o+14]=c[2];F[o+15]=c[3]},
 bri=(c,k)=>[c[0]*k,c[1]*k,c[2]*k,1];
let hbC=0;      // horloge de la vue (s)

// ================= construction du cœur (au premier lancement) =================
const hbBuild=()=>{if(HG.vo)return;
  const cM=[.6,.16,.17,1],cR=[.56,.19,.2,1],cT=[.7,.32,.3,1],cAo=[.84,.2,.18,1],cPA=[.3,.42,.8,1],cVC=[.26,.36,.72,1],cPV=[.88,.32,.3,1],cCa=[1,.24,.18,1],cCv=[.32,.42,.85,1],cGo=[.8,.62,.2,1],
   gla=c=>[c[0]*1.3,c[1]*1.5,c[2]*1.5,.11],W=q=>hW(q),lift=(e,k)=>1+k/e.s[0];
  let vo=gN(),vg=gN(),ao=gN(),ag=gN(),xo=gN(),xg=gN(),pk=gN(),nd=gN(),i,j;
  // ventricules, cône artériel ; oreillettes et leurs auricules
  for(let[e,c]of[[ELV,cM],[ERV,cR],[ECO,cR]])gEl(vo,e,c),gEl(vg,e,gla(c));gEl(vg,ELV,[.75,.12,.14,.16],.72);      // cavité du ventricule gauche (cœur de verre)
  for(let e of[ERA,ELA,ERP,ELP])gEl(ao,e,cT),gEl(ag,e,gla(cT));
  // artères et veines coronaires, à la surface des ventricules
  {let cor=(e,A,r,r1,c)=>gP(vo,hSm(sP(e,A,lift(e,r*.7)).map(W),2),r*1e3,c,r1*1e3),la=1.9,lq=4.1,ga=v=>{let t=gro(v,1);return la=t==t?t:la},gp=v=>{let t=gro(v,-1);return lq=t==t?t:lq},A=[],B=[],C=[],th;
   for(i=0;i<=12;i++){let v=.4-1.32*i/12,t=ga(v);A.push([t,v]);B.push([t-.07,v])}cor(ELV,A,2,1,cCa);cor(ELV,B,1.6,.9,cCv);                                  // interventriculaire antérieure, grande veine du cœur
   HL.iva=[W(eQ(ELV,ga(-.25),-.25,1.12)),'Artère interventriculaire antérieure',1];
   for(let v of[.12,-.22]){th=ga(v);cor(ELV,[[th,v],[th-.35,v-.16],[th-.75,v-.32],[th-1.05,v-.5]],1.3,.6,cCa)}                                            // diagonales
   th=ga(.42);for(i=0;i<=14;i++)C.push([th-3.3*i/14,.43]);cor(ELV,C,1.9,1,cCa);HL.cx=[W(eQ(ELV,th-1.1,.43,1.14)),'Artère circonflexe',1];                    // circonflexe
   for(let d of[.9,1.9])cor(ELV,[[th-d,.43],[th-d-.1,.1],[th-d-.2,-.25],[th-d-.25,-.55]],1.3,.6,cCa);                                                       // marginales
   A=[];for(i=0;i<=14;i++)A.push([1.75+2.85*i/14,.5]);cor(ERV,A,1.9,1.2,cCa);HL.cd=[W(eQ(ERV,2.6,.5,1.14)),'Artère coronaire droite',1];                     // coronaire droite
   cor(ERV,[[2.9,.5],[2.85,.15],[2.75,-.2],[2.6,-.55]],1.3,.6,cCa);                                                                                         // marginale droite
   A=[];for(i=0;i<=9;i++){let v=.3-1.05*i/9;A.push([gp(v),v])}cor(ELV,A,1.6,.8,cCa)}                                                                         // interventriculaire postérieure
  // gros vaisseaux : aorte et ses branches, tronc pulmonaire, veines caves, veines pulmonaires
  {let aR=W(ARL),pR=W(PRL),rc=W(ERA.c),lc_=W(ELA.c),tu=(q,A,r,r1,c)=>{let P=hSm(A.map(a=>hA(q,a[0],a[1],a[2])),5);gP(xo,P,r*1e3,c,r1*1e3);P.forEach((v,i)=>i&&gC(xg,P[i-1],v,(r+(r1-r)*i/(P.length-1))*1e3,gla(c)));return P};
   tu(aR,[[0,-4,0],[-5,20,5],[-9,44,3],[-5,63,-9],[9,71,-27],[24,62,-43],[30,36,-52],[31,-5,-56],[30,-52,-57]],13,10.5,cAo);
   tu(aR,[[-5,63,-9],[-12,80,-7],[-16,98,-5]],5.6,5,cAo);tu(aR,[[3,69,-19],[4,86,-17],[4,101,-15]],3.9,3.6,cAo);tu(aR,[[14,69,-33],[21,84,-34],[27,99,-34]],4.6,4.2,cAo);
   tu(pR,[[-1,-7,1],[2,10,-5],[5,24,-14],[7,34,-26]],11.5,10.5,cPA);tu(pR,[[7,34,-26],[21,38,-35],[40,37,-43]],7.6,6.6,cPA);tu(pR,[[7,34,-26],[-13,33,-36],[-37,31,-39],[-62,31,-37]],8,6.8,cPA);
   tu(rc,[[2,12,-6],[1,38,-8],[0,76,-10]],9,8.6,cVC);tu(rc,[[3,-14,-10],[4,-26,-12],[4,-38,-12]],10.5,10.5,cVC);
   for(let[a,b]of[[1,6],[1,-9],[-1,6],[-1,-9]])tu(lc_,[[a*16,b,-8],[a*30,b*1.3,-11],[a*44,b*1.6,-13]],5.6,5,cPV);
   HL.ao=[hA(aR,-9,46,16),'Aorte',0];HL.tp=[hA(pR,6,22,0),'Tronc pulmonaire',0];HL.vcs=[hA(rc,-10,56,0),'Veine cave supérieure',0];HL.vci=[hA(rc,-8,-36,0),'Veine cave inférieure',0];HL.vp=[hA(lc_,46,0,-12),'Veines pulmonaires',0]}
  // tissu de conduction : nœud sinusal, nœud auriculo-ventriculaire, faisceau de His, branches, réseau de Purkinje. Chaque tronçon retient l'heure de passage de l'influx (ms).
  {let sa=eQ(ERA,2.75,.78,1),av=[-13,8,-6],cr0=eQ(ELV,THS,.5,.9),V=2.6,
    add=(P,t0,r,b)=>{let t=t0;for(i=1;i<P.length;i++){let a=W(P[i-1]),c=W(P[i]),t1=t+hypot(...sb(P[i],P[i-1]))/V;gS(pk,c,r*1e3,cGo);gC(pk,a,c,r*1e3,cGo);HCS.push({a,b:c,t0:t,t1,r:r*1e3});t=t1}return t},
    arc=(e,A,ro,t0,r,n)=>{let P=sP(e,A,ro,n||5);return[P,add(P,t0,r)]},tw=(e,th,v,ro,t0,s)=>arc(e,[[th,v],[th+s*.06,v+.16],[th+s*.1,v+.32]],ro,t0,.4,3),t0,tL,tR,P;
   gE(nd,W(sa),ml(hR(eN(ERA,sa)),2200),ml(hLy,6500),ml(nm(cr(hR(eN(ERA,sa)),hLy)),2800),bri(cGo,1.25));gE(nd,W(av),ml(hLx,2600),ml(hLy,2000),ml(hLz,3600),bri(cGo,1.25));
   HL.sa=[W(sa),'Nœud sinusal',2];HL.av=[W(av),'Nœud auriculo-ventriculaire',2];HL.avl=[hA(W(av),-10,9,0),'Nœud auriculo-ventriculaire',2];HL.his=[hA(W(cr0),8,-3,0),'Faisceau de His',1];
   t0=add([av,lp(av,cr0,.5),cr0],130,.9);                                                                                                                  // faisceau de His
   [P,tL]=arc(ELV,[[THS,.5],[THS,.3]],.74,t0,.8);HL.bg=[W(eQ(ELV,THS-.5,-.15,.6)),'Branche gauche',1];
   for(let s of[-1,1]){let fa=[[THS,.3],[THS+s*.45,-.1],[THS+s*.78,-.55],[THS+s*.95,-.86]],Q,t;[Q,t]=arc(ELV,fa,.74,tL,.7,6);                               // faisceaux antérieur et postérieur de la branche gauche
     for(let k of[5,10,15,18]){let q=Q[k],v=(q[1]-ELV.c[1])/(ELV.s[1]*.74),th=atan2(q[2]-ELV.c[2],q[0]-ELV.c[0]),tk=tL+(t-tL)*k/18,B,tb;
       [B,tb]=arc(ELV,[[th,v],[th+s*.75,v+.04],[th+s*1.5,v+.1],[th+s*2.2,v+.14]],.74,tk,.45,5);for(let m of[4,9,14])tw(ELV,th+s*2.2*m/15,v+.12*m/15,.74,tk+(tb-tk)*m/15,s)}}
   [P,tR]=arc(ELV,[[THS,.5],[THS+.03,.05],[THS,-.42]],1,t0,.8,6);HL.bd=[W(eQ(ELV,THS,-.1,1.12)),'Branche droite',1];                                          // branche droite, puis bandelette modératrice
   {let m0=eQ(ELV,THS,-.42,1),m1=eQ(ERV,2.2,-.45,.93),t=add([m0,lp(m0,m1,.5),m1],tR,.6);
    for(let A of[[[2.2,-.45],[2.9,-.3],[3.6,-.12]],[[2.2,-.45],[1.75,-.2],[1.5,.1]],[[2.2,-.45],[2.4,0],[2.5,.3]]]){let[B,tb]=arc(ERV,A,.93,t,.45,5);tw(ERV,A[1][0],A[1][1],.93,(t+tb)/2,1)}}
   HL.pu=[W(eQ(ELV,.2,-.45,.62)),'Réseau de Purkinje',1];
   // billes qui porteront la vague : endocarde et épicarde du ventricule gauche, ventricule droit, oreillettes. [position, 0 ventricule / 1 oreillette, heure d'activation, de repolarisation, position au-dessus de la surface]
   let bd=(q,ch,ta,ep,qo)=>HP.push([W(q),ch,ta,ch?ta+190:ta+300-.85*(ta-160)-(ep?18:0),qo?W(qo):0]),n,th,v,q,h,se;
   for(i=0;i<22;i++){v=-.97+1.47*i/21;h=i/21;n=Math.round(44*sqrt(1-v*v))+1;for(j=0;j<n;j++){th=j/n*TAU+i*.3;q=eQ(ELV,th,v,.74);se=eF(ERV,eQ(ELV,th,v,1))<1;let te=se?160+16*h:163+30*h**1.1;
     bd(q,0,te,0);bd(eQ(ELV,th,v,1),0,te+(se?14:30),1,se?0:eQ(ELV,th,v,1.045))}}
   for(i=0;i<18;i++){v=-.95+1.45*i/17;h=i/17;n=Math.round(42*sqrt(1-v*v))+1;for(j=0;j<n;j++){th=j/n*TAU+i*.3;q=eQ(ERV,th,v,1);if(eF(ELV,q)<1.03||eF(ECO,q)<1)continue;bd(q,0,178+26*h,1,eQ(ERV,th,v,1.05))}}
   for(i=0;i<7;i++){v=-.3+1.2*i/6;n=Math.round(20*sqrt(1-v*v))+1;for(j=0;j<n;j++){th=j/n*TAU;q=eQ(ECO,th,v,1);if(eF(ELV,q)<1||eF(ERV,q)<1)continue;bd(q,0,224+10*i/6,1,eQ(ECO,th,v,1.08))}}
   for(let[e,o,dl]of[[ERA,ELA,0],[ELA,ERA,8]])for(i=0;i<13;i++){v=-.92+1.84*i/12;n=Math.round(26*sqrt(1-v*v))+1;for(j=0;j<n;j++){th=j/n*TAU+i*.4;q=eQ(e,th,v,1);if(eF(o,q)<1||eF(ELV,q)<1||eF(ERV,q)<1)continue;
     bd(q,1,dl+1.15*hypot(...sb(q,sa))/.8,1,eQ(e,th,v,1.06))}}}
  HL.vg=[hW(eQ(ELV,.5,-.72,1.2)),'Ventricule gauche',1];HL.vd=[hW(eQ(ERV,2.3,-.2,1.15)),'Ventricule droit',1];HL.od=[hW(eQ(ERA,2.6,.1,1.2)),'Oreillette droite',2];HL.og=[hW(eQ(ELP,.4,.3,1.6)),'Oreillette gauche',2];
  HL.us=[HBO,'Notre cellule',1];
  gK('vo',vo,PV,0,HM_V);gK('vg',vg,PV,1,HM_V);gK('ao',ao,PA,0,HM_A);gK('ag',ag,PA,1,HM_A);gK('xo',xo,HC0);gK('xg',xg,HC0,1);gK('pk',pk,PV,0,HM_V);gK('nd',nd,PA,0,HM_A)},

// ================= le cœur à l'instant t (ms depuis le départ de l'influx au nœud sinusal) =================
// G : cœur de verre (tissu de conduction et vague visibles dans la paroi) ou cœur opaque ; lab : noms à afficher ; dim : billes un peu éteintes (zoom arrière)
hbH=(t,G,lab,o)=>{o=o||{};let cv=cVe(t),ca=cAt(t),st=1-.13*cv,sl=1-.07*cv,sa=1-.09*ca,k=sl-st,y=hLy,
   vT=q=>{let d=sb(q,PV);return ad(PV,ad(ml(d,st),ml(y,k*dt(d,y))))},aT=q=>ad(PA,ml(sb(q,PA),sa)),TR=[q=>q,vT,aT];
  HM_V.set([st+k*y[0]*y[0],k*y[0]*y[1],k*y[0]*y[2],0,k*y[1]*y[0],st+k*y[1]*y[1],k*y[1]*y[2],0,k*y[2]*y[0],k*y[2]*y[1],st+k*y[2]*y[2],0,PV[0],PV[1],PV[2],1]);
  HM_A.set([sa,0,0,0,0,sa,0,0,0,0,sa,0,PA[0],PA[1],PA[2],1]);
  for(let n in HG)HG[n].forEach(h=>h.A=(G?o.nb?/g$/:/g$|pk|nd/:/o$/).test(n)?1:0);
  if(!o.nb)for(let P of HP){let[q,ch,ta,tr,qo]=P,d=t-ta,T=ch?aT:vT,r=ch?800:950;
    if(G){let c=ch?[.56,.3,.3,1]:R0;c=d<0?c:d<14?mix(c,FL,d/14):d<50?mix(FL,PL,(d-14)/36):t<tr?PL:t<tr+50?mix(PL,c,(t-tr)/50):c;hB(T(q),d>0&&d<30?r*1.25:r,o.dim?bri(c,.75):c)}
    else if(qo&&d>0&&d<36)hB(T(qo),1250*(1-d/36)+200,FL)}
  if(G&&!o.nb){for(let s of HCS){if(t<s.t0)continue;let e=1-ss((t-s.t1-25)/70);if(e>0)hLn(vT(s.a),vT(s.b),s.r*1.7,mix([.8,.62,.2,1],[2,1.8,.7,1],e));if(t<s.t1)hS(vT(lp(s.a,s.b,(t-s.t0)/(s.t1-s.t0))),1300,[2,2,1.2,1])}
    let pS=t>640?.7*((t-640)/220)**2:t<40?1-t/40:0,pA=t>40&&t<140?bmp(t,95,40):0;      // le nœud sinusal s'allume peu à peu, puis décharge ; le nœud auriculo-ventriculaire retient l'influx
    hS(aT(HL.sa[0]),2500+1800*pS,mix([.9,.7,.25,1],[2.2,2,1,1],pS));hS(aT(HL.av[0]),2300+1200*pA,mix([.9,.7,.25,1],[2.2,2,1,1],pA));
    o.us&&hS(vT(HBO),1500,[.4,1.6,1.7,1])}
  for(let n of lab||[]){let l=HL[n];l&&sxL(TR[l[2]](l[0]),l[1],o.hi==n.slice(0,2)?'e':'')}},

// ================= scènes à l'échelle de la cellule =================
// ---- un morceau de membrane en coupe : canaux, pompe, ions ; t : instant du potentiel d'action (ms) ; hi : canaux mis en avant ; cu : courant venu de la cellule voisine ----
hbCh=[['k1',-66,'Kir2.1 (IK1)',[.62,.42,1,1]],['pp',-44,'Pompe Na⁺/K⁺',[.95,.75,.25,1]],['na',-22,'Nav1.5',[1,.85,.2,1]],['to',0,'Kv4.3 (Ito)',[.8,.6,1,1]],['ca',22,'Cav1.2 (ICaL)',[1,.5,.12,1]],['kr',44,'hERG (IKr)',[.55,.4,.95,1]],['ks',66,'KCNQ1 (IKs)',[.45,.5,1,1]]],
hbMe=(t,hi,cu)=>{let V=vAP(t),dep=V>-30,op={k1:1-ss((V+78)/14),pp:.35,na:ss(t/.25)*(1-ss((t-1.1)/.6)),to:ss((t-1.5)/1.5)*(1-ss((t-12)/14)),ca:ss((t-2)/3)*(1-ss((t-205)/80)),kr:ss((t-30)/130)*(1-ss((t-318)/22)),ks:.75*ss((t-60)/170)*(1-ss((t-312)/22))},
   io=(x,dir,n,c,sd,v)=>{for(let j=0;j<n;j++){let a=(hbC*(v||1.2)+j/n+nh(sd+j))%1,w=abs(a-.5)*11,g=nh(sd+j*7+3)*TAU;hS(nq(x+w*cos(g),dir*(17-34*a),w*sin(g)),.001,c)}},j;
  hE(dHo,nq(0,0,0),ml(fA,.086),ml(fB,.0027),ml(fN,.034),[.8,.63,.36,1]);
  for(j=0;j<14;j++){let x=-77+11*j;hS(nq(x+5,5.2,0),.0008,dep?[.35,.55,1,1]:[1,.95,.75,1]);hS(nq(x+5,-5.2,0),.0008,dep?[1,.95,.75,1]:[.35,.55,1,1])}      // charges portées par les deux faces
  for(j=0;j<64;j++){let up=j&1,x=-82+164*nh(j*3.1),w=6.5+19*nh(j*5.7),ww=-26+52*nh(j*9.3),k=nh(j*1.7),c=up?(k<.72?IC.na:k<.86?IC.ca:IC.k):(k<.85?IC.k:IC.na);      // ions de part et d'autre : Na⁺ et Ca²⁺ surtout dehors, K⁺ surtout dedans
    hS(nq(x+1.5*sin(hbC*.9+j),(up?w:-w)+1.2*sin(hbC*1.3+j*2),ww),.0009,c)}
  for(let[k,x,n,c]of hbCh){let o=op[k],R=k=='pp'?3:2.5+1.7*o,cc=o>.3?bri(c,1.35):bri(c,.8),pl=k=='na'&&t>1.1&&V>-72;
    for(j=0;j<4;j++){let g=j*TAU/4+.785;for(let w of[-2.3,2.3])hS(nq(x+R*cos(g),w,R*sin(g)),k=='pp'?.0032:.0026,cc)}
    pl&&hS(nq(x,-5.6,0),.002,[1,.5,.12,1]);                                                                              // bouchon d'inactivation du canal sodique
    sxL(nq(x,(x/22&1?19:12)+(hi.includes(k)?2:0),0),pl?n+(LG?' · inactivated':' · inactivé'):n,hi.includes(k)?'e':'r');
    if(k=='pp'){io(x-1.5,-1,3,IC.na,11,.35);io(x+1.5,1,2,IC.k,17,.35)}else if(o>.25)io(x,k=='na'||k=='ca'?1:-1,Math.round((k=='na'?9:k=='k1'?3:5)*o),k=='na'?IC.na:k=='ca'?IC.ca:IC.k,x,k=='na'?2.2:1.2)}
  if(cu)for(j=0;j<12;j++){let a=(hbC*.8+j/12)%1;hS(nq(-88+110*a,-8.5-2*sin(a*9+j),2*cos(j*2.1)),.0012,[1.5,1.5,1.3,1])}
  sxL(nq(-70,30,0),dep?'Extérieur (−)':'Extérieur (+)');sxL(nq(-70,-24,0),dep?'Cytoplasme (+)':'Cytoplasme (−)')},
// ---- dyade : tubule T, citerne du réticulum, RyR2, Cav1.2, SERCA2a, NCX ; rel : phase de relaxation ----
hbDy=(t,rel)=>{let fl=bmp(t,1.5,2.5),op=!rel&&t>6&&t<48,cav=!rel&&t>1.5&&t<60,j,k,Y=[-46,-15.5,15.5,46],ry=[],sk=[];
  hT(nq(-112,-210,0),nq(-112,210,0),.112,mix([.8,.63,.36,1],[1.7,1.5,.7,1],fl));                                                              // tubule T (il s'allume au passage du potentiel d'action)
  hE(dHo,nq(36,0,0),ml(fA,.021),ml(fB,.118),ml(fN,.095),[.5,.72,.55,1]);                                                                      // citerne du réticulum jonctionnel
  for(let s of[-1,1]){hT(nq(50,s*74,0),nq(230,s*74,0),.017,[.5,.72,.55,1]);for(k=0;k<3;k++){let q=nq(95+k*48,s*57,0);sk.push(q);hS(q,.0048,[.35,.6,1.2,1]);hS(nq(102+k*48,s*54,6),.0022,[1.2,.6,.85,1])}}      // réticulum longitudinal, SERCA2a et phospholamban
  for(j=0;j<4;j++)for(k=0;k<4;k++){if((j==0||j==3)&&k==3)continue;let q=nq(8.5,Y[j],Y[k]);ry.push([Y[j],Y[k]]);hS(q,.0118,op?[.5,1.5,.7,1]:[.3,.62,.4,1])}                                  // amas de 14 récepteurs de la ryanodine
  for(let[a,b]of[[-31,-31],[31,-31],[0,0],[-31,31],[31,31]]){for(k=0;k<4;k++){let g=k*TAU/4,R=cav?3.6:2.6;hS(nq(-.5,a+R*cos(g),b+R*sin(g)),.0024,cav?[1.3,.65,.2,1]:[.8,.4,.1,1])}
    if(cav)for(k=0;k<2;k++){let a2=(hbC*1.6+k/2+nh(a+b))%1;hS(nq(-1+8*a2,a,b),.0009,IC.ca)}}                                                                                                 // quelques Ca²⁺ entrent par les canaux du tubule
  let nx=nq(0,-165,0);for(k=0;k<4;k++){let g=k*TAU/4;hS(nq(-.5,-165+4*cos(g),4*sin(g)),.003,[.95,.45,1,1])}                                                                                   // échangeur NCX
  for(j=0;j<230;j++){let h1=nh(j*1.3),g=nh(j*3.7)*TAU,q;
    if(!rel){let age=t-(6+h1*34);if(age<0)continue;let d=9*age**.78,[a,b]=ry[j%14],x=8+4*(nh(j*5.1)-.5)+(d>88?(nh(j*7.7)-.35)*(d-88)*1.5:0);q=nq(x,a*.6+d*cos(g),b*.6+d*sin(g))}
    else{let d=70+200*nh(j*5.1),tc=165+h1*225,q0=nq(30+(nh(j*7.7)-.3)*150,d*cos(g),d*sin(g)*.7),s=j%7<5?sk[j%6]:nx,e=ss((t-tc+35)/35);if(t>tc)continue;q=lp(ad(q0,[.004*sin(hbC*2+j),0,.004*cos(hbC*1.7+j)]),s,e)}
    hS(q,.001,IC.ca)}
  if(rel)for(k=0;k<3;k++){let a=(hbC*.7+k/3)%1;hS(nq(14-16*a,-165+3*sin(k*2.1),3*cos(k*2.1)),.0009,IC.na)}                                                                                  // trois Na⁺ entrent pour chaque Ca²⁺ expulsé
  sxL(nq(-112,225,0),'Tubule T');sxL(nq(40,132,0),'Citerne du réticulum sarcoplasmique');sxL(nq(8.5,68,50),'RyR2',rel?'r':'e');sxL(nq(-4,-12,56),'Cav1.2',rel?'r':'e');
  sxL(nq(150,104,0),'SERCA2a',rel?'e':'r');sxL(nq(170,46,8),'phospholamban','r');sxL(nq(-6,-182,0),'NCX',rel?'e':'r');sxL(nq(130,0,0),LG?'to the myofilaments →':'vers les myofilaments →','r')},
// ---- filament fin (actine, tropomyosine, troponines) et filament épais (têtes de myosine) ----
hbTn=a=>{let ca=ss((a-.08)/.18),sh=ss((a-.3)/.14),on=a>.45,Tc=.11,sl=on?-(a-.45)/Tc*43.6:0,i,k,s,de=.95-.6*sh,gam=(ii,s)=>.2338*ii-(s?3.1416:0),lbl=0;
  hT(nq(-84,-16,0),nq(84,-16,0),.0075,[.5,.27,.52,1]);
  for(i=Math.ceil((-80-sl)/2.75);i<=(80-sl)/2.75;i++){let x=2.75*i+sl,g=-2.9078*i;hS(nq(x,10+2.6*cos(g),2.6*sin(g)),.0027,i&1?[.9,.5,.55,1]:[.76,.38,.45,1])}
  for(s=0;s<2;s++){let pr=0;for(let x=-80;x<=80;x+=1.6){let g=gam((x-sl)/2.75,s)+de,q=nq(x,10+4.4*cos(g),4.4*sin(g));pr&&hLn(pr,q,.0009,[1,.95,.75,1]);pr=q}                                  // tropomyosine
    for(k=Math.ceil(((-76-sl)/2.75-(s?7:0))/14);;k++){let ii=14*k+(s?7:0),x=2.75*ii+sl;if(x>76)break;let g=gam(ii,s)+de,P=(dx,r,dg)=>nq(x+dx,10+r*cos(g+dg),r*sin(g+dg)),tc=P(0,7.8,0),c=cos(g);
      for(i=1;i<4;i++)hS(P(-3.4*i,5.3,0),.0015,[.4,.78,.45,1]);hS(P(1,5.8,-.75*(1-sh)),.0021,[.35,.5,1,1]);hS(tc,.002,ca>.9?[1.7,1.35,.4,1]:[1,.78,.25,1]);hS(P(3.4,7.8,0),.0019,[.95,.72,.22,1]);      // troponine T, I, C
      ca>0&&hS(lp(nq(x+10+6*s,34,8),P(-1.2,9.2,.3),ca),.0009,IC.ca);
      if(!lbl&&c>.6&&abs(x)<45){lbl=1;sxL(P(1.5,17,0),LG?'Troponin C (TNNC1)':'Troponine C (TNNC1)','e');sxL(P(-15,11,0),LG?'troponin T':'troponine T','r');sxL(P(11,2.5,0),LG?'troponin I':'troponine I','r')}}}
  for(k=-5;k<=5;k++){let xb=14.3*k,w=k&1?2.4:-2.4,c=on?(((a-.45)/Tc+k*.37)%1):.5,al,yh;                                                                                                  // têtes de myosine : attachée, bascule, détachée, réarmée
    if(c<.25)al=.61-1.05*c/.25,yh=3.3;else if(c<.4)al=-.44,yh=3.3*(1-(c-.25)/.15);else if(c<.8)al=-.44+1.05*(c-.4)/.4,yh=0;else al=.61,yh=3.3*(c-.8)/.2;
    let B=nq(xb,-8.5,w),H=nq(xb+11*sin(al),.6+yh*.8,w*.6);hLn(nq(xb-7,-9.5,w),B,.001,[.6,.35,.62,1]);hLn(B,H,.0012,[.7,.42,.72,1]);hS(H,.0032,on&&c<.25?[1.15,.6,1.2,1]:[.72,.42,.78,1]);
    k==1&&sxL(nq(xb+4,-4,w+6),LG?'myosin head':'tête de myosine','r')}
  sxL(nq(-58,22,0),LG?'Thin filament: actin':'Filament fin : actine');sxL(nq(52,19,0),LG?'tropomyosin':'tropomyosine','r');sxL(nq(0,-28,0),LG?'Thick filament: myosin':'Filament épais : myosine');
  on&&sxL(nq(-70,30,0),LG?'← towards the centre of the sarcomere':'← vers le centre du sarcomère','e')},
// ---- un sarcomère entier, qui raccourcit ----
hbSa=a=>{let c=cFo(400*a)/.9,h=1.1-.13*c,d=.15,i,j,k,L=[],Tn={};
  for(let s of[-1,1])hE(dHo,lc(s*h,0,0),ml(fA,.035),ml(fB,.5),ml(fN,.5),[.36,.2,.16,1]);hE(dHo,lc(0,0,0),ml(fA,.02),ml(fB,.44),ml(fN,.44),[.42,.26,.46,1]);
  for(i=-2;i<=2;i++)for(j=-2;j<=2;j++){if(abs(i+j)>2)continue;let y=d*(i+j/2),w=d*j*.866;L.push([y,w]);for(k=0;k<6;k++){let g=k*TAU/6+.5236,ty=y+d/1.732*cos(g),tw=w+d/1.732*sin(g);Tn[Math.round(ty*100)+'_'+Math.round(tw*100)]=[ty,tw]}}
  for(let[y,w]of L){hT(lc(-.8,y,w),lc(.8,y,w),.017,[.62,.34,.66,1]);for(let s of[-1,1]){let pr=lc(s*h,y,w);for(k=1;k<=6;k++){let q=lc(s*(h-(h-.8)*k/6),y+(k<6?.02*(k&1?1:-1):0),w);hLn(pr,q,.004,[.75,.75,.78,1]);pr=q}}}      // filaments épais, ressorts de titine
  for(let n in Tn){let[y,w]=Tn[n];for(let s of[-1,1])hLn(lc(s*h,y,w),lc(s*(h-1),y,w),.008,[.95,.55,.6,1])}                                                                                  // filaments fins
  sxL(lc(-h,.78,0),'Strie Z');sxL(lc(h,.78,0),'Strie Z');sxL(lc(0,.58,0),'Ligne M','r');sxL(lc(0,-.6,0),LG?'A band: 1.6 µm, unchanged':'Bande A : 1,6 µm, inchangée');
  sxL(lc(-(h+.8)/2,-.6,0),LG?'I band: shortens':'Bande I : rétrécit','e');sxL(lc(-(h+.8)/2,.62,0),LG?'titin':'titine','r');sxL(lc(0,.95,0),(LG?'Sarcomere: ':'Sarcomère : ')+(2*h).toFixed(2).replace('.',LG?'.':',')+' µm','e')},
// ---- plaque de jonction communicante entre deux cellules ; t (ms) ----
hbGj=t=>{let dV=cl((vAP(t)-vAP(t-.25))/60,0,1),o2=t>.25&&t<1.6,i,j,k;
  for(let s of[-1,1])hE(dHo,nq(s*4.3,0,0),ml(fA,.0025),ml(fB,.082),ml(fN,.05),[.8,.63,.36,1]);
  for(i=-2;i<=2;i++)for(j=-2;j<=2;j++){if(abs(i+j)>2)continue;let y=9.5*(i+j/2)-8,w=9.5*j*.866;for(k=0;k<6;k++){let g=k*TAU/6;for(let x of[-6.2,-2.3,2.3,6.2])hS(nq(x,y+3.1*cos(g),w+3.1*sin(g)),.0016,x<0?[.2,.85,.8,1]:[.25,.7,.95,1])}
    if(dV>.05)for(k=0;k<2;k++){let a=(hbC*1.5+k/2+nh(i*7+j*3))%1;hS(nq(-22+44*a,y,w),.001,nh(i+j*5+k)<.8?IC.k:IC.na)}}
  for(k=0;k<4;k++){let g=k*TAU/4,R=o2?4.2:2.6;for(let x of[2.2,6.4])hS(nq(x,58+R*cos(g),R*sin(g)),.0026,o2?[1.35,1.15,.3,1]:[.8,.68,.16,1])}                                              // un canal Nav1.5 de la cellule suivante
  if(o2)for(k=0;k<6;k++){let a=(hbC*2.2+k/6)%1;hS(nq(-3+26*a,58+2*sin(k*2.1),2*cos(k*2.1)),.001,IC.na)}
  sxL(nq(-34,72,0),t>0?(LG?'Cell 1: depolarised (+)':'Cellule 1 : dépolarisée (+)'):(LG?'Cell 1: at rest (−)':'Cellule 1 : au repos (−)'));sxL(nq(36,-72,0),t>.5?(LG?'Cell 2: depolarised (+)':'Cellule 2 : dépolarisée (+)'):(LG?'Cell 2: at rest (−)':'Cellule 2 : au repos (−)'));
  sxL(nq(0,-36,0),LG?'Connexin 43 channels':'Canaux de connexine 43','e');sxL(nq(24,60,0),'Nav1.5',o2?'e':'r');sxL(nq(0,84,0),LG?'gap: a few nanometres':'espace : quelques nanomètres','r')},
// ---- trois cellules bout à bout et leurs voisines ; ta : instant (ms) depuis l'arrivée de l'influx à gauche ----
hbFi=ta=>{let r,i,k;
  for(r=-1;r<=1;r++)for(i=-3;i<=3;i++){let xc=i*122+(r&1)*61,y=r*20.5;if(abs(xc)>125)continue;
    for(k=0;k<6;k++){let x=xc-60+k*20;hT(lc(x,y,0),lc(x+20,y,0),9.3,hCo(ta-(x+190)/480))}
    for(k=1;k<54;k++){let x=xc-60+k*2.2;hT(lc(x-.14,y,0),lc(x+.14,y,0),9.36,[.3,.07,.09,1])}
    hT(lc(xc+60,y,0),lc(xc+62,y,0),9.6,[.27,.1,.1,1]);                                                                                                                                 // disque intercalaire
    for(k=0;k<10;k++){let g=k*TAU/10+r;hB(lc(xc+61,y+9.7*cos(g),9.7*sin(g)),k%2?.9:.7,k%2?[.2,1.1,1,1]:[.12,.05,.05,1])}}
  hT(lc(-185,10.2,13),lc(185,10.2,13),2.5,[.8,.36,.34,1]);for(k=0;k<6;k++)hB(lc(-180+((hbC*30+k*60)%360),10.2,13),2.3,[1,.2,.15,1]);                                                    // un capillaire
  sxL(lc(61,15,0),LG?'Intercalated disc':'Disque intercalaire','e');sxL(lc(61,-16,6),LG?'gap junctions (turquoise), desmosomes (dark)':'jonctions communicantes (turquoise), desmosomes (sombres)','r');
  sxL(lc(0,0,12),LG?'Our cell':'Notre cellule');sxL(lc(-110,36,13),LG?'capillary':'capillaire','r');sxL(lc(-170+cl(ta*480,0,330),-38,0),LG?'action potential →':'potentiel d\'action →','e')},
// ---- un bloc de tissu : la vague part d'un point et s'étend en ellipse ----
hbTi=(ta,dm)=>{for(let l=0;l<2;l++)for(let r=-21;r<=21;r++)for(let i=-7;i<=7;i++){let xc=i*122+((r+l)&1)*61,y=r*21.5,w=l*21-10.5;hT(lc(xc-59,y,w),lc(xc+59,y,w),9.6,dm?bri(hCo(ta-hypot(xc/500,y/185,w/185)),dm):hCo(ta-hypot(xc/500,y/185,w/185)))}},
// ---- orientation des fibres dans l'épaisseur de la paroi ----
hbFs=()=>{for(let w=0;w<5;w++){let al=(60-27.5*w)*PI/180,D=ad(ml(fA,cos(al)),ml(fB,sin(al))),Pp=ad(ml(fA,-sin(al)),ml(fB,cos(al))),o=ma(HBO,fN,(w/4-.5)*8600),c=mix([1.3,.85,.3,1],[.5,.65,1.4,1],w/4);
    for(let k=-3;k<=3;k++)hLn(ad(o,ad(ml(Pp,k*900),ml(D,-3600))),ad(o,ad(ml(Pp,k*900),ml(D,3600))),.003*z+25,c);
    w%2||z>1e4||sxL(ad(o,ml(D,4300)),[LG?'endocardium: fibres at +60°':'endocarde : fibres à +60°',0,LG?'mid-wall: our cell':'milieu de la paroi : notre cellule',0,LG?'epicardium: −50°':'épicarde : −50°'][w],w==2?'e':'')}},

// ================= oscilloscope et électrocardiogramme =================
hbOs=(M,S)=>{let o=S&&S.o;if(!o){osc.style.display='none';return}osc.style.display='block';
  let g=osc.getContext('2d'),W=660,H=192,[t0,t1]=o.ms,[y0,y1]=o.y||[-95,45],X=t=>52+(t-t0)/(t1-t0)*(W-66),Y=v=>H-28-(v-y0)/(y1-y0)*(H-58),xc=o.x(M.ta,M),i,
   tr=(f,c,w,m)=>{g.strokeStyle=c;g.lineWidth=w;g.beginPath();for(i=0;i<=220;i++){let t=t0+i/220*(t1-t0);if(t>m)break;g[i?'lineTo':'moveTo'](X(t),Y(f(t)))}g.stroke()};
  g.clearRect(0,0,W,H);g.font='17px sans-serif';g.textAlign='left';g.fillStyle='#9df';g.fillText(o.l,52,18);
  g.font='14px sans-serif';(o.lg||[]).forEach(([c,n],j)=>{let x=W-12-(o.lg.length-j)*118;g.fillStyle=c;g.beginPath();g.arc(x,H-9,5,0,7);g.fill();g.fillText(n,x+9,H-4)});
  g.textAlign='right';for(let v of o.k||[-85,0]){g.fillStyle='#9bc';g.fillText((''+v).replace('-','−').replace('.',LG?'.':','),46,Y(v)+5);g.strokeStyle='#fff3';g.lineWidth=1;g.beginPath();g.moveTo(52,Y(v));g.lineTo(W-12,Y(v));g.stroke()}
  g.textAlign='left';g.fillStyle='#9bc';g.fillText((o.un==null?'mV':o.un)+' · '+(''+(t1-t0)).replace('.',LG?'.':',')+' ms',8,H-4);
  g.save();g.beginPath();g.rect(50,22,W-60,H-48);g.clip();(o.g||[]).forEach(([f,c])=>tr(f,c,2.5,9e9));tr(o.f,'#fff5',2,9e9);tr(o.f,'#fd5',4,xc);g.restore();
  (o.w||[]).forEach(([t,n])=>{g.fillStyle='#cde';g.textAlign='center';g.fillText(n,X(t),38)});g.fillStyle='#fff';g.beginPath();g.arc(X(xc),Y(o.f(xc)),6,0,7);g.fill()},
oAP=(x,ms,l)=>({l:l||'Potentiel de membrane',ms:ms||[-40,400],f:vAP,x}),
oCa=(x,fo)=>({l:'Potentiel, calcium'+(fo?', force':''),ms:[-40,400],f:vAP,x,g:[[t=>-85+105*cCa(t),'#f93']].concat(fo?[[t=>-85+105*cFo(t),'#6d8']]:[]),lg:[['#f93','Ca²⁺']].concat(fo?[['#6d8','force']]:[])}),
oEC=x=>({l:'Électrocardiogramme',ms:[0,860],y:[-.45,1.3],k:[0,1],f:ecg,x,w:[[62,'P'],[192,'QRS'],[457,'T']]}),
// ================= les dix-huit étapes =================
hbLg=(...a)=>a.map(([n,c])=>[n,'#'+c]),lgI=[['Na⁺','ffd933'],['K⁺','b880ff'],['Ca²⁺','ff8019']],
HBS=[
 {k:'rep',z:.05,pit:.17,T:7,o:oAP(a=>-36+30*a),leg:hbLg(...lgI,['Kir2.1','9e6bff'],['pompe Na⁺/K⁺','f2bf40']),d:a=>hbMe(-30,['k1','pp'])},
 {k:'ph0',z:.05,pit:.17,T:8,o:oAP(a=>-1+4.6*a,[-1,4]),leg:hbLg(...lgI,['Nav1.5','ffd933']),d:a=>hbMe(-1+4.6*a,['na'],a<.3)},
 {k:'ph1',z:.05,pit:.17,T:8,o:oAP(a=>-3+38*a,[-5,40]),leg:hbLg(...lgI,['Kv4.3','cc99ff'],['Cav1.2','ff8019']),d:a=>hbMe(-3+38*a,['to'])},
 {k:'ph2',z:.05,pit:.17,T:9,o:oAP(a=>8+245*a),leg:hbLg(...lgI,['Cav1.2','ff8019'],['hERG','8c66f2'],['KCNQ1','7380ff']),d:a=>hbMe(8+245*a,['ca','kr','ks'])},
 {k:'ph3',z:.05,pit:.17,T:9,o:oAP(a=>235+150*a),leg:hbLg(...lgI,['hERG','8c66f2'],['KCNQ1','7380ff'],['Kir2.1','9e6bff']),d:a=>hbMe(235+150*a,['kr','ks','k1'])},
 {k:'dya',z:.19,pit:.12,cl:[.075,0,0],T:9,o:oCa(a=>-6+70*a),leg:hbLg(['Ca²⁺','ff8019'],['RyR2','4d9e66'],['Cav1.2','cc661a'],['SERCA2a','5999ff'],['NCX','f273ff']),d:a=>hbDy(-6+70*a)},
 {k:'tnc',z:.045,T:11,o:oCa(a=>250*a,1),leg:hbLg([LG?'actin':'actine','e68089'],[LG?'tropomyosin':'tropomyosine','fff2bf'],['troponine C','ffc740'],['troponine I','5980ff'],['troponine T','66c773'],[LG?'myosin':'myosine','b86bc7'],['Ca²⁺','ff8019']),d:a=>hbTn(a)},
 {k:'sar',z:.82,T:8,o:oCa(a=>400*a,1),leg:hbLg(['filaments épais','9e57a8'],['filaments fins','f28c99'],[LG?'titin':'titine','bfbfc7'],['stries Z','5c3329']),d:a=>hbSa(a)},
 {k:'rel',z:.19,pit:.12,cl:[.075,0,0],T:9,o:oCa(a=>150+250*a),leg:hbLg(['Ca²⁺','ff8019'],['SERCA2a','5999ff'],['phospholamban','ff99d9'],['NCX','f273ff'],['Na⁺','ffd933']),d:a=>hbDy(150+250*a,1)},
 {k:'gjn',z:.045,T:8,o:Object.assign(oAP(a=>-.6+3.6*a,[-1,4],'Cellule 1, puis cellule 2'),{g:[[t=>vAP(t-.25),'#6df']],lg:[['#fd5','cellule 1'],['#6df','cellule 2']]}),leg:hbLg(['connexine 43','33d9cc'],['K⁺','b880ff'],['Na⁺','ffd933'],['Nav1.5','ffd933']),d:a=>hbGj(-.6+3.6*a)},
 {k:'fib',z:108,T:7,o:Object.assign(oAP(a=>-.3+1.9*a,[-.5,2],'Trois cellules à la suite'),{g:[[t=>vAP(t-.25),'#6df'],[t=>vAP(t-.5),'#f9c']],lg:[['#fd5','1'],['#6df','2'],['#f9c','3']]}),leg:hbLg([LG?'rest':'repos','73202a'],['front','ffe680'],['plateau','ff8029']),d:a=>hbFi(-.3+1.9*a)},
 {k:'tis',z:560,T:7,leg:hbLg([LG?'rest':'repos','73202a'],['front','ffe680'],['plateau','ff8029']),d:a=>{hbTi(3.4*a);sxL(lc(200,-540,0),LG?'along the fibres: fast →':'dans le sens des fibres : rapide →','e');sxL(lc(200,540,0),LG?'↑ across: 2 to 3 times slower':'↑ en travers : 2 à 3 fois plus lent','e')}},
 {k:'zoo',z:560,T:13,h:1.25,H:2,zf:a=>560*88**ss(a/.82),leg:hbLg([LG?'endocardium':'endocarde','ffd94d'],['milieu de la paroi','bfbfd9'],['épicarde','80a6ff']),d:(a,M)=>{z<5000&&hbTi((hbC*1.1)%4.2,z>2500?(5000-z)/2500*.9+.1:1);z>1100&&z<1.7e4&&hbFs();hbH(700,1,z>2.2e4?['us','vg','vd','ao','tp']:[],{us:z>9e3,dim:1,nb:z<1.3e4})}},
 {k:'nsa',z:1.5e4,T:9,h:1,H:1,C:'sa',o:{l:'Cellule du nœud sinusal',ms:[-500,360],y:[-75,25],k:[],un:'',f:vSA,x:a=>-260+330*a},leg:hbLg(['tissu de conduction','e6b340'],['excité','ffe680']),d:a=>hbH((600+330*a)%860,1,['sa','od','vcs'],{hi:'sa'})},
 {k:'nav',z:3e4,T:9,H:1,C:'at',o:oEC(a=>-5+185*a),leg:hbLg([LG?'rest':'repos','8f4d4d'],['front','ffe680'],['plateau','ff8029'],['tissu de conduction','e6b340']),d:a=>hbH(-5+185*a,1,['sa','avl','od','og','his'],{hi:'av'})},
 {k:'pur',z:3.6e4,T:10,H:1,C:'ve',o:oEC(a=>118+145*a),leg:hbLg([LG?'rest':'repos','73202a'],['front','ffe680'],['plateau','ff8029'],['tissu de conduction','e6b340']),d:a=>hbH(118+145*a,1,['avl','his','bg','bd','pu','vg','vd','us'],{us:1})},
 {k:'rpo',z:3.8e4,T:10,H:1,C:'ve',o:oEC(a=>225+410*a),leg:hbLg([LG?'rest':'repos','73202a'],['plateau','ff8029']),d:a=>hbH(225+410*a,1,['vg','vd','ao','tp'],{})},
 {k:'tot',z:5e4,T:5.2,h:1,H:1,o:oEC(a=>860*a),leg:hbLg(['artères coronaires','ff3d2e'],[LG?'veins':'veines','526bd9'],['passage de l\'influx','ffe680']),d:a=>hbH(860*a,0,['ao','tp','vcs','vg','vd','od','iva','cx','cd'],{})}],
HBT=[
 [`Au repos : une pile chargée`,`Membrane du cardiomyocyte · scène large de 200 nm`,`Vous êtes devant un morceau de la membrane de la cellule, vu en coupe : l'extérieur en haut, le cytoplasme en bas. Au repos, l'intérieur est négatif, voisin de −85 mV. Deux protéines y veillent. La pompe Na⁺/K⁺ (dorée) rejette trois Na⁺ et fait entrer deux K⁺ à chaque ATP : elle entretient les gradients. Le canal Kir2.1 (courant IK1), ouvert au repos, laisse fuir un peu de K⁺ (violet) : c'est lui qui fixe le potentiel près du potentiel d'équilibre du potassium. Tous les autres canaux sont fermés. Sur l'oscilloscope, la ligne est plate.`],
 [`Phase 0 : le sodium s'engouffre`,`Membrane · 5 millisecondes`,`Un courant arrive de la cellule voisine (charges blanches, sous la membrane) et dépolarise la membrane jusqu'au seuil. Les canaux Nav1.5 (gène SCN5A) s'ouvrent : le Na⁺ (jaune) entre en masse, et le potentiel dépasse 0 mV en une à deux millisecondes. Les charges portées par les deux faces de la membrane s'inversent. Presque aussitôt, les canaux s'inactivent d'eux-mêmes (bouchon orangé) : ils ne pourront se rouvrir qu'une fois la membrane repolarisée. L'oscilloscope est ici très étalé : il ne montre que cinq millisecondes.`],
 [`Phase 1 : l'encoche`,`Membrane · 45 millisecondes`,`À peine le sommet atteint, un courant potassique transitoire, Ito (canal Kv4.3 et sa sous-unité KChIP2), laisse sortir un peu de K⁺ : le potentiel redescend légèrement et dessine une encoche. Elle est plus marquée dans les cellules proches de l'épicarde que dans celles de l'endocarde. Pendant ce temps, les canaux calciques Cav1.2 commencent à s'ouvrir.`],
 [`Phase 2 : le plateau`,`Membrane · 250 millisecondes`,`C'est la signature du cœur. Pendant plus de deux cents millisecondes, deux courants s'équilibrent : le Ca²⁺ (orangé) entre par les canaux Cav1.2 (courant ICaL), le K⁺ sort par les canaux hERG (IKr) et KCNQ1 (IKs), qui s'ouvrent lentement. Le potentiel reste donc proche de 0 mV. Ce plateau fait durer le potentiel d'action 250 à 400 ms environ chez l'humain (235 ms mesurés in vivo), une centaine de fois plus que celui d'un neurone. Le calcium qui entre va déclencher la contraction.`],
 [`Phase 3 : la repolarisation`,`Membrane · 150 millisecondes`,`Les canaux calciques se referment et les courants potassiques l'emportent : IKr fait l'essentiel du travail dans le ventricule humain, IKs sert de réserve, puis Kir2.1 (IK1) termine la descente et rétablit le repos. Les canaux Nav1.5 perdent alors leur bouchon. Jusque-là, pendant presque toute la durée du potentiel d'action, la cellule ne pouvait pas être réexcitée : c'est la période réfractaire. Elle empêche les contractions de fusionner et laisse au cœur le temps de se remplir.`],
 [`La dyade : le calcium libère le calcium`,`Tubule T et réticulum sarcoplasmique · scène large de 500 nm`,`Reculons d'un cran. Le potentiel d'action s'enfonce dans la cellule par les tubules T, des replis de la membrane (à gauche, il s'allume). Là, à 12 à 15 nm seulement, se trouve une citerne du réticulum sarcoplasmique, pleine de calcium : l'ensemble forme une dyade. Quelques Ca²⁺ entrent par les canaux Cav1.2 du tubule et se fixent sur les récepteurs de la ryanodine RyR2 (verts) qui leur font face, en amas d'une quinzaine. Les RyR2 s'ouvrent et libèrent le calcium de la citerne : chaque amas produit une « étincelle calcique ». Toutes les dyades de la cellule s'allument ensemble, et le calcium libre du cytosol passe d'environ 0,1 µM à un peu moins de 1 µM.`],
 [`Troponine C : le calcium démasque l'actine`,`Filament fin et filament épais · scène large de 150 nm`,`Le calcium diffuse jusqu'aux myofilaments. Sur le filament fin d'actine (rose), les sites où la myosine pourrait s'accrocher sont masqués par la tropomyosine (ruban clair), tenue en place par le complexe des troponines. Un Ca²⁺ se fixe sur la troponine C (dorée) — la protéine que fabrique le gène de cette cellule, TNNC1. Dans le cœur, un seul de ses sites sert de déclencheur. La troponine I (bleue) lâche alors l'actine pour s'accrocher à la troponine C, et la tropomyosine glisse sur le côté. Les têtes de myosine du filament épais (violet) s'attachent, basculent d'une dizaine de nanomètres en consommant chacune un ATP, se détachent et recommencent : le filament fin est tiré vers le centre du sarcomère. Les premières têtes attachées aident à écarter davantage la tropomyosine.`],
 [`Le sarcomère raccourcit`,`Un sarcomère, d'une strie Z à l'autre · environ 2 µm`,`À cette échelle, on voit le sarcomère entier. Les filaments fins partent des stries Z ; les filaments épais, longs de 1,6 µm, occupent le centre, reliés par la ligne M. Quand les têtes de myosine tirent, aucun filament ne raccourcit : ils glissent les uns entre les autres. Les stries Z se rapprochent, la bande I (filaments fins seuls) rétrécit, la bande A (filaments épais) garde sa longueur. La titine (ressorts gris), la plus grande protéine connue, relie chaque filament épais à la strie Z : étirée pendant le remplissage, elle rappelle le sarcomère à sa longueur. Plus le sarcomère est étiré au départ, plus il répond au calcium : c'est la base de la loi de Frank-Starling. Pour la lisibilité, les filaments sont dessinés bien plus écartés qu'en réalité.`],
 [`Relaxation : ranger le calcium`,`Dyade et réticulum longitudinal · scène large de 500 nm`,`Pour que le cœur se relâche et se remplisse, le calcium doit quitter le cytosol. La pompe SERCA2a (bleue) en renvoie la plus grande part dans le réticulum — environ les deux tiers à trois quarts chez le lapin, et à peu près autant chez l'humain — en consommant de l'ATP. Son frein, le phospholamban (rose), se lève quand il est phosphorylé sous l'effet de l'adrénaline : le cœur se relâche plus vite. L'échangeur NCX (mauve) expulse presque tout le reste hors de la cellule, en faisant entrer trois Na⁺ (jaunes) pour chaque Ca²⁺. La troponine C libère son calcium, la tropomyosine recouvre l'actine : le sarcomère se détend.`],
 [`Jonctions communicantes : le courant passe`,`Disque intercalaire · scène large de 150 nm`,`Au bout de la cellule, sa membrane (à gauche) fait face à celle de la cellule suivante (à droite). Dans une plaque de jonction communicante, les deux membranes ne sont séparées que de quelques nanomètres, et des canaux les traversent toutes deux : chacun est fait de deux demi-canaux de six connexines 43, un par cellule, accolés bout à bout. Les ions passent directement d'un cytoplasme à l'autre. La cellule de gauche vient de se dépolariser : des charges positives s'écoulent vers celle de droite, qui atteint son seuil, ouvre ses propres canaux Nav1.5 et s'embrase à son tour. Chaque canal conduit peu (60 à 100 pS), mais une plaque en réunit un grand nombre. La connexine 43 est renouvelée sans cesse : sa demi-vie est d'environ une heure et demie chez le rat.`],
 [`De cellule en cellule`,`Notre cellule et ses voisines · scène large de 500 µm`,`Reculons encore : voici notre cellule et ses voisines, attachées bout à bout par les disques intercalaires (plaques sombres). Trois jonctions s'y côtoient : les jonctions communicantes pour le courant, les desmosomes et les jonctions adhérentes pour tenir les cellules ensemble quand elles tirent. Le potentiel d'action (jaune) parcourt une cellule, franchit le disque, gagne la suivante : à un demi-mètre par seconde environ, il lui faut à peu près un quart de milliseconde par cellule. Derrière le front, les cellules restent dépolarisées (orangé) pendant tout le plateau : l'influx ne peut pas revenir sur ses pas.`],
 [`Une vague dans le tissu`,`Myocarde · scène large de 2 mm`,`Des centaines de cellules, toutes alignées. L'influx part d'un point et s'étend en ellipse : il court deux à trois fois plus vite dans le sens des fibres qu'en travers, parce que les jonctions communicantes sont concentrées aux extrémités des cellules. Le myocarde se comporte ainsi comme une seule grande cellule — un syncytium fonctionnel : dès qu'un point est excité, tout le tissu sain alentour le sera. C'est pourquoi une cicatrice, qui ne conduit pas, ou un tissu où les jonctions se raréfient, peut dévier la vague, voire la faire tourner sur elle-même.`],
 [`Zoom arrière : la paroi, puis le cœur`,`De 2 mm à 15 cm`,`Le champ s'élargit. Les cellules deviennent des fibres, et l'on découvre que leur direction tourne régulièrement dans l'épaisseur de la paroi : d'environ +60° près de l'endocarde (à l'intérieur) à −40 ou −60° près de l'épicarde (à l'extérieur), en passant par l'horizontale vers le milieu, là où se trouve notre cellule. Grâce à cet enroulement en hélice, le ventricule ne se contente pas de se resserrer : il se tord, la pointe tournant d'une vingtaine de degrés par rapport à la base, comme un linge qu'on essore. Encore un peu de recul, et cette paroi d'environ un centimètre trouve sa place : c'est celle du ventricule gauche, dans le cœur entier (ici en verre, pour voir à l'intérieur).`],
 [`Le nœud sinusal : l'étincelle`,`Oreillette droite, au pied de la veine cave supérieure`,`D'où vient le courant qui a excité notre cellule ? De ce petit amas de cellules (doré), dans la paroi de l'oreillette droite. Les cellules du nœud sinusal n'ont pas de potentiel de repos stable : après chaque battement, le courant « funny » If (canal HCN4) et une horloge calcique interne les dépolarisent lentement jusqu'au seuil (la pente douce, sur l'oscilloscope). Au centre du nœud, la montée du potentiel d'action est portée par des canaux calciques, non sodiques : elle est lente. Livré à lui-même, le nœud battrait à une centaine de coups par minute chez l'adulte jeune (118 − 0,57 × l'âge) ; au repos, le nerf vague le freine, et à l'effort le système sympathique l'accélère.`],
 [`Les oreillettes, puis le nœud auriculo-ventriculaire`,`Les deux oreillettes · onde P`,`L'influx gagne les deux oreillettes de proche en proche, à 0,7–1 m/s : c'est l'onde P de l'électrocardiogramme. Les oreillettes se contractent et achèvent de remplir les ventricules. Entre oreillettes et ventricules, un anneau de tissu fibreux ne conduit pas l'électricité : le seul passage est le nœud auriculo-ventriculaire (doré, à la base de la cloison). Ses cellules conduisent très lentement et retiennent l'influx 80 à 100 ms. Ce retard — le segment plat entre P et QRS — laisse aux ventricules le temps de se remplir. De l'onde P au QRS, l'intervalle PR dure 120 à 200 ms.`],
 [`Faisceau de His et réseau de Purkinje`,`Cloison et ventricules · complexe QRS`,`Sorti du nœud, l'influx s'engage dans le faisceau de His, qui se divise le long de la cloison en une branche droite et une branche gauche (celle-ci en deux faisceaux, antérieur et postérieur). Elles se ramifient sous l'endocarde en réseau de Purkinje : des cellules pauvres en myofibrilles, riches en connexine 40, qui conduisent plusieurs fois plus vite que le muscle. En quelques dizaines de millisecondes, tout l'endocarde est atteint. La vague traverse ensuite la paroi de l'intérieur vers l'extérieur ; les dernières régions excitées sont la base du ventricule gauche et la sortie du ventricule droit. Le tout dure 80 ms environ : c'est le complexe QRS. Notre cellule (point turquoise) vient d'être excitée.`],
 [`Plateau, contraction, repolarisation`,`Les ventricules · segment ST et onde T`,`Toutes les cellules des ventricules sont maintenant sur leur plateau (orangé) : le tracé revient à zéro, c'est le segment ST. Le calcium est libéré partout, les ventricules se contractent ensemble et chassent le sang dans l'aorte et le tronc pulmonaire. Puis les cellules se repolarisent : c'est l'onde T. La repolarisation ne retrace pas simplement l'activation : les régions dont le potentiel d'action est le plus court repolarisent tôt, si bien que l'onde T pointe dans le même sens que le QRS. Du début du QRS à la fin de T, l'intervalle QT : environ 360 à 460 ms une fois corrigé pour la fréquence.`],
 [`Le cœur entier`,`Un battement, 100 000 fois par jour`,`Voici le cœur vu de face, battant au ralenti, avec son électrocardiogramme ; la lueur jaune est le passage de l'influx. À 70 battements par minute, il bat environ 100 000 fois par jour. À chaque battement, le ventricule gauche éjecte près de 80 mL de sang, un peu plus de la moitié de ce qu'il contient (fraction d'éjection voisine de 60 %) : environ 5 litres par minute au repos. Le muscle se nourrit par les artères coronaires (rouge vif), nées de l'aorte : l'interventriculaire antérieure et la circonflexe à gauche, la coronaire droite. Le ventricule gauche extrait déjà au repos 70 à 80 % de l'oxygène qu'elles apportent. Un cœur adulte pèse environ 330 g chez l'homme, 250 g chez la femme. Faites-le tourner.`]];
HM_V.set([1,0,0,0,0,1,0,0,0,0,1,0,PV[0],PV[1],PV[2],1]);HM_A.set([1,0,0,0,0,1,0,0,0,0,1,0,PA[0],PA[1],PA[2],1]);
HBS.forEach(S=>{S.c=[0,0]});
SXQ.hb={S:HBS,T:HBT,ti:'Influx cardiaque',solo:1,zn:.004,zx:1.6e5,bg:[.035,.025,.045],sc:[0,0],sz:5e4,
 in:`Dix-huit étapes, du canal ionique au cœur entier. On part d'un morceau de membrane de la cellule où vous êtes : potentiel de repos, puis les quatre phases du potentiel d'action cardiaque, tracées sur un oscilloscope. On suit ensuite le calcium jusqu'à la troponine C et au raccourcissement du sarcomère, puis l'influx de cellule en cellule par les jonctions communicantes. Un long zoom arrière mène enfin à la paroi du ventricule et au cœur entier, avec son tissu de conduction et son électrocardiogramme. Tout est dessiné à sa taille réelle ; la forme des protéines et celle du cœur sont schématiques. Glissez pour tourner autour de la scène, molette ou pincement pour zoomer.`,
 su:`De −85 mV à un battement : un courant venu du nœud sinusal ouvre les canaux sodiques, le plateau calcique déclenche la libération du calcium, la troponine C démasque l'actine, les sarcomères raccourcissent, puis le calcium est rangé et la cellule se repolarise. Par les jonctions communicantes, l'influx passe de cellule en cellule ; par le nœud auriculo-ventriculaire, le faisceau de His et le réseau de Purkinje, il atteint les deux ventricules presque en même temps. Chaque étape a ses maladies héréditaires : les fiches « Génétique » de chaque étape en citent les gènes.`,
 o:()=>{hbBuild();dSx0.r=dSx1.r=1e7;return HBO.slice()},
 en:()=>{for(let n in HG)HG[n].forEach(h=>h.A=0);dSx0.r=dSx1.r=1;dHb.n=dHt.n=dHo.n=dHe.n=0;osc.style.display='none'},
 fd:M=>{let S=HBS[M.st],hm=S?S.H||0:1,w=innerWidth<innerHeight?1.35:cl(1.86/(3.4*innerWidth/innerHeight/1.75-1.6),1,1.9),e;      // écran peu large : on recule un peu, pour que la scène tienne à droite du panneau
   if(!M.hb){M.hb=1;M.O=HBO.slice();M.X=[1,0,0];M.Y=[0,1,0];M.Z=[0,0,1];M.Cc=HBO.slice();M.ls=-1}
   if(M.ls!=M.st){M.ls=M.st;M.mz=0;M.zt=(S?S.z:5e4)*w}tzm&&(M.mz=1);{let nw=performance.now();M.pz||(hbC+=min(.1,(nw-(M.nw||nw))/1e3));M.nw=nw}
   e=hm>1?ss((M.ta-.3)/.5):hm;M.fb=nm(lp(ml(fN,-1),[0,0,-1],e));M.ub=nm(lp(fB,[0,1,0],e));M.ub=nm(sb(M.ub,ml(M.fb,dt(M.ub,M.fb))));      // caméra : face à la cellule, ou face au cœur
   M.Ct=!S?HC0:hm>1?lp(HBO,HC0,ss((M.ta-.45)/.4)):S.C=='sa'?HL.sa[0]:S.C=='at'?hW([-10,16,-4]):S.C=='ve'?hW([-8,-22,6]):hm?HC0:S.cl?lc(...S.cl):HBO;
   if(S&&S.zf&&!M.mz&&!M.pz)M.zt=S.zf(M.ta)*w;
   for(let h of[dHb,dHt,dHo,dHe])h.n=0,h.c=M.Cc;dSx0.c=dSx1.c=M.Cc;
   if(S)for(let n in HG)HG[n].forEach(h=>h.A=0);
   S?S.d(M.ta,M):hbH((hbC*190)%860,0,['ao','tp','vg','vd','od'],{});hbOs(M,S||{o:oEC(()=>(hbC*190)%860)});
   for(let h of[dHb,dHt,dHo,dHe])up(h)}};
}
