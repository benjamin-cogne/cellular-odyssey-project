// ================= arrivée directe sur un lieu choisi à l'écran d'accueil ; sortie de l'endosome =================
// L'écran d'accueil propose une destination (liste #tgs, start.js la range dans window.GOT). Une fois la cellule construite, goT place le vaisseau près du lieu
// (sans passer par le sang ni par l'endocytose) et, pour un lieu visitable de l'intérieur, déclenche le bouton d'entrée : le vol d'approche est celui du jeu.
I.esI=[`Endosome précoce`,CF.cap[2]+` Vous êtes dans sa lumière, que les pompes à protons V-ATPase (billes dorées, sur la membrane) acidifient vers pH 6 : les points bleutés sont ces protons, les billes jaunes la cargaison qui se détache de ses récepteurs. Des tubules repartent vers la surface avec les récepteurs à recycler ; le reste mûrira en endosome tardif, puis fusionnera avec un lysosome. Vous avez les commandes : le bouton « ⇥ Quitter l'endosome » vous fait passer dans le cytosol.`];
{const b0=btT;btT=()=>{b0();if(ct>=0&&ENP&&!AP&&!RX&&!NX&&!SX){let e=$('ent');e.style.display='block';e.textContent='⇥ Quitter l\'endosome'}}}
{const c0=$('ent').onclick;$('ent').onclick=()=>ct>=0?ENP&&endX():c0()}
function goT(k){let o,q,d,nm_={cyt:'le cytoplasme',lif:'la cellule au travail',mit:'une mitochondrie',rer:'le réticulum endoplasmique',gol:'l\'appareil de Golgi',lys:'un lysosome',nuc:'le noyau',nol:'le nucléole',gen:'le gène '+G.sy,myf:'un sarcomère',dya:'une dyade',icd:'le disque intercalaire',hbs:'l\'influx cardiaque',nxi:'l\'influx nerveux'}[k],
   inn=()=>{reg=1;ct=-1;ENP=0;chV.A=0;chG.n=chR.n=0;vel=0;poi=1;hT=0},at=(P,dir,zz)=>{p=P;f=nm(dir);u=pp(f);cf=f;cu=u;z=zz;vel=0},ent=()=>setTimeout(()=>{btT();eC&&!ORG&&!AP&&$('ent').onclick()},500);
  if(!nm_||!go)return;
  if(k=='nuc'||k=='nol'||k=='gen'){reg=2;ct=-1;ENP=0;chV.A=0;chG.n=chR.n=0;seenN=1;poi=k=='nol'?3:2;hT=0;
    if(k=='gen')q=ad(ml(WX,.16),ml(t0,-.12)),at(q,ml(q,-1),.03);else if(k=='nol')d=nm(sb(Nc,NOL)),at(ma(NOL,d,1.22),ml(d,-1),.1),ent();else d=nm(sb(e0,Nc)),at(ma(Nc,d,Rn-.7),ml(d,-1),.12)}
  else{inn();
    if(k=='cyt'||k=='hbs'||k=='nxi'||k=='lif'){at(ma(ECN,v0,-ERA-.14),ml(v0,-1),.05);k=='lif'&&setTimeout(()=>lfMn(),400);k=='hbs'&&hsGo&&hsGo(0);k=='nxi'&&CT==2&&setTimeout(()=>$('nxb').onclick(),400)}
    else if(k=='myf'&&CT>2){o=CY.filter(c=>c.i=='myf');o=o[o.length>>1];d=nm(sb(o.b,o.a));at(ad(ma(o.a,d,9.9),ml(pp(d),o.r+.16)),ml(pp(d),-1),.05);ent()}
    else if(k=='dya'&&CT>2){let M=CY.filter(c=>c.i=='myf'),fr_=D=>min(...M.map(m=>{let ab=sb(m.b,m.a),t=cl(dt(sb(D[0],m.a),ab)/dt(ab,ab),0,1);return ds(D[0],ma(m.a,ab,t))-m.r}));o=CDL.reduce((a,b)=>fr_(a)>fr_(b)?a:b);at(ma(o[0],o[1],.25),ml(o[1],-1),.02);ent()}
    else if(k=='icd'&&CT>2){at(ad(ma(Cc,A0,Rc+41.6),ml(pp(A0),1.2)),A0,.03);ent()}
    else{o=CY.filter(c=>c.i==k&&(c.e||c.a==c.b));if(!o.length)return goT('cyt');o=o.reduce((a,b)=>ds(a.q,ECN)<ds(b.q,ECN)?a:b);
      if(o.e)at(ma(o.c,o.X,o.s[0]+.04),ml(o.X,-1),.03);else d=nm(sb(o.a,Cc)),at(ma(o.a,d,o.r+.03),ml(d,-1),.02);ent()}}
  say('Arrivée directe : '+nm_+'. Vous avez les commandes.',6)}
if(window.GOT){let k=window.GOT;window.GOT='';setTimeout(()=>goT(k),500)}
