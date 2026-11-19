// ================= synapses détaillées du neurone =================
// Deux synapses excitatrices sont construites molécule par molécule : SY[0], reçue par une épine de notre dendrite apicale, et SY[1], que notre bouton forme sur l'épine d'un voisin.
// La membrane postsynaptique est une calotte concentrique au bouton : la fente mesure 20 nm partout (modes G 4 à 7 du shader).
let NX=0,nxl=0;        // mode « influx nerveux » (pi.js)
const SY=[],SYX=[],SYI=[],SB=new Float32Array(16),AIS={nav:[],kv:[],nka:[],k2p:[]},
Lsm=[4,5,6,7].map(G=>Ly(M4,60,0,{al:1,two:1,ex:1,rg:1,G})),Lsa=Ly(M3,60,3,{al:1,ex:1,rg:1}),Ls0=Ly(M1,1.6,.7,{ex:1,rg:1}),Ls1=Ly(M2,5,.9,{ex:1,rg:1}),Ls2=Ly(M2,1.6,.7,{ex:1,rg:1}),Lsc=Ly(MD,1.6,.7,{ex:1,rg:1}),
Lsd=Ly(M2,1e9,0,{ex:1,rg:1}),Lsdc=Ly(MD,1e9,0,{ex:1,rg:1});
function mkSyn(Cp,Rp,n,own,lat){
  let[x,,y]=fr(n),id=SY.length,sd=911+id*57,rn=()=>(sd=Math.imul(sd,1103515245)+12345>>>0)/4294967296,k,j,
   D=(r,g)=>nm(ad(ml(n,sqrt(Rp*Rp-r*r)),ml(ad(ml(x,cos(g)),ml(y,sin(g))),r))),P=(r,g,h)=>ma(Cp,D(r,g),Rp+h),
   dk=(a,b)=>[sqrt(a*a+(b*b-a*a)*rn()),rn()*TAU],
   Lc=(r,g)=>{let e=D(r,g),[a,,b]=fr(e);return(dx,dy,h)=>ad(P(r,g,h),ad(ml(a,dx),ml(b,dy)))},        // repère local autour d'un point de la synapse
   ci=(q,r,i,inn)=>{let l=own&&inn?CY:OX;cS(l,q,r,i,{sf:1});(own&&inn?SYI:SYX).push(l[l.length-1])},
   b0=(q,r,c,i,inn)=>{S(Ls0,q,r,K(c));i&&ci(q,r,i,inn)},b2=(q,r,c,i,inn)=>{S(Ls2,q,r,K(c));i&&ci(q,r,i,inn)},b1=(q,r,c,i,inn)=>{S(Ls1,q,r,K(c));i&&ci(q,r,i,inn)},
   rod=(a,b,r,c,i,inn)=>{Cy(Lsc,a,b,r,K(c));i&&ci(lp(a,b,.5),max(r*1.5,ds(a,b)*.3),i,inn)},
   Cs=ma(Cp,n,sqrt((Rp+.02)**2-.0256)+sqrt(.09-.0256)),mc=own?0x9b8:CF.mc,
   s={id,own,Cp,Rp,n,x,y,P,Lc,Cs,c0:P(0,0,0),cc:P(0,0,.01),st:[],cav:[],amp:[],nmd:[],glt:[],cmk:[],fu:0,fk:-9};
  SY.push(s);
  // ---- membranes : tête de l'épine creusée d'une cupule, calotte postsynaptique
  S(Lsm[2*id],Cs,.3,K(mc,.5));S(Lsm[2*id+1],Cp,Rp+.02,K(mc,.5));
  OX.push({a:Cs,b:Cs,r:.3,i:own?'spn':'spo',dc:[Cp,Rp+.02],bg:1});
  cS(OX,s.cc,.006,'syf',{sf:1});SYX.push(OX[OX.length-1]);
  // ---- côté présynaptique : sites de libération
  for(k=0;k<9;k++){let r=.034*sqrt(k+.5),g=k*2.4+id,L=Lc(r,g),e=D(r,g),c=P(r,g,-.0225);s.st.push([r,g]);
    for(j=0;j<3;j++){let w=j*2.09+k,cw=cos(w),sw=sin(w);
      if(k){rod(L(.011*cw,.011*sw,-.0006),L(.006*cw,.006*sw,-.0075),.0013,0xe54,'snr',1);b0(L(.0085*cw+.002*sw,.0085*sw-.002*cw,-.004),.0014,0xfff,'cpx',1);
        b0(L(.013*cos(w+.5),.013*sin(w+.5),-.006),.0026,0xfa3,'syt',1);b0(ad(ma(c,e,-.004),ml(sb(L(cw,sw,0),L(0,0,0)),.0205)),.0022,0x7d7,'vgl',1)}
      b0(L(.0125*cos(w-.45),.0125*sin(w-.45),-.0035),.003,0xb7e,'m18',1);
      j<2&&rod(L(.017*cos(w+1),.017*sin(w+1),-.001),L(.0195*cos(w+1),.0195*sin(w+1),-.021),.0016,0x6c6,'m13',1);
      b0(L(.024*cos(w+1.6),.024*sin(w+1.6),-.007),.0038,0x4c8,'rim',1);j&&b0(L(.029*cos(w+2),.029*sin(w+2),-.0055),.003,0x8cf,'rbp',1)}
    b0(L(.024*cos(k),.024*sin(k),-.007),.0038,0x4c8,'rim',1);
    for(j=0;j<5;j++){let w=j*1.257+k*.7,a=.027+.004*(j%2),q=L(a*cos(w),a*sin(w),0);b2(q,.0048,0xd4d,'cav',1);b0(L(a*cos(w),a*sin(w),-.006),.0035,0xa3a);s.cav.push(q)}        // canaux Cav2.1 : à 20–30 nm de la vésicule
    if(k){b1(c,.02,0xfe8,'dv',1);b0(ma(c,e,-.0235),.0055,0x99f,'vat',1)}}
  for(k=0;k<10;k++){let[r,g]=dk(0,.11),L=Lc(r,g),a=L(0,0,-.002),b,w=rn()*TAU;for(j=1;j<4;j++)b=L(.012*j*cos(w+j),.012*j*sin(w+j),-.03*j),rod(a,b,.0014,0x997,j==2&&'bsn',1),a=b}        // Bassoon et Piccolo
  for(k=0;k<14;k++){let[r,g]=dk(0,.115);b0(P(r,g,-.012),.0035,0x9a7,'lip',1)}
  for(k=0;k<7;k++){let[r,g]=dk(.02,.1),q=P(r,g,-.075-.03*rn());own?(S(Lv,q,.02,K(0xbdf)),cS(CY,q,.02,'sv',{sf:1})):b1(q,.02,0xbdf,'sv');rod(P(r,g,-.004),ma(q,D(r,g),.02),.0012,0x997)}
  {let V=own?CY.filter(o=>o.i=='sv').map(o=>o.a):[],c=0;        // réserve de vésicules ; les synapsines les relient entre elles
    if(!own)for(k=0;k<150;k++){let q=ma(Cp,nm(ad([rn()-.5,rn()-.5,rn()-.5],ml(n,.45))),(Rp-.07)*cbrt(rn())),w=sb(q,Cp),h=dt(w,n);
      if(h>Rp-.13&&ln(sb(w,ml(n,h)))<.17||V.some(v=>ds(v,q)<.045))continue;V.push(q);b1(q,.02,0xbdf,'sv')}
    for(k=0;k<V.length;k++)for(j=0;j<k;j++){let l=ds(V[k],V[j]);l>.042&&l<.066&&rod(ma(V[k],sb(V[j],V[k]),.02/l),ma(V[j],sb(V[k],V[j]),.02/l),.001,0xddd,c++%3?0:'syn1',1)}}
  {let g=id+4,L=Lc(.2,g),c=L(0,0,-.045);s.pit=c;b1(c,.03,0xc96,'ccp',1);rod(L(0,0,0),L(0,0,-.018),.009,mc);        // zone périactive : endocytose à clathrine
    for(k=0;k<9;k++)b0(L(.012*cos(k*.7),.012*sin(k*.7),-.009),.003,0x6af,'dyn',1);
    for(k=0;k<22;k++){let a=rn()*TAU,b=acos(1.6*rn()-1);b0(ad(c,[.031*sin(b)*cos(a),.031*sin(b)*sin(a),.031*cos(b)]),.0055,0xeb7)}}
  // ---- fente : molécules d'adhérence
  for(k=0;k<26;k++){let[r,g]=dk(0,.12);rod(P(r,g,0),P(r,g,.0095),.0012,0xf96,'nrx');rod(P(r,g,.0095),P(r,g,.02),.002,0x6cf,'nlg')}
  for(k=0;k<14;k++){let[r,g]=dk(.118,.15),h=.014/r;rod(P(r,g,0),P(r,g+h,.012),.0013,0xcc6,'cad');rod(P(r,g+h*.6,.008),P(r,g+h*1.6,.02),.0013,0xba5,'cad')}
  // ---- côté postsynaptique : récepteurs, puis échafaudage en couches
  {let rc=[],ok=q=>rc.every(o=>ds(o,q)>.0095)&&(rc.push(q),1),
     amp=(L,dx,dy,nd)=>{let q=L(dx,dy,.02);if(!ok(q))return;b2(L(dx,dy,.0125),.004,0x4cf,'amp');b2(L(dx,dy,.0165),.0042,0x39d);b2(q,.004,0x27a);b0(L(dx+.005,dy,.0215),.0022,0x8df,'trp');
       rod(L(dx+.005,dy,.0235),L(dx+.007,dy+.002,.036),.0012,0xfc4,'p95');s.amp.push({q,nd})};
    for(k of[0,1,3]){let[r,g]=s.st[k],L=Lc(r,g);for(j=0;j<40&&s.amp.filter(o=>o.nd==k).length<13;j++){let a=.032*sqrt(rn()),w=rn()*TAU;amp(L,a*cos(w),a*sin(w),k)}}        // nanodomaines alignés sur les sites de libération
    for(k=0;k<14;k++){let[r,g]=dk(0,.055),L=Lc(r,g),q=L(0,0,.02);if(!ok(q))continue;b2(L(0,0,.0135),.0055,0xf8c,'nmd');b2(q,.005,0xc5a);b0(L(0,0,.027),.003,0xc5a);rod(L(.003,0,.0235),L(.005,.002,.036),.0012,0xfc4,'p95');s.nmd.push(q)}
    for(k=0;k<16;k++){let[r,g]=dk(0,.11);amp(Lc(r,g),0,0,-1)}
    for(k=0;k<10;k++){let[r,g]=dk(.125,.155),L=Lc(r,g);b2(L(.003,0,.014),.0032,0xb8f,'mgl');b2(L(-.003,0,.014),.0032,0xb8f);b0(L(0,0,.021),.0038,0x86c)}}
  for(k=0;k<50;k++){let[r,g]=dk(0,.115),L=Lc(r,g);rod(L(0,0,.0235),L(.002,.002,.036),.0012,0xfc4,k%2?0:'p95')}
  for(k=0;k<60;k++){let[r,g]=dk(0,.115);b0(P(r,g,.041+.004*rn()),.003,0xe84,'gkp')}
  for(k=0;k<45;k++){let[r,g]=dk(0,.115),L=Lc(r,g),a=rn()*.012-.006;rod(L(0,0,.046),L(a,-a,.066),.0016,0xc6e,'shk')}
  for(k=0;k<36;k++){let[r,g]=dk(0,.12);b0(P(r,g,.07+.004*rn()),.0032,0x9e9,'hmr')}
  for(k=0;k<28;k++){let[r,g]=dk(0,.13),q=P(r,g,.045+.08*rn());b1(q,.0095,0xd7b,'cmk');s.cmk.push(q)}        // CaMKII : dodécamères de ≈ 20 nm
  for(k=0;k<14;k++){let[r,g]=dk(0,.12),a=P(r,g,.08+.03*rn());rod(a,ad(lp(a,ma(Cs,n,.12),.55),[.06*rn()-.03,.06*rn()-.03,.06*rn()-.03]),.0035,0xe66,'sac')}
  for(k=0;k<3;k++)El(Ls1,ma(Cs,n,.11+.034*k),ml(x,.09-.012*k),ml(n,.008),ml(y,.09-.012*k),K(0x7a8));cS(OX,ma(Cs,n,.14),.05,'spa',{sf:1});SYX.push(OX[OX.length-1]);
  // ---- prolongement astrocytaire périsynaptique et ses transporteurs GLT-1
  {let t=cr(n,lat),Ca=ad(ma(Cp,n,Rp+.035),ml(lat,.34));s.Ca=Ca;s.lat=lat;
    El(Lsa,Ca,ml(lat,.13),ml(n,.075),ml(t,.2),K(0x5b8,.5));El(Lsa,ma(Ca,lat,.78),ml(lat,.7),ml(n,.07),ml(t,.09),K(0x5b8,.5));cS(OX,Ca,.1,'ast',{sf:1,bg:1});SYX.push(OX[OX.length-1]);
    for(k=0;k<22;k++){let a=rn()*1.8-.9,b=rn()*1.8-.9,q=ad(Ca,ad(ml(lat,-.13*cos(a)*cos(b)),ad(ml(n,.075*sin(b)),ml(t,.2*sin(a)*cos(b)))));b0(q,.004,0x3d9,'glt');s.glt.push(q)}}
  {let L=Lc(s.st[0][0],s.st[0][1]),o=L(0,0,0),ex=sb(L(1,0,0),o),ey=sb(L(0,1,0),o),A=s.st.slice(1).map(([r,g])=>{let w=sb(P(r,g,0),o);return atan2(dt(w,ey),dt(w,ex))}).sort((a,b)=>a-b),b=0,g=0;
    A.forEach((a,i)=>{let d=i?a-A[i-1]:a+TAU-A[A.length-1],c=a-d/2;if(d>g&&dt(ad(ml(ex,cos(c)),ml(ey,sin(c))),lat)<.4)g=d,b=c});s.vw=ml(ad(ml(ex,cos(b)),ml(ey,sin(b))),-1);s.L0=L;s.e0=nm(sb(L(0,0,.01),o))}
  s.d1=dy(Lsd,40,s.cc,.6);s.d2=dy(Lsdc,8,s.cc,.6);return s}

