// ================= rendu =================
const MM=new Float32Array(16),VV=new Float32Array(16),TGT=[CF.fg,[.02,.08,.12],[.07,.04,.14]],HB=new Float32Array(24);
const ev=L=>min(L.vis,L.vz*z);
function vis(h){if(!h.n||h.A<=0||SX&&SX.solo&&!h.L.sx)return 0;let m=h.m,d=sb(m?[m[12],m[13],m[14]]:h.c,E),l=ln(d),s=l-h.r,L=h.L;h.d=d;h.k=l+h.r;
  let g=L.rg,q=ds(p,Nc);if(L.io&&(L.io>0)!=(ORG&&ORG.i=='nol')||L.tx&&TXH||!L.ex&&!h.ex&&!reg&&ct<1.5&&!NX||g==1&&reg>1&&q<Rn-.35||g==2&&reg<2&&q>Rn+.3||g==3&&(reg>1||q<Rn+.25))return 0;if(m)return 1;if(s>ev(L)||s>FAR||s>4.5*FR()||L.nl&&s<.85*ev(L.nl))return 0;
  return!(l>h.r&&acos(cl(dt(d,vf)/l,-1,1))-asin(h.r/l)>HF)}
function dr(h,i,a,cf){let L=h.L,m=h.m,d=h.d;if(m)MM.set(m);else MM.fill(0),MM[0]=MM[5]=MM[10]=MM[15]=1;MM[12]=d[0];MM[13]=d[1];MM[14]=d[2];
  gl.uniformMatrix4fv(U.M,false,MM);gl.uniform1f(U.T,L.m.t);gl.uniform1f(U.G,L.G);gl.uniform1f(U.A,h.A);gl.uniform1f(U.B,SX&&!L.sx?.22:RX&&!L.rx?.7:NX&&L.nxd?NX.dm:L.dim&&TG.on?.3:1);
  let fc=RX&&ORG&&L.sh;!fc&&(L.m.t||L.al&&!cf||ORG)?gl.disable(2884):gl.enable(2884);gl.cullFace(fc||cf==1?1028:1029);gl.bindVertexArray(h.v);gl.drawArraysInstanced(4,0,L.m.n,h.n)}
let TXH=0;
function draw(){TXH=reg&&(reg>1||shF(p)[1]<-2.5);let W=cv.clientWidth*Q|0,H=cv.clientHeight*Q|0,n=z*.25,fa=FAR=z*6e3,A=(fa+n)/(n-fa),B=2*fa*n/(n-fa),tl=[],L,h,a,c=vesC();
  if(cv.width!=W||cv.height!=H)cv.width=W,cv.height=H;a=W/H;fy=1.75*min(1,a)**.6;fx=fy/a;HF=Math.atan(hypot(1/fx,1/fy))+.05;
  VV.set([fx*vr[0],fy*vu[0],-A*vf[0],vf[0],fx*vr[1],fy*vu[1],-A*vf[1],vf[1],fx*vr[2],fy*vu[2],-A*vf[2],vf[2],0,0,B,0]);
  gl.viewport(0,0,W,H);gl.clearColor(FG[0],FG[1],FG[2],1);gl.clear(16640);gl.enable(2929);
  gl.uniformMatrix4fv(U.V,false,VV);gl.uniform3fv(U.F,FG);gl.uniform1f(U.D,1/FR());
  if(reg>1&&AT)for(a of[U.P,U.C])gl.uniform4f(a,AT[0]-E[0],AT[1]-E[1],AT[2]-E[2],AT[3]);       // ADN atomique : sphère de fondu autour du vaisseau
  else gl.uniform4f(U.P,c[0]-E[0],c[1]-E[1],c[2]-E[2],ct>=0||!reg?rv:0),gl.uniform4f(U.C,Ce[0]-E[0],Ce[1]-E[1],Ce[2]-E[2],Re);
  HO.forEach((h,i)=>{HB[i*4]=h[0]-E[0];HB[i*4+1]=h[1]-E[1];HB[i*4+2]=h[2]-E[2];HB[i*4+3]=h[3]});gl.uniform4fv(U.H,HB);       // ouvertures du soma vers les prolongements
  SY.forEach((s,i)=>{SB.set(sb(s.Cp,E),i*8);SB[i*8+3]=s.Rp+.02;SB.set(sb(s.Cs,E),i*8+4);SB[i*8+7]=.3});SY[0]&&gl.uniform4fv(U.S,SB);
  gl.uniform1f(U.N,PM?max(.8,3.4*z+.5):2.2*z+.02);TG.U&&!TG.auto?gl.uniform4f(U.Q,TG.C[0]-E[0],TG.C[1]-E[1],TG.C[2]-E[2],TG.Rl+.1):gl.uniform4f(U.Q,0,0,0,0);       // les fibres schématiques s'effacent près de la caméra et dans la poche du locus
  gl.disable(3042);gl.depthMask(true);
  for(L of LY)for(h of L.ch)vis(h)&&(L.al?L.two?(tl.push([h,h.k,1]),h.k>2*h.r&&tl.push([h,h.k-2*h.r,2])):tl.push([h,h.k,0]):dr(h));
  gl.enable(3042);gl.blendFunc(770,771);gl.depthMask(false);tl.sort((a,b)=>b[1]-a[1]).forEach(e=>dr(e[0],0,0,e[2]));gl.depthMask(true)}
