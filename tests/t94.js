// version minifiée, uniquement par l'interface : gène chargé (API simulée) → départ dans le noyau → Atlas « Nucléole » → pilotage clavier → entrée, réactions, sortie
const {open}=require('./tl.js');
(async()=>{const {b,pg,errs}=await open(1,{mock:1,file:'index.html',vp:{width:480,height:320}});
 await pg.click('#nvb');await pg.fill('#q','SYN12');await pg.press('#q','Enter');await pg.waitForSelector('#qr button');await pg.click('#qr button');
 await pg.waitForFunction(()=>document.getElementById('lbm').offsetParent!==null,null,{timeout:120000});await pg.waitForTimeout(6000);
 await pg.click('#lbm');await pg.waitForFunction(()=>/Noyau/.test(document.getElementById('st').textContent),null,{timeout:180000});await pg.waitForTimeout(1500);
 console.log('start',await pg.evaluate(()=>document.getElementById('st').textContent));
 await pg.click('#atb');await pg.waitForTimeout(300);
 console.log('atlas groups',await pg.evaluate(()=>[...document.querySelectorAll('#atl h3')].map(h=>h.textContent).join(' | ')+' :: '+document.getElementById('atb').textContent));
 await pg.evaluate(()=>[...document.querySelectorAll('#atl button')].find(x=>/Nucléole$/.test(x.textContent)).click());await pg.waitForTimeout(600);
 const st=()=>pg.evaluate(()=>{const m=document.getElementById('mk'),r=m.getBoundingClientRect(),e=document.getElementById('ent');return{x:(r.left+r.width/2)/innerWidth,y:(r.top+r.height/2)/innerHeight,t:m.textContent,ent:e.style.display=='block'?e.textContent:'',s:document.getElementById('st').textContent}});
 const hold=async(k,ms)=>{await pg.keyboard.down(k);await pg.waitForTimeout(ms);await pg.keyboard.up(k)};
 await hold('KeyE',3500);let s=await st();console.log('marker',s.t,'|',s.s);
 let ok=0;for(let i=0;i<160&&!ok;i++){s=await st();if(/Entrer dans le nucléole/.test(s.ent)){ok=1;break}
  const arrow=/^[→↗↑↖←↙↓↘]/.test(s.t)?s.t[0]:'';
  if(arrow||Math.abs(s.x-.5)>.12||Math.abs(s.y-.5)>.16){if(s.x<.44||/[↖←↙]/.test(arrow))await hold('ArrowLeft',260);else if(s.x>.56||/[↗→↘]/.test(arrow))await hold('ArrowRight',260);
   if(s.y<.4||arrow=='↑')await hold('ArrowUp',220);else if(s.y>.6||arrow=='↓')await hold('ArrowDown',220)}
  else await hold('Space',900);
  if(i%12==0)console.log(' ',i,s.t,'|',s.s)}
 console.log('reached',ok,s.t,'|',s.s,'|',s.ent);
 if(ok){await pg.click('#ent');await pg.waitForFunction(()=>/Nucléole/.test(document.getElementById('st').textContent)&&document.getElementById('rxb').style.display=='block',null,{timeout:240000});
  console.log('inside',await pg.evaluate(()=>document.getElementById('st').textContent+' | '+document.getElementById('it').textContent+' | '+document.getElementById('ent').textContent));
  await pg.screenshot({path:'min_nol.png'});
  await pg.click('#rxb');await pg.click('#pmo button[data-r="prrn"]');await pg.click('#pmo button[data-r="l1rrn"]');await pg.waitForTimeout(3000);
  console.log('quiz',await pg.evaluate(()=>document.getElementById('pmt').textContent+' | '+document.getElementById('pmo').textContent));
  await pg.evaluate(()=>[...document.querySelectorAll('#pmo button')].find(b=>b.textContent=='RRN3').click());await pg.waitForTimeout(2500);
  console.log('quiz2',await pg.evaluate(()=>document.getElementById('pmt').textContent));
  await pg.evaluate(()=>[...document.querySelectorAll('#pmo button')].find(b=>b.textContent=='Quitter').click());await pg.waitForTimeout(1200);
  await pg.click('#ent');await pg.waitForFunction(()=>/Noyau/.test(document.getElementById('st').textContent),null,{timeout:120000});await pg.waitForTimeout(5000);
  console.log('out',await pg.evaluate(()=>document.getElementById('st').textContent+' | '+document.getElementById('it').textContent))}
 console.log('errors',errs.slice(0,4));await b.close()})();
