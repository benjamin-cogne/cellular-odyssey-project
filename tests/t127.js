// surface de la cellule (entry.js) : menu des voies d'entrée, vues guidées cavéole, macropinocytose, endocytose ultrarapide (neurone), récepteurs, puis entrée dans la cellule.
// Arguments : langue (fr|en), cellules (ex. 012)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr',cts=(process.argv[3]||'0').split('').map(Number);
(async()=>{for(const ct of cts){const {b,pg,errs,ev}=await open(ct,{vp:{width:1100,height:620},lang});
 console.log('cell',ct,JSON.stringify(await ev(()=>({views:['wv','wm','wu','wr'].map(k=>k+':'+SXQ[k].S.length+'/'+SXQ[k].T.length).join(' '),receptors:WRX.map(r=>r[0]).join(','),noDraw:WRX.filter(r=>!WRD[r[0]]).length,
   badLeg:['wv','wm','wu','wr'].flatMap(k=>SXQ[k].S.flatMap(S=>S.leg)).filter(k=>!k.pop&&!SXP[k])}))));
 await ev(()=>{p=ma(e0,v0,.5);f=ml(v0,-1);u=pp(f);cf=f;cu=u;vel=0;hT=0;return 1});await pg.waitForTimeout(900);
 await pg.click('#wyb');await pg.waitForTimeout(200);console.log(' menu',await ev(()=>$('pmt').textContent+' | '+[...$('pmo').querySelectorAll('button')].map(b=>b.textContent).join(' | ')));
 for(const v of ct>1?['wv','wm','wu','wr']:['wv','wm','wr']){await ev(()=>{SX&&sxEnd();$('wyb').onclick();return 1});await pg.click('#pmo button[data-r="Sg'+v+'"]');await pg.waitForTimeout(400);const n=await ev(()=>SX.Q.S.length);
  for(let i=0;i<=n;i++){await ev(()=>{let S=SX.Q.S[SX.st];if(S)SX.t=S.T*.7;SX.pz=1;return 1});await pg.waitForTimeout(900);
   console.log(' ',v,i,await ev(()=>$('pmt').textContent+' | spheres '+dSx0.n+', tubes '+dSx1.n+' | '+QL.filter(e=>e.style.display!='none').map(e=>e.textContent).join(', ')));
   if(i==1)await pg.screenshot({path:'entry_'+lang+ct+'_'+v+'.png'});if(i<n)await pg.click('#pmo button[data-r="Sn"]');await pg.waitForTimeout(200)}}
 await ev(()=>{sxEnd();$('wyb').onclick();return 1});await pg.click('#pmo button[data-r="Sgwv"]');await pg.waitForTimeout(300);await ev(()=>{SX.st=SX.Q.S.length-1;sxN(1);return 1});
 await pg.click('#pmo button[data-r="Sh1"]');await pg.waitForTimeout(900);console.log(' entered',JSON.stringify(await ev(()=>({reg,ct,SX:SX?1:0,ship:shp[0].A,inside:shF(p)[1]<0,card:$('it').textContent}))));
 console.log(' errors',JSON.stringify(errs));await b.close()}})();
