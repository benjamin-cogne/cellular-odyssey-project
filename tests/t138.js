// la cellule au travail (life.js) : processus animés dans le décor.
//  1. dans le cytoplasme, sans rien ouvrir : le bouton « ✺ La cellule au travail » est proposé, des billes sont dessinées, les halos signalent les sites ;
//  2. liste : un bouton par processus (6 dans l'érythroblaste, 8 dans l'hépatocyte, 7 dans le neurone, 5 dans le cardiomyocyte), chacun avec sa fiche ;
//  3. pour chaque processus : le vaisseau y est conduit, le panneau, le repère ◎ et les étiquettes suivent, des billes sont dessinées près du site,
//     le joueur a les commandes ; tout près d'un acteur, la fiche du processus s'affiche quand le panneau est fermé ;
//     (focus mendélien activé : le panneau du premier processus cite ses gènes) ;
//  4. fermeture : panneau fermé, fiche du lieu remise en place ; dans un organite ou une vue guidée, rien n'est dessiné ;
//  5. écran d'accueil : la destination « La cellule au travail » ouvre la liste.
// Arguments : langue (fr|en), cellule (0 à 3, 1 par défaut)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr',CT=process.argv[3]==null?1:+process.argv[3];
(async()=>{let {b,pg,errs,ev}=await open(CT,{vp:{width:1100,height:620},lang:lang+',mg'});await pg.waitForTimeout(1000);let bad=0,o;
 const ok=(n,c,x)=>{c||bad++;console.log((c?'ok  ':'FAIL')+' '+n+(x==null?'':' : '+JSON.stringify(x)))},click=s=>pg.evaluate(s=>{let e=document.querySelector(s);e&&e.click();return!!e},s),
  land=async()=>{for(let i=0;i<90;i++){await pg.waitForTimeout(700);if(await ev(()=>!AP))break}},
  st=()=>ev(()=>{let L=LY.flatMap(L=>L.ch);return{beads:L.filter(h=>h.cap==7200)[0].n,halo:L.filter(h=>h.cap==700)[0].n,lab:QL.filter(e=>e.style.display!='none').map(e=>e.textContent),XK,it:$('it').textContent,pmt:$('pmt').textContent,pm:$('pm').style.display,poi:POI[poi][0],hl:$('hl').style.top,z,AP:!!AP}});
 // --- 1. ambiance, sans rien ouvrir
 await ev(()=>{reg=1;ct=-1;ENP=0;chV.A=0;chG.n=chR.n=0;p=ma(ECN,v0,-ERA-.14);f=ml(v0,-1);u=pp(f);cf=f;cu=u;z=.3;vel=0;return 1});await pg.waitForTimeout(1500);for(let i=0;i<12;i++){await pg.waitForTimeout(700);if(await ev(()=>$('lfb').style.display=='block'))break}o=await st();o.btn=await ev(()=>$('lfb').style.display+'|'+$('lfb').textContent);
 ok('dans le cytoplasme : bouton proposé, billes et halos dessinés sans rien ouvrir',/^block\|✺/.test(o.btn)&&o.beads>20&&o.halo>0,{btn:o.btn,beads:o.beads,halo:o.halo});
 // --- 2. liste
 await click('#lfb');await pg.waitForTimeout(400);o=await ev(()=>({t:$('pmt').textContent,b:[...$('pmo').querySelectorAll('button')].map(b=>b.dataset.r+':'+b.textContent),bad:Object.keys(I).filter(k=>/^lf\w{3}$/.test(k)&&!(I[k][0].length>5&&I[k][1].length>250&&!/undefined/.test(I[k][1])))}));
 const n=o.b.filter(x=>/^L\d/.test(x)).length;ok('liste des processus de la cellule ; fiches complètes',n==[6,8,7,5][CT]&&!o.bad.length&&(CT<2||/^(Yg|Lz)/.test(o.b[0])),o.b.map(x=>x.slice(0,40)));
 // --- 3. chaque processus
 let R=[];for(let i=0;i<n;i++){await ev(i=>{lfGo(i);return 1},i);await pg.waitForTimeout(600);await land();await pg.waitForTimeout(1600);o=await st();
   let w=!o.AP&&new RegExp('^'+(i+1)+'/'+n+' · ').test(o.pmt)&&o.pm!='none'&&o.pmt.slice(o.pmt.indexOf('· ')+2,o.pmt.indexOf('· ')+20)==o.poi.slice(0,18)&&o.beads>8&&o.lab.length>0&&parseInt(o.hl)>60;w||bad++;R.push((w?'':'✗ ')+o.pmt.slice(0,30)+' ['+o.beads+' billes, '+o.lab.length+' étiquettes'+(w?'':', '+JSON.stringify(o).slice(0,200))+']');
   if(i==0){await pg.screenshot({path:'lf_'+lang+'_'+CT+'.png'});let g=await ev(()=>[...$('pmx').querySelectorAll('.mgr i')].map(e=>e.textContent));ok('focus mendélien : gènes du premier processus dans le panneau',g.length>0,g);
     // tout près du site, panneau fermé : la fiche du processus remplace celle du lieu
     await ev(()=>{$('pm').style.display='none';LFS=0;return 1});await pg.keyboard.down('ArrowUp');await pg.waitForTimeout(300);await pg.keyboard.up('ArrowUp');await pg.waitForTimeout(1500);let c=await st();
     ok('près d\'un acteur, panneau fermé : fiche du processus',/^lf/.test(c.XK||'')&&c.it==o.pmt.slice(o.pmt.indexOf('· ')+2),{XK:c.XK,it:c.it})}}
 ok('chaque processus : vol, panneau, repère, billes, étiquettes',!R.some(x=>/^✗/.test(x)),R);
 // --- 4. fermeture, organite
 await ev(()=>{lfGo(0);AP=0;return 1});await pg.waitForTimeout(500);await click('#pmo button[data-r="Lq"]');await pg.waitForTimeout(700);o=await st();ok('« Quitter » : panneau fermé, fiche remise en place',o.pm=='none'&&!o.hl,{pm:o.pm,hl:o.hl});
 await ev(()=>{let m=CY.find(o=>o.i=='mit'&&o.e);p=ma(m.c,m.X,m.s[0]+.04);f=ml(m.X,-1);u=pp(f);cf=f;cu=u;z=.03;vel=0;return 1});await pg.waitForTimeout(1500);await click('#ent');await land();await pg.waitForTimeout(800);
 o=await st();o.org=await ev(()=>ORG&&ORG.i);o.btn=await ev(()=>$('lfb').style.display);ok('dans un organite : rien n\'est dessiné, bouton masqué',o.org=='mit'&&!o.beads&&o.btn=='none',{org:o.org,beads:o.beads,btn:o.btn});
 console.log(errs.length?'ERREURS '+JSON.stringify(errs).slice(0,1200):'aucune erreur de page');await b.close();
 // --- 5. écran d'accueil
 {const {b,pg,errs:e2,ev}=await open(CT,{vp:{width:1100,height:620},lang,go:'lif'});await pg.waitForTimeout(3500);o=await ev(()=>({reg,pm:$('pm').style.display,b:[...$('pmo').querySelectorAll('button')].filter(b=>/^L\d/.test(b.dataset.r)).length}));
   ok('écran d\'accueil : la destination « La cellule au travail » ouvre la liste',o.reg==1&&o.pm=='block'&&o.b==n,o);e2.length&&(bad++,console.log('ERREURS '+JSON.stringify(e2).slice(0,800)));await b.close()}
 console.log(bad?bad+' ÉCHEC(S)':'TOUT EST BON');process.exit(bad||errs.length?1:0)})();
