// ================= intérieur du noyau =================
const Lnf=Ly(M2,60,0,{io:-1}),Lnb=Ly(M1,2.5,.6,{rg:2}),Lnbc=Ly(MD,2.5,.6,{rg:2}),NUN=[],SPL=[];
S(Lan,NOL,1,K(0x97a,.33));cS(NU,NOL,1,'nol',{c:NOL,X:[1,0,0],Y:[0,1,0],Z:[0,0,1],s:[1,1,1]});EX.push([NOL,1.05]);const NOC=NU[NU.length-1];
for(let k=0;NUN.length<10&&k<4000;k++){let q=ma(NOL,rd(),.7*cbrt(R()));NUN.every(u=>ds(u,q)>.56)&&NUN.push(q)}          // unités FC/DFC (plusieurs dizaines dans un vrai nucléole)
NUN.forEach(q=>{S(Lnf,q,.14,K(0xecf));for(let k=0;k<12;k++)S(Lnf,ma(q,rd(),.175),.075,K(0x648))});
for(let i=0;i<600;i++)S(Lg,ma(NOL,rd(),rr(.6,1)),.012,K(0xcb8));
const P0=ma(Nc,d0,Rn),dP=nm(P0);for(let s=.35;s<ln(P0)-.1;s+=.15)EX.push([ml(dP,s),.2]);   // canal interchromatinien gène → pore
const inN=(q,r)=>ds(q,Nc)<Rn-r-.1&&EX.every(e=>ds(e[0],q)>e[1]+r),
body=(n,r,f)=>{for(let i=0;i<n;i++){let q,k=0;do q=ma(Nc,rd(),(Rn-.8)*cbrt(R()));while(!inN(q,r+.1)&&k++<200);f(q);EX.push([q,r])}},
speck=(q,r)=>{let n=14+r*r*260|0,i,k,t,c,ty;cS(NU,q,r,'spk',{sf:1,hb:1});SPL.push([q,r]);          // cœur SON/SRRM2 (rose), protéines SR et snRNP autour, MALAT1 en périphérie
  for(i=0;i<n;i++){t=cbrt((i+.5)/n);c=ma(q,rd(),r*t*.96);ty=t<.5?0:i%2?1:2;
    for(k=0;k<4;k++)S(Lg,ma(c,rd(),.022*cbrt(R())),.0125,K([0xf7a,0x6ed,0x59f][ty]));cS(NU,c,.034,['son','srp','snp'][ty],{sf:1})}
  for(i=0;i<n/3;i++){let a=ma(q,rd(),r*rr(.9,1.08)),d=rd(),b;for(k=0;k<5;k++)b=ma(a,nm(ad(d,ml(rd(),.9))),.03),Cy(Lnbc,a,b,.003,K(0xfb4)),a=b;cS(NU,a,.03,'mal',{sf:1})}};
speck(SPK,.28);EX.push([SPK,.28]);
body(17,.32,q=>speck(q,rr(.2,.32)));
body(2,.22,q=>{S(Lan,q,.22,K(0xfa4,.3));cS(NU,q,.22,'cb',{sf:1,hb:1});          // corps de Cajal : coïline (orange), scaRNP (vert), snRNP en assemblage (bleu) ; gem accolé
  for(let i=0;i<84;i++){let c=ma(q,rd(),.2*cbrt(R())),ty=i%7<3?0:i%7<5?1:2;S(Lnb,c,[.011,.008,.009][ty],K([0xf93,0x4c7,0x69f][ty]));ty&&S(Lnb,ma(c,rd(),.011),.006,K(0xcdf));i%2||cS(NU,c,.02,['coi','sca','tri'][ty],{sf:1})}
  let g=ma(q,rd(),.27);S(Lan,g,.08,K(0xd6e,.35));for(let i=0;i<14;i++)S(Lnb,ma(g,rd(),.07*cbrt(R())),.009,K(0xd6e));cS(NU,g,.08,'gem',{sf:1});EX.push([g,.09])});
