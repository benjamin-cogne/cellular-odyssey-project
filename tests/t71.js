const {open}=require('./tl.js');
(async()=>{for(const ct of [0,1]){const {b,pg,errs,ev}=await open(ct);
 for(const d of [.016,.05]){console.log(ct,'d',d,await ev(d=>{p=S0[0];f=nm(S0[1]);u=pp(f);z=.5;ZM=1;vel=0;reg=0;ct=-1;LU=-1;let t=0,log=[];keys.Space=1;
   for(let i=0;i<3000&&ct<0;i++){ctl(d);t+=d;if(i%Math.round(1/d)==0)log.push(t.toFixed(0)+'s d'+ds(p,e0).toFixed(3)+' z'+z.toFixed(3)+' v'+vel.toFixed(2))}
   keys.Space=0;let r=log.slice(0,14).join(' | ')+' → ct '+ct.toFixed(2)+' t '+t.toFixed(1);ct=-1;return r},d))}
 console.log(errs.slice(0,2));await b.close()}})();
