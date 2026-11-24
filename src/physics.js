// ================= objets dynamiques =================
const DSB=.0009,chV=Lves.ch[0],chG=Lcg.ch[0],chR=Lcr.ch[0],shp=[Lsh.ch[0],Lshc.ch[0],Lsha.ch[0]],VM=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],SM=VM.slice();
chV.m=chG.m=chR.m=VM;shp.forEach(h=>h.m=SM);
const Lrt=Ly(MC,.9,0,{vz:150}),Lrj=Ly(M0,.9,0,{vz:150}),Lrs=Ly(MD,.25,0,{vz:50}),rb=(o,r,n)=>({t:dy(Lrt,5e3*n,o,r),j:dy(Lrj,5e3*n,o,r),s:dy(Lrs,9e3*n,o,r)}),
KR=2*Math.ceil(cl(MR.length/3000,1,5)),dA=rb([0,0,0],GR+.6,KR),dC=rb(PS,1.5,KR/2),RNC=[],RR=.0006,dB=dy(Ldm,400+G.I.length*30,[0,0,0],GR+.6),dD=dy(Ldm,300+G.I.length*12,PS,1.5),dV=dy(Ldm,120,Cc,Rc+26),dE=dy(Ldm,20,e0,.3),FR=()=>z*100+.08,
dyc=[],[pX,,pZ]=fr(d0),WP=[ma(Nc,d0,Rn-.14),ma(Nc,d0,Rn+.13)],
cu3=(O,U,A,B,z,x,y)=>[O[0]+U[0]*z+A[0]*x+B[0]*y,O[1]+U[1]*z+A[1]*x+B[1]*y,O[2]+U[2]*z+A[2]*x+B[2]*y],
AZ=min(.3,.2/(MR.length/3*DSB)),WZ=AZ<.3?.03:0,      // ARN long : le transcrit naissant s'enroule en une large hélice (compaction en RNP) au lieu de s'étirer sur plus de 0,2 µm
cvN=(s,O,U,A,B)=>{let a=s*1e3,b=s*50,w=s*24,r=.0026*(1+.35*sin(.045*a));return cu3(O,U,A,B,s*AZ,r*sin(.27*a)+.0012*(sin(.11*a+1)-.84)+.006*sin(b)+WZ*sin(w),r*(cos(.27*a)-1)+.0012*sin(.13*a)+.006*(cos(b*.74)-1)+WZ*(cos(w)-1))},      // ARN naissant : spirale souple
cvM=(s,O,U,A,B)=>{let a=s*210;return cu3(O,U,A,B,-s*.1,.0045*cos(a),.0045*sin(a))},                                              // mRNP compact
cvP=(s,O,U,A,B)=>{let a=s/.028;return cu3(O,U,A,B,-.004*a,.028*(cos(a)-1),.028*sin(a))},                                         // polysome
gp=x=>{let j=cl(UP+x,0,GP.p.length-2),k=floor(j);return[lp(GP.p[k],GP.p[k+1],j-k),GP.T[k]]},
dc=(p,r,i,sf)=>dyc.push({a:p,b:p,r,i,q:p,R:r,sf});
let pols=[],trs=[],sT=0,nxt=0,slot=0;const nR=()=>({len:0,pa:0,m:0,I:G.I.map((o,k)=>({a:o.a,b:o.b,q:BP[k].x,s:0,t:0,m:0}))});[0,0,0xfc8,0xfc2,0x4af,0xfc2,0x4af,0xfc2,0xfc8,0xb66,0x5e6].forEach((h,i)=>RNC[i]=K(h).map((v,j)=>j<3?v*1.2:1));dE.ex=1;const dG=dy(Ldm,90,e0,90),dF=dy(Lsha,48,[0,0,0],4);dG.ex=1;dF.m=SM;shp.push(dF);
// flammes des réacteurs, en coordonnées du vaisseau : longueur selon la poussée (TH), jet bleu-blanc et traînée d'étincelles en turbo (BO)
function flm(){dF.n=0;if(TH<.03)return;let t=performance.now()/1e3,fk=k=>.85+.15*sin(t*47+k*3.1)+.1*sin(t*83+k),
  e=(x,y,zc,r,L,c)=>{let f=dF.f,o=dF.n++*16;f[o]=f[o+5]=r;f[o+10]=L/2;f[o+3]=x;f[o+7]=y;f[o+11]=zc-L/2;f[o+12]=c[0];f[o+13]=c[1];f[o+14]=c[2];f[o+15]=c[3]},
  L=(.12+TH*(.45+1.6*BO))*fk(0),l=.08+TH*(.3+1.2*BO);
  e(0,0,-.5,.085+.02*BO,L,[3,1.3,.25,.45]);e(0,0,-.5,.05,L*.7,BO>.3?[2,3,4,.9]:[4,3.2,1.6,.9]);
  for(let s of[-1,1])e(s*.27,-.03,-.36,.05,l*fk(s+2),[.5,2.4,3.2,.45]),e(s*.27,-.03,-.36,.028,l*.65*fk(s+5),[2.5,3.5,4,.9]);
  if(BO>.2)for(let k=0;k<16;k++){let a=(t*2.4+k*.37)%1,g=k*2.4,w=.09*(1+a);dS(dF,[cos(g)*w,sin(g)*w-.01,-.6-a*(1.3+1.7*BO)],.024*(1-a),[3,2.4,1,.8*(1-a)])}}