function cam(d){let k=min(1,d*8);cf=nm(lp(cf,f,k));cu=nm(lp(cu,u,k));vr=nm(cr(cf,cu));let w=cr(vr,cf),r=cr(f,u);vf=nm(ma(cf,w,NX||SX&&!SX.fly?0:-.2));vu=cr(vr,vf);
  E=ad(ma(p,cf,-3.4*z*(1+.3*BO)),ml(w,NX||SX&&!SX.fly?0:1.05*z));       // influx nerveux : caméra à la hauteur du sujet, sans plongée
  SM.splice(0,16,-r[0]*z,-r[1]*z,-r[2]*z,0,u[0]*z,u[1]*z,u[2]*z,0,f[0]*z,f[1]*z,f[2]*z,0,p[0],p[1],p[2],1)}
function ctl(d){let o=(...a)=>a.some(k=>keys[k])|0,jx=cl(o('ArrowRight','KeyD')-o('ArrowLeft','KeyA')+tjx,-1,1),jy=cl(o('ArrowUp','KeyW')-o('ArrowDown','KeyS')+tjy,-1,1),bo=o('ControlLeft','ControlRight','KeyF')|tbo,      // turbo : Ctrl, F ou le bouton ⚡ (pousse aussi vers l'avant)
  th=cl(o('Space')-o('ShiftLeft','ShiftRight','KeyX')+tth+bo,-1,1),zm=cl(o('KeyE','Equal','NumpadAdd')-o('KeyQ','Minus','NumpadSubtract')+tzm,-1,1);
  f=rot(f,u,-jx*1.5*d);let r=nm(cr(f,u));f=nm(rot(f,r,jy*1.2*d));u=cr(r,f);
  if(!reg&&ct<0){ZM=cl(ZM*2**(zm*1.5*d),.35,4);let zt=cl(.22*DM*ZM,.0032,3);z+=(zt-z)*min(1,d*(zt<z?12:4))}else z=cl(z*2**(zm*1.5*d),reg>1&&TG.nd<.03?.0005:.002,ORG?ORG.zm:.4);       // hors des cellules, la taille suit la distance au plus proche obstacle ; − + règlent un facteur
  BO+=((bo&&th>0?1:0)-BO)*min(1,d*5);TH+=(max(0,th)-TH)*min(1,d*7);$('vg').className=BO>.3?'bo':'';
  vel+=((th>0?th*(1+3*BO):th*.5)*z*7-vel)*min(1,d*(4+4*BO));
  for(let n=cl(Math.ceil(abs(vel)*d/(.3*z)),1,6),i=0;i<n;i++)p=ma(p,f,vel*d/n),phys()}       // déplacement par petits pas : même en turbo on ne traverse pas un obstacle fin

