// navigation libre : entrer dans la fente depuis l'extérieur, toucher des molécules, vue depuis l'intérieur du bouton
const {open}=require('./tl.js');(async()=>{const {b,pg,errs,ev}=await open(2,{lang:process.argv[2]||''});
 await ev(()=>{ct=-1;go=1;reg=0;$('cap').style.opacity=0});await pg.waitForTimeout(500);
 for(const i of[1,0]){await ev(i=>{synGo(i)},i);await pg.waitForTimeout(1500);
  console.log('syn',i,await ev(i=>{let s=SY[i],o=[+z.toFixed(4),+ds(p,s.cc).toFixed(3)];keys.Space=1;for(let k=0;k<230;k++)ctl(.03);keys.Space=0;vel=0;
    return o.concat([+z.toFixed(4),+(ds(p,s.Cp)-s.Rp).toFixed(4),+ds(p,s.cc).toFixed(3),nI&&nI.i,reg])},i));
  await pg.waitForTimeout(2500);await pg.screenshot({path:'/tmp/s112_cleft'+i+'.png'});
  console.log(' pick',await ev(()=>{let r=[];for(const[x,y]of[[.5,.45],[.42,.5],[.6,.4],[.5,.3],[.35,.35]]){pick({clientX:innerWidth*x,clientY:innerHeight*y});r.push(pin&&pin[0])}return r}))}
 console.log('inside',await ev(()=>{reg=1;ct=-1;p=ma(Cb,dax,Rb-.09);f=dax.slice();u=pp(f);cf=f;cu=u;z=.012;vel=0;for(let k=0;k<5;k++)ctl(.03);return[reg,+z.toFixed(4),nI&&nI.i,+(Rb-ds(p,Cb)).toFixed(3)]}));
 await pg.waitForTimeout(2500);await pg.screenshot({path:'/tmp/s112_inside.png'});
 console.log(' pick',await ev(()=>{let r=[];for(const[x,y]of[[.5,.45],[.42,.5],[.6,.4],[.5,.3],[.35,.35],[.7,.5]]){pick({clientX:innerWidth*x,clientY:innerHeight*y});r.push(pin&&pin[0])}return r}));
 console.log('atlas',await ev(()=>[AK.length,AK.filter(k=>AG[k]=='Synapses'||AG[k]=='Synapses').length,Object.values(AG).filter((v,i,a)=>a.indexOf(v)==i)]));
 console.log(errs.join('\n')||'no errors');await b.close()})();