body(6,.14,q=>{S(Lan,q,.14,K(0xe6b,.3));cS(NU,q,.14,'pml',{sf:1,hb:1});          // corps PML : coque de PML, protéines clientes à l'intérieur
  for(let i=0;i<26;i++){let d=rd();S(Lnb,ma(q,d,.13),.016,K(0xe6b));i%4||cS(NU,ma(q,d,.13),.024,'pml',{sf:1})}
  for(let i=0;i<9;i++){let c=ma(q,rd(),.08*cbrt(R()));S(Lnb,c,.011,K(0xa37));S(Lnb,ma(c,rd(),.01),.005,K(0xfe8));i%2||cS(NU,c,.02,'pmc',{sf:1})}});
for(let i=0;i<4;i++){let s=SPL[1+i*4],q,k=0;do q=ma(s[0],rd(),s[1]+.13);while((ds(q,Nc)>Rn-.4||EX.some(e=>e[0]!=s[0]&&ds(e[0],q)<e[1]+.1))&&k++<80);EX.push([q,.1]);          // paraspeckles : ARN NEAT1 en épingles, extrémités en surface
  cS(NU,q,.09,'psp',{sf:1,hb:1});S(Lan,q,.09,K(0x9d5,.22));
  for(let j=0;j<16;j++){let d=rd(),e=nm(ad(d,ml(rd(),.6))),m=ma(q,nm(ad(d,e)),.03);Cy(Lnbc,ma(q,d,.085),m,.0028,K(0xad4));Cy(Lnbc,m,ma(q,e,.085),.0028,K(0xad4));S(Lnb,m,.009,K(0x5a3));j%3||cS(NU,m,.02,'nea',{sf:1})}}
const CBP=NU.find(o=>o.i=='cb').a;
// territoires chromosomiques (46,XX) : chaque chromosome est une fibre continue, 1 nœud par Mb
const CHR=[248,242,198,190,182,171,159,145,138,134,135,133,114,107,102,90,83,80,59,64,47,51,156],
CEN=[123,94,91,50,49,60,60,45,43,40,53,36,18,17,19,37,25,18,26,28,12,15,61],CN=[],NH=new Map,seeds=[],ACR=[12,13,14,20,21],cnm=ci=>ci>21?'X':ci+1;
let XI,BD=0,CHS=0;      // CHS : [chromosome, mégabase, nombre] des segments remplacés par la chaîne de nucléosomes
function walk(P,d,n,sd,Rt,st){let o=[P],i,k,q,b,s,e;
  for(i=1;i<n;i++){b=0;
    for(k=0;k<7;k++){e=nm(ad(d,ml(rd(),.8)));q=ma(P,e,st);s=R()-max(0,ds(q,sd)-Rt)*9-(inN(q,.06)?0:50);if(!b||s>b[0])b=[s,q,e]}
    if(b[0]<-40)e=nm(ad(sb(sd,P),ml(rd(),.3))),b=[0,ma(P,e,st),e];
    P=b[1];d=b[2];o.push(P)}
  return o}
for(let c=0;c<46;c++){let ci=c>>1,n=CHR[ci],xi=c==45,Rt=.25*cbrt(n/2)*(xi?.6:1),st=xi?.09:.17,ac=c%2==0&&ACR.includes(ci),sdp,b=-1,i,q,m,p;
  if(c==G.ci*2)sdp=ml(WX,-1.3);
  else for(i=0;i<40;i++){q=xi?ma(Nc,rd(),Rn-.75):ac?ma(NOL,rd(),1.05+Rt*.7):ma(Nc,rd(),+'57788667665685543924638'[ci]/10*(Rn-.9)+rr(-.3,.3));
    m=min(...seeds.map(s=>ds(s,q)),9);if(inN(q,.2)&&m>b)b=m,sdp=q}
  seeds.push(sdp);if(xi)XI=sdp;
  if(c==G.ci*2){let a=ml(WX,-.5),d=pp(WX),k=min(G.mb|0,n-2);p=walk(a,d,k+1,sdp,Rt,st).reverse().concat(walk(a,ml(d,-1),n-k,sdp,Rt,st).slice(1))}      // HBB (5,2 Mb) passe au bord du locus détaillé
  else p=walk(ac?ma(NOL,nm(sb(sdp,NOL)),1.03):ma(sdp,rd(),Rt*.5),rd(),n,sdp,Rt,st);            // bras courts des acrocentriques (ADNr) contre le nucléole
  CN.push({ci,p,xi});
  p.forEach((q,i)=>{let k=floor(q[0]/.4)+'_'+floor(q[1]/.4)+'_'+floor(q[2]/.4),l=NH.get(k);l||NH.set(k,l=[]);l.push([c,i,q])});
  if(xi)for(i=0;i<110;i++)S(Lg,ma(p[R()*n|0],rd(),.07),.012,[2.5,.5,1.2,1])}