// ================= interface =================
const REG=[['Moelle osseuse','Espace de Disse','Neuropile'][CT],'Cytoplasme','Noyau'],RKN={ais:'Axone, segment initial',axn:'Axone',den:'Dendrite',btn:'Bouton synaptique',cyt:'Soma'},
POI=[[()=>LU&&LU.bbb?'PASSAGE · point de transcytose':'ENTRÉE · puits à clathrine',()=>LU&&LU.bbb?TCY:e0],['Pore nucléaire',()=>ma(Nc,pore()[1],Rn)],['Gène '+G.sy,()=>[0,0,0]],['Nucléole',()=>NOL],['Corps de Cajal',()=>CBP],['Corps de Barr',()=>XI],['Centrosome et Golgi',()=>CS],['Polysomes '+G.sy,()=>PS]]
 .concat(CT>1?[['Segment initial de l\'axone',()=>ma(Cc,dax,Rc+3)],['Bouton synaptique',()=>Cb],['Fente synaptique (notre bouton)',()=>SY[1].cc],['Synapse reçue (épine)',()=>SY[0].cc],['Dendrite apicale',()=>ma(Cc,A0,Rc+7)]]:CT?[['Canalicule biliaire',()=>ma(Cc,cD,Rc-.3)]]:[],[['Vaisseau sanguin',()=>VS[0].A]]),NP=POI.length,FB=[.3,.07,.06],
CDS=G.ex.map(([a,b])=>SEQ.slice(G.up+max(a,G.cs),G.up+max(min(b,G.ce),max(a,G.cs)))).join(''),
fnm=i=>{let f=ft(i);return f<2?['chromatine flanquante','promoteur'][f]:f>4?'aval du gène':f==4?'intron '+(XN[i]+1):f==2?i<G.cs?'5′UTR':'3′UTR':'exon '+(XN[i]+1)},
cp=m=>m<CM?'-'+(CM-m):m<CME?''+(m-CM+1):'*'+(m-CME+1),          // numérotation HGVS c. d'une position de l'ARNm
hg=i=>{if(i<0)return'c.-'+(CM-i);if(i>=G.L)return'+'+(i-G.L+1)+' nt après le site poly(A)';if(FT[i]!=4)return'c.'+cp(i2m(i));
  let k=XN[i],e=G.ex[k][1],d1=i-e+1,d2=G.ex[k+1][0]-i,m=i2m(e);return d1<=d2?'c.'+cp(m-1)+'+'+d1:'c.'+cp(m)+'-'+d2},
cod=i=>{let k=(i2m(i)-CM)/3|0,t=CDS.substr(k*3,3),x=c=>'TCAG'.indexOf(c);
  return' · codon '+(k+1)+' '+t+' ('+'Ala,Arg,Asn,Asp,Cys,Gln,Glu,Gly,His,Ile,Leu,Lys,Met,Phe,Pro,Ser,Thr,Trp,Tyr,Val,Stop'.split(',')['ARNDCQEGHILKMFPSTWYV*'.indexOf('FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG'[x(t[0])*16+x(t[1])*4+x(t[2])])]+')'},
