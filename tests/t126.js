// voies de réactions épigénétiques du noyau (dme, epi, hpu) : molécules, bilan atomique approché, étapes en mode expert, focus mendélien. Argument : langue (fr|en)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr';
(async()=>{const {b,pg,errs,ev}=await open(0,{vp:{width:1100,height:620},lang:lang+',mg'});
 console.log('data',JSON.stringify(await ev(()=>{let at=s=>{let o={};for(let w of s.split(' ')){let[x,y]=w.split('*'),k=y||x,n=y?+x:1,m=MOL[k];m[2]=m[2]||rxL(m[1]);for(let a of m[2].a)if(!a.t&&a.el!='H')o[a.el]=(o[a.el]||0)+n}return o};
   return ['dme','epi','hpu'].map(k=>{let P=RXP.find(P=>P[0]==k);return k+':'+P[6].length+' steps, unbalanced heavy atoms: '+P[6].map((s,i)=>{let a=at(s[1]),c=at(s[2]),d=[...new Set(Object.keys(a).concat(Object.keys(c)))].filter(e=>a[e]!=c[e]).map(e=>e+(a[e]||0)+'→'+(c[e]||0));return d.length?i+'('+d+')':''}).filter(x=>x).join(' ')+
     ', mendel steps: '+Object.keys(MGR[k]||{}).filter(s=>+s>=P[6].length).length+' out of range, wrong fields: '+P[6].filter(s=>s.length!=9).length})})));
 await ev(()=>{reg=2;ct=-1;chV.A=0;chG.n=chR.n=0;seenN=1;p=[.25,.1,.3];z=.03;f=nm([-.3,0,-1]);u=pp(f);cf=f;cu=u;vel=0;hT=0;return 1});await pg.waitForTimeout(900);
 console.log('menu',await ev(()=>{rxMenu();return [...$('pmo').querySelectorAll('button')].map(b=>b.textContent).join(' | ')}));
 for(const P of ['dme','epi','hpu']){await ev(()=>rxMenu());await pg.click('#pmo button[data-r="p'+P+'"]');await pg.waitForTimeout(200);await pg.click('#pmo button[data-r="l1'+P+'"]');
  const n=await ev(()=>RX.P[6].length);
  for(let k=0;k<n;k++){await pg.waitForTimeout(3600);console.log('  ',P,k,await ev(()=>$('pmt').textContent+' | '+QL.filter(e=>e.style.display!='none'&&!/^\d+ · /.test(e.textContent)).slice(1).map(e=>e.textContent).join(', ')+' | 🧬 '+[...$('pmx').querySelectorAll('.mgr i')].map(e=>e.textContent).join(' ')));
   if(k==n-1)await pg.screenshot({path:'rx_'+lang+'_'+P+'.png'});await pg.click('#pmo button[data-r="ok"]');await pg.waitForTimeout(250)}
  await pg.waitForTimeout(1500);console.log('  ',P,'end',await ev(()=>$('pmt').textContent));await pg.click('#pmo button[data-r="q"]');await pg.waitForTimeout(300)}
 console.log('errors',JSON.stringify(errs));await b.close()})();
