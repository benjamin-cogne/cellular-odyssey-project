const {open}=require('./tl.js');
(async()=>{for(const ct of [0,1,2]){const {b,pg,errs,ev,boot}=await open(ct);
 console.log(ct,'boot',boot,await ev(()=>{reg=1;ct=-1;chV.A=0;chG.n=chR.n=0;let o=CY.find(o=>o.i=='ifl'),r=[];z=.02;p=ad(o.q,[.012,0,0]);phys();hT=0;hud(.3);r.push(document.getElementById('it').textContent);
   o=CY.find(o=>o.i=='act');p=ma(o.a,nm(sb(Cc,o.a)),.05);z=.03;f=nm(sb(o.a,p));u=pp(f);cf=f;cu=u;phys();hT=0;hud(.3);r.push(document.getElementById('it').textContent);
   for(let k of['prt','frt','aut','pbd']){o=CY.find(o=>o.i==k);if(!o){r.push('NO '+k);continue}p=ad(o.a,[o.r+.004,0,0]);z=.01;phys();hT=0;hud(.3);r.push(document.getElementById('it').textContent)}
   o=CY.find(o=>o.i=='act');p=ma(o.a,nm(sb(Cc,o.a)),.25);z=.04;f=nm(sb(o.a,p));u=pp(f);cf=f;cu=u;return r.join(' | ')+' | CY '+CY.length+' AK '+AK.length}),errs.slice(0,2));
 await pg.waitForTimeout(1500);await pg.screenshot({path:'cx'+ct+'.png'});await b.close()}})();