// balise de l'entrée : anneaux dorés qui se resserrent sur le puits et pointillé dans son axe, à taille d'écran constante
function bcn(){dG.n=0;if(reg||ct>=0||!go)return;let b=LU&&LU.bbb,T=b?TCY:e0,D=ds(E,T),t=performance.now()/1e3,k,i,g,h,c=[3,2.1,.3,1];if(D<.3)return;
  for(k=0;k<3;k++){h=1-(t*.5+k/3)%1;for(i=0;i<18;i++)g=i*TAU/18+k,dS(dG,ad(ma(T,v0,b?.02*D:.004*D),ad(ml(tX,D*.16*h*cos(g)),ml(tZ,D*.16*h*sin(g)))),D*.0075*(.5+h*.6),c)}
  for(k=1;k<9;k++)dS(dG,ma(T,v0,(b?-1:1)*D*.045*(k+(t*1.5)%1)),D*.006,c)}
function stepI(r,x,d){if(r.pm)return;for(let J of r.I){J.t+=d;if(!J.s&&x>J.b+25)J.s=1,J.t=0;else if(J.s==1&&J.t>2.5)J.s=2,J.t=0;else if(J.s==2&&J.t>3.5)J.s=3,J.t=0;else if(J.s==3&&J.t>4)J.s=4}}
function sg(db,a,b,f,k,nb){let c=RNC[f];dT(db.t,a,b,RR,c);dS(db.j,b,RR*1.03,c);                      // un segment du ruban + ses 3 bases
  if(nb){let x=b[0]-a[0],y=b[1]-a[1],w=b[2]-a[2],l=hypot(x,y,w)||1,ux,uy,uz,vx,vy,vz,i,m;x/=l;y/=l;w/=l;
    if(abs(y)<.9)ux=-w,uy=0,uz=x;else ux=0,uy=w,uz=-y;m=hypot(ux,uy,uz);ux/=m;uy/=m;uz/=m;vx=y*uz-w*uy;vy=w*ux-x*uz;vz=x*uy-y*ux;
    for(i=0;i<3;i++){let t=(i+.5)/3,g=(k+i)*.62,cg=cos(g)*.00135,sn=sin(g)*.00135,P=[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];
      dT(db.s,P,[P[0]+ux*cg+vx*sn,P[1]+uy*cg+vy*sn,P[2]+uz*cg+vz*sn],.00026,BC[k<0?'A':SQ(k+i)]||BC[''])}}}
