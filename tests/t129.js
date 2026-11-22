// carte du cerveau en vol libre (brainmap.js) : modèle fixe, fiches selon la structure la plus proche, liste des structures, les six parcours suivis par le vaisseau,
// reprise des commandes, sortie. Le temps du jeu est avancé à la main (bnS), le rendu logiciel étant trop lent pour attendre. Argument : langue (fr|en)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr';
(async()=>{const {b,pg,errs,ev}=await open(2,{vp:{width:1100,height:620},lang});await pg.waitForTimeout(500);
 const st=()=>ev(()=>$('pmt').textContent+' | '+[...$('pmo').querySelectorAll('button')].map(b=>b.textContent).join(' / ').slice(0,120));
 await ev(()=>bnMenu());console.log('menu',await st());await pg.click('#pmo button[data-r="B0"]');await pg.waitForTimeout(600);
 console.log('map',await st(),JSON.stringify(await ev(()=>({fly:SX.fly,ship:shp[0].A,model:bnCh.map(h=>h.n+':'+h.A).join(' '),colliders:BNC.length,cards:BNK.length,noCard:[...new Set(BNC.map(o=>o.i).concat(BRM.map(e=>e[4][0]||'l'+e[2])))].filter(k=>!BNI[k])}))));
 console.log('controls on screen',await pg.evaluate(()=>['joy','bt'].map(k=>k+':'+getComputedStyle(document.getElementById(k)).display).join(' ')+' | body class '+document.body.className));
 console.log('thrust',JSON.stringify(await ev(()=>{let a=bnQ();keys.Space=1;for(let i=0;i<60;i++)bnS(.05,SX);keys.Space=0;return{moved:+ds(a,bnQ()).toFixed(1),z}})));
 for(const k of['th','am','hp','ht','ad','v1','m1','pfc','cb','l3','me','ey']){await ev(k=>{let v=bnVw(k);p=bnA(v.q);f=v.f;u=nm(cr(cr(f,[0,1,0]),f));z=v.z;vel=0;for(let i=0;i<8;i++)bnS(.05,SX);return 1},k);console.log(' near',k,'→',(await st()).slice(0,70))}
 await pg.screenshot({path:'brainmap_'+lang+'.png'});
 await pg.click('#pmo button[data-r="Sh13"]');console.log('list',await ev(()=>$('pmt').textContent+' | '+$('pmx').textContent+' | '+$('pmo').querySelectorAll('button').length+' buttons'));
 await ev(()=>{SXQ.bz.cl(SX,100+BNK.indexOf('hp'));for(let i=0;i<160;i++)bnS(.05,SX);return 1});console.log(' flown to',(await st()).slice(0,60));
 for(let k=1;k<=6;k++){await ev(k=>SXQ.bz.cl(SX,k),k);const n=await ev(()=>SX.rd.q[2].length);let o=[];
  for(let i=0;i<n;i++){const r=await ev(()=>{let R=SX.rd,ph=[],far=0,on=0;sxD();for(let j=0;j<420;j++){bnS(.05,SX);ph.includes(R.ph)||ph.push(R.ph);if(R.ph==2&&R.P){let d=min(...R.P.map((q,m)=>m?ds(bnQ(),lp(R.P[m-1],q,cl(dt(sb(bnQ(),R.P[m-1]),sb(q,R.P[m-1]))/dt(sb(q,R.P[m-1]),sb(q,R.P[m-1])),0,1))):9));far=max(far,d);on++}}sxD();
     return ph.join('')+(R.P?' path '+R.P.length+' pts, off-path '+far.toFixed(2):' no path')+' | '+QL.filter(e=>e.style.display!='none').length+' labels'});o.push(i+':'+r);await ev(()=>SXQ.bz.cl(SX,11))}
  console.log('ride',k,(await st()).slice(0,50),'\n   '+o.join('\n   '))}
 await ev(()=>{SXQ.bz.cl(SX,2);keys.ArrowLeft=1;bnS(.05,SX);keys.ArrowLeft=0;return 1});console.log('takeover',await st());await ev(()=>SXQ.bz.cl(SX,15));console.log('resumed',await st());
 await ev(()=>SXQ.bz.cl(SX,10));await pg.click('#pmo button[data-r="Sq"]');await pg.waitForTimeout(400);console.log('end',JSON.stringify(await ev(()=>({SX:SX?1:0,hud:$('hl').style.display,ship:shp[0].A,model:bnCh[0].A,z}))));
 console.log('errors',JSON.stringify(errs));await b.close()})();
