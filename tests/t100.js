// version minifiée en anglais, uniquement par l'interface
const {open}=require('./tl.js');
(async()=>{const {b,pg,errs}=await open(1,{file:'index.html',vp:{width:844,height:390},lang:'en'});
 console.log('start',await pg.evaluate(()=>document.getElementById('st').textContent+' | '+document.getElementById('cap').textContent.slice(0,80)));
 await pg.keyboard.down('Space');await pg.waitForFunction(()=>/Binding/.test(document.getElementById('cap').textContent),null,{timeout:400000});await pg.keyboard.up('Space');
 await pg.waitForFunction(()=>document.getElementById('rxb').style.display=='block',null,{timeout:500000});
 console.log('inside',await pg.evaluate(()=>document.getElementById('st').textContent+' | '+document.getElementById('cap').textContent.slice(0,90)));
 await pg.click('#rxb');console.log('menu',await pg.evaluate(()=>document.getElementById('pmt').textContent+' | '+document.getElementById('pmo').textContent));
 await pg.click('#pmo button[data-r="pgly"]');await pg.click('#pmo button[data-r="l0gly"]');
 for(let k=0;k<3;k++){await pg.waitForTimeout(3500);console.log(' step',await pg.evaluate(()=>document.getElementById('pmt').textContent+' | '+document.getElementById('pmx').textContent.slice(0,90)+' | '+[...document.querySelectorAll('.ql')].filter(e=>e.style.display!='none').map(e=>e.textContent).join(', ')));
  await pg.evaluate(()=>[...document.querySelectorAll('#pmo button')].find(b=>/Next/.test(b.textContent)).click())}
 await pg.waitForTimeout(3000);await pg.screenshot({path:'min_en_rx.png'});
 await pg.evaluate(()=>[...document.querySelectorAll('#pmo button')].find(b=>b.textContent=='Quit').click());await pg.waitForTimeout(800);
 console.log('back',await pg.evaluate(()=>document.getElementById('st').textContent+' | '+document.getElementById('it').textContent),errs.slice(0,3));await b.close()})();
