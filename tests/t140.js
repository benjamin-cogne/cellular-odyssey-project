// le nucléole expliqué (nucleolus-lamina.js) et la vue « Naissance d'un ribosome » (ribosome.js).
//  1. dans le nucléole : légende complète sur la fiche d'entrée, fiches des phases (DFC, GC), chaque fiche d'élément commence par ce qu'on voit à l'écran,
//     étiquettes sur les éléments proches, toutes les particules dessinées enregistrées pour le toucher ;
//  2. toucher cinq points de l'écran : à chaque fois la fiche d'un élément ou d'une phase du nucléole, jamais la fiche générale ;
//  3. bouton et écran d'accueil de la vue, sept étapes (billes, étiquettes, légende), gènes du focus mendélien à la première étape, bilan, sortie : retour dans le nucléole ;
//  4. en quittant le nucléole, les étiquettes disparaissent et le bouton aussi.
// Arguments : langue (fr|en), cellule (0 à 3, 0 par défaut)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr',CT=process.argv[3]==null?0:+process.argv[3];
(async()=>{let {b,pg,errs,ev}=await open(CT,{vp:{width:1100,height:620},lang:lang+',mg'});await pg.waitForTimeout(1000);let bad=0,o;
 const ok=(n,c,x)=>{c||bad++;console.log((c?'ok  ':'FAIL')+' '+n+(x==null?'':' : '+JSON.stringify(x)))},click=s=>pg.evaluate(s=>{let e=document.querySelector(s);e&&e.click();return!!e},s),vis=/^(À l'écran|On screen)/;
 await ev(()=>{reg=2;ct=-1;seenN=1;chV.A=0;chG.n=chR.n=0;let o=NOC;[Lx0,Lx1,Lxc,Lxa].forEach(clr);OC=[];let B=mkNol(o);fin();o.zm=.036;ORG=o;p=B;z=.012;f=nm(sb(NOU[0].U,p));u=pp(f);cf=f;cu=u;vel=0;hT=0;return 1});await pg.waitForTimeout(3500);
 // --- 1. légende, fiches, étiquettes
 o=await ev(()=>({nog:NOG.length,oc:OC.length,leg:I.nolI[1].length,z:['dfcI','gcI'].filter(k=>!I[k]||I[k][1].length<300),v:['fc','rdn','po1','ssu','fbl','dkc','pdf','p60','p40','npm','r5s'].map(k=>I[k][1].slice(0,10)),lab:QL.filter(e=>e.style.display!='none').map(e=>e.textContent)}));
 ok('légende sur la fiche d\'entrée, fiches des phases, « À l\'écran » en tête des onze fiches',o.leg>900&&!o.z.length&&o.v.every(t=>vis.test(t)),{legende:o.leg,debuts:o.v.slice(0,3)});
 ok('étiquettes sur les éléments proches ; particules enregistrées pour le toucher',o.lab.length>=2&&o.nog>6000,{etiquettes:o.lab,particules:o.nog});
 await ev(()=>{let u=NOU[0];p=ma(u.U,nm(sb(p,u.U)),.21);f=nm(sb(u.U,p));u=pp(f);cf=f;cu=u;hT=0;return 1});await pg.waitForTimeout(2500);o=await ev(()=>QL.filter(e=>e.style.display!='none').map(e=>e.textContent));
 ok('près d\'une unité : polymérase, transcrits, snoRNP étiquetés',o.length>=4&&o.some(l=>/polym/i.test(l)),o);
 // --- 2. toucher
 let T=[];for(const[x,y]of[[550,250],[800,200],[300,450],[900,500],[640,330]]){await pg.mouse.click(x,y);await pg.waitForTimeout(900);T.push(await ev(()=>[$('it').textContent,$('ix').textContent.slice(0,12)||$('im').textContent.slice(0,12),pinK]))}
 ok('cinq touchers : chaque fois la fiche d\'un élément ou d\'une phase',T.every(t=>/^▸/.test(t[0])&&t[2]&&t[2]!='nol'&&t[2]!='nolI')&&new Set(T.map(t=>t[2])).size>=2,T.map(t=>t[0]));
 // --- 3. naissance d'un ribosome
 o=await ev(()=>$('rbb').style.display+'|'+$('rbb').textContent);ok('bouton « Naissance d\'un ribosome » dans le nucléole',/^block\|◉/.test(o),o);
 await click('#rbb');await pg.waitForTimeout(400);o=await ev(()=>({x:$('pmx').textContent.length,b:[...$('pmo').querySelectorAll('button')].map(b=>b.dataset.r).join()}));ok('écran d\'accueil',o.x>300&&/Sgrb/.test(o.b),o);
 await click('#pmo button[data-r="Sgrb"]');await pg.waitForTimeout(1500);const n=await ev(()=>SX.Q.S.length);let R=[],w=1,mg=[];
 for(let i=0;i<n;i++){await ev(i=>{SX.st=i-1;sxN(1);return 1},i);await pg.waitForTimeout(1500);if(!i)mg=await ev(()=>[...$('pmx').querySelectorAll('.mgr i')].map(e=>e.textContent));await ev(()=>{SX.t=SX.Q.S[SX.st].T*.8;return 1});await pg.waitForTimeout(1100);
   o=await ev(()=>({t:$('pmt').textContent,n:dSx0.n,lab:QL.filter(e=>e.style.display!='none').length,lg:$('pmx').querySelectorAll('.sxl span').length,x:$('pmx').textContent.length}));let g=o.n>50&&o.lab>=2&&o.lg>=3&&o.x>300;g||(w=0);R.push((g?'':'✗ ')+o.t.slice(0,28)+' ['+o.n+' billes, '+o.lab+' étiquettes]');
   if(i==0||i==3)await pg.screenshot({path:'rb_'+lang+'_'+i+'.png'})}
 ok('sept étapes : billes, étiquettes, légende, texte',n==7&&w,R);ok('focus mendélien à la première étape',mg.includes('TCOF1'),mg);
 await ev(()=>{sxN(1);return 1});await pg.waitForTimeout(900);o=await ev(()=>({t:$('pmt').textContent,x:$('pmx').textContent.length,n:dSx0.n}));ok('bilan',/bilan|summary/i.test(o.t)&&o.x>250&&o.n>50,o);
 await click('#pmo button[data-r="Sq"]');await pg.waitForTimeout(2500);o=await ev(()=>({sx:!!SX,org:ORG&&ORG.i,lab:QL.filter(e=>e.style.display!='none').length,btn:$('rbb').style.display}));ok('sortie de la vue : retour dans le nucléole, étiquettes et bouton revenus',!o.sx&&o.org=='nol'&&o.lab>=2&&o.btn=='block',o);
 // --- 4. sortie du nucléole
 await click('#ent');for(let i=0;i<40;i++){await pg.waitForTimeout(700);if(await ev(()=>!AP))break}await pg.waitForTimeout(1500);
 o=await ev(()=>({org:ORG&&ORG.i,btn:$('rbb').style.display,lab:QL.filter(e=>e.style.display!='none').map(e=>e.textContent)}));ok('hors du nucléole : plus de bouton ni d\'étiquettes du nucléole',!o.org&&o.btn!='block'&&!o.lab.some(l=>/60S|40S|snoRNP/.test(l)),o);
 console.log(errs.length?'ERREURS '+JSON.stringify(errs).slice(0,1200):'aucune erreur de page');console.log(bad?bad+' ÉCHEC(S)':'TOUT EST BON');await b.close();process.exit(bad||errs.length?1:0)})();
