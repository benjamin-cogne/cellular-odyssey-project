// le cerveau (brain.js) : menu, types de cellules et six circuits, étape par étape ; maquette, trajets, libellés. Arguments : langue (fr|en), vues (ex. bc,bv ; toutes par défaut)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr',views=process.argv[3]?process.argv[3].split(','):['bc','bv','bm','bl','bb','bs','bh'];
(async()=>{const {b,pg,errs,ev}=await open(2,{vp:{width:1100,height:620},lang});await pg.waitForTimeout(500);
 console.log('data',JSON.stringify(await ev(()=>({views:BQ.map(q=>q[0]+':'+q[2].length+'/'+q[3].length).join(' '),model:BRM.length,regions:[...new Set(BRM.flatMap(e=>e[4]))].map(k=>k+':'+BRM.filter(e=>e[4].includes(k)).length).join(' '),
   nan:BRM.filter(e=>!e[0].every(isFinite)).length,noText:BQ.flatMap(q=>q[3]).filter(t=>t.length!=3||t[2].length<120).length,button:$('bnb').style.display}))));
 await ev(()=>bnMenu());console.log('menu',await ev(()=>$('pmt').textContent+' | '+[...$('pmo').querySelectorAll('button')].map(b=>b.textContent).join(' | ')));
 for(const v of views){await ev(()=>bnMenu());await pg.click('#pmo button[data-r="Si'+v+'"]');await pg.waitForTimeout(200);console.log(v,'intro',await ev(()=>$('pmt').textContent+' | '+$('pmx').textContent.slice(0,70)));
  await pg.click('#pmo button[data-r="Sg'+v+'"]');await pg.waitForTimeout(400);const n=await ev(()=>SX.Q.S.length);
  for(let i=0;i<=n;i++){await ev(()=>{let S=SX.Q.S[SX.st];if(S)SX.t=S.T*.75;return 1});await pg.waitForTimeout(900);
   console.log(' ',v,i,await ev(()=>$('pmt').textContent+' | spheres '+dSx0.n+', tubes '+dSx1.n+' | '+QL.filter(e=>e.style.display!='none').map(e=>e.textContent).join(', ')));
   if(i==1)await pg.screenshot({path:'brain_'+lang+'_'+v+'.png'});if(i<n)await pg.click('#pmo button[data-r="Sn"]');await pg.waitForTimeout(200)}
  await pg.click('#pmo button[data-r="Wb"]');await pg.waitForTimeout(300);console.log(' ',v,'back to menu',await ev(()=>$('pmt').textContent+' | SX '+(SX?1:0)))}
 await pg.click('#pmo button[data-r="Sx"]');console.log('end',JSON.stringify(await ev(()=>({SX:SX?1:0,hud:$('hl').style.display,ship:shp[0].A}))));
 console.log('errors',JSON.stringify(errs));await b.close()})();
