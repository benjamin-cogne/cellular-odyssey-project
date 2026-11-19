const {open}=require('./tl.js');
(async()=>{const {b,pg,errs,ev}=await open(1);
 const enter=k=>ev(k=>{reg=1;ct=-1;ORG=0;AP=0;chV.A=0;chG.n=chR.n=0;let o=CY.find(o=>o.i==k&&ENT[o.i]);let c=o.c||ma(o.a,sb(o.b,o.a),.5);z=.03;p=ad(c,[0,0,0]);nI=o;nD=0;btT();document.getElementById('ent').onclick();for(let i=0;i<400&&AP;i++)apS(.05);for(let i=0;i<5;i++){ctl(.016);hT=0;hud(.3)}return document.getElementById('rxb').style.display+' '+rxHere().map(P=>P[0]).join(',')},k);
 console.log('mit',await enter('mit'));
 await pg.click('#rxb');await pg.waitForTimeout(200);console.log('menu',await pg.evaluate(()=>document.getElementById('pmt').textContent+' | '+document.getElementById('pmo').textContent));
 await pg.click('#pmo button[data-r="pkrb"]');await pg.click('#pmo button[data-r="l0krb"]');
 const snap=async(t,name)=>{await ev(t=>{RX.t=t;RX.pz=1},t);await pg.waitForTimeout(900);await pg.screenshot({path:name})};
 await snap(1.2,'r_k0a.png');await snap(3.2,'r_k0b.png');await snap(6.5,'r_k0c.png');
 console.log('auto',await ev(()=>{RX.pz=0;let o=[],last=-1,i=0;while(RX&&RX.S&&i++<40000){rxS(.05);rxD();if(RX&&RX.S&&RX.st!=last){last=RX.st;o.push(RX.st+':'+RX.S.e.slice(0,22)+' i'+RX.S.i.length+' o'+RX.S.o.length+(RX.S.k?' ↺':'')+' atoms'+dQa.n)}}return o.join(' | ')+' || fin: '+document.getElementById('pmt').textContent+' / '+document.getElementById('pmo').textContent}));
 await pg.click('#pmo button[data-r="q"]');
 console.log('after end',await ev(()=>JSON.stringify({RX:!!RX,z:+z.toFixed(4),ORG:ORG&&ORG.i,hl:document.getElementById('hl').style.display,atoms:dQa.n})));
 // expert + quiz dans la chaîne respiratoire
 await ev(()=>{hT=0;hud(.3)});await pg.click('#rxb');await pg.click('#pmo button[data-r="poxp"]');await pg.click('#pmo button[data-r="l1oxp"]');
 await pg.click('#pmo button[data-r="no"]');console.log('quiz',await pg.evaluate(()=>document.getElementById('pmo').textContent.slice(0,160)));
 await pg.click('#pmo button[data-r="ok"]');await snap(3.4,'r_ox.png');console.log('step2',await pg.evaluate(()=>document.getElementById('pmt').textContent));
 await pg.click('#pmo button[data-r="q"]');
 // glycosylation dans le RE
 console.log('rer',await enter('rer'));await pg.click('#rxb');await pg.click('#pmo button[data-r="pngl"]');await pg.click('#pmo button[data-r="l0ngl"]');await snap(1.5,'r_ng0.png');await snap(6.5,'r_ng1.png');
 await pg.click('#pmo button[data-r="q"]');
 console.log('errors',errs.slice(0,4));await b.close()})();
