const {open}=require('./tl.js');
(async()=>{for(const ct of [0,1,2]){const {b,pg,errs,ev}=await open(ct,ct==1?{vp:{width:390,height:780},mobile:true}:{});
 await pg.waitForTimeout(2000);await pg.screenshot({path:'b'+ct+'_start.png'});
 console.log(ct,await ev(()=>JSON.stringify({mk:document.getElementById('mk').textContent,cls:document.getElementById('mk').className,gui:document.getElementById('gui').style.display,dG:dG.n})));
 // vue de loin, entrée hors champ
 await ev(()=>{window.__f=1;const ph=phys;phys=function(){if(!window.__f)ph()};const c=ctl;ctl=function(d){if(!window.__f)c(d)};z=2.2;p=ad(TC,ad(ml(v0,22),ad(ml(tX,-26),ml(tZ,18))));f=nm(sb(ma(e0,tX,-9),p));u=pp(f);cf=f;cu=u;LU=0});
 await pg.waitForTimeout(1800);await pg.screenshot({path:'b'+ct+'_far.png'});
 await ev(()=>{window.__f=0;p=S0[0];f=nm(S0[1]);u=pp(f);z=.5;for(let i=0;i<3;i++)ctl(.016);btT()});
 if(ct==1)await pg.tap('#gui');else await pg.click('#gui');
 if(ct==2){await pg.waitForFunction(()=>/devant le point de transcytose/.test(document.getElementById('cap').textContent),null,{timeout:120000});await pg.waitForTimeout(600);await pg.click('#tcy');await pg.waitForTimeout(1500);await pg.click('#gui')}
 await pg.waitForFunction(()=>/devant l'entrée/.test(document.getElementById('cap').textContent),null,{timeout:120000});await pg.waitForTimeout(1200);
 console.log('guided',await ev(()=>JSON.stringify({d:+ds(p,e0).toFixed(3),z:+z.toFixed(3),reg,ct,mk:document.getElementById('mk').textContent})));
 await pg.screenshot({path:'b'+ct+'_door.png'});
 await pg.keyboard.down('Space');await pg.waitForFunction(()=>/Liaison/.test(document.getElementById('cap').textContent),null,{timeout:120000}).catch(e=>console.log('NO DOCK'));await pg.keyboard.up('Space');
 console.log('dock',await pg.evaluate(()=>document.getElementById('cap').textContent.slice(0,50)),errs.slice(0,3));await b.close()}})();