// La vésicule du site n° 0 est dynamique : fu de −1 (en approche) à 0 (arrimée, amorcée) puis 1 (fusionnée).
function synT(){for(let s of SY){let k=s.fu;if(k==s.fk)continue;s.fk=k;let h=s.d1,g=s.d2,[r,a]=s.st[0],L=s.Lc(r,a),e=nm(sb(L(0,0,.01),L(0,0,0))),j;h.n=g.n=0;
    if(k<1){let hh=k<0?-.0225+.07*k:k<.25?-.0225+.008*k:k<.6?-.0205+(k-.25)/.35*.0125:-.008+(k-.6)/.4*.008,rv=k<.25?.02:k<.6?.02-(k-.25)/.35*.004:.016*(1-(k-.6)/.4)+.001,c=L(0,0,hh),zp=cl(k/.25,0,1);
      dS(h,c,rv,K(k>.25?0xcd9:0xfe8));
      if(k<.6){dS(h,ma(c,e,-rv-.0035),.0055,K(0x99f));
        for(j=0;j<3;j++){let w=j*2.09,cw=cos(w),sw=sin(w),t=sb(L(cw,sw,0),L(0,0,0));dS(h,ad(ma(c,e,-.004),ml(t,rv+.0005)),.0022,K(0x7d7));
          if(k>-.2){dT(g,L(.011*cw*(1-.4*zp),.011*sw*(1-.4*zp),-.0006),ad(ma(c,e,rv*.92),ml(t,rv*.36)),.0013,K(0xe54));dS(h,L(.013*cos(w+.5),.013*sin(w+.5),-.006+.004*zp),.0026,K(0xfa3));dS(h,L(.0085*cw,.0085*sw,-.004),.0014*(1-zp),K(0xfff))}}}}
    up(h);up(g)}}