if(!CT)for(let[c,m]of[[10,26],[11,26],[0,149],[1,149]]){let q=ma(CN[c].p[m],rd(),.08);S(Lan,q,.07,K(0x6c9,.35));cS(NU,q,.07,'hlb',{sf:1});          // corps des locus d'histones : 6p22 (HIST1) et 1q21 (HIST2)
  for(let j=0;j<10;j++)S(Lnb,ma(q,rd(),.06*cbrt(R())),.008,K(j%3?0x6c9:0xfd6))}
const bnd=(ci,mb)=>BD&&BD[ci].find(x=>mb<x[1]),
bcol=(ci,mb,xi)=>{let l=.56,b=bnd(ci,mb),g;
  if(b){g=b[3];if(g=='acen')return[.95,.2,.3,1];if(g[1]=='v'||g[0]=='s')return[.45,.5,.6,1];l=g=='gneg'?.68:.62-.4*(+g.slice(4)||100)/100}
  else if(!BD&&abs(mb-CEN[ci])<1.5)return[.95,.2,.3,1];
  return hs(ci/23,xi?.3:.7,xi?l*.6:l)},
cat=(a,b,c,d,t)=>a.map((_,i)=>.5*(2*b[i]+(c[i]-a[i])*t+(2*a[i]-5*b[i]+4*c[i]-d[i])*t*t+(3*b[i]-a[i]-3*c[i]+d[i])*t*t*t));
function drawChr(re){re&&[Lk,Lkj,Lkf].forEach(clr);
  CN.forEach(({ci,p,xi},cn)=>{let n=p.length,i,k,a,b,c,r;
    for(i=0;i<n-1;i++){if(CHS&&CHS[0]==cn&&i>=CHS[1]&&i<CHS[1]+CHS[2])continue;c=bcol(ci,i+.5,xi);      // ces mégabases sont dessinées en chaîne de nucléosomes (chrfibre.js)
      r=c[0]>.9&&c[1]<.3?.026:.04;Cy(Lkf,p[i],p[i+1],r,c);
      a=p[i];for(k=1;k<4;k++)b=k<3?cat(p[max(0,i-1)],p[i],p[i+1],p[min(n-1,i+2)],k/3):p[i+1],Cy(Lk,a,b,r,c),S(Lkj,b,r,c),a=b}});
  re&&fin()}
drawChr();

// ================= cytoplasme : organites communs, effectifs selon la cellule =================
const cD=nm(sb(Cc,Nc)),CS=ma(Nc,cD,Rn+.85),MT=[],a1=pp(cD),a2=cr(a1,cD),
gol=(g,a)=>{let[s1,,s2]=fr(a);occ.push([g,.8]);          // pile de Golgi : 5 citernes courbes + vésicules
  for(let k=0;k<5;k++)for(let j=-3;j<4;j++){let ph=j*.2,c=ad(ma(g,a,(k-2)*.06-1.4*(1-cos(ph))),ml(s1,1.4*sin(ph))),T=ad(ml(s1,cos(ph)),ml(a,-sin(ph))),N=ad(ml(a,cos(ph)),ml(s1,sin(ph))),w=(.5-.02*j*j)*(1-.07*k),co=lp(K(0xf95),K(0xd4a),k/4).concat(1);
    Dk(c,ml(T,.17),ml(N,.014),ml(s2,w),co);cE(CY,c,T,N,s2,[.17,.014,w],'gol');CY[CY.length-1].k=k}
  for(let k=0;k<16;k++){let q=ma(g,rd(),rr(.55,.8)),r=rr(.025,.04);S(Lv,q,r,K(0xfb5));cS(CY,q,r,'ves')}},
