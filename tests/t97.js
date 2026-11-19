const {open}=require('./tl.js');const key=process.argv[2]||'gcx',org=process.argv[3]||'gol',ct=+process.argv[4]||1;
(async()=>{const {b,pg,errs,ev}=await open(ct,{vp:{width:844,height:390}});
 if(org!='cyt')console.log(org,await ev(k=>{reg=1;ct=-1;ORG=0;AP=0;chV.A=0;chG.n=chR.n=0;let o=CY.find(o=>o.i==k&&ENT[o.i]);let c=o.c||ma(o.a,sb(o.b,o.a),.5);z=.03;p=ad(c,[0,0,0]);nI=o;nD=0;btT();document.getElementById('ent').onclick();for(let i=0;i<400&&AP;i++)apS(.05);for(let i=0;i<5;i++){ctl(.016);hT=0;hud(.3)}return rxHere().map(P=>P[0]).join(',')},org));
 else await ev(()=>{reg=1;ct=-1;ORG=0;AP=0;let o=CY.find(o=>o.i=='rib')||CY[0];p=ma(o.c||o.a,[1,0,0],.3);z=.05;for(let i=0;i<5;i++){ctl(.016);hT=0;hud(.3)}return 1});
 await ev(()=>{hT=0;hud(.3)});await pg.click('#rxb');await pg.click('#pmo button[data-r="p'+key+'"]');await pg.click('#pmo button[data-r="l0'+key+'"]');
 await ev(()=>{for(let i=0;i<60000&&RX;i++){rxS(.05);rxD();if(RX.S&&RX.st==1&&RX.t>=4.4){RX.pz=1;break}}return 1});await pg.waitForTimeout(1300);await pg.screenshot({path:'y_'+key+'_a.png'});
 console.log(await ev(()=>{RX.pz=0;for(let i=0;i<90000&&RX&&RX.S;i++){rxS(.05);rxD()}for(let i=0;i<80;i++){rxS(.05);rxD()}return 'z'+z.toFixed(4)+' '+document.getElementById('pmt').textContent}));await pg.waitForTimeout(1300);await pg.screenshot({path:'y_'+key+'_b.png'});
 console.log('errors',errs.slice(0,3));await b.close()})();
