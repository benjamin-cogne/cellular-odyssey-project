// version anglaise : chaînes restées en français, écrans principaux
const {open}=require('./tl.js');const FRW=/ (le|la|les|des|une|est|dans|avec|pour|sur|qui|sont|puis|très|où|aux|du|et) /;
(async()=>{for(const ct of [0,1,2]){const {b,pg,errs,ev}=await open(ct,{vp:{width:844,height:390},lang:'en'});
 console.log('== cell',ct,await pg.evaluate(()=>document.getElementById('st').textContent+' | '+document.getElementById('it').textContent+' | '+document.getElementById('cap').textContent.slice(0,90)));
 console.log('buttons',await pg.evaluate(()=>[...document.querySelectorAll('#hr>div')].map(e=>e.textContent).join(' | ')));
 const fr=await ev(src=>{const R=new RegExp(src);let o=[];for(const k in I){const t=I[k][0]+' '+I[k][1];if(R.test(t)||/[éèàùçêô]/.test(t))o.push(k+': '+t.slice(0,70))}
   for(const P of RXP){[P[3],P[4],P[5]].concat(...P[6].map(s=>[s[0],s[3],s[4],s[5],s[6],s[7],s[8]])).forEach(t=>{if(R.test(' '+t+' ')||/[éèàùçêô]/.test(t))o.push('RX '+P[0]+': '+String(t).slice(0,60))})}
   for(const k in MOL)if(/[éèàùçêô]/.test(MOL[k][0]+MOL[k][1]))o.push('MOL '+k+': '+MOL[k][0]+' '+MOL[k][1]);
   for(const k in RXW){const w=RXW[k];[w[0]].concat(Object.values(w[1].w||{})).forEach(t=>{if(/[éèàùçêô]/.test(t)||R.test(' '+t+' '))o.push('RXW '+k+': '+t)})}
   POI.forEach(p=>{if(/[éèàùçêô]/.test(p[0]))o.push('POI '+p[0])});
   return o},FRW.source);
 console.log('french leftovers',fr.length);fr.slice(0,40).forEach(x=>console.log('  ',x));
 if(ct==1){console.log('PM',await ev(()=>{reg=2;ct=-1;seenN=1;p=[.3,.3,.2];z=.02;hT=0;hud(.3);btT();document.getElementById('pmb').onclick();return document.getElementById('pmt').textContent+' | '+document.getElementById('pmx').textContent.slice(0,200)+' | '+document.getElementById('pmo').textContent}));
  await pg.click('#pmo button[data-l="0"]');await pg.waitForTimeout(2500);console.log('PM1',await pg.evaluate(()=>document.getElementById('pmt').textContent+' | '+document.getElementById('pmx').textContent.slice(0,260)));
  await pg.screenshot({path:'en_pm.png'})}
 console.log('errors',errs.slice(0,3));await b.close()}})();
