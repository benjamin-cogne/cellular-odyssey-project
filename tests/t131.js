// intérieur des cellules gliales (glia.js) : bouton d'entrée près de chaque cellule gliale du tissu du neurone, construction des trois lieux (astrocyte ga, microglie gm,
// oligodendrocyte go), fiche de chaque organite après « vol vers », gènes mendéliens, séquences « En action » (étapes, dessin, trajet suivi), sortie vers le neurone,
// entrée depuis la colonne du cortex et retour. Le temps du jeu est avancé à la main. Argument : langue (fr|en)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr';
(async()=>{const {b,pg,errs,ev}=await open(2,{vp:{width:1100,height:620},lang:lang+',mg'});await pg.waitForTimeout(400);
 console.log('sources',await ev(()=>($('src').innerHTML.match(/— PMID/g)||[]).length+' entries, '+SRC.length+' English labels'));
 // bouton d'entrée : le vaisseau est posé près d'un objet du tissu portant chaque clé de fiche
 console.log('entry button',await ev(()=>['tas','tef','tps','tmg','tol','tmy','tnr'].map(k=>{let o=OX.find(o=>o.i==k);if(!o)return k+': ?';let c=lp(o.a,o.b,.5);p=ma(c,nm(sb(p,c)),o.r+.12);z=.1;vel=0;phys();btT();let e=$('glb');return k+': '+(e.style.display=='block'?e.textContent:'—')}).join(' | ')));
 for(const id of ['ga','gm','go']){
  await ev(id=>{let k={ga:'tas',gm:'tmg',go:'tol'}[id],o=OX.find(o=>o.i==k),c=lp(o.a,o.b,.5);p=ma(c,nm(sb(p,c)),o.r+.12);z=.1;vel=0;phys();btT();return 1},id);await pg.click('#glb');await pg.waitForTimeout(300);
  const r=await ev(id=>{let P=BPL[id],K=bpKs(P),o={in:SX&&SX.pl==P?1:0,home:SX.hm,title:$('pmt').textContent,spheres:P.L0.ch.map(h=>h.n).join(),tubes:P.L1.ch.map(h=>h.n).join(),glass:P.L2.ch.map(h=>h.n).join()+'/'+P.L3.ch.map(h=>h.n).join(),colliders:P.C.length,
     noCard:[...new Set(P.C.map(c=>c.i))].filter(k=>!P.I[k]),noObject:Object.keys(P.I).filter(k=>k!=P.id&&!P.C.some(c=>c.i==k)),nan:P.C.filter(c=>!c.a.every(isFinite)).length,controls:getComputedStyle($('joy')).display+'/'+getComputedStyle($('bt')).display},bad=[],mg=[];
    for(let i=0;i<K.length;i++){SXQ.bz.cl(SX,13);SXQ.bz.cl(SX,100+i);for(let j=0;j<220&&SX.go;j++)bpS(.05,SX);for(let j=0;j<7;j++)bpS(.05,SX);let t=$('pmt').textContent;t.startsWith(P.I[K[i]][0])||bad.push(K[i]+'→'+t);let m=$('pmx').querySelector('.mgr');m&&mg.push(K[i]+':'+[...m.textContent.matchAll(/🧬 (\S+)/g)].map(x=>x[1]).join('+'))}
    o.cards=K.length;o.wrongCard=bad;o.mendel=mg.join(' ');sxD();o.labels=QL.filter(e=>e.style.display!='none').length;return o},id);
  console.log(id,JSON.stringify(r));
  const seq=await ev(id=>{let P=BPL[id],out=[];SXQ.bz.cl(SX,30);out.push('list '+$('pmo').querySelectorAll('button').length);
    P.ci.forEach((c,ci)=>{SXQ.bz.cl(SX,31+ci);let n=c[2].length,s=[];for(let i=0;i<n;i++){let R=SX.rd,S=R.q[2][R.i],d0=1e9,ph=new Set;for(let j=0;j<150;j++){bpS(.05,SX);ph.add(R.ph);if(j%10==0){sxD();d0=Math.min(d0,dSx0.n+dSx1.n)}}
       let v=S.v(),c0=S.c();s.push((i+1)+':'+(S.fo?'follow ':'')+'ph'+[...ph].join('')+(R.P?' path'+R.P.length:'')+' drawn'+d0+(v.concat(c0).every(isFinite)?'':' NaN')+($('pmt').textContent.startsWith((i+1)+'/'+n)?'':' title?'));SXQ.bz.cl(SX,11)}
      out.push(c[0]+' ['+s.join(' | ')+'] end:'+$('pmt').textContent);SXQ.bz.cl(SX,10)});return out},id);
  seq.forEach(l=>console.log('  '+l));
  if(id=='go'){await ev(()=>{SXQ.bz.cl(SX,33);for(let j=0;j<60;j++)bpS(.05,SX);SX.ta=.7;SX.pz=1;return 1});await pg.waitForTimeout(1300);await pg.screenshot({path:'glia_'+lang+'_node.png'});await ev(()=>{SX.pz=0;SXQ.bz.cl(SX,10);return 1})}
  await pg.click('#pmo button[data-r="Sh16"]');await pg.waitForTimeout(300);console.log('  exit',JSON.stringify(await ev(()=>({SX:SX?1:0,reg,ship:shp[0].A,flClass:document.body.classList.contains('fl'),dynRadius:dSx0.r}))))}
 // depuis la colonne du cortex : entrée par la fiche d'un astrocyte, retour à la colonne, puis à la carte
 console.log('from the cortical column',JSON.stringify(await ev(()=>{bnGo(0);SXQ.bz.cl(SX,200+BPL.cx.ix);let P=SX.pl,i=bpKs(P).indexOf('ast'),o={};SXQ.bz.cl(SX,13);SXQ.bz.cl(SX,100+i);for(let j=0;j<260&&SX.go;j++)bpS(.05,SX);for(let j=0;j<7;j++)bpS(.05,SX);
   o.buttons=[...$('pmo').querySelectorAll('button')].map(b=>b.textContent).join(' / ');SXQ.bz.cl(SX,18);o.inside=SX.pl.id+' · '+[...$('pmo').querySelectorAll('button')].pop().textContent;SXQ.bz.cl(SX,16);o.back=SX.pl.id;SXQ.bz.cl(SX,16);o.map=SX.pl?0:1;sxEnd();return o})));
 console.log('errors',JSON.stringify(errs));await b.close()})();