mk=$('mk'),cap=$('cap');
let hS,hI,hQ,hM,Q=DPR,aT=0,aN=0;
function hud(d){
  let[na,fp]=POI[poi],T=fp(),v=sb(T,E),w=dt(v,vf),x=fx*dt(v,vr),y=fy*dt(v,vu),s,ar;
  if(w>0)x/=w,y/=w;else s=hypot(x,y)||1,x*=9/s,y*=9/s;
  s=max(abs(x),abs(y));ar=s>.84?'→↗↑↖←↙↓↘'[(Math.round(atan2(y,x)/(PI/4))+8)%8]+' ':'';if(s>.84)x*=.84/s,y*=.84/s;
  mk.style.left=x*50+50+'%';mk.style.top=50-y*50+'%';
  if(sayT>0&&(sayT-=d)<=0)cap.style.opacity=0;
  $('fl').style.opacity=flT>0?(flT-=d)*2:0;
  if((hT-=d)>0)return;hT=.2;
  s=ar+'◎ '+(na.call?na():na)+' · '+fm(ds(T,p));s!=hM&&(mk.textContent=hM=s);mk.className=!reg&&!poi?'go':'';
  s=(ORG?{mit:'Mitochondrie',rer:'Réticulum endoplasmique',gol:'Appareil de Golgi',nol:'Nucléole'}[ORG.i]:reg==1&&CT>1?RKN[rk()]:!reg&&LU?RL:REG[reg])+' · vaisseau '+fm(z)+' ('+(z<.0012?'≈ un nucléotide':z<.0031?'≈ diamètre de l\'ADN':z<.009?'≈ une protéine':z<.016?'≈ un nucléosome':z<.036?'≈ un ribosome':z<.08?'≈ une vésicule':z<.16?'≈ un pore nucléaire':z<.3?'≈ un lysosome':z<.7?'≈ largeur d\'une mitochondrie':z<1.6?'≈ une bactérie':'≈ une plaquette')+')';
  s!=hS&&($('st').textContent=hS=s);
  let k;if(ct>=0)k='pit';else if(nI&&(!reg||nD<(/mt|nf|sv|ifl|prt|frt/.test(nI.i)?1.5*z+.01:min(8*z+.03,.4))))k=nI.i;else if(ORG)k=ORG.i+'I';else if(!reg){let m=ds(p,Ce)-Re,e=ds(p,e0);k=LU?'tlu':e<.13?'pit':m<.07?'mem':e<.75?'tfr':'ext'}
  else k=reg<2&&rk()!='cyt'?rk():reg<2&&ds(p,Cc)>Rc-.15-z?mdk(p):abs(ds(p,Nc)-Rn+.02)<.2+z?pore()[0]<.12?'npc':reg>1?'lam':'ne':reg<2?'cyt':'nuc';
  sn(k);let t=I[k],ti=t[0],tx=t[1],o=reg>1&&ct<0&&(k=='nuc'||k=='spk')&&nuI();if(o)ti=o[0],tx=o[1];let mg=mgH(pinT>0?pinK:o?0:k);if(pinT>0)pinT-=.2,ti='▸ '+pin[0],tx=pin[1];btT();
  ti+tx+mg!=hI&&($('it').textContent=ti,$('ix').textContent=tx,$('im').innerHTML=mg,hI=ti+tx+mg);
  let q='';if(reg>1&&z<.6&&ln(p)<GR){let b=1e9,j=0,i,g=GP.p,e;for(i=0;i<g.length;i++)e=g[i],x=e[0]-p[0],y=e[1]-p[1],w=e[2]-p[2],x=x*x+y*y+w*w,x<b&&(b=x,j=i);
    if(z>=.1)!PM&&sqrt(b)<.6&&(q='<b>'+G.sy+'</b><br>'+'Rétrécissez le vaisseau sous 100 nm pour lire la séquence (Q, − ou molette).');          // avertissement de taille
    else if(sqrt(b)<6*z+.012){i=j-UP;let F=ft(i),o,c,va;s='';
      for(o=-12;o<13;o++)c=SQ(i+o),s+=(CU[i+o]?'<i class="N">‖</i>':'')+'<i class="'+(c||'N')+(o?'':' m')+'">'+(c||'·')+'</i>';
      va=F&&[0,-1,1,-2,2].map(o=>VAR[i+o]||NT[i+o]).find(x=>x);
      q='<b>'+G.sy+' · '+fnm(i)+(F==4&&G.ir?' ('+fkb(G.I[XN[i]].n)+')':'')+(F?' · '+hg(i):'')+(F==3?cod(i):'')+'</b><br>5′ '+s+' 3′'+(va?'<br><u>'+va+'</u>':'')+kmQ(i)}}
  q=q||lqS();q!=hQ&&($('sq').innerHTML=hQ=q)}
function tick(t){if(gen!=GEN)return;let d=min(.05,(t-last)/1e3)||0;last=t;
  aT+=d;if(++aN>40)Q=aT>1.3&&Q>.7?Q*.8:aT<.75&&Q<DPR?min(DPR,Q*1.15):Q,aT=aN=0;       // résolution adaptative
  if(go&&!NV)AP?apS(d):PM?pmS(d):RX?rxS(d):NX?nxS(d):SX?sxS(d):ct<0?ctl(d):cine(d);nvT(d);
  sim(d,ln(E)<GR+1.1,ds(E,PS)<4);PM&&pmD();oT();nolT();lamT();vesi(d);bcn();flm();RX&&rxD();NX&&nxD();SX&&sxD();ntD();synT();mgD();[dA.t,dA.j,dA.s,dB,dC.t,dC.j,dC.s,dD,dV,dE,dG,dF,dQa,dQb,dQe,dLm,dLb].forEach(up);
  cam(d);FG=lp(FG,SX&&SX.Q.bg||(reg?TGT[reg]:LU?FB:TGT[0]),min(1,d*2));draw();hud(d);requestAnimationFrame(tick)}
