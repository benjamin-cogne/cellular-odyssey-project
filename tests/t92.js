const {open}=require('./tl.js');const file=process.argv[2]||'dev.html';
(async()=>{const {b,pg,errs,ev}=await open(0,{vp:{width:844,height:390},file});
 const fps=()=>ev(()=>{let t=performance.now(),n=0;return new Promise(r=>{let g=()=>{n++;performance.now()-t<2500?requestAnimationFrame(g):r(Math.round(n/2.5*10)/10)};g()})});
 const at=async(n,js)=>{await ev(js);await pg.waitForTimeout(1200);console.log(n,await fps())};
 await at('gene locus',()=>{reg=2;ct=-1;seenN=1;p=[.3,.3,.2];z=.02;f=nm(ml(p,-1));u=pp(f);cf=f;cu=u;return 1});
 await at('nucleus mid',()=>{p=ma(Nc,[0,1,0],2);z=.1;f=[0,-1,0];u=pp(f);cf=f;cu=u;return 1});
 await at('envelope',()=>{p=ma(Nc,[0,1,0],Rn-.2);z=.03;f=[0,1,0];u=pp(f);cf=f;cu=u;return 1});
 if(file=='dev.html'){await at('speckle',()=>{p=ma(SPL[0][0],[1,0,0],SPL[0][1]*.7);z=.02;f=[-1,0,0];u=pp(f);cf=f;cu=u;return 1});
  await ev(()=>{let o=NU[0];OC=[];let B=mkNol(o);fin();o.zm=.036;ORG=o;p=B;z=.012;f=nm(sb(NOU[0].U,p));u=pp(f);cf=f;cu=u;return 1});await pg.waitForTimeout(1500);console.log('nucleolus',await fps());
  await at('nucleolus GC',()=>{p=ma(NOL,[0,1,0],.8);f=[0,-1,0];u=pp(f);cf=f;cu=u;return 1})}
 console.log('errors',errs.slice(0,3));await b.close()})();
