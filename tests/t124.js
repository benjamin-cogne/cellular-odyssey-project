// acteurs de la chromatine (chromatin.js) : objets et fiches dans le noyau, atlas, focus mendélien. Arguments : langue (fr|en), cellules (ex. 012)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr',cts=(process.argv[3]||'0').split('').map(Number);
const K=['h1','h2az','h33','baf','coh','ctcf','hc','hp1','cenpa','pcb','prc1','prc2','impm','impp'];
(async()=>{for(const ct of cts){const {b,pg,errs,ev}=await open(ct,{vp:{width:1100,height:620},lang:lang+',mg'});
 console.log('cell',ct,JSON.stringify(await ev(K=>({cards:K.filter(k=>!I[k]||I[k][1].length<200),atlas:K.filter(k=>!AG[k]),mendel:K.filter(k=>!MG[k]),
   n:K.map(k=>k+':'+NU.concat(DN).filter(o=>o.i==k).length).join(' '),nan:NU.concat(DN).filter(o=>K.includes(o.i)&&!o.a.every(isFinite)).length,
   out:NU.filter(o=>K.includes(o.i)&&ds(o.a,Nc)>Rn).length,ring:DN.filter(o=>o.i=='coh').map(o=>+ds(o.a,lp(lO,GP.p[UP+G.eo],.5)).toFixed(3)).join(',')}),K)));
 const D=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1],[1,1,1],[-1,-1,-1]];
 for(const k of K){let ok=0,seen={};        // le vaisseau, réduit, se pose contre un objet de chaque sorte, de 8 côtés : sa fiche doit s'afficher d'au moins un côté
  for(const d of D){await ev(a=>{let o=NU.concat(DN).find(o=>o.i==a.k),d=nm(a.d);reg=2;ct=-1;chV.A=0;chG.n=chR.n=0;seenN=1;z=min(.02,max(.002,o.r*1.5));p=ma(o.a,d,o.r+z*.42+.0004);f=ml(d,-1);u=pp(f);cf=f;cu=u;vel=0;say('',.01);hT=0;pin=0;return 1},{k,d});
   await pg.waitForTimeout(130);const t=await ev(k=>[$('it').textContent,$('it').textContent==I[k][0],$('im').textContent.replace(/🧬 /g,'').slice(0,70)],k);if(t[1])ok++,seen.m=t[2];else seen[t[0]]=1}
  console.log(' ',k,ok+'/8 sides |',await ev(k=>I[k][0],k),'| 🧬',seen.m||'—','| otherwise:',Object.keys(seen).filter(x=>x!='m').join(', '))}
 await pg.screenshot({path:'chromatin_'+lang+ct+'.png'});
 console.log('  errors',JSON.stringify(errs));await b.close()}})();
