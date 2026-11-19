// synapses détaillées : captures depuis l'extérieur (fente), l'intérieur du bouton, l'épine afférente, le segment initial
const {open}=require('./tl.js');(async()=>{const {b,pg,errs,ev}=await open(2,{lang:process.argv[2]||''});
 await ev(()=>{go=0;ct=-1;reg=0;ZM=1});
 const shot=async(n,fn,arg)=>{await ev(fn,arg);await pg.waitForTimeout(2500);await pg.screenshot({path:'/tmp/s110_'+n+'.png'})};
 const look=(a)=>{let s=SY[a[0]],c=a[4]?s.L0(0,0,a[4]):s.cc,v=a[3]?s.vw:s.lat;reg=a[5]||0;z=a[1];f=v.slice();u=ml(s.n,-1);p=ma(c,f,a[2]||0);cf=f;cu=u;vel=0;return [SY.length,OX.length,CY.length,LY.reduce((m,L)=>m+L.ch.reduce((k,h)=>k+h.n*L.m.n,0),0)]};
 console.log(await ev(look,[1,.11,0,0]));await pg.waitForTimeout(2500);await pg.screenshot({path:'/tmp/s110_out_wide.png'});
 await shot('out_site',look,[1,.02,0,1,.002]);
 await shot('out_post',look,[1,.02,0,1,.03]);
 await shot('in_wide',look,[0,.11,0,0]);
 await shot('in_site',look,[0,.022,0,1,-.012]);
 await shot('btn_inside',()=>{reg=1;z=.03;p=ma(Cb,dax,Rb-.2);f=dax.slice();u=pp(f);cf=f;cu=u;vel=0});
 await shot('ais',()=>{reg=1;z=.04;f=nm(sb(AIS.pt(0,.01,0),AIS.c));u=AIS.n.slice();p=AIS.c.slice();cf=f;cu=u;vel=0});
 await shot('ais_out',()=>{reg=0;z=.05;f=ml(AIS.n,-1);u=dax.slice();p=ma(AIS.c,AIS.n,.1);cf=f;cu=u;vel=0});
 console.log(await ev(()=>[z,reg,nI&&nI.i]),errs.join('\n')||'no errors');await b.close()})();