if(CT>1){let[x,,y]=fr(A0),g=14.4,ns=ad(ml(x,cos(g)),ml(y,sin(g))),B=ad(ma(Cc,A0,Rc+6),ml(ns,1.1)),Ca=ma(B,ns,1.4457),ua=cr(A0,ns),s,k;
  // ---- synapse reçue : bouton « en passant » d'un axone afférent, sur une épine de notre dendrite apicale
  s=mkSyn(Ca,.45,ml(ns,-1),0,A0);S(Lmem,Ca,.45,K(0x9b8,.5));OX.push({a:Ca,b:Ca,r:.45,i:'abt',bg:1});
  Cy(Lmt,ma(B,ns,-.06),ma(s.Cs,ns,-.26),.07,K(CF.mc,.8));pgl(ma(B,ns,-.13));
  for(k of[-1,1])Cy(Loxc,ad(ma(Ca,ns,.2),ml(ua,k*.38)),ad(ma(Ca,ns,.2),ml(ua,k*3.6)),.1,K(0x9b8));OX.push({a:ad(ma(Ca,ns,.2),ml(ua,-3.6)),b:ad(ma(Ca,ns,.2),ml(ua,3.6)),r:.1,i:'aax',sf:1,bg:1});
  // ---- synapse émise : notre bouton sur l'épine d'un neurone voisin
  [x,,y]=fr(dax);s=mkSyn(Cb,Rb,dax,1,ml(v0,-1));
  Cy(Loxc,ma(s.Cs,dax,.28),ma(s.Cs,dax,.9),.07,K(0x9b8));Cy(Loxc,ad(ma(s.Cs,dax,1.3),ml(y,-3)),ad(ma(s.Cs,dax,1.3),ml(y,3)),.45,K(0x9b8));OX.push({a:ad(ma(s.Cs,dax,1.3),ml(y,-3)),b:ad(ma(s.Cs,dax,1.3),ml(y,3)),r:.45,i:'spn',bg:1});
  // ---- segment initial de l'axone : un carré de membrane à l'échelle moléculaire (canaux Nav1.6, Kv, pompes, ancrage)
  {let r=.4,sd=5,rn=()=>(sd=Math.imul(sd,1103515245)+12345>>>0)/4294967296,pt=(a,v,h)=>ad(ma(Cc,dax,Rc+6.5+a),ml(ad(ml(x,cos(v/r)),ml(y,sin(v/r))),r+h)),ps=[],
     ci=(q,rr,i)=>{cS(CY,q,rr,i,{sf:1});SYI.push(CY[CY.length-1])},tet=(a,v,c,d)=>{for(let j=0;j<4;j++)S(Ls0,pt(a+d*cos(j*PI/2+.8),v+d*sin(j*PI/2+.8),0),d*.9,K(c))},
     nw=()=>{for(let j=0;j<60;j++){let q=[rn()*.3-.15,rn()*.26-.13];if(ps.every(o=>hypot(o[0]-q[0],o[1]-q[1])>.017))return ps.push(q),q}return[9,9]};
    AIS.c=pt(0,0,0);AIS.n=x;AIS.pt=pt;
    for(k=0;k<38;k++){let[a,v]=nw();tet(a,v,0xe44,.0034);S(Ls0,pt(a,v,-.0065),.0022,K(0xfd5));ci(pt(a,v,0),.006,'nav');AIS.nav.push([a,v]);k%3||(Cy(Lsc,pt(a,v,-.008),pt(a+.004,v,-.03),.0013,K(0x999)),ci(pt(a,v,-.02),.005,'ank'))}
    for(k=0;k<16;k++){let[a,v]=nw();tet(a,v,k<8?0x5c7:0x3aa,.003);ci(pt(a,v,0),.0055,'kvc');AIS.kv.push([a,v])}
    for(k=0;k<8;k++){let[a,v]=nw();S(Ls0,pt(a,v,-.003),.005,K(0xfb5));S(Ls0,pt(a,v,.004),.003,K(0xc83));ci(pt(a,v,0),.006,'nka');AIS.nka.push([a,v])}
    for(k=0;k<6;k++){let[a,v]=nw();S(Ls0,pt(a-.0025,v,0),.003,K(0x8d8));S(Ls0,pt(a+.0025,v,0),.003,K(0x8d8));ci(pt(a,v,0),.005,'k2p');AIS.k2p.push([a,v])}
    for(k=-3;k<4;k++)Cy(Lsc,pt(-.19,k*.045,-.032),pt(.19,k*.045,-.032),.0016,K(0xcdf)),ci(pt(0,k*.045,-.032),.01,'ank')}}