function rna(r,pos,A,B,db,dm){            // dessine un ARN : pos(i) = position de la perle i (5′→3′) de la chaîne principale
  let m=0,bl=[],k,f,J,q,p,pv=0,nb;
  for(k=0;k<r.len;k+=3){f=ft(k);J=f==4?r.I[XN[k]]:0;
    if(J&&J.s>1){J.m=m;J.s==2&&bl.push([f,m,J,(k-J.a)/(J.b-J.a),k]);continue}
    bl.push([f,m++,0,k,k])}
  for(k=0;k<r.pa;k+=3)bl.push([10,m++,0,-9,-9]);
  r.m=m;nb=m&&ds(pos(m>>1),E)<.2;
  for(q of bl){p=pos(q[1]);k=q[3];
    if(J=q[2]){let l=(J.b-J.a)/3*DSB/TAU,a=k*TAU;p=ad(p,ad(ml(A,l*(1-cos(a))),ml(B,l*sin(a))))}      // intron en boucle (lasso en formation)
    else{if(!k&&r.len>25)dS(dm,p,.003,K(0xfff)),dS(db.j,p,.0013,[3,3,3,1]);                         // coiffe m7G + CBC
      for(J of r.I){if(k<=J.a&&J.a<k+3)J.p5=p;if(k<=J.q&&J.q<k+3)J.pb=p;if(k<=J.a&&J.a<k+3&&J.s<2&&r.len>J.a+15)dS(dm,p,.0045,K(0x5cf));               // snRNP U1 sur le site donneur
        if(J.s==1){if(k<=J.q&&J.q<k+3)dS(dm,p,.005,K(0x6e8));if(k<=J.b-5&&J.b-5<k+3)dS(dm,p,.0028,K(0xfa5))}}      // U2 (branchement), U2AF (accepteur)
      if(q[0]==10&&q[1]%14==0)dS(dm,p,.002,K(0x7d7))}                                              // PABPN1
    pv?sg(db,pv,p,q[0],q[4],nb):dS(db.j,p,RR*1.03,RNC[q[0]]);pv=p}
  for(J of r.I){
    if(J.s==2)p=pos(J.m),dS(dm,p,.011,K(0xc7e)),dc(p,.011,'spl');                                  // spliceosome catalytique
    if(J.s>2)dS(dm,pos(max(0,J.m-8)),.0024,K(0xf6a));                                              // EJC
    if(J.s==3){let n=(J.b-J.a)/3|0,l=n*DSB/TAU,g=1-J.t/4,c=ma(pos(J.m),A,l+.004+J.t*.012),a,b,e=k=>ad(c,ad(ml(A,-l*g*cos(k/n*TAU)),ml(B,l*g*sin(k/n*TAU))));n=max(3,n*g|0);        // lasso libéré puis dégradé
      a=e(0);for(k=1;k<=n;k++)b=e(k),sg(db,a,b,4,J.a+k*3,nb),a=b;
      a=e(0);for(k=1;k<10*g;k++)b=ma(c,A,-l*g-k*DSB),sg(db,a,b,4,J.b-30+k*3,nb),a=b}}}                // queue du lasso (aval du point de branchement)
