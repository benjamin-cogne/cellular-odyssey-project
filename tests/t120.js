// focus « génétique mendélienne » : case de l'accueil, données, fiches, étiquettes, panneau, réactions. Arguments : langue (fr|en), cellules (ex. 012)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr',cts=(process.argv[3]||'012').split('').map(Number);
(async()=>{for(const ct of cts){const {b,pg,errs,ev}=await open(ct,{vp:{width:1100,height:620},lang:lang+',mg'});
  const st=()=>ev(()=>({near:mgS.length,lab:MGL.filter(l=>l.style.display!='none').map(l=>l.textContent),it:$('it').textContent,im:$('im').textContent.slice(0,150)}));
  console.log('cell',ct,JSON.stringify(await ev(()=>{let K=mgK(),E=Object.values(MG).flat();
    return{MEN,box:$('mgc').checked,cards:Object.keys(MG).filter(k=>I[k]).length,here:K.length,entries:E.length,noRef:E.filter(e=>!e[4]).length,noMim:E.filter(e=>!e[3]).map(e=>e[0]),
      badRx:Object.keys(MGR).filter(k=>{let P=RXP.find(P=>P[0]==k);return!P||Object.keys(MGR[k]).some(s=>!P[6][s]||!MGR[k][s])}),btn:$('mgb').style.display+'|'+$('mgb').textContent}})));
  await pg.waitForTimeout(2000);console.log(' outside',JSON.stringify(await st()));await pg.screenshot({path:'mg_'+lang+ct+'_out.png'});
  await ev(()=>{reg=1;ct=-1;chV.A=0;chG.n=chR.n=0;let m=CY.find(o=>o.i=='lys');p=ma(m.a,[0,0,1],.5);z=.05;f=[0,0,-1];u=pp(f);cf=f;cu=u;vel=0;say('',.01);return 1});
  await pg.waitForTimeout(2000);console.log(' cytoplasm',JSON.stringify(await st()));await pg.screenshot({path:'mg_'+lang+ct+'_cyt.png'});
  await ev(()=>{reg=2;seenN=1;p=ma(Nc,[0,1,0],Rn-.2);z=.03;f=[0,1,0];u=pp(f);cf=f;cu=u;vel=0;return 1});
  await pg.waitForTimeout(2000);console.log(' lamina',JSON.stringify(await st()));await pg.screenshot({path:'mg_'+lang+ct+'_lam.png'});
  await pg.mouse.click(550,200);await pg.waitForTimeout(600);console.log(' picked',JSON.stringify(await st()));
  await pg.click('#mgb');await pg.waitForTimeout(400);
  console.log(' panel',JSON.stringify(await ev(()=>({h:$('ath').textContent,m:$('atm').textContent.slice(0,70),n:$('atl').querySelectorAll('button').length,links:$('atl').querySelectorAll('a').length,first:$('atl').querySelector('.mgl').textContent.slice(0,110)}))));
  await pg.screenshot({path:'mg_'+lang+ct+'_panel.png'});await pg.click('#atl button[data-k="lmA"]');await pg.waitForTimeout(600);console.log(' from panel',JSON.stringify(await st()));
  await pg.click('#atb');await pg.waitForTimeout(300);console.log(' atlas title',await ev(()=>$('ath').textContent));await pg.click('#atc');
  // réactions : marque dans le menu, maladies de l'étape (cycle de Krebs, dans la mitochondrie)
  await ev(()=>{reg=1;let m=CY.find(o=>o.i=='mit');p=ma(m.c,m.Y,m.s[1]+.05);z=.02;vel=0;hT=0;return 1});await pg.waitForTimeout(1200);await pg.click('#ent');await pg.waitForTimeout(6000);
  console.log(' in mito',JSON.stringify(await st()));await pg.screenshot({path:'mg_'+lang+ct+'_mit.png'});
  await pg.click('#rxb');await pg.waitForTimeout(400);console.log(' rx menu',JSON.stringify(await ev(()=>[...$('pmo').querySelectorAll('button')].map(b=>b.textContent))));
  await pg.click('#pmo button[data-r="pkrb"]');await pg.waitForTimeout(300);await pg.click('#pmo button[data-r="l0krb"]');await pg.waitForTimeout(1500);
  console.log(' rx step',JSON.stringify(await ev(()=>({t:$('pmt').textContent,mg:($('pmx').querySelector('.mgr')||{}).textContent,lab:MGL.filter(l=>l.style.display!='none').length}))));await pg.screenshot({path:'mg_'+lang+ct+'_rx.png'});
  await ev(()=>{MEN=0;return 1});await pg.waitForTimeout(500);console.log(' off',JSON.stringify(await ev(()=>({lab:MGL.filter(l=>l.style.display!='none').length,mgH:mgH('lam'),btn:(mgN(),$('mgb').style.display)}))));
  console.log(' errors',JSON.stringify(errs));await b.close()}})();
