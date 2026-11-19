// noyau : corps nucléaires, lamina, entrée dans le nucléole, réactions nucléolaires
const {open}=require('./tl.js');const ct=+process.argv[2]||0;
(async()=>{const {b,pg,errs,ev}=await open(ct,{vp:{width:844,height:390}});
 const tp=(q,zz,look)=>ev(a=>{reg=2;ct=-1;seenN=1;ORG=0;AP=0;p=a.q;z=a.z;if(a.l){f=nm(sb(a.l,p));u=pp(f);cf=f;cu=u}vel=0;return 1},{q,z:zz,l:look});
 const info=()=>ev(()=>({st:$('st').textContent,it:$('it').textContent,ix:$('ix').textContent.slice(0,90),ent:$('ent').style.display+'|'+$('ent').textContent,rx:$('rxb').style.display,nu:NU.length,lmc:LMC.length,dl:[dLm.n,dLb.n],org:ORG&&ORG.i,oc:OC.length}));
 console.log('keys',await ev(()=>{let m={};NU.forEach(o=>m[o.i]=(m[o.i]||0)+1);return JSON.stringify(m)+' NUN '+NUN.length+' missing cards: '+[...new Set(NU.map(o=>o.i))].filter(k=>!I[k])}));
 // speckle
 let S=await ev(()=>({spk:SPL[0][0],r:SPL[0][1],cb:CBP,nol:NOL,nc:Nc,Rn,pml:NU.find(o=>o.i=='pml').a,psp:NU.find(o=>o.i=='psp').a,hlb:(NU.find(o=>o.i=='hlb')||{}).a,gem:NU.find(o=>o.i=='gem').a}));
 const shot=async(n,q,zz,look,w=1200)=>{await tp(q,zz,look);await pg.waitForTimeout(w);const i=await info();console.log(n,JSON.stringify(i));await pg.screenshot({path:'n_'+n+'.png'})};
 const off=(a,d,k)=>a.map((x,i)=>x+d[i]*k);
 await shot('spk_out',off(S.spk,[1,0,0],S.r+.25),.05,S.spk);
 await shot('spk_in',off(S.spk,[1,0,0],S.r*.75),.02,S.spk);
 await shot('cb_out',off(S.cb,[0,0,1],.5),.05,S.cb);
 await shot('cb_in',off(S.cb,[0,0,1],.12),.012,S.cb);
 await shot('pml',off(S.pml,[0,1,0],.3),.03,S.pml);
 await shot('psp',off(S.psp,[0,1,0],.22),.02,S.psp);
 if(S.hlb)await shot('hlb',off(S.hlb,[0,1,0],.2),.02,S.hlb);
 // lamina
 const d=[0,1,0];const L1=off(S.nc,d,S.Rn-.2),L2=off(S.nc,d,S.Rn);
 await shot('lam_far',off(S.nc,d,S.Rn-.5),.12,L2);
 await shot('lam_mid',off(S.nc,d,S.Rn-.2),.03,L2);
 await shot('lam_near',off(S.nc,d,S.Rn-.085),.006,L2);
 // nucléole
 await shot('nol_out',off(S.nol,[0,0,1],1.6),.1,S.nol);
 await tp(off(S.nol,[0,0,1],1.06),.02,S.nol);await pg.waitForTimeout(700);console.log('near nol',JSON.stringify(await info()));
 await pg.click('#ent');await pg.waitForTimeout(7000);console.log('inside',JSON.stringify(await info()));await pg.screenshot({path:'n_nol_in1.png'});
 const U=await ev(()=>NOU[0].U);
 await ev(a=>{p=ma(a,[0,0,1],.3);f=nm(sb(a,p));u=pp(f);cf=f;cu=u;z=.02;vel=0;return 1},U);await pg.waitForTimeout(1500);console.log('unit',JSON.stringify(await info()));await pg.screenshot({path:'n_nol_unit.png'});
 await ev(a=>{p=ma(a,[0,0,1],.2);z=.008;return 1},U);await pg.waitForTimeout(1500);console.log('gene',JSON.stringify(await info()));await pg.screenshot({path:'n_nol_gene.png'});
 await ev(()=>{p=ma(NOL,[0,1,0],.85);z=.012;f=nm(sb(NOL,p));u=pp(f);cf=f;cu=u;return 1});await pg.waitForTimeout(1500);console.log('gc',JSON.stringify(await info()));await pg.screenshot({path:'n_nol_gc.png'});
 // réactions
 await pg.click('#rxb');console.log('rx menu',await pg.evaluate(()=>document.getElementById('pmt').textContent+' | '+document.getElementById('pmo').textContent));
 await pg.click('#pmo button[data-r="prrn"]');await pg.click('#pmo button[data-r="l0rrn"]');
 for(let k=0;k<5;k++){await pg.waitForTimeout(3300);console.log(' rx',await pg.evaluate(()=>document.getElementById('pmt').textContent+' | '+[...document.querySelectorAll('.ql')].filter(e=>e.style.display!='none').map(e=>e.textContent).join(', ')));if(k==2)await pg.screenshot({path:'n_rx.png'});
  await pg.evaluate(()=>[...document.querySelectorAll('#pmo button')].find(b=>/Suivant/.test(b.textContent))?.click())}
 await pg.evaluate(()=>[...document.querySelectorAll('#pmo button')].find(b=>/Quitter|Fermer|Terminer/.test(b.textContent))?.click());await pg.waitForTimeout(800);
 // sortie
 await pg.click('#ent');await pg.waitForTimeout(6000);console.log('out',JSON.stringify(await info()));await pg.screenshot({path:'n_nol_exit.png'});
 console.log('fps probe',await ev(()=>{let t=performance.now(),n=0;return new Promise(r=>{let g=()=>{n++;performance.now()-t<2000?requestAnimationFrame(g):r(n/2)};g()})}));
 console.log('errors',errs.slice(0,5));await b.close()})();