function sim(d,nr,nP){
  sT+=d;dyc.length=0;dB.n=dD.n=0;for(let o of[dA,dC])o.t.n=o.j.n=o.s.n=0;
  if(sT>nxt)nxt=sT+max(rr(9,14)*(G.L/1606)**.7,G.L>5e3?G.L/150:0),pols.push({x:-8,w:2.5,r:nR()});
  pols=pols.filter(P=>{
    if(!P.pm){if(P.w>0)P.w-=d;else P.x+=30*d;if(!P.pd&&P.x>42)P.pd=1,P.w=1.5}                                                              // pause proximale
    let[c,t]=gp(P.x),U=nm(ma(WX,t,-.4)),A=nm(cr(U,t)),B=cr(U,A),O=ma(c,U,.0075),r=P.r,k;
    if(r){r.len=cl(P.x,0,G.L);stepI(r,P.x,d);if(P.x>G.L+34)P.cut=sT,trs.push({r,O,U,A,B,ph:0,t:0,st:ad(PS,ad(ml(pX,cos(slot*1.26)*.2),ml(pZ,sin(slot++*1.26)*.2)))}),P.r=0}
    else if(G.L+36*(sT-P.cut)>P.x)return 0;                                                       // XRN2 rattrape la polymérase
    if(nr){dS(dB,c,.007,K(0x48d));dS(dB,ma(ma(c,t,.0045),WX,-.003),.0045,K(0x37b));dc(c,.008,'pol');
      for(k=0;k<6;k++)dS(dB,ad(ma(ma(c,U,.004+.0018*k),t,-.006-.0012*k),ml(A,.0012*sin(k*1.3+sT*3))),.0011,P.cc||(P.x<80?K(0xfb3):K(0x3de)));      // queue CTD
      if(r)rna(r,i=>cvN((r.m-i)*DSB,O,U,A,B),A,B,dA,dB),r.len>60&&dc(ma(O,U,.03),.03,'rna',1);
      else{let n=(P.x-G.L-36*(sT-P.cut))/3|0;for(k=1;k<n;k++)sg(dA,cvN((k-1)*DSB,O,U,A,B),cvN(k*DSB,O,U,A,B),9,-1,0);dS(dB,cvN(n*DSB,O,U,A,B),.004,K(0xf44));dc(c,.03,'dn',1)}}
    return 1});
  let n3=trs.filter(T=>T.ph>2).length;
  trs=trs.filter(T=>{let r=T.r,pN=i=>cvN((r.m-i)*DSB,T.O,T.U,T.A,T.B),mA=T.D&&pp(T.D),mB=T.D&&cr(T.D,mA),pM=i=>cvM(i*DSB,T.H,T.D,mA,mB),pP=i=>cvP(i*DSB,T.st,T.Dp,T.Ap,T.Bp),pos,k,fa;T.t+=d;
    if(!T.ph){stepI(r,G.L+99,d);r.pa=min(200,r.pa+30*d);pos=pN;nr&&(dS(dB,T.O,.005,K(0x9ad)),dc(T.O,.04,'rna',1));
      if(r.pa>199&&r.I.every(J=>J.s>3))T.ph=1,T.t=0,T.H=pN(0),T.D=nm(sb(WP[0],T.H))}
    else if(T.ph<2){k=ss(T.t/1.5);pos=i=>lp(pN(i),pM(i),k);if(T.t>1.5)T.ph=2,T.w=0}
    else if(T.ph<3){let g=WP[T.w]||T.st,l=ds(g,T.H),v=nm(sb(g,T.H));T.D=nm(lp(T.D,v,min(1,d*4)));T.H=ma(T.H,v,min(l,(T.w==1?.08:.3)*d));pos=pM;
      if(l<.004&&++T.w>2)T.ph=3,T.t=0,T.Dp=T.D,T.Ap=pp(T.D),T.Bp=cr(T.D,T.Ap)}
    else{if(n3>4)return n3--,0;k=ss(T.t/2);pos=i=>lp(pM(i),pP(i),k)}
    fa=T.ph>1&&ln(T.H)>GR;
    if(fa?nP:nr){let db=fa?dC:dA,dm=fa?dD:dB;rna(r,pos,T.A,T.B,db,dm);
      if(T.ph>0&&T.ph<3)dS(dm,pos(40),.003,K(0x8f8)),dS(dm,pos(130),.003,K(0x8f8)),dc(T.H,.02,'mrn',1);          // NXF1–NXT1
      if(T.ph>2&&T.t>2)for(k=0;k<cl((CME-CM)/90|0,2,8);k++){let nt=CM+(T.t*15+k*(CME-CM)/cl((CME-CM)/90|0,2,8))%(CME-CM),a=nt/3*DSB/.028,q=pP(nt/3),o=ad(ml(T.Ap,cos(a)),ml(T.Bp,sin(a)));      // ribosomes en traduction
        dS(dm,ma(q,o,.011),.0115,K(0xdc9));dS(dm,ma(q,o,-.005),.008,K(0xa87));dS(dm,ma(q,o,.024),.001+(nt-CM)/(CME-CM)*.0022,K(0xe33));dc(q,.016,'ply',1)}}
    return 1})}
const TV=[];MT.forEach(m=>m.L=m.reduce((s,q,i)=>s+(i?ds(q,m[i-1]):0),0));
for(let i=0;i<32;i++)TV.push({m:MT[R()*MT.length|0],u:R(),v:(R()<.6?1:-1)*rr(.6,1.1),r:rr(.035,.05),o:rd()});
function vesi(d){dV.n=0;for(let v of TV){v.u+=v.v*d/v.m.L;if(v.u<0||v.u>=1)v.m=MT[R()*MT.length|0],v.u=v.u<0?.999:0;       // vésicules tractées par kinésine / dynéine
  let k=v.u*10,j=floor(k),a=v.m[j],b=v.m[j+1],c=lp(a,b,k-j),q=ma(c,nm(cr(sb(b,a),v.o)),v.r+.022);dS(dV,q,v.r,K(0xfc6));dS(dV,lp(c,q,.35),.007,K(0xf84));dc(q,v.r,'ves')}}

