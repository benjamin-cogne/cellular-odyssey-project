const {open}=require('./tl.js');
(async()=>{for(const ct of (process.argv[2]||'0,1,2').split(',').map(Number)){
 const {b,pg,errs,ev,boot,ld}=await open(ct);
 console.log('=== CT',ct,'boot ms',boot,ld,errs.slice(0,3));
 if(errs.length){await b.close();continue}
 console.log(await ev(()=>JSON.stringify({cell:CF.n,gene:G.sy,UP,bp:GP.p.length,inst:LY.reduce((s,L)=>s+L.ch.reduce((a,h)=>a+h.n,0),0),chunks:LY.reduce((s,L)=>s+L.ch.length,0),CY:CY.length,NU:NU.length,DN:DN.length,MT:MT.length,SH:SH.length,HO:HO.length,VAR:Object.keys(VAR).length,glerr:gl.getError(),reg,st:document.getElementById('st').textContent,it:document.getElementById('it').textContent,cap:document.getElementById('cap').textContent.slice(0,60)})));
 await pg.waitForTimeout(1200);await pg.screenshot({path:'c'+ct+'_start.png'});
 // gene checks
 console.log(await ev(()=>{let o=[];for(let k in VAR)o.push(k+':'+SQ(+k)+':'+hg(+k)+(ft(+k)==3?cod(+k):''));return JSON.stringify({var:o.slice(0,8),hg:[hg(-30),hg(0),hg(G.cs),hg(G.ex[0][1]),hg(G.ex[1][0]-1),hg(G.ex[1][0]),hg(G.ce-1),hg(G.ce),hg(G.L-1)],cod:[cod(G.cs),cod(G.ce-3)],names:[fnm(-300),fnm(-5),fnm(3),fnm(G.cs+3),fnm(G.ex[0][1]+3),fnm(G.L-3),fnm(G.L+5)],I:G.I.map(o=>o.b-o.a),CDS:CDS.length,donor:G.I.map(o=>SQ(o.a)+SQ(o.a+1)+'..'+SQ(o.b-2)+SQ(o.b-1))})}));
 // entry cinematic
 console.log('entry',await ev(()=>{p=ma(e0,v0,.02);phys();let a=ct;for(let i=0;i<300&&!ENP;i++)cine(.05);endX();if(AP){p=AP.B;z=AP.zb;AP=0}for(let i=0;i<5;i++){ctl(.016);hT=0;hud(.3)}return JSON.stringify({started:a,reg,rk:rk(),st:document.getElementById('st').textContent,it:document.getElementById('it').textContent,cap:document.getElementById('cap').textContent.slice(0,70)})}));
 await pg.waitForTimeout(1200);await pg.screenshot({path:'c'+ct+'_in.png'});
 // fly toward nucleus pore & into nucleus; perf
 console.log('perf cyto',await ev(()=>{z=.3;p=ma(Cc,nm(sb(Cc,Nc)),Rc*.55);f=nm(sb(Nc,p));u=pp(f);cf=f;cu=u;let t=0,n=0;const o=dr;dr=function(h,i,a,c){t+=h.L.m.n/3*h.n;n++;return o(h,i,a,c)};cam(.1);draw();dr=o;let t0=performance.now();for(let i=0;i<20;i++){sim(.016,0,0);vesi(.016);phys()}return Math.round(t)+' tris '+n+' draws cpu '+((performance.now()-t0)/20).toFixed(2)+'ms'}));
 await pg.waitForTimeout(1200);await pg.screenshot({path:'c'+ct+'_cyto.png'});
 console.log('locus',await ev(()=>{for(let i=0;i<3000;i++)sim(.05,0,0);reg=2;z=.02;let g=sb(gC,gO);p=ma(g,WX,.5);f=ml(WX,-1);u=pp(f);cf=f;cu=u;for(let i=0;i<5;i++){ctl(.016);hT=0;hud(.3)}sim(.016,1,1);return JSON.stringify({pols:pols.length,trs:trs.map(T=>T.ph).join(''),tube:dA.t.n,stick:dA.s.n,polyTube:dC.t.n,it:document.getElementById('it').textContent})}));
 await pg.waitForTimeout(1500);await pg.screenshot({path:'c'+ct+'_locus.png'});
 console.log('errors',errs.slice(0,5));await b.close()}})();
