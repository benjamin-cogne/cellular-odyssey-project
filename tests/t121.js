// corps de Cajal : assemblage des snRNP (mode SX). Bouton, huit étapes et bilan, sortie. Argument : langue (fr|en)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr';
(async()=>{const {b,pg,errs,ev}=await open(0,{vp:{width:1100,height:620},lang});
 console.log('molecules',JSON.stringify(await ev(()=>({U5:mU5.P.length,U4:mDi.U4.length,U6:[mDi.U6.length,mU6.P.length],sca:mSc.P.length,proteins:Object.keys(SXP).length,steps:[SXS.length,SXT.length],
   badLeg:SXS.flatMap(S=>S.leg).filter(k=>!SXR[k]&&!SXP[k]),nan:[mU5.P,mDi.U4,mDi.U6,mU6.P,mSc.P].flat(2).filter(x=>!isFinite(x)).length}))));
 await ev(()=>{reg=2;ct=-1;chV.A=0;chG.n=chR.n=0;seenN=1;p=ma(CBS[0],[0,0,1],.3);z=.05;f=[0,0,-1];u=pp(f);cf=f;cu=u;vel=0;hT=0;return 1});await pg.waitForTimeout(900);
 console.log('button',await ev(()=>$('sxb').style.display+'|'+$('sxb').textContent+' | hint: '+$('cap').textContent.slice(0,60)));
 await ev(()=>{$('sxb').click();return 1});await pg.waitForTimeout(300);      // clic direct : en rendu logiciel, la chaîne de nucléosomes voisine ralentit trop l'affichage pour un clic simulé
 console.log('intro',await ev(()=>$('pmt').textContent+' | '+[...$('pmo').querySelectorAll('button')].map(b=>b.textContent)));
 await pg.evaluate(s=>document.querySelector(s).click(),'#pmo button[data-r="Sgsn"]');await pg.waitForTimeout(500);
 for(let i=0;i<9;i++){await ev(()=>{let S=SXS[SX.st];if(S)SX.t=S.T*.97;SX.pz=1;return 1});await pg.waitForTimeout(2400);         // fin de l'animation de l'étape, en pause
   console.log(i,JSON.stringify(await ev(()=>({t:$('pmt').textContent,legend:[...$('pmx').querySelectorAll('.sxl span')].map(e=>e.textContent).join(', ').slice(0,120),spheres:dSx0.n,tubes:dSx1.n,labels:QL.filter(l=>l.style.display!='none').length,z:+z.toFixed(4)}))));
   await pg.screenshot({path:'sx_'+lang+i+'.png'});if(i<8)await pg.evaluate(s=>document.querySelector(s).click(),'#pmo button[data-r="Sn"]')}
 await pg.mouse.move(700,300);await pg.mouse.down();await pg.mouse.move(820,340,{steps:4});await pg.mouse.up();await pg.waitForTimeout(600);await pg.screenshot({path:'sx_'+lang+'_orbit.png'});
 console.log('orbit',JSON.stringify(await ev(()=>({yaw:+SX.yaw.toFixed(2),pit:+SX.pit.toFixed(2)}))));
 await pg.evaluate(s=>document.querySelector(s).click(),'#pmo button[data-r="Sq"]');await pg.waitForTimeout(500);
 console.log('end',JSON.stringify(await ev(()=>({SX:SX?1:0,hud:$('hl').style.display,z,spheres:dSx0.n,hidden:SXK.length,ship:shp[0].A,labels:QL.filter(l=>l.style.display!='none').length}))));
 console.log('errors',JSON.stringify(errs));await b.close()})();
