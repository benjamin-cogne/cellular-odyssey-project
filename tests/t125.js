// quiz « décoder la chromatine » (decode.js, vues hq et hQ du moteur SX) : accès depuis le code des histones, dix questions, score, niveau expert. Arguments : langue (fr|en), niveau (hq|hQ)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr',lv=process.argv[3]||'hq';
(async()=>{const {b,pg,errs,ev}=await open(0,{vp:{width:1100,height:620},lang:lang+',mg'});
 console.log('data',JSON.stringify(await ev(()=>({rounds:HQ.length,answers:HQA.length,bad:HQ.filter(q=>q.w.includes(q.a)||new Set(q.w).size!=3||!HQA[q.a]||q.w.some(k=>!HQA[k])).length,
   marks:[...new Set(HQ.flatMap(q=>q.m.map(m=>m[3])))].filter(k=>!HXM[k]||!MKC[k]),everyState:HQA.filter((_,i)=>!HQ.find(q=>q.a==i)).length}))));
 await ev(()=>{reg=2;ct=-1;chV.A=0;chG.n=chR.n=0;seenN=1;p=[.25,.1,.3];z=.03;f=nm([-.3,0,-1]);u=pp(f);cf=f;cu=u;vel=0;hT=0;return 1});await pg.waitForTimeout(900);
 await pg.click('#hxb');await pg.waitForTimeout(300);console.log('histone intro',await ev(()=>[...$('pmo').querySelectorAll('button')].map(b=>b.textContent).join(' | ')));
 await pg.click('#pmo button[data-r="Sihq"]');await pg.waitForTimeout(300);console.log('quiz intro',await ev(()=>$('pmt').textContent+' | '+[...$('pmo').querySelectorAll('button')].map(b=>b.textContent).join(' | ')));
 await pg.click('#pmo button[data-r="Sg'+lv+'"]');await pg.waitForTimeout(500);
 for(let i=0;i<10;i++){await pg.waitForTimeout(2600);
  console.log(i,await ev(()=>$('pmt').textContent+' | labels: '+QL.filter(e=>e.style.display!='none').map(e=>e.textContent).join(', ')+' | '+[...$('pmo').querySelectorAll('button')].map(b=>b.textContent).join(' / ')));
  if(i<2)await pg.screenshot({path:'quiz_'+lang+'_'+lv+i+'.png'});
  const a=await ev(i=>{let q=SX.qz.q;return i%3==2?q.w[0]:q.a},i);await pg.click('#pmo button[data-r="Sh'+a+'"]');await pg.waitForTimeout(500);        // une réponse sur trois est fausse
  console.log('   →',await ev(()=>$('pmt').textContent+' | '+$('pmx').textContent.slice(0,110)+' | labels: '+QL.filter(e=>e.style.display!='none').map(e=>e.textContent).join(', ')));
  await pg.click('#pmo button[data-r="Sn"]')}
 await pg.waitForTimeout(1200);console.log('result',await ev(()=>$('pmt').textContent+' | '+$('pmx').textContent.slice(0,60)+' | '+[...$('pmo').querySelectorAll('button')].map(b=>b.textContent).join(' / ')+' | ok='+SX.qz.ok));
 await pg.click('#pmo button[data-r="Sr"]');await pg.waitForTimeout(400);console.log('replay',await ev(()=>$('pmt').textContent+' | ok='+SX.qz.ok+' | order '+SX.qz.o.join('')));
 await pg.click('#pmo button[data-r="Sq"]');await pg.waitForTimeout(400);console.log('end',JSON.stringify(await ev(()=>({SX:SX?1:0,hud:$('hl').style.display,ship:shp[0].A}))));
 console.log('errors',JSON.stringify(errs));await b.close()})();
