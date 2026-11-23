// trois intérieurs de plus (interiors.js, interiors-text.js) : lysosome, dyade, disque intercalaire ; et treize voies de réactions (lysosome, dyade, disque,
// voies cardiaques de la mitochondrie, signal β-adrénergique). Données (bilan des atomes, fiches, focus mendélien), entrée dans chaque lieu, fiches selon l'endroit,
// animation, menu des réactions et une voie pas à pas par lieu, sortie. Arguments : langue (fr|en), cellule pour le lysosome (0 à 3, défaut 3)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr',lc=+(process.argv[3]||3);
(async()=>{let bad=0,o;const ok=(n,c,x)=>{c||bad++;console.log((c?'ok  ':'FAIL')+' '+n+(x==null?'':' : '+JSON.stringify(x)))};
 const run=async(ct,what)=>{const {b,pg,errs,ev}=await open(ct,{vp:{width:1100,height:620},lang:lang+',mg'});await pg.waitForTimeout(1200);
  const click=s=>pg.evaluate(s=>{let e=document.querySelector(s);e&&e.click();return!!e},s),fly=async()=>{for(let i=0;i<45;i++){await pg.waitForTimeout(900);if(await ev(()=>!AP))break}},
   path=async P=>{await ev(()=>{rxMenu();return 1});await click('#pmo button[data-r="p'+P+'"]');await pg.waitForTimeout(200);await click('#pmo button[data-r="l1'+P+'"]');await pg.waitForTimeout(600);const n=await ev(()=>RX?RX.P[6].length:0);let T=[],good=n>0;
     for(let k=0;k<n;k++){await pg.waitForTimeout(4300);let s=await ev(()=>({t:$('pmt').textContent,mol:QL.filter(e=>e.style.display!='none').length,sp:LY.flatMap(L=>L.ch).filter(h=>h.L.rx&&h.cap).reduce((a,h)=>a+h.n,0),mg:[...$('pmx').querySelectorAll('.mgr i')].map(e=>e.textContent).join(' ')}));
       T.push(s.t.slice(0,30)+' ['+s.mol+'/'+s.sp+(s.mg?' 🧬 '+s.mg:'')+']');s.mol>1&&s.sp>3||(good=0);await click('#pmo button[data-r="ok"]');await pg.waitForTimeout(250)}
     await pg.waitForTimeout(1000);let e=await ev(()=>$('pmt').textContent);await click('#pmo button[data-r="q"]');await pg.waitForTimeout(400);ok('voie '+P+' pas à pas',good&&/bilan|summary/i.test(e),T)},
   menu=async()=>{await ev(()=>{rxMenu();return 1});await pg.waitForTimeout(300);let m=await ev(()=>({t:$('pmt').textContent,n:$('pmo').querySelectorAll('button[data-r^="p"]').length}));await click('#pmo button[data-r="x"]');await ev(()=>{$('pm').style.display='none';return 1});return m},
   at=async(y,u,v,zz,t)=>{await ev(([y,u,v,zz,t])=>{let o=ORG;p=ad(o.c,ad(ad(ml(o.Y,y),ml(o.X,u)),ml(o.Z,v)));z=zz;vel=0;if(t!=null)sT=t;return 1},[y,u,v,zz,t]);await pg.waitForTimeout(1300);return ev(()=>nI&&I[nI.i]?nI.i:'-')};
  if(what=='data'){
   o=await ev(()=>{let at=s=>{let o={};for(let w of s.split(' ')){let[x,y]=w.split('*'),k=y||x,n=y?+x:1,m=MOL[k];m[2]=m[2]||rxL(m[1]);for(let a of m[2].a)if(a.el!='H')o[a.el]=(o[a.el]||0)+n}return o};
     return['lva','lyd','cic','srp','gjc','cxl','cdh','car','ket','mtk','mcu','clp','bar'].map(k=>{let P=RXP.find(P=>P[0]==k);return k+':'+P[6].length+':'+P[6].map((s,i)=>{let a=at(s[1]),c=at(s[2]);return[...new Set(Object.keys(a).concat(Object.keys(c)))].some(e=>a[e]!=c[e])?i:''}).join('')+':'+P[6].filter(s=>s.length!=9).length+':'+!!RXW[k]}).join(' ')});
   ok('treize voies, 36 étapes équilibrées (atomes lourds et groupes)',o=='lva:1::0:true lyd:4::0:true cic:3::0:true srp:4::0:true gjc:2::0:true cxl:3::0:true cdh:2::0:true car:3::0:true ket:3::0:true mtk:2::0:true mcu:2::0:true clp:1::0:true bar:6::0:true',o);
   o=await ev(()=>({cards:['lysI','lgx','lvt','ltr','lhy','lgg','liv','lch','llf','lmi','dyaI','ryr','dcv','jph','dnx','csq','dsr','dtl','dsl','icdI','gjp','nvp','dcd','dpl','ncd','nca'].filter(k=>!I[k]||I[k][1].length<150),
     mg:['lgx','lgg','ltr','lhy','lch'].filter(k=>!MG[k]).concat(['ryr','dcv','csq','jph','dsr','gjp','dcd','dpl','ncd','nvp'].filter(k=>!(MGC[3]&&MGC[3][k]))),rx:['lyd','cic','srp','cxl','cdh','car','ket','clp','bar'].filter(k=>!MGR[k])}));
   ok('26 fiches',!o.cards.length,o.cards);ok('focus mendélien : fiches et voies',!o.mg.length&&!o.rx.length,o);
   // cytosol : la voie de l'adrénaline, ancrée près d'une cavéole
   await ev(()=>{let c=CY.find(o=>o.i=='cvl');p=ma(c.a,nm(sb(Cc,c.a)),.25);f=nm(sb(c.a,p));u=pp(f);cf=f;cu=u;z=.03;vel=0;reg=1;ct=-1;AP=0;hT=0;chV.A=0;chG.n=chR.n=0;return 1});await pg.waitForTimeout(1200);
   o=await menu();ok('cytosol : menu des réactions',o.n>=5,o);await path('bar');
   // mitochondrie : cinq voies de plus dans le cardiomyocyte
   await ev(()=>{let m=CY.find(o=>o.i=='mit');p=ma(m.c,m.X,m.s[0]+.04);f=ml(m.X,-1);u=pp(f);cf=f;cu=u;z=.03;vel=0;return 1});await pg.waitForTimeout(1500);await click('#ent');await fly();
   o=await menu();ok('mitochondrie du cardiomyocyte : huit voies',(await ev(()=>ORG&&ORG.i))=='mit'&&o.n==8,o);await path('car');await path('clp')}
  if(what=='lys'){
   await ev(()=>{let o=CY.find(c=>c.i=='lys'),d=nm(sb(o.a,Cc));p=ma(o.a,d,o.r+.03);f=ml(d,-1);u=pp(f);cf=f;cu=u;z=.02;vel=0;reg=1;ct=-1;AP=0;hT=0;chV.A=0;chG.n=chR.n=0;return 1});await pg.waitForTimeout(1500);
   o=await ev(()=>$('ent').style.display+'|'+$('ent').textContent);ok('cellule '+ct+' : bouton d\'entrée du lysosome',/^block\|.*lysosome/i.test(o),o);await click('#ent');await fly();
   o=await ev(()=>{let n=k=>OC.filter(c=>c.i==k).length;return{org:ORG&&ORG.i,z:+z.toFixed(4),st:$('st').textContent.split(' · ')[0],ent:$('ent').textContent,pumps:n('lvt'),hyd:n('lhy'),lgx:n('lgx'),gly:n('lgg'),beads:LY.flatMap(L=>L.ch).filter(h=>!h.cap&&h.L.vz==110).reduce((a,h)=>a+h.n,0)}});
   ok('entré dans le lysosome',o.org=='lys'&&/Lysosome/.test(o.st)&&/lysosome/i.test(o.ent)&&o.pumps>6&&o.hyd>30&&o.lgx>50&&o.gly==1&&o.beads>2000,o);
   o=await ev(()=>{let R=ORG.s[0];p=ma(ORG.c,[1,0,0],5);return 1});await pg.waitForTimeout(700);o=await ev(()=>+(ln(sb(p,ORG.c))/ORG.s[0]).toFixed(2));ok('confinement dans le lysosome',o<=1,o);
   o=await menu();ok('lysosome : deux voies',o.n==2&&!/undefined/.test(o.t),o);await path('lyd');await path('lva');
   await click('#ent');await fly();o=await ev(()=>({org:ORG&&ORG.i,reg}));ok('sortie du lysosome',!o.org&&o.reg==1,o)}
  if(what=='dya'){
   await ev(()=>{let M=CY.filter(o=>o.i=='myf'),cl_=D=>Math.min(...M.map(o=>{let ab=sb(o.b,o.a),t=cl(dt(sb(D[0],o.a),ab)/dt(ab,ab),0,1);return ds(D[0],ma(o.a,ab,t))-o.r})),D=CDL.reduce((a,b)=>cl_(a)>cl_(b)?a:b);
     p=ma(D[0],D[1],.25);f=ml(D[1],-1);u=pp(f);cf=f;cu=u;z=.02;vel=0;reg=1;ct=-1;AP=0;hT=0;chV.A=0;chG.n=chR.n=0;return 1});await pg.waitForTimeout(1500);
   o=await ev(()=>$('ent').style.display+'|'+$('ent').textContent);ok('bouton d\'entrée de la dyade',/^block\|.*(dyade|dyad)/i.test(o),o);await click('#ent');await fly();
   o=await ev(()=>{let n=k=>OC.filter(c=>c.i==k).length;return{org:ORG&&ORG.i,st:$('st').textContent.split(' · ')[0],ryr:n('ryr'),cav:n('dcv'),jph:n('jph'),ncx:n('dnx'),serca:n('dsr')}});
   ok('entré dans la dyade : 14 RyR2, Cav1.2, junctophiline, NCX, SERCA2a',o.org=='dya'&&o.ryr==14&&o.cav==4&&o.jph==6&&o.ncx==3&&o.serca>8,o);
   let seen={};for(const[y,u,v]of[[-.002,-.19,.03],[.002,0,.0155],[-.1,0,0],[.03,-.1,.1],[.085,-.1,.085],[-.004,.14,.03]])seen[await at(y,u,v,.006,.5)]=1;
   ok('fiches : fente, RyR2, lumière du tubule, lumière du réticulum, SERCA2a, junctophiline',['ryr','dtl','dsl','dsr','jph'].every(k=>seen[k]),Object.keys(seen));
   const dyn=()=>ev(()=>LY.flatMap(L=>L.ch).filter(h=>h.cap==900||h.cap==400).reduce((a,h)=>a+h.n,0));await at(-.002,-.1,.05,.008,.5);let d0=await dyn();await at(-.002,-.1,.05,.008,1.9);let d1=await dyn();
   ok('animation : la libération de calcium remplit la fente',d0>150&&d1>d0+100,{repos:d0,liberation:d1});
   o=await menu();ok('dyade : deux voies',o.n==2,o);await path('cic');await path('srp');
   await click('#ent');await fly();o=await ev(()=>({org:ORG&&ORG.i,reg}));ok('sortie de la dyade',!o.org&&o.reg==1,o)}
  if(what=='icd'){
   await ev(()=>{let q=ma(Cc,A0,Rc+41.6);p=ad(q,ml(pp(A0),1.2));f=A0.slice();u=pp(f);cf=f;cu=u;z=.03;vel=0;reg=1;ct=-1;AP=0;hT=0;chV.A=0;chG.n=chR.n=0;return 1});await pg.waitForTimeout(1500);
   o=await ev(()=>$('ent').style.display+'|'+$('ent').textContent);ok('bouton d\'entrée du disque intercalaire',/^block\|.*(disque|disc)/i.test(o),o);await click('#ent');await fly();
   o=await ev(()=>{let n=k=>OC.filter(c=>c.i==k).length;return{org:ORG&&ORG.pl,st:$('st').textContent.split(' · ')[0],gjp:n('gjp'),nav:n('nvp'),dcd:n('dcd'),dpl:n('dpl'),ncd:n('ncd'),nca:n('nca'),beads:LY.flatMap(L=>L.ch).filter(h=>!h.cap&&h.L.vz==110).reduce((a,h)=>a+h.n,0)}});
   ok('entré dans le disque : plaque, Nav1.5, desmosome, jonction adhérente',o.org=='icd'&&o.gjp==10&&o.nav==7&&o.dcd>8&&o.dpl==2&&o.ncd>5&&o.nca>10&&o.beads>2500,o);
   let seen={};for(const[y,u,v]of[[0,-.03,.02],[0,.1,.06],[.03,.1,.06],[0,.02,-.12],[-.035,.02,-.12],[0,-.18,.02]])seen[await at(y,u,v,.004)]=1;
   ok('fiches : plaque, cadhérines, plaque du desmosome, N-cadhérine, actine, Nav1.5',['gjp','dcd','dpl','ncd','nca','nvp'].every(k=>seen[k]),Object.keys(seen));
   await ev(()=>{p=ma(ORG.c,ORG.Y,1);return 1});await pg.waitForTimeout(700);o=await ev(()=>+dt(sb(p,ORG.c),ORG.Y).toFixed(3));ok('confinement dans l\'épaisseur du disque',o<.047,o);
   o=await menu();ok('disque : trois voies',o.n==3,o);await path('cxl');await path('gjc');
   await click('#ent');await fly();o=await ev(()=>({org:ORG&&ORG.i,reg}));ok('sortie du disque',!o.org&&o.reg==1,o)}
  errs.length&&(bad++,console.log('ERREURS '+JSON.stringify(errs).slice(0,900)));await b.close()};
 await run(3,'data');await run(lc,'lys');await run(3,'dya');await run(3,'icd');
 console.log(bad?bad+' ÉCHEC(S)':'TOUT EST BON');process.exit(bad?1:0)})();
