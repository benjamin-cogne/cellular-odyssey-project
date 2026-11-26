// le noyau relu (nucleus.js, territories.js) et la vue « Mitose et caryotype » (mitosis.js).
//  1. données : bandes G embarquées (24 chromosomes, 862 bandes), nombre de chromosomes (46, ou 92 dans l'hépatocyte tétraploïde, noyau plus grand),
//     compartiment A/B de chaque mégabase (environ moitié-moitié), aucun nœud hors du noyau, plaques d'hétérochromatine sous la lamina et autour du nucléole,
//     X inactif contre le nucléole dans le neurone ;
//  2. en vol dans le noyau : gros vaisseau → nuages des territoires et étiquettes « chr N » ; petit vaisseau → fibre proche ; idéogramme affiché avec son texte ;
//     fiche du chromosome avec son compartiment ; fiches du noyau propres à la cellule ;
//  3. érythroblaste seulement : bouton, écran d'accueil, onze étapes (chromosomes dessinés, microtubules aux étapes du fuseau), les trois caryotypes
//     (47, 45 et 46 chromosomes), une réponse juste et une fausse, sortie de la vue.
// Arguments : langue (fr|en), cellule (0 à 3, 0 par défaut)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr',CT=process.argv[3]==null?0:+process.argv[3];
(async()=>{let {b,pg,errs,ev}=await open(CT,{vp:{width:1100,height:620},lang});await pg.waitForTimeout(1000);let bad=0,o;
 const ok=(n,c,x)=>{c||bad++;console.log((c?'ok  ':'FAIL')+' '+n+(x==null?'':' : '+JSON.stringify(x)))},click=s=>pg.evaluate(s=>{let e=document.querySelector(s);e&&e.click();return!!e},s);
 // --- 1. données
 o=await ev(()=>{let n=CN.reduce((a,N)=>a+N.p.length,0);return{bd:BD.length,nb:BD.reduce((a,l)=>a+l.length,0),cn:CN.length,Rn,B:+(CN.reduce((a,N)=>a+N.B.filter(x=>x).length,0)/n).toFixed(2),out:CN.reduce((a,N)=>a+N.p.filter(q=>ds(q,Nc)>Rn-.1).length,0),
   lad:NU.filter(o=>o.i=='lad').length,nhc:NU.filter(o=>o.i=='nhc').length,xi:CN.filter(N=>N.xi).length,xn:+min(...CN.filter(N=>N.xi).map(N=>ds(N.g,NOL))).toFixed(2),far:LY.filter(L=>L.nl).reduce((a,L)=>a+L.ch.reduce((s,h)=>s+h.n,0),0),cards:['nhc','lad','chr','nuc'].filter(k=>!I[k]||I[k][1].length<200)}});
 ok('bandes G embarquées, nombre de chromosomes et taille du noyau selon la cellule',o.bd==24&&o.nb==862&&o.cn==(CT==1?92:46)&&o.Rn==(CT==1?5:4)&&o.xi==(CT==1?2:1),{bandes:o.nb,chromosomes:o.cn,Rn:o.Rn});
 ok('compartiments A et B, nœuds dans le noyau, plaques sous la lamina et autour du nucléole, fiches',o.B>.4&&o.B<.6&&!o.out&&o.lad>15&&o.nhc>3&&o.far>8000&&!o.cards.length,o);
 CT==2&&ok('neurone : X inactif contre le nucléole',o.xn<2.3,o.xn);
 // --- 2. en vol
 const at=async(q,zz)=>{await ev(([q,zz])=>{reg=2;ct=-1;ENP=0;chV.A=0;chG.n=chR.n=0;seenN=1;p=ad(Nc,q);z=zz;f=nm(sb(Nc,p));u=pp(f);cf=f;cu=u;vel=0;hT=0;AP=0;return 1},[q,zz]);await pg.waitForTimeout(3000);
   return ev(()=>({lab:QL.filter(e=>e.style.display!='none').map(e=>e.textContent.replace(/​/g,'')),idg:$('idg').style.display,it:$('it').textContent,tx:$('im').textContent+$('ix').textContent,st:$('st').textContent}))};
 o=await at([2.2,1,1.4],.5);ok('gros vaisseau : étiquettes des territoires',o.lab.filter(l=>/^chr /.test(l)).length>=3,o.lab.slice(0,6));
 o=await ev(()=>{let N=CN[4],q=N.p[20],d=nm(sb(q,Nc));p=ma(q,d,-.12);z=.05;f=d;u=pp(f);cf=f;cu=u;hT=0;return 1});await pg.waitForTimeout(3000);
 o=await ev(()=>({idg:$('idg').style.display,it:$('it').textContent,tx:$('ix').textContent||$('inf').textContent,px:(()=>{let g=$('idg').getContext('2d').getImageData(0,0,640,64).data,n=0;for(let i=3;i<g.length;i+=4)n+=g[i]>0;return n})()}));
 ok('près d\'une fibre : idéogramme dessiné, fiche du chromosome avec son compartiment',o.idg=='block'&&o.px>3000&&/Chromosome|chromatin|nucléosome|nucleosome|Hétéro|Hetero|Cohé|Cohe/i.test(o.it),{idg:o.idg,pixels:o.px,it:o.it});
 o=await ev(()=>{let c=cI([4,20,CN[4].p[20]]);return c[1].slice(0,120)});ok('fiche : bande et compartiment',/compartment|compartiment/.test(o),o);
 // --- 3. mitose et caryotype
 if(!CT){await ev(()=>{p=ad(Nc,[1.5,1,1]);z=.2;hT=0;return 1});await pg.waitForTimeout(2200);o=await ev(()=>$('mib').style.display+'|'+$('mib').textContent);ok('bouton « Mitose et caryotype » dans le noyau',/^block\|✂/.test(o),o);
   await click('#mib');await pg.waitForTimeout(400);o=await ev(()=>({t:$('pmt').textContent,x:$('pmx').textContent.length,b:[...$('pmo').querySelectorAll('button')].map(b=>b.dataset.r).join()}));ok('écran d\'accueil de la vue',o.x>300&&/Sgmi/.test(o.b),o);
   await click('#pmo button[data-r="Sgmi"]');await pg.waitForTimeout(1500);const n=await ev(()=>SX.Q.S.length);let R=[],w=1;
   for(let i=0;i<n;i++){await ev(i=>{SX.st=i-1;sxN(1);return 1},i);await pg.waitForTimeout(1500);await ev(()=>{SX.t=SX.Q.S[SX.st].T*.8;return 1});await pg.waitForTimeout(1300);
     o=await ev(()=>{let L=LY.flatMap(L=>L.ch);return{t:$('pmt').textContent,n:L.filter(h=>h.cap==6400)[0].n,c:L.filter(h=>h.cap==2650)[0].n,q:[...$('pmo').querySelectorAll('[data-r^="Sh"]')].length,lg:$('pmx').querySelectorAll('.sxl span').length,k:SX.Q.S[SX.st].k,e:SX.Q.S[SX.st].q}});
     let g=o.n>(o.k=='lop'?900:2000)&&o.lg>=2&&(/^(pmt|met|ana)$/.test(o.k)?o.c>90:1)&&(o.e!=null?o.q==3:!o.q);g||(w=0);R.push((g?'':'✗ ')+o.t.slice(0,26)+' ['+o.n+', '+o.c+']');
     if(i==4||i==7)await pg.screenshot({path:'mi_'+lang+'_'+i+'.png'})}
   ok('onze étapes : chromosomes, fuseau, légendes, questions',n==11&&w,R);
   o=await ev(()=>SX.Q.S.filter(S=>S.q!=null).length);ok('trois caryotypes à lire',o==3,o);
   await click('#pmo button[data-r="Sh0"]');await pg.waitForTimeout(600);o=await ev(()=>({x:$('pmx').textContent.slice(-760),q:[...$('pmo').querySelectorAll('[data-r^="Sh"]')].length}));ok('réponse fausse au troisième caryotype : correction et explication',/✗/.test(o.x)&&/BCR/.test(o.x)&&!o.q,o.x.slice(0,90));
   await ev(()=>{SX.st=7;sxN(1);return 1});await pg.waitForTimeout(1500);await click('#pmo button[data-r="Sh0"]');await pg.waitForTimeout(600);o=await ev(()=>$('pmx').textContent.slice(-330));ok('réponse juste au premier caryotype',/✓/.test(o)&&/21/.test(o),o.slice(0,80));
   await click('#pmo button[data-r="Sq"]');await pg.waitForTimeout(900);o=await ev(()=>({sx:!!SX,n:LY.flatMap(L=>L.ch).filter(h=>h.cap==6400)[0].n,hl:$('hl').style.display,reg}));ok('sortie de la vue',!o.sx&&!o.n&&o.hl=='flex'&&o.reg==2,o)}
 else{o=await ev(()=>$('mib').style.display);ok('hors de l\'érythroblaste : pas de bouton de mitose',o!='block',o)}
 console.log(errs.length?'ERREURS '+JSON.stringify(errs).slice(0,1200):'aucune erreur de page');console.log(bad?bad+' ÉCHEC(S)':'TOUT EST BON');await b.close();process.exit(bad||errs.length?1:0)})();