// ================= état du jeu, physique =================
let p=S0[0],f=nm(S0[1]),u=pp(f),z=.5,LU=-1,DM=2,ZM=1,vel=0,reg=0,ct=-1,cf=f,cu=u,E=p,vh=.6*rv,poi=0,go=0,nI,nD,cp0,cf0,seenN=0,
tjx=0,tjy=0,tth=0,tzm=0,tbo=0,TH=0,BO=0,last=0,hT=0,iT=0,flT=0,sayT=0,FG=CF.fg.slice(),vr,vu,vf,fx,fy,HF,FAR;
const keys={},DPR=min(devicePixelRatio||1,2),
fm=x=>(x<1?(x*1e3).toFixed(x<.0095?1:0)+' nm':x.toFixed(2)+' µm').replace('.',LG?'.':','),
say=(t,s=4)=>{$('cap').textContent=t;$('cap').style.opacity=1;sayT=s},
vesC=()=>{let c=ma(e0,v0,vh);VM[12]=c[0];VM[13]=c[1];VM[14]=c[2];return c},
cpt=(o,q)=>{if(!o.a)return o.c;let ab=sb(o.b,o.a);return ma(o.a,ab,cl(dt(sb(q,o.a),ab)/(dt(ab,ab)||1),0,1))},          // point le plus proche de l'axe d'une forme
shF=q=>{let b,m=1e9,o,v;for(o of SH)v=ds(q,cpt(o,q))-o.R,v<m&&(m=v,b=o);return[b,m]},                                           // forme de la cellule (soma, prolongement, bouton) qui contient q
rk=()=>{let o=shF(p)[0];return o.k?o.k=='axn'&&dt(sb(p,Cc),o.d)<Rc+8?'ais':o.k=='myf'&&z<.3?cdZ(p,o):o.k:'cyt'},
mdk=q=>{if(CT!=1)return'mem';let c=abs(dt(nm(sb(q,Cc)),v0));return c>.62?'mem':c<.06?'bc':'lat'},                                   // domaine membranaire de l'hépatocyte
pore=()=>{let q=sb(p,Nc),b=PD[0],m=-2,d,s;for(d of PD)(s=dt(d,q))>m&&(m=s,b=d);return[ln(sb(q,ml(b,m))),b,m]};      // pore le plus proche : [écart latéral, axe, position axiale]
function hit(L,r){let h=0,T=8*z+.03,o;
  for(o of L){let x=p[0]-o.q[0],y=p[1]-o.q[1],w=p[2]-o.q[2],lim=o.R+r+T,d,l,m;if(x*x+y*y+w*w>lim*lim)continue;
    if(o.e){d=sb(p,o.c);let s=o.s,a=s[0]+r,b=s[1]+r,c=s[2]+r,q=[dt(d,o.X)/a,dt(d,o.Y)/b,dt(d,o.Z)/c];l=ln(q)||1;m=(l-1)*(min(s[0],s[1],s[2])+r);
      if(l<1)p=ad(o.c,ad(ad(ml(o.X,q[0]/l*a),ml(o.Y,q[1]/l*b)),ml(o.Z,q[2]/l*c))),h=o}
    else{let ab=sb(o.b,o.a),t=cl(dt(sb(p,o.a),ab)/(dt(ab,ab)||1),0,1),c=ma(o.a,ab,t);d=sb(p,c);l=ln(d);m=l-o.r-r;
      if(m<0&&!o.sf)p=ma(c,l?ml(d,1/l):[0,1,0],o.r+r),h=o;if(o.hb&&m<0)m=.07}
    if(m<nD)nD=m,nI=o}
  return h}
