// ================= noyau : intérieur du nucléole, lamina =================
// Nucléole : 3 phases emboîtées (Lafontaine 2021 ; Feric 2016). Unité FC/DFC : gènes actifs à la frontière FC/DFC, amas de fibrillarine
// dans le DFC (Yao 2019), bordure PDFC (Shan 2023), composant granulaire autour. Lamina : filaments de 3,5 nm, ≈ 380 nm de long,
// domaines globulaires tous les 20 nm, couche de 14 nm (Turgay 2017) ; lamines B contre la membrane, A/C côté chromatine (Nmezi 2019).
const Ln0=Ly(M1,.36,.2,{rg:2,vz:110}),Lnc=Ly(MD,.36,.2,{rg:2,vz:110}),Lnu=Ly(M3,60,0,{al:1,io:1}),
Lld=Ly(MD,1e9,0,{rg:2}),Lls=Ly(M1,1e9,0,{rg:2}),dLm=dy(Lld,4200,[0,0,0],.6),dLb=dy(Lls,4400,[0,0,0],.6),
hsh=(a,b,c)=>{let x=sin(a*127.1+b*311.7+c*74.7)*43758.5453;return x-floor(x)},
FX=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(a=>{let u=pp(a);return[a,u,cr(a,u)]});
let NOU=[],LMC=[],lmP=0,lmZ=0,NOA=0;

function mkNol(){[Ln0,Lnc,Lnu].forEach(clr);NOU=[];let i,k,g,q,c,d;
  NUN.forEach(U=>{let ax=rd(),e1=pp(ax),G=[],D=[];
    S(Lnu,U,.145,K(0xfdf,.13));S(Lnu,U,.24,K(0x3c6,.09));
    for(k=0;k<30;k++){q=ma(U,rd(),.12*cbrt(R()));S(Ln0,q,.0065,K(k%3?0xb7e:0xdc8));k%6||sc(q,.014,'fc')}           // réserve : Pol I (violet), UBF et treacle (jaune pâle)
    for(g=0;g<3;g++){let A=nm(ad(rot(e1,ax,g*TAU/3),ml(ax,rr(-.3,.3)))),[x,,y]=fr(A),P=[],T=[];          // gène actif : spirale de 1,35 µm sur la frontière FC/DFC
      for(i=0;i<=100;i++){let t=i/100,al=.2+.8*t,az=t*TAU*2.6;P.push(ma(U,ad(ml(A,cos(al)),ad(ml(x,sin(al)*cos(az)),ml(y,sin(al)*sin(az)))),.15));T.push(rd());
        i&&Cy(Lnc,P[i-1],P[i],.0011,K(0xdde));i%6==3&&sc(P[i],.016,'po1');i%6==0&&i>30&&sc(ma(P[i],nm(sb(P[i],U)),.02+.07*t),.016,'ssu')}
      S(Ln0,P[0],.009,K(0xfd4));sc(P[0],.014,'rdn');S(Ln0,P[100],.008,K(0xe55));sc(P[100],.014,'rdn');G.push({P,T})}
    for(k=0;k<20;k++){c=ma(U,rd(),rr(.18,.225));for(i=0;i<7;i++)S(Ln0,ma(c,rd(),.014*cbrt(R())+.004),.0058,K(i<5?0x3c6:0xa6e));sc(c,.018,k%3?'fbl':'dkc')}          // DFC : amas de fibrillarine (vert), dyskérine (mauve)
    for(k=0;k<14;k++){c=ma(U,rd(),.25);S(Ln0,c,.007,K(0xe93));S(Ln0,ma(c,rd(),.009),.0045,K(0x6cf));sc(c,.014,'pdf')}          // PDFC : URB1, snoRNP U8
    for(k=0;k<36;k++)D.push(rd());NOU.push({U,G,D,ph:R()})});
  for(i=0;i<6500;i++){q=ma(NOL,rd(),.975*cbrt(R()));if(NUN.some(U=>ds(U,q)<.275))continue;let ty=i%10,m=ds(q,NOL);          // composant granulaire
    if(ty<5){S(Ln0,q,.0125,lp(K(0xc96),K(0xeb7),m).concat(1));S(Ln0,ma(q,rd(),.012),.0055,K(0x7ad));i%10||sc(q,.018,'p60')}
    else if(ty<7){S(Ln0,q,.0095,K(0x9b6));S(Ln0,ma(q,rd(),.009),.0045,K(0x7ad));i%20==5&&sc(q,.014,'p40')}
    else if(ty<9){d=rd();let[x,,y]=fr(d);for(k=0;k<5;k++)S(Ln0,ad(ma(q,x,.0035*cos(k*TAU/5)),ml(y,.0035*sin(k*TAU/5))),.0024,K(0xd9e));i%20==7&&sc(q,.012,'npm')}
    else{S(Ln0,q,.004,K(0xfe6));S(Ln0,ma(q,rd(),.005),.0035,K(0xc96));i%30==9&&sc(q,.012,'r5s')}}
  q=NOU.reduce((a,b)=>ds(a.U,p)<ds(b.U,p)?a:b).U;q=ma(q,nm(sb(p,q)),.37);return ds(q,NOL)>.9?ma(NOL,nm(sb(q,NOL)),.9):q}
ENT.nol=[.012,'le nucléole',mkNol,'Le nucléole n\'a pas de membrane : on y entre comme une protéine ribosomique, en se dissolvant dans le condensat. Sphères claires : centres fibrillaires. Approchez-en un pour voir la polymérase I à l\'œuvre.'];

