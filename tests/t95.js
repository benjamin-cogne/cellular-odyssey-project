const {open}=require('./tl.js');
(async()=>{const {b,pg,errs,ev}=await open(0,{vp:{width:390,height:780},mobile:1});
 await ev(()=>{reg=2;ct=-1;seenN=1;p=ma(NOL,[0,0,1],1.05);z=.03;f=[0,0,-1];u=pp(f);cf=f;cu=u;return 1});await pg.waitForTimeout(900);
 await pg.tap('#ent');await pg.waitForFunction(()=>document.getElementById('rxb').style.display=='block',null,{timeout:120000});
 await ev(()=>{let U=NOU[0].U;p=ma(U,[0,0,1],.3);if(ds(p,NOL)>.9)p=ma(U,[0,0,-1],.3);f=nm(sb(U,p));u=pp(f);cf=f;cu=u;z=.012;return 1});await pg.waitForTimeout(2500);
 await pg.screenshot({path:'n_port_nol.png'});console.log('card',await pg.evaluate(()=>document.getElementById('it').textContent));
 console.log('fly out',await ev(()=>{fly([0,0,0],.05);return 'ORG '+ORG+' AP '+!!AP}));await pg.waitForTimeout(9000);
 console.log('after',await pg.evaluate(()=>document.getElementById('st').textContent));
 await ev(()=>{AP=0;p=ma(Nc,[0,1,0],Rn-.12);z=.012;f=nm([.3,1,0]);u=pp(f);cf=f;cu=u;return 1});await pg.waitForTimeout(2500);await pg.screenshot({path:'n_port_lam.png'});
 console.log('lam card',await pg.evaluate(()=>document.getElementById('it').textContent));
 // clic sur un filament / la membrane
 await pg.tap('canvas',{position:{x:195,y:300}});await pg.waitForTimeout(600);console.log('tap',await pg.evaluate(()=>document.getElementById('it').textContent));
 console.log('errors',errs.slice(0,3));await b.close()})();