// ---- fiches des synapses et de la membrane excitable
CT>1&&Object.assign(I,{
 btn:[`Bouton synaptique`,`Terminaison présynaptique de notre axone : ≈ 200 vésicules synaptiques, dont une dizaine arrimées à la zone active, face à l'épine d'un neurone voisin. Entrez-y par le puits à clathrine, ou approchez la fente par l'extérieur : le vaisseau rapetisse jusqu'à pouvoir s'y glisser. Chaque molécule de la synapse a sa fiche. Le bouton ⚡ fait suivre un influx nerveux de bout en bout.`],
 spn:[`Épine dendritique d'un neurone voisin`,`Tête de ≈ 0,5 µm portée par un col étroit ; sa membrane épouse notre bouton à 20 nm de distance. Sous cette membrane, la densité postsynaptique : récepteurs AMPA et NMDA, puis l'échafaudage en couches PSD-95, GKAP, Shank et Homer, relié à l'actine. L'insertion ou le retrait de récepteurs AMPA sous-tend la potentialisation et la dépression à long terme.`],
 spo:[`Épine dendritique de notre neurone`,`Une des ≈ 10 000 épines de notre neurone, et sa synapse excitatrice. Son col étroit (≈ 0,1 à 0,2 µm) en fait un compartiment biochimique : le Ca²⁺ entré par les récepteurs NMDA y reste confiné, ce qui rend la plasticité propre à chaque synapse. C'est ici que commence le parcours ⚡ de l'influx nerveux.`],
 abt:[`Bouton afférent (neurone d'amont)`,`Renflement « en passant » d'un axone venu d'un autre neurone. Un bouton hippocampique compte en moyenne une zone active de ≈ 0,04 µm², une dizaine de vésicules arrimées et ≈ 200 vésicules en tout (Schikorski et Stevens 1997). Un potentiel d'action n'y libère une vésicule qu'avec une certaine probabilité.`],
 aax:[`Axone afférent`,`Collatérale fine et sans myéline d'un neurone d'amont. Elle forme un bouton « en passant » tous les quelques micromètres et contacte ainsi des milliers de neurones.`],
 syf:[`Fente synaptique`,`≈ 20 nm séparent les deux membranes, soit cinq épaisseurs de membrane. La fente est traversée par des molécules d'adhérence (neurexines, neuroligines, cadhérines) qui alignent les deux côtés. Le glutamate libéré y atteint ≈ 1 mM et disparaît en ≈ 1 ms (Clements 1992) : diffusion, puis capture par les transporteurs des astrocytes.`],
 ast:[`Prolongement astrocytaire périsynaptique`,`Fine expansion d'un astrocyte accolée au bord de la synapse (synapse « tripartite ») ; dans l'hippocampe, plus de la moitié des synapses en ont une. Elle capte le glutamate et le K⁺ échappés de la fente et rend de la glutamine au neurone. Sa contribution à la D-sérine, co-agoniste des récepteurs NMDA, reste débattue.`],
 glt:[`Transporteur de glutamate GLT-1 (EAAT2)`,`Trimère de la membrane astrocytaire (gène SLC1A2), présent à des milliers d'exemplaires par µm². Il fait entrer un glutamate avec 3 Na⁺ et 1 H⁺ et fait sortir 1 K⁺ : de quoi maintenir le glutamate extracellulaire sous le micromolaire. Dans l'astrocyte, la glutamine synthétase convertit le glutamate en glutamine (cycle glutamate-glutamine).`],
 dv:[`Vésicule arrimée et amorcée`,`Vésicule de ≈ 40 nm retenue contre la zone active, complexes SNARE à moitié enroulés : elle est prête à fusionner dès l'arrivée du Ca²⁺. Une zone active en tient une dizaine (réserve immédiatement libérable). Arrimage et amorçage dépendent de RIM, Munc13-1 et Munc18-1.`],
 snr:[`Complexe SNARE`,`Faisceau de quatre hélices long de ≈ 12 nm : syntaxine-1 et SNAP-25 (deux hélices) sur la membrane plasmique, synaptobrévine-2 (VAMP2) sur la vésicule. Son enroulement, de l'extrémité N vers les membranes, les rapproche de force et fournit l'énergie de la fusion. NSF et α-SNAP le défont ensuite avec de l'ATP. Les toxines botuliques et tétanique sont des protéases qui coupent ces trois protéines.`],
 cpx:[`Complexine`,`Petite hélice fixée dans le sillon du complexe SNARE à moitié enroulé. Elle le stabilise tout en retenant la fusion ; la synaptotagmine chargée de Ca²⁺ lève ce frein.`],
 syt:[LG?'Synaptotagmin-1':'Synaptotagmine-1',`Capteur de Ca²⁺ de la libération rapide. Ancrée dans la vésicule, elle porte deux domaines C2 (C2A fixe 3 Ca²⁺, C2B en fixe 2) qui, chargés, s'enfoncent dans les phospholipides de la membrane plasmique et déclenchent la fusion en moins d'une milliseconde. Sa faible affinité (dizaines de µM) réserve la fusion aux vésicules situées tout près d'un canal calcique ouvert.`],
 m18:[`Munc18-1`,`Protéine de la famille SM (gène STXBP1). Elle tient la syntaxine-1 repliée, puis guide l'assemblage du complexe SNARE ; sans elle, aucune libération de neurotransmetteur. Les variants de STXBP1 causent une encéphalopathie développementale et épileptique.`],
 m13:[`Munc13-1`,`Longue protéine (≈ 20 nm) dressée entre la vésicule et la membrane plasmique. Son domaine MUN ouvre la syntaxine-1 : c'est l'étape d'amorçage. Ses domaines C1 et C2 la rendent sensible au diacylglycérol et au Ca²⁺, d'où une plasticité à court terme.`],
 rim:[`RIM`,`Organisateur central de la zone active. Il lie Rab3 sur la vésicule, Munc13-1, et retient les canaux Cav2 par son domaine PDZ, avec l'aide de RIM-BP. Ses nanoamas marquent les sites de libération, alignés à travers la fente sur les nanodomaines de récepteurs AMPA : la « nanocolonne » (Tang 2016).`],
 rbp:[`RIM-BP`,`Protéine de liaison de RIM. Ses domaines SH3 attachent les canaux Cav2 à RIM et les maintiennent à quelques dizaines de nanomètres des vésicules arrimées.`],
 cav:[`Canal calcique Cav2.1 (type P/Q)`,`Canal Ca²⁺ dépendant du voltage ; sa sous-unité α1A est codée par CACNA1A (ataxie épisodique de type 2, migraine hémiplégique familiale de type 1, SCA6). Ouvert par le potentiel d'action, il crée autour de lui un nanodomaine où le Ca²⁺ atteint des dizaines de µM pendant moins d'une milliseconde. La libération varie comme la puissance ≈ 4 du Ca²⁺.`],
 vat:[`V-ATPase de la vésicule`,`Pompe à protons rotative : elle acidifie la vésicule (pH ≈ 5,6) en consommant de l'ATP. Une ou deux par vésicule suffisent. Le gradient qu'elle crée alimente le remplissage en glutamate.`],
 vgl:[`VGLUT1`,`Transporteur vésiculaire du glutamate (≈ 10 par vésicule). Il utilise le gradient électrochimique de protons, surtout sa composante électrique, pour concentrer le glutamate à plus de 100 mM dans la vésicule.`],
 bsn:[`Bassoon et Piccolo`,`Deux protéines géantes (≈ 420 et ≈ 550 kDa) étirées en filaments depuis la zone active vers l'intérieur du bouton. Elles guident les vésicules vers les sites de libération et structurent la cytomatrice.`],
 lip:[`Liprine-α et ELKS`,`Échafaudage de la zone active. Avec RIM, ces protéines assemblent la cytomatrice et y recrutent canaux calciques et vésicules.`],
 syn1:[`Synapsines`,`Elles relient les vésicules de réserve entre elles et à l'actine. Pendant l'activité, leur phosphorylation (CaMKII, PKA) libère des vésicules, qui gagnent la zone active.`],
 ccp:[`Endocytose : puits recouvert de clathrine`,`Autour de la zone active, la membrane des vésicules fusionnées est récupérée : AP-2 et la clathrine courbent la membrane en une dizaine de secondes. Une voie ultrarapide (≈ 50 à 100 ms) existe aussi. Les vésicules régénérées sont réacidifiées puis remplies de glutamate.`],
 dyn:[`Dynamine`,`GTPase qui s'enroule en collier autour du col du puits et le sectionne. Les variants de DNM1 causent une encéphalopathie développementale et épileptique.`],
 nrx:[`Neurexines`,`Molécules d'adhérence présynaptiques (NRXN1 à NRXN3). Promoteurs et épissages alternatifs en produisent des milliers d'isoformes, sorte de code d'identité des synapses. Elles se lient aux neuroligines, aux LRRTM et aux cérébellines. Les délétions de NRXN1 prédisposent à l'autisme et à la schizophrénie.`],
 nlg:[`Neuroligines`,`Partenaires postsynaptiques des neurexines, en dimères : NLGN1 aux synapses excitatrices, NLGN2 aux synapses inhibitrices. Leur queue se lie à PSD-95. Des variants de NLGN3 et NLGN4X sont associés à l'autisme.`],
 cad:[`N-cadhérine`,`Adhérence homophile dépendante du Ca²⁺, au pourtour de la synapse. Reliée à l'actine par les caténines, elle stabilise l'épine.`],
 amp:[`Récepteur AMPA`,`Canal cationique tétramérique (GluA1 à GluA4, gènes GRIA1 à GRIA4) ouvert par le glutamate en moins d'une milliseconde : le Na⁺ entre, c'est le courant excitateur rapide. Affinité faible : seuls les récepteurs situés face au site de libération s'ouvrent, d'où leur regroupement en nanodomaines. La sous-unité GluA2 éditée (Q/R) rend le canal imperméable au Ca²⁺. Quelques dizaines à une centaine par synapse ; leur nombre règle la force de la synapse.`],
 trp:[`TARP (stargazine, γ-8)`,`Sous-unités auxiliaires des récepteurs AMPA. Leur queue se lie à PSD-95, ce qui retient les récepteurs dans la densité postsynaptique ; elles modulent aussi l'ouverture du canal. γ-8 domine dans l'hippocampe.`],
 nmd:[`Récepteur NMDA`,`Tétramère de 2 GluN1 et 2 GluN2 (GRIN1, GRIN2A, GRIN2B). Trois conditions pour qu'il conduise : glutamate, co-agoniste (glycine ou D-sérine) et dépolarisation, qui chasse le Mg²⁺ bouchant le pore. Lent et très perméable au Ca²⁺, il détecte la coïncidence entre activité pré- et postsynaptique et déclenche la plasticité. Les variants des gènes GRIN causent des troubles du neurodéveloppement et des épilepsies.`],
 mgl:[`Récepteur métabotropique mGluR5`,`Récepteur couplé à Gq, en dimère, en couronne autour de la densité postsynaptique. Il active la phospholipase C (IP3, diacylglycérol) et module la plasticité. Homer le relie à Shank et aux récepteurs de l'IP3.`],
 p95:[`PSD-95`,`Protéine d'échafaudage majeure (gène DLG4) : trois domaines PDZ, un SH3, un GK ; ≈ 300 exemplaires par synapse. Palmitoylée et dressée sous la membrane, elle retient les récepteurs NMDA (queue de GluN2) et AMPA (par les TARP). Son partenaire le plus abondant est SynGAP (SYNGAP1). Les variants de DLG4 et de SYNGAP1 causent des déficiences intellectuelles.`],
 gkp:[`GKAP (SAPAP)`,`Protéines DLGAP1 à DLGAP4 : elles relient le domaine GK de PSD-95 à Shank, entre la couche superficielle et la couche profonde de la densité postsynaptique.`],
 shk:[`Shank`,`Échafaudage de la couche profonde (SHANK1 à SHANK3). Il se lie à GKAP, à Homer et à la cortactine, et relie ainsi les récepteurs à l'actine de l'épine. La perte d'une copie de SHANK3 (délétion 22q13.3) cause le syndrome de Phelan-McDermid.`],
 hmr:[`Homer`,`Tétramères qui pontent Shank, les récepteurs mGluR1/5 et les récepteurs de l'IP3 du réticulum. La forme courte Homer1a, induite par l'activité, défait ces ponts.`],
 cmk:[`CaMKII`,`Kinase en dodécamère (deux anneaux de six sous-unités, ≈ 20 nm), protéine la plus abondante de la densité postsynaptique. Activée par le complexe Ca²⁺/calmoduline, elle s'autophosphoryle sur Thr286 et reste active après la fin du signal calcique ; elle se fixe à GluN2B et favorise l'ajout de récepteurs AMPA : potentialisation à long terme (Lisman 2012). Les variants de CAMK2A et CAMK2B causent des déficiences intellectuelles.`],
 sac:[`Actine de l'épine`,`Réseau de filaments branchés (Arp2/3), renouvelé en moins d'une minute. Il donne sa forme à l'épine : la tête grossit lors de la potentialisation, se rétracte lors de la dépression.`],
 spa:[`Appareil épineux`,`Empilement de citernes de réticulum lisse, organisé par la synaptopodine, présent dans une minorité d'épines, les plus grosses. Réserve de Ca²⁺ et relais du trafic local des protéines.`],
 nav:[`Canal sodique Nav1.6`,`Une seule chaîne (gène SCN8A) de quatre domaines à six segments transmembranaires ; les segments S4, chargés, sont les capteurs de voltage. Il s'ouvre en moins d'une milliseconde puis s'inactive de lui-même : le motif IFM de la boucle III-IV bouche le pore (bille orangée, côté cytosol). Les Nav1.6 du segment initial distal déclenchent le potentiel d'action ; les Nav1.2 (SCN2A), proximaux, le font remonter vers le soma (Hu 2009). SCN1A, SCN2A et SCN8A sont des gènes d'encéphalopathies épileptiques.`],
 kvc:[`Canaux potassiques Kv7 et Kv1`,`Tétramères dépendants du voltage. Les Kv7.2/7.3 (KCNQ2, KCNQ3 ; verts) portent le courant M, un frein actif sous le seuil ; les Kv1.1/1.2 (KCNA1, KCNA2 ; bleu-vert), au segment initial distal, repolarisent vite le potentiel d'action. Leur filtre de sélectivité laisse passer le K⁺ mais pas le Na⁺. Les variants de KCNQ2 causent des épilepsies néonatales.`],
 nka:[`Pompe Na⁺/K⁺ (ATPase)`,`Elle sort 3 Na⁺ et fait entrer 2 K⁺ par ATP : elle entretient les gradients que chaque potentiel d'action entame à peine, et consomme une grande part de l'ATP du cerveau. L'isoforme neuronale α3 est codée par ATP1A3 (hémiplégie alternante de l'enfant). Son mécanisme est détaillé dans les réactions chimiques ⚗ du cytosol.`],
 k2p:[`Canaux de fuite K⁺ (K2P)`,`Dimères à deux domaines pore (TREK, TASK ; gènes KCNK), ouverts au repos. Par eux, la membrane est surtout perméable au K⁺, ce qui fixe le potentiel de repos près de −70 mV.`],
 ank:[`Ankyrine G et spectrine βIV`,`L'ankyrine G (gène ANK3) est le maître d'œuvre du segment initial : elle y ancre les canaux Nav et Kv7 et les relie à la spectrine βIV (SPTBN4), tendue entre les anneaux d'actine espacés de ≈ 190 nm.`]});
