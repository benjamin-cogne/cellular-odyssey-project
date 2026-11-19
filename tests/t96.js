// réactions : trace des étapes et ancrage dans le décor
const {open}=require('./tl.js');const ct=+process.argv[2]||1,vp=process.argv[3]=='p'?{width:390,height:780}:{width:844,height:390};
(async()=>{const {b,pg,errs,ev}=await open(ct,{vp,mobile:process.argv[3]=='p'});
 const enter=k=>ev(k=>{reg=1;ct=-1;ORG=0;AP=0;chV.A=0;chG.n=chR.n=0;let o=CY.find(o=>o.i==k&&ENT[o.i]);let c=o.c||ma(o.a,sb(o.b,o.a),.5);z=.03;p=ad(c,[0,0,0]);nI=o;nD=0;btT();document.getElementById('ent').onclick();for(let i=0;i<400&&AP;i++)apS(.05);for(let i=0;i<5;i++){ctl(.016);hT=0;hud(.3)}return document.getElementById('rxb').style.display+' '+rxHere().map(P=>P[0]).join(',')},k);
 const run=async(key,stops,name)=>{await ev(()=>{hT=0;hud(.3)});await pg.click('#rxb');await pg.click('#pmo button[data-r="p'+key+'"]');await pg.click('#pmo button[data-r="l0'+key+'"]');
   const r=await ev(a=>{let o=[];RX.pz=0;for(let i=0;i<60000&&RX;i++){rxS(.05);rxD();if(RX.S&&RX.st==a.stops[0]&&RX.t>=a.at){RX.pz=1;break}if(!RX.S)break}return (RX.S?RX.st+':'+RX.S.e.slice(0,24)+' ci'+RX.S.ci+' co'+RX.S.co:'bilan')+' rest'+RX.R.length+' atoms'+dQa.n+' cyl'+dQb.n+' z'+z.toFixed(4)+' | '+document.getElementById('pmx').textContent.slice(0,70)},{stops,at:4.6});
   console.log(key,r);await pg.waitForTimeout(1500);await pg.screenshot({path:'x_'+name+'_a.png'});
   const r2=await ev(()=>{RX.pz=0;for(let i=0;i<90000&&RX&&RX.S;i++){rxS(.05);rxD()}for(let i=0;i<80;i++){rxS(.05);rxD()}return 'end rest'+RX.R.length+' atoms'+dQa.n+' cyl'+dQb.n+' z'+z.toFixed(4)+' labels '+[...document.querySelectorAll('.ql')].filter(e=>e.style.display!='none').length+' | '+document.getElementById('pmt').textContent});
   console.log(' ',r2);await pg.waitForTimeout(1500);await pg.screenshot({path:'x_'+name+'_b.png'});await pg.click('#pmo button[data-r="q"]');await pg.waitForTimeout(300)};
 console.log('mit',await enter('mit'));await run('krb',[6],'krb');await run('oxp',[2],'oxp');await run('box',[2],'box');
 console.log('gol',await enter('gol'));await run('gcx',[3],'gcx');
 console.log('rer',await enter('rer'));await run('ngl',[2],'ngl');
 await ev(()=>{ORG=0;OC=[];let o=CY.find(o=>o.i=='per')||CY[0];p=ma(o.c||o.a,[1,0,0],.6);z=.05;return 1});await run('gly',[5],'gly');await run('cat',[0],'cat');
 console.log('after',await ev(()=>JSON.stringify({RX:!!RX,z:+z.toFixed(4),hl:document.getElementById('hl').style.display})));
 console.log('errors',errs.slice(0,4));await b.close()})();
