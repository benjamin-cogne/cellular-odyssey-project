const {open}=require('./tl.js');
(async()=>{for(const ct of (process.argv[2]||'0,1,2').split(',').map(Number)){
 const {b,pg,errs,ev}=await open(ct);
 console.log('=== CT',ct);
 // PM simple auto mode: run through all stages
 await ev(()=>{reg=1;ct=-1;go=1;document.getElementById('pmb').onclick();});
 await pg.click('#pmo button[data-l="0"]');
 let log=await ev(()=>{let o=[],last=-1,i=0,T=0;while(PM&&i++<60000){pmS(.05);sim(.05,1,0);pmD();T+=.05;if(PM&&PM.st!=last){last=PM.st;o.push(PM.st+'@'+T.toFixed(0)+'s x'+Math.round(PM.P.x)+' I'+PM.r.I.map(J=>J.s).join('')+' '+document.getElementById('pmt').textContent+' | '+document.getElementById('pmx').textContent.length)}
   if(PM&&PM.st==ST.length-1&&PM.wait){o.push('END '+document.getElementById('pmx').textContent);break}}return JSON.stringify(o,null,0)});
 console.log(log.replace(/","/g,'\n').slice(0,3000));
 // screenshot at splicing stage in expert mode
 await pg.click('#pmo button[data-k="0"]').catch(e=>console.log('no terminer',e.message.slice(0,80)));
 await ev(()=>{document.getElementById('pmb').onclick();});
 await pg.click('#pmo button[data-l="1"]');
 console.log('expert',await ev(()=>{let i=0,o=[];const ok=()=>{let bs=[...document.querySelectorAll('#pmo button')];let s=ST[PM.st];let b=bs.find(x=>x.textContent==s[5][0]);if(!b)return'NOBTN '+PM.st;b.click();return''};
   while(PM&&PM.st<8&&i++<50000){if(PM.wait){let r=ok();if(r){o.push(r);break}}pmS(.05);sim(.05,1,0);pmD()}
   let k=0;while(PM&&!PM.wait&&k++<5000){pmS(.05);sim(.05,1,0);pmD()}
   return JSON.stringify({st:PM.st,o,t:document.getElementById('pmt').textContent,x:document.getElementById('pmx').textContent.slice(0,330),q:document.getElementById('pmo').textContent.slice(0,200)})}));
 await pg.waitForTimeout(1500);await pg.screenshot({path:'pm'+ct+'.png'});
 await pg.click('#pmo button[data-k="q"]');
 // organelle interiors
 for(const k of ['mit','rer','gol']){
   console.log(k,await ev(k=>{reg=1;ct=-1;ORG=0;AP=0;let o=CY.find(o=>o.i==k&&ENT[o.i]);if(!o)return'none';let c=o.c||ma(o.a,sb(o.b,o.a),.5);z=.03;p=ad(c,[0,0,0]);nI=o;nD=0;btT();let t=document.getElementById('ent').textContent;document.getElementById('ent').onclick();for(let i=0;i<400&&AP;i++)apS(.05);for(let i=0;i<5;i++){ctl(.016);phys();hT=0;hud(.3)}let r=t+' → '+(ORG?ORG.i:'-')+' OC '+OC.length+' | '+document.getElementById('st').textContent+' | '+document.getElementById('it').textContent;document.getElementById('ent').onclick();for(let i=0;i<400&&AP;i++)apS(.05);return r+' | out '+(ORG?'still in':'ok')},k));
 }
 console.log('errors',errs.slice(0,5));await b.close()}})();