// transcription par la polymérase I (vitesse réelle : le gène est parcouru en 140 s) et flux radial des pré-ribosomes
function nolT(){if(!ORG||ORG.i!='nol'){if(NOA)dLm.n=dLb.n=NOA=0;return}NOA=1;dLm.n=dLb.n=0;dLm.c=dLb.c=p;dLm.r=dLb.r=.9;let u,g,k,s,i,P,e,t,f,q;
  for(u of NOU){let d=ds(u.U,p);
    if(d<.5)for(g of u.G)for(k=0;k<100;k++){s=(k/100+sT/140)%1;i=s*100;P=lp(g.P[i|0],g.P[(i|0)+1],i%1);
      dS(dLb,P,.006,[.62,.42,.95,1]);e=nm(ad(nm(sb(P,u.U)),ml(g.T[k],.45)));t=ma(P,e,.012+.075*s);dT(dLm,P,t,.0013,[1,.6,.38,1]);dS(dLb,t,.0035+.009*min(1,s/.41),[.3,.8,.75,1])}
    if(d<.8)for(k=0;k<36;k++){f=(sT/50+u.ph+k*.618)%1;q=ma(u.U,u.D[k],.26+f*.5);
      if(ds(q,NOL)<.97&&NOU.every(v=>v==u||ds(v.U,q)>.27))dS(dLb,q,k%3?.0125:.0095,k%3?[.85,.62+.2*f,.42,1]:[.6,.75,.42,1])}}}

// lamina : feutrage procédural autour du vaisseau (même position → mêmes filaments)
function lamT(){let q=sb(p,Nc),l=ln(q);
  if(reg<2||ORG||PM||z>.3||l<Rn-.25-3*z){if(lmP)dLm.n=dLb.n=0,LMC=[],lmP=0;return}
  let dc=ml(q,1/l),Rp=cl(3*z+.14,.18,.55);if(lmP&&ds(dc,lmP)*Rn<Rp*.3&&abs(z-lmZ)<lmZ*.3)return;
  lmP=dc;lmZ=z;LMC=[];dLm.n=dLb.n=0;dLm.c=dLb.c=ma(Nc,dc,Rn-.047);dLm.r=dLb.r=Rp+.45;
  let n=62,m=ceil((Rp+.2)/.1),PN=PD.filter(d=>dt(d,dc)>cos((Rp+.5)/Rn)).map(d=>ma(Nc,d,Rn-.047)),bd=z<.07,ok=a=>PN.every(P=>ds(P,a)>.062),
  co=(a,r,i)=>LMC.push({a,b:a,r,i,q:a,R:r,sf:1});
  for(let f=0;f<6;f++){let[A,U,V]=FX[f],w=dt(dc,A);if(w<.4)continue;
    let i0=floor((atan(dt(dc,U)/w)*4/PI+1)/2*n),j0=floor((atan(dt(dc,V)/w)*4/PI+1)/2*n),
    dir=(a,b)=>nm(ad(A,ad(ml(U,tan((a/n*2-1)*PI/4)),ml(V,tan((b/n*2-1)*PI/4)))));
    for(let i=max(0,i0-m);i<=min(n-1,i0+m);i++)for(let j=max(0,j0-m);j<=min(n-1,j0+m);j++){
      if(acos(min(1,dt(dir(i+.5,j+.5),dc)))*Rn>Rp)continue;
      let H=k=>hsh(i+f*97,j,k),hd=k=>nm([H(k)-.5,H(k+1)-.5,H(k+2)-.5]);
      for(let k=0;k<4;k++){let B=k&1,s=k*10,d0=dir(i+H(s+1),j+H(s+2)),[x,,y]=fr(d0),an=H(s+3)*TAU,cv=(H(s+4)-.5)*.5,rad=Rn-(B?.0425:.0495)-H(s+5)*.004,          // filament de 380 nm : 5 tronçons
        a=ma(Nc,d0,rad),t=ad(ml(x,cos(an)),ml(y,sin(an))),b,col=B?[.3,.62,.95,1]:[.98,.6,.25,1],a0=a,cut=0;
        for(let sg=0;sg<5;sg++){t=nm(ad(t,ml(cr(d0,t),cv)));b=ma(Nc,nm(sb(ma(a,t,.076),Nc)),rad);
          if(ok(a)&&ok(b)){dT(dLm,a,b,.00175,col);if(bd)for(let e=0;e<4;e++)dS(dLb,lp(a,b,(e+.5)/4),.0026,col)}else cut=1;a=b}
        cut||LMC.push({a:a0,b:a,r:.006,i:B?'lmB':'lmA',q:lp(a0,a,.5),R:.2,sf:1})}
      let h=H(50),d1=dir(i+H(51),j+H(52)),M=ma(Nc,d1,Rn-.041);if(!ok(M))continue;          // protéines de la membrane interne
      if(h<.3){dS(dLb,M,.0045,[.55,.85,.45,1]);co(M,.008,'lbr');let a=ma(M,d1,-.011),g=a;          // LBR et son chapelet de nucléosomes
        for(let k=0;k<6;k++)dS(dLb,a,.0055,[.42,.47,.62,1]),a=ma(a,nm(ad(ml(d1,-.5),hd(60+k*3))),.0115);co(lp(g,a,.5),.022,'lad')}
      else if(h<.6){dS(dLb,M,.0036,[.95,.5,.7,1]);dS(dLb,ma(M,d1,-.0065),.003,[.95,.95,.8,1]);co(M,.008,'eme')}          // émerine et BAF
      else if(h<.75){dT(dLm,ma(M,d1,-.005),ma(M,d1,.034),.002,[.55,.9,.85,1]);dS(dLb,ma(M,d1,-.006),.0036,[.55,.9,.85,1]);dS(dLb,ma(M,d1,.035),.005,[.55,.9,.85,1]);co(ma(M,d1,-.004),.009,'linc')}}}}          // SUN : tige dans l'espace périnucléaire
