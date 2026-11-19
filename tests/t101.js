const {open}=require('./tl.js');
(async()=>{const {b,pg,errs,ev}=await open(2,{vp:{width:390,height:780},mobile:1,lang:'en'});
 await ev(()=>{reg=2;ct=-1;seenN=1;let o=NOC;OC=[];let B=mkNol(o);fin();o.zm=.036;ORG=o;p=B;z=.012;f=nm(sb(NOU[0].U,p));u=pp(f);cf=f;cu=u;for(let i=0;i<5;i++){ctl(.016);hT=0;hud(.3)}btT();return 1});
 await pg.tap('#rxb');await pg.tap('#pmo button[data-r="prrn"]');await pg.tap('#pmo button[data-r="l0rrn"]');
 await ev(()=>{for(let i=0;i<60000&&RX;i++){rxS(.05);rxD();if(RX.S&&RX.st==1&&RX.t>=4.4){RX.pz=1;break}}return 1});await pg.waitForTimeout(1300);await pg.screenshot({path:'en_rrn_a.png'});
 console.log(await ev(()=>{RX.pz=0;for(let i=0;i<90000&&RX&&RX.S;i++){rxS(.05);rxD()}for(let i=0;i<80;i++){rxS(.05);rxD()}return 'z'+z.toFixed(4)+' '+document.getElementById('pmt').textContent+' | '+RX.St.map(s=>ds(s.S,RX.St[0].S).toFixed(3)).join(' ')}));await pg.waitForTimeout(1300);await pg.screenshot({path:'en_rrn_b.png'});
 await pg.tap('#pmo button[data-r="q"]');await pg.waitForTimeout(500);console.log('after',await pg.evaluate(()=>document.getElementById('st').textContent),errs.slice(0,3));await b.close()})();