mito=(q,a,L,w)=>{let[x,,y]=fr(a),k=0;El(La,q,ml(x,w),ml(a,L),ml(y,w),K(0xe64,.4));cE(CY,q,x,a,y,[w,L,w],'mit');
  for(let t=-L+.1;t<L-.08;t+=.085){let h=w*sqrt(1-t*t/L/L)*.86;El(Lcs,ma(ma(q,a,t),x,(k++%2?1:-1)*h*.18),ml(x,h*.8),ml(a,.011),ml(y,h*.95),K(0xb53))}
  S(Lv,ma(q,a,rr(-.5,.5)*L),.035,K(0xfe6));S(Lv,ma(q,a,rr(-.5,.5)*L),.035,K(0xfe6))},
rerP=(d,rb)=>{let[x,,y]=fr(d),g=.82/rb;occ.push([ma(Nc,d,rb+.2),1]);          // pile de 3 citernes de RE rugueux, ribosomes sur les deux faces
  for(let k=0;k<3;k++)for(let a=-1;a<2;a++)for(let b=-1;b<2;b++){let dd=nm(ad(ad(d,ml(x,a*g)),ml(y,b*g))),c=ma(Nc,dd,rb+k*.22),[u,,v]=fr(dd);
    Dk(c,ml(u,.48),ml(dd,.028),ml(v,.48),K(0x47b));cE(CY,c,u,dd,v,[.48,.028,.48],'rer');
    for(let m=0;m<26;m++){let g=rr(0,TAU),r=.44*sqrt(R());S(Lr,ad(ad(ma(c,u,r*cos(g)),ml(v,r*sin(g))),ml(dd,(m%2?1:-1)*(.028*sqrt(1-r*r/.23)+.011))),.0115,K(0xcb8))}}},
pgl=q=>{let a=rd(),[x,,y]=fr(a);cS(CY,q,.045,'rib',{sf:1});          // polysome libre : 5 ribosomes en spirale
  for(let k=0;k<5;k++){let g=k*1.2,c=ad(ad(ma(q,a,k*.012-.024),ml(x,cos(g)*.03)),ml(y,sin(g)*.03)),o=nm(sb(c,q));S(Lr,c,.0125,K(0xdc9));S(Lr,ma(c,o,-.012),.009,K(0xa97))}},
mtl=pts=>{for(let k=0;k<10;k++)Cy(Lt,pts[k],pts[k+1],.0125,K(0x7c6)),cC(CY,pts[k],pts[k+1],.0125,'mt');MT.push(pts)};
occ.push([CS,.5]);
{let ctr=(c,a)=>{let[x,,y]=fr(a);for(let k=0;k<9;k++)for(let m=0;m<3;m++){let h=k*TAU/9+m*.26,q=ad(ma(c,x,cos(h)*(.085+m*.021)),ml(y,sin(h)*(.085+m*.021)));Cy(Lt,ma(q,a,-.21),ma(q,a,.21),.0115,K(0x8d6))}};
 ctr(ma(CS,a1,-.05),a1);ctr(ad(ma(CS,a1,.3),ml(cD,.05)),a2);S(La,CS,.45,K(0xbd8,.14));cS(CY,CS,.38,'cen');
 if(CT<2)for(let s=0;s<(CT?5:3);s++){let g=ad(ma(CS,cD,s<3?.25:-2*Rn-2.2),ad(ml(a1,cos(s*2.1+.5)*1.05),ml(a2,sin(s*2.1+.5)*1.05)));gol(g,nm(sb(Nc,g)))}      // Golgi près du centrosome
 else for(let s=0;s<6;s++){let x=pp(A0),g=ma(Nc,ad(ml(x,cos(s*1.05)),ml(cr(A0,x),sin(s*1.05))),Rn+1.15);gol(g,nm(sb(Nc,g)))}}                              // neurone : couronne périnucléaire