onkeydown=e=>{if(e.target.id=='q')return;keys[e.code]=1;/Arrow|Space/.test(e.code)&&e.preventDefault()};onkeyup=e=>{keys[e.code]=0};
const PT=new Map;let pd0=0;        // mode polymérase : glisser = tourner, pincer = zoomer
cv.onpointerdown=e=>{if(PM||RX||NX||SX)cv.setPointerCapture(e.pointerId),PT.set(e.pointerId,[e.clientX,e.clientY]),pd0=0;else go&&!NV&&pick(e)};
cv.onpointermove=e=>{let a=PT.get(e.pointerId),x=e.clientX,y=e.clientY;if(!a||!(PM||RX||NX||SX))return;PT.set(e.pointerId,[x,y]);
  if(PT.size>1){let[q,r]=[...PT.values()],h=hypot(q[0]-r[0],q[1]-r[1])||1;pd0&&(z=cl(z*pd0/h,RX||NX?.0009:SX?SX.Q.zn||.0015:reg>1&&TG.nd<.03?.0005:.003,(RX||NX||SX).zx||.2),RX&&(RX.zt=0),NX&&(NX.zt=0),SX&&(SX.zt=0));pd0=h}else{let M=PM||RX||NX||SX;M.yaw+=(x-a[0])*.006;M.pit=cl(M.pit-(y-a[1])*.006,-1.2,1.2)}};
cv.onpointerup=cv.onpointercancel=e=>{PT.delete(e.pointerId);pd0=0};
onwheel=e=>{ct<0&&(reg||SX?(z=cl(z*2**(-e.deltaY*.002),RX||NX?.0009:SX?SX.Q.zn||.0015:reg>1&&TG.nd<.03?.0005:.002,(RX||NX||SX).zx||.4),RX&&(RX.zt=0),NX&&(NX.zt=0),SX&&(SX.zt=0)):ZM=cl(ZM*2**(-e.deltaY*.002),.35,4))};
{let J=$('joy'),n=J.firstChild;
 J.onpointerdown=J.onpointermove=e=>{if(e.type[7]=='d')J.setPointerCapture(e.pointerId);else if(!J.hasPointerCapture(e.pointerId))return;
   let b=J.getBoundingClientRect(),x=(e.clientX-b.left)/b.width*2-1,y=(e.clientY-b.top)/b.height*2-1,l=max(1,hypot(x,y));tjx=x/l;tjy=-y/l;n.style.transform=`translate(${tjx*34}px,${-tjy*34}px)`};
 J.onpointerup=J.onpointercancel=e=>{tjx=tjy=0;n.style.transform=''};
 document.querySelectorAll('#bt b').forEach(b=>{let v=+b.dataset.v,k=b.dataset.k;
   b.onpointerdown=e=>{b.setPointerCapture(e.pointerId);k=='b'?tbo=1:k?tth=v:tzm=v;b.classList.add('on')};b.onpointerup=b.onpointercancel=e=>{k=='b'?tbo=0:k?tth=0:tzm=0;b.classList.remove('on')}});
 $('dst').onclick=()=>{do poi=(poi+1)%POI.length;while(!poi&&reg);hT=0};
}
$('ov').style.display='none';go=1;say(CF.hi,9);
if(GX){reg=2;ct=-1;chV.A=0;chG.n=chR.n=0;seenN=1;poi=2;z=.03;p=ad(ml(WX,.16),ml(t0,-.12));f=nm(ml(p,-1));u=pp(f);cf=f;cu=u;FG=TGT[2].slice();for(let i=min(9e3,G.L/3+600);i-->0;)sim(.1,0,0);say(G.hi,16)}       // gène chargé depuis UCSC : arrivée directe au locus, transcription déjà lancée
cam(1);requestAnimationFrame(tick);
