const {open}=require('./tl.js');
(async()=>{const {b,pg,errs,ev}=await open(0,{vp:{width:844,height:390}});
 await ev(()=>{reg=2;ct=-1;seenN=1;p=ma(Nc,[0,1,0],Rn-.3);z=.05;f=[0,1,0];u=pp(f);cf=f;cu=u;return 1});await pg.waitForTimeout(1500);
 console.log(await ev(()=>{try{lmP=0;lamT();return 'ok '+dLm.n+' '+dLb.n+' '+LMC.length}catch(e){return e.stack}}));
 console.log('errors',errs.slice(0,3));await b.close()})();
