// code des histones (vue guidée hx du moteur SX) : bouton, quinze étapes et bilan, sommaire, focus mendélien, sortie. Arguments : langue (fr|en), mg pour activer le focus mendélien
const {open}=require('./tl.js');const lang=process.argv[2]||'fr',mg=process.argv[3]=='mg';
(async()=>{const {b,pg,errs,ev}=await open(0,{vp:{width:1100,height:620},lang:lang+(mg?',mg':'')});
 console.log('data',JSON.stringify(await ev(()=>({steps:[HXS.length,HXT.length],marks:Object.keys(MKC).length,tails:Object.keys(HXTL).map(k=>k+':'+HXTL[k].P.length).join(' '),
   badLeg:HXS.flatMap(S=>S.leg).filter(k=>!k.pop&&!SXR[k]&&!SXP[k]),noKey:HXS.filter(S=>!S.k||!S.c||!S.z||!S.T).length,mendel:Object.keys(MGX.hx||{}).filter(k=>!HXS.find(S=>S.k==k)),
   nan:Object.values(HXTL).flatMap(t=>t.P).flat().filter(x=>!isFinite(x)).length}))));
 await ev(()=>{reg=2;ct=-1;chV.A=0;chG.n=chR.n=0;seenN=1;p=[.25,.1,.3];z=.03;f=nm([-.3,0,-1]);u=pp(f);cf=f;cu=u;vel=0;hT=0;return 1});await pg.waitForTimeout(900);
 console.log('button',await ev(()=>$('hxb').style.display+'|'+$('hxb').textContent+' | hint: '+$('cap').textContent.slice(0,50)));
 await pg.click('#hxb');await pg.waitForTimeout(300);console.log('intro',await ev(()=>$('pmt').textContent+' | '+[...$('pmo').querySelectorAll('button')].map(b=>b.textContent)));
 await pg.click('#pmo button[data-r="Sghx"]');await pg.waitForTimeout(500);
 for(let i=0;i<16;i++){await ev(()=>{let S=SX.Q.S[SX.st];if(S)SX.t=S.T*.6;SX.pz=1;return 1});await pg.waitForTimeout(1800);         // marque posée, lecteur en place, en pause
   console.log(i,JSON.stringify(await ev(()=>({t:$('pmt').textContent,legend:[...$('pmx').querySelectorAll('.sxl span')].map(e=>e.textContent).join(', ').slice(0,110),mendel:($('pmx').querySelector('.mgr')||{textContent:''}).textContent.slice(0,90),spheres:dSx0.n,tubes:dSx1.n,labels:QL.filter(l=>l.style.display!='none').length}))));
   await pg.screenshot({path:'hx_'+lang+i+'.png'});if(i<15)await pg.click('#pmo button[data-r="Sn"]')}
 await pg.click('#pmo button[data-r="Sm"]');await pg.waitForTimeout(300);console.log('contents',await ev(()=>$('pmt').textContent+' | '+$('pmo').querySelectorAll('button').length+' buttons'));
 await pg.click('#pmo button[data-r="Sj7"]');await pg.waitForTimeout(600);console.log('jump',await ev(()=>$('pmt').textContent));
 await pg.click('#pmo button[data-r="Sq"]');await pg.waitForTimeout(500);
 console.log('end',JSON.stringify(await ev(()=>({SX:SX?1:0,hud:$('hl').style.display,spheres:dSx0.n,ship:shp[0].A}))));
 console.log('errors',JSON.stringify(errs));await b.close()})();
