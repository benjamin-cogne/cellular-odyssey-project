// version minifiée, par l'interface seulement : influx nerveux complet puis visite de la synapse ; arg : langue
const {open}=require('./tl.js');
(async()=>{const lg=process.argv[2]||'en',{b,pg,errs}=await open(2,{file:'index.html',vp:{width:844,height:390},lang:lg});const T=id=>pg.evaluate(i=>document.getElementById(i).textContent,id);
 await pg.waitForFunction(()=>document.getElementById('nxb').style.display=='block',null,{timeout:120000});console.log('btn',await T('nxb'),'|',await T('st'));
 await pg.click('#nxb');console.log('menu',await T('pmt'),'|',await T('pmo'));await pg.click('#pmo button[data-r="il0"]');
 for(let k=0;k<13;k++){await pg.waitForTimeout(2600);console.log(k,await T('pmt'),'|',(await T('pmx')).slice(0,70),'|',await pg.evaluate(()=>[...document.querySelectorAll('.ql')].filter(e=>e.style.display!='none').map(e=>e.textContent).join(', ')));
  if(k==3||k==9)await pg.screenshot({path:'/tmp/min_nx'+k+'.png'});if(k<12)await pg.click('#pmo button[data-r="iok"]')}
 await pg.click('#pmo button[data-r="ig"]');await pg.waitForTimeout(3500);console.log('explore',await T('st'),'|',(await T('cap')).slice(0,80),'|',await pg.evaluate(()=>document.getElementById('osc').style.display+document.getElementById('pm').style.display));
 await pg.keyboard.down('Space');await pg.waitForTimeout(9000);await pg.keyboard.up('Space');console.log('cleft',await T('st'),'|',await T('it'));await pg.screenshot({path:'/tmp/min_cleft.png'});
 await pg.click('#nxb');await pg.click('#pmo button[data-r="iv0"]');await pg.waitForTimeout(3000);console.log('visit0',await T('st'),'|',await T('it'));
 console.log(errs.join('\n')||'no errors');await b.close()})();
