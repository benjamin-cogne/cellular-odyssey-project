const {open}=require('./tl.js');
(async()=>{for(const ct of [0,1,2]){const {b,pg,errs,ld}=await open(ct,{file:'index.html'});await pg.waitForTimeout(2500);
 console.log(ct,ld,await pg.evaluate(()=>document.getElementById('st').textContent+' | '+document.getElementById('it').textContent),errs.slice(0,3));
 if(ct==2)await pg.screenshot({path:'min2.png'});await b.close()}})();
