const {open}=require('./tl.js');
(async()=>{
 for(const [ct,opt,tag] of [[1,{},'L'],[0,{vp:{width:390,height:780},mobile:true},'P']]){const {b,pg,errs,ev}=await open(ct,opt);
  await ev(()=>{reg=1;ct=-1;chV.A=0;chG.n=chR.n=0;z=.1;p=ma(Cc,nm(sb(Cc,Nc)),Rc*.6);f=nm(sb(Nc,p));u=pp(f);for(let i=0;i<5;i++){ctl(.016);hT=0;hud(.3)}});
  console.log(tag,'cyt list',await ev(()=>document.getElementById('rxb').style.display+' '+rxHere().map(P=>P[0]).join(',')));
  const play=async(key,st,t,name)=>{await ev(([key,st,t])=>{RX&&rxEnd();document.getElementById('pm').style.display='block';rxGo(RXP.find(P=>P[0]==key),0);for(let i=0;i<st;i++)rxN();RX.t=t;RX.pz=1},[key,st,t]);await pg.waitForTimeout(1100);await pg.screenshot({path:name})};
  if(tag=='L'){await play('gly',2,1.3,'q_gly_a.png');await play('gly',5,6.5,'q_gly_b.png');await play('ure',2,6.5,'q_ure.png');await play('gcx',5,6.5,'q_gcx.png');await play('oxp',3,1.3,'q_ox.png');await play('epi',1,6.5,'q_epi.png');await play('ubi',2,3.1,'q_ubi.png')}
  else{await play('krb',1,1.3,'q_p1.png');await play('krb',5,6.5,'q_p2.png');await play('hem',1,6.5,'q_p3.png')}
  await ev(()=>rxEnd());
  // noyau
  console.log(tag,'nuc list',await ev(()=>{reg=2;z=.02;p=[.3,.2,0];for(let i=0;i<4;i++){ctl(.016);hT=0;hud(.3)}return document.getElementById('rxb').style.display+' '+rxHere().map(P=>P[0]).join(',')}));
  console.log('errors',errs.slice(0,4));await b.close()}})();