function phys(){let r=z*.42,h=0;nI=0;nD=1e9;if(ORG)return pO(r);if(ct>=0)return pV(r);
  if(!reg){let dS=1e9,dO=1e9,o,c,m,lu=LU;LU=0;        // hors de la cellule : notre cellule (SH), ses voisines (OX), les vaisseaux (VS)
    for(o of SH){c=cpt(o,p);m=ds(p,c)-o.R;if(m<dS)dS=m;if(m<r+.003)p=ma(c,nm(sb(p,c)),o.R+r+.003)}
    for(o of OX){c=cpt(o,p);m=ds(p,c)-o.r;let k=o.dc&&o.dc[1]-ds(p,o.dc[0]);if(k>m)m=k,c=0;if(m<dO)dO=m;{let w=o.bg?m+.03:m;if(w<nD&&m<.5+.35*o.r)nD=w,nI=o}if(m<r+.003&&!o.sf)p=c?ma(c,nm(sb(p,c)),o.r+r+.003):ma(o.dc[0],nm(sb(p,o.dc[0])),o.dc[1]-r-.003)}       // dc : cupule creusée dans une épine (fente synaptique)
    for(o of VS){let ab=sb(o.b,o.a),e;c=ma(o.a,ab,cl(dt(sb(p,o.a),ab)/dt(ab,ab),0,1));e=ds(p,c)-o.R;m=abs(e)-o.th;if(e<0)LU=o;if(m<dO)dO=m;if(m<nD&&m<min(1.2,.3*o.R))nD=m,nI=o;
      if(m<r+.002&&(o.bbb||z>.16))p=ma(c,nm(sb(p,c)),o.R+(e<0?-1:1)*(o.th+r+.002)),(o.bbb?ds(p,TCY)>1.4&&say(CT>2?'Endothélium continu, sans fenêtre : aucun passage ici. Rejoignez l\'anneau doré (repère ◎) pour traverser par transcytose.':'Barrière hémato-encéphalique : jonctions serrées, aucun passage. Rejoignez l\'anneau doré (repère ◎) pour traverser par transcytose.',5):AP||say('Paroi du vaisseau : le vaisseau est trop gros pour la traverser. Rétrécissez-le sous 160 nm (Q, − ou molette).',3))}
    if(lu!=-1&&!lu!=!LU&&!(LU||lu).bbb&&go)say(CT?'Vous passez par une fenêtre de la cellule endothéliale : 100 à 150 nm de diamètre.':'Vous traversez la paroi mince et discontinue du sinusoïde.',5);
    if(dS<=nD)nI=0;DM=min(max(min(dS,dO),.55),ds(p,e0));for(o of SY)DM=min(DM,max(.016,(ds(p,o.cc)-.17)*.42));       // près d'une synapse, le vaisseau rapetisse jusqu'à pouvoir entrer dans la fenteif(ds(p,TC)>TR)p=ma(TC,nm(sb(p,TC)),TR);
    {let q=sb(p,e0),a=dt(q,v0),l=ln(sb(q,ml(v0,a)));if(a>0&&a<.6&&l<.6)p=ma(p,nm(sb(ma(e0,v0,a),p)),min(l,.012+l*.06))}       // capture par le récepteur : à moins de 600 nm, le vaisseau est ramené dans l'axe du puits
    if(ds(p,e0)<.07+r)z=min(z,.03),ct=0,cp0=p,cf0=f,vel=0}
  else{let[o,m]=shF(p);if(m>-r-.006){let c=cpt(o,p);p=ma(c,nm(sb(p,c)),max(0,o.R-r-.006));h=1}
    let dN=ds(p,Nc);
    if(abs(dN-Rn+.02)<.09+r){let[lt,b,ax]=pore(),q=sb(p,Nc);
      if(z<.041&&lt<.06){let a=max(.003,.024-r)+max(0,abs(ax-Rn+.02)-.03)*1.5,w=sb(q,ml(b,ax));if(lt>a)w=ml(w,(a+(lt-a)*.7)/lt);p=ad(Nc,ad(ml(b,ax),w));       // canal du pore : entonnoir
        if((ax<Rn-.02?2:1)!=reg){reg=3-reg;if(reg>1&&!seenN)seenN=1,poi=2,say('Vous êtes dans le noyau. Suivez le repère « Gène '+G.sy+' », puis rétrécissez jusqu\'à 2–5 nm pour lire l\'ADN.',9)}}
      else{let d=nm(q);if(reg>1){if(dN>Rn-.06-r)p=ma(Nc,d,Rn-.06-r),h=1}else if(dN<Rn+.005+r)p=ma(Nc,d,Rn+.005+r),h=1;
        if(h&&lt<.1&&z>.041)say('Pore nucléaire : canal central ≈ 40 nm. Rétrécissez le vaisseau à 40 nm ou moins (Q, − ou molette).')}}
    let a=reg<2?hit(CY,r):hit(NU,r),b=reg>1&&ln(p)<GR+.2&&hit(DN,r),c=hit(dyc,r);reg>1&&hit(LMC,r);if(a||b||c)p=ma(p,u,abs(vel)*.004);h=a||b||c||h;
    if(h)vel*=.985}}
