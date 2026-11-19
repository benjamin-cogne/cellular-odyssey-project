const {open}=require('./tl.js');
(async()=>{const {b,pg,errs,ev}=await open(1,{vp:{width:844,height:390},lang:'en'});
 const T=id=>pg.evaluate(i=>document.getElementById(i).textContent,id);
 console.log('mit',await ev(k=>{reg=1;ct=-1;ORG=0;AP=0;let o=CY.find(o=>o.i==k&&ENT[o.i]);p=(o.c||o.a).slice();z=.03;nI=o;nD=0;btT();let t=document.getElementById('ent').textContent;document.getElementById('ent').onclick();for(let i=0;i<400&&AP;i++)apS(.05);for(let i=0;i<5;i++){ctl(.016);hT=0;hud(.3)}return t+' || '+document.getElementById('cap').textContent+' || '+document.getElementById('st').textContent+' | '+document.getElementById('it').textContent+' | '+document.getElementById('ent').textContent},'mit'));
 await pg.click('#rxb');console.log('menu',await T('pmt'),'|',await T('pmx'),'|',await T('pmo'));
 await pg.click('#pmo button[data-r="pkrb"]');console.log('path',await T('pmt'),'|',await T('pmx'),'|',await T('pmo'));
 await pg.click('#pmo button[data-r="l1krb"]');await pg.waitForTimeout(2500);console.log('step',await T('pmt'),'|',await T('pmx'),'|',await T('pmo'),'| labels:',await pg.evaluate(()=>[...document.querySelectorAll('.ql')].filter(e=>e.style.display!='none').map(e=>e.textContent).join(', ')));
 await pg.screenshot({path:'en_rx.png'});
 console.log('bilan',await ev(()=>{RX.lv=0;for(let i=0;i<90000&&RX&&RX.S;i++){rxS(.05);rxD()}for(let i=0;i<60;i++){rxS(.05);rxD()}return document.getElementById('pmt').textContent+' | '+document.getElementById('pmx').textContent+' | '+document.getElementById('pmo').textContent+' | '+[...document.querySelectorAll('.ql')].filter(e=>e.style.display!='none').map(e=>e.textContent).join(', ')}));
 await pg.waitForTimeout(1200);await pg.screenshot({path:'en_krb.png'});await pg.click('#pmo button[data-r="q"]');
 console.log('nucleus',await ev(()=>{ORG=0;OC=[];reg=2;ct=-1;seenN=1;p=[.02,.004,.0];z=.003;for(let i=0;i<5;i++){ctl(.016);hT=0;hud(.3)}return document.getElementById('st').textContent+' | '+document.getElementById('it').textContent+' | '+document.getElementById('ix').textContent.slice(0,120)+' | sq '+document.getElementById('sq').textContent.slice(0,120)}));
 console.log('nol',await ev(()=>{p=ma(NOL,[0,0,1],1.05);z=.03;for(let i=0;i<5;i++){ctl(.016);hT=0;hud(.3)}btT();return document.getElementById('ent').textContent+' | '+document.getElementById('it').textContent}));
 await pg.click('#atb');console.log('atlas',await T('atm'),'|',await pg.evaluate(()=>[...document.querySelectorAll('#atl h3')].map(h=>h.textContent).join(' ¦ ')+' :: '+[...document.querySelectorAll('#atl button')].slice(0,14).map(h=>h.textContent).join(' ¦ ')));
 await pg.click('#atc');await pg.click('#nvb');await pg.waitForTimeout(300);console.log('nav',await pg.evaluate(()=>document.getElementById('nv').innerText.replace(/\n+/g,' ¦ ').slice(0,500)));
 console.log('errors',errs.slice(0,3));await b.close();
 // écran d'accueil : bascule de langue
 const pw=require('playwright');const br=await pw.chromium.launch({executablePath:process.env.CHROME||undefined,args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--no-sandbox']}).catch(()=>0);
 if(br){const p2=await br.newPage({viewport:{width:390,height:780}});await p2.goto('file://'+require('path').resolve(__dirname,'..','dist','dev.html'));await p2.waitForTimeout(500);await p2.screenshot({path:'home_fr.png'});await p2.click('#lg button[data-l="1"]');await p2.waitForTimeout(300);await p2.screenshot({path:'home_en.png'});
  console.log('home EN',await p2.evaluate(()=>document.querySelector('#ov h1').textContent+' | '+document.getElementById('src').innerHTML.split('<br>').slice(0,3).join(' // ')+' | '+document.title+' | '+document.getElementById('q').placeholder));await br.close()}})();