for(let i=0;i<CF.mt;i++){let d=rd(),b=ma(Cc,d,Rc-.1),a=ma(CS,nm(sb(b,CS)),.3),m=lp(a,b,.5),pts=[],k,t;       // microtubules rayonnant du centrosome
  if(ds(m,Nc)<Rn+1)m=ma(Nc,nm(sb(m,Nc)),Rn+1.4);let c=sb(ml(m,2),ml(ad(a,b),.5));
  for(k=0;k<11;k++)t=k/10,pts.push(ad(ad(ml(a,(1-t)**2),ml(c,2*t*(1-t))),ml(b,t*t)));
  pts.some(q=>ds(q,Nc)<Rn+.3)||mtl(pts)}
for(let i=0;i<CF.rer[0];i++){let d;do d=rd();while(dt(d,cD)>.5);rerP(d,Rn+.3)}
for(let i=0;i<CF.rer[1];i++)rerP(rd(),rr(Rn+1.4,Rc-ln(CF.of)-2.3));
for(let i=0;i<CF.mit;i++){let L=rr(.6,1.1),w=rr(.2,.28),q=cyp(L*.9);q&&(occ.push([q,L*.9]),mito(q,rd(),L,w))}
const org=(n,a,b,f)=>{for(let i=0;i<n;i++){let r=rr(a,b),q=cyp(r);q&&(occ.push([q,r]),f(q,r))}};
org(CF.lys,.15,.3,(q,r)=>{S(Lo,q,r,K(0x8b4));cS(CY,q,r,'lys')});
org(CF.per,.12,.22,(q,r)=>{S(Lo,q,r,K(0xdc3));cS(CY,q,r,'per')});
org(CF.end,.12,.2,(q,r)=>{S(Lo,q,r,K(0x6ad));cS(CY,q,r,'end');for(let k=0;k<2;k++){let e=ma(q,rd(),r+.25);Cy(Lt,q,e,.025,K(0x6ad));cC(CY,q,e,.025,'end')}});
org(4,.24,.25,(q,r)=>{S(La,q,r,K(0x8ac,.4));cS(CY,q,r,'mvb');for(let k=0;k<10;k++)S(Lv,ma(q,rd(),rr(0,.17)),.028,K(0xdde))});
{let nd=[];for(let i=0;i<CF.ser;i++){let q=cyp(.06,.8);q&&nd.push(q)}       // RE lisse : réseau de tubules
 nd.forEach((a,i)=>nd.map((b,j)=>[ds(a,b),j]).sort((x,y)=>x[0]-y[0]).slice(1,4).forEach(([l,j])=>{let b=nd[j];
   if(j>i&&l<1.6&&[.2,.4,.6,.8].every(t=>free(lp(a,b,t),.05)&&ds(lp(a,b,t),Nc)>Rn+.4))Cy(Lt,a,b,.03,K(0x3a9)),cC(CY,a,b,.03,'sel')}));
 nd.forEach(a=>S(Lv,a,.034,K(0x3a9)))}
org(70,.03,.05,(q,r)=>{S(Lv,q,r,K(0xfc6));cS(CY,q,r,'ves')});
for(let i=0;i<CF.pol;i++){let q=cyp(.07);q&&pgl(q)}

// ================= le vaisseau (dessin original) =================
El(Lsh,[0,0,0],[.2,0,0],[0,.15,0],[0,0,.5],K(0xeee));El(Lsh,[0,-.05,-.02],[.21,0,0],[0,.11,0],[0,0,.42],K(0xf72));
S(Lsha,[0,.1,.12],.15,K(0x9df,.35));S(Lsh,[0,.11,.1],.065,K(0xfd4));S(Lsh,[0,.115,.15],.035,K(0x234));
El(Lsh,[0,.17,-.3],[.012,0,0],[0,.1,0],[0,0,.12],K(0xf72));S(Lsh,[0,0,-.47],.08,[2.5,1.5,.4,1]);S(Lsh,[0,-.02,.49],.035,[3,3,2,1]);
for(let s of[-1,1])El(Lsh,[s*.27,-.03,-.12],[.06,0,0],[0,.06,0],[0,0,.22],K(0x47a)),Cy(Lshc,[s*.14,0,-.1],[s*.25,-.03,-.1],.02,K(0x999)),S(Lsh,[s*.27,-.03,-.34],.045,[.4,2,2.5,1]);