// endocytose : le puits se referme sur le vaisseau, la vésicule perd son manteau et rejoint l'endosome précoce ; le joueur garde les commandes tout du long
// (enfermé dans la vésicule, puis dans l'endosome : pV), et sort de l'endosome quand il le décide (endX)
let ENP=0,XK=0;const dEn=dy(Ldb,220,ECN,.5),
CAP=[[0,CF.cap[0]],[.9,CF.cap[1]],[1.9,'Scission : la GTPase dynamine (anneau vert) étrangle le col puis le sectionne. Vous restez aux commandes dans la vésicule.'],[3.2,'Désassemblage du manteau de clathrine par Hsc70 et l\'auxiline (ATP).'],[4.9,CF.cap[2]],[11,'Vous êtes dans l\'endosome précoce : explorez-le, puis touchez « ⇥ Quitter l\'endosome » pour gagner le cytosol.']];
function pV(r){let c=ENP?ECN:vesC(),R=max(.004,(ENP?ERA:rv)-.006-r),d=sb(p,c),l=ln(d);if(l>R)p=ma(c,d,R/l);nI=0;nD=1e9}       // confinement dans la vésicule ou dans l'endosome
function cine(d){let o=ct,c0=vesC();ct+=d;for(let[t,s]of CAP)o<=t&&ct>t&&say(s,t>4?11:5);z=min(z,ENP?.07:.03);
  vh=ct<1.9?rv*(.6-1.6*ss(ct/1.9)):-rv-(.44-ERA-.01)*ss((ct-1.9)/2.6);let c=vesC();
  if(!ENP){p=ad(p,sb(c,c0));ct>4.7&&(ENP=1,poi=1,hT=0)}       // la vésicule emporte le vaisseau, puis fusionne avec l'endosome
  chG.n=chG.N*cl(1-(ct-3)/1.2,0,1)|0;chV.A=cl(1-(ct-4.5)/.8,0,1);chR.n=chR.N*cl(1-(ct-5.5)/3,0,1)|0;dE.n=0;dEn.n=0;
  if(vh<-.3*rv&&vh>-1.03*rv)for(let i=0;i<14;i++)dS(dE,ad(ma(e0,v0,-.004),ad(ml(tX,cos(i*.449)*(sqrt(max(0,rv*rv-vh*vh))+.007)),ml(tZ,sin(i*.449)*(sqrt(max(0,rv*rv-vh*vh))+.007)))),.0045,K(0x5d7));
  if(ENP){for(let i=0;i<EVP.length;i++)for(let k=0;k<5;k++){let a=(ct*.45+k/5+i*.13)%1;dS(dEn,ad(ma(ECN,EVP[i],ERA-.012-.07*a),[.006*sin(ct+k+i),.006*cos(ct*1.3+k),0]),.0022,[2.4,2.6,3,1])}       // protons pompés : la lumière s'acidifie
    for(let i=0;i<26;i++){let h=sin(i*127.1)*43758.5453,g=h-floor(h),e=ss((ct-5.5-3*g)/2.5),d=nm([sin(i*2.1),cos(i*1.7),sin(i*.9+1)]);dS(dEn,ma(ECN,d,ERA*(.93-.6*e*(.4+.6*g))),.0045,[1.6,1.3,.3,1])}}       // la cargaison se détache de ses récepteurs
  up(dEn)}
function endX(){if(ct<0||!ENP)return;ct=-1;reg=1;poi=1;ENP=0;chV.A=0;chG.n=chR.n=0;dEn.n=0;up(dEn);vel=0;fly(ma(ECN,v0,-ERA-.12),.03,()=>say(CF.in+' Touchez un objet pour sa fiche ; ☰ Atlas liste tout ce qu\'il y a à voir ; ⇤ pour ressortir de la cellule.',14));
  say('Échappement endosomal — licence narrative : seuls certains virus (adénovirus) rompent ainsi l\'endosome.',5)}
