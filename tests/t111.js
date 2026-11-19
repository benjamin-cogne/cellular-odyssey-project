// influx nerveux : toutes les étapes, captures à une phase donnée ; args : langue, 'p' pour portrait, niveau
const {open}=require('./tl.js');(async()=>{const P=process.argv[3]=='p',lv=+process.argv[4]||0,{b,pg,errs,ev}=await open(2,{lang:process.argv[2]||'',vp:P?{width:390,height:780}:undefined});
 await ev(()=>{ct=-1;go=1;reg=0;$('cap').style.opacity=0});await pg.waitForTimeout(600);
 console.log('btn',await ev(()=>{btT();return $('nxb').style.display}));
 await pg.click('#nxb');await pg.waitForTimeout(300);console.log(await pg.evaluate(()=>document.getElementById('pmt').textContent+' | '+[...document.querySelectorAll('#pmo button')].map(b=>b.textContent).join(' / ')));
 await pg.click('#pmo button[data-r="il'+lv+'"]');
 const ph=[.5,.5,.55,.5,.7,.5,.5,.5,.8,.25,.5,.75];
 for(let i=0;i<13;i++){await ev(a=>{let S=NXS[NX.st];if(S){NX.t=S.T*a;NX.pz=1}},ph[i]||0);for(let k=0;k<40;k++){await pg.waitForTimeout(600);if(await ev(()=>!NX.zt&&ds(NX.Cc,NX.Ct)<.05*z))break}await pg.waitForTimeout(1200);
  await pg.screenshot({path:'/tmp/nx'+(P?'p':'')+(process.argv[2]||'fr')+lv+'_'+i+'.png'});
  console.log(i,await ev(()=>[NX.st,+z.toFixed(4),dNi.n,dNg.n,nxl,$('pmt').textContent,$('pmx').textContent.length]),errs.length);
  if(i<12)await pg.click(lv?'#pmo button[data-r="iok"]':'#pmo button[data-r="iok"]');await pg.waitForTimeout(200)}
 await pg.click('#pmo button[data-r="ig"]');await pg.waitForTimeout(2500);await pg.screenshot({path:'/tmp/nx_end.png'});
 console.log(await ev(()=>[NX,reg,+z.toFixed(4),$('nxb').style.display,$('osc').style.display,$('cap').textContent.slice(0,60)]),errs.join('\n')||'no errors');await b.close()})();
