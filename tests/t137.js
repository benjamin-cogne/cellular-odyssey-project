// endocytose pilotable, destination choisie à l'écran d'accueil, récit de l'influx cardiaque dans le décor (physics.js, goto.js, heartstory.js).
//  1. endocytose : capture au puits, le joueur garde les commandes dans la vésicule (il tourne, il reste confiné), arrivée dans l'endosome en moins de six secondes,
//     fiche et bouton « Quitter l'endosome », confinement dans l'endosome, sortie vers le cytosol ;
//  2. destinations : goT pose le vaisseau près du lieu et entre dans l'organite (liste réduite ; « all » en troisième argument pour toutes), repli quand le lieu n'existe pas ;
//  3. cardiomyocyte : récit en cinq étapes — arrivée contre le sarcolemme, canaux dessinés, battement recalé, sodium qui entre, oscilloscope, fiche du canal, étapes suivantes
//     avec leur bouton d'entrée, lien vers la vue guidée, fin du récit ;
//  4. écran d'accueil : une seconde page démarre avec une destination choisie dans la liste ; les cellules où elle n'existe pas sont estompées.
// Arguments : langue (fr|en), cellule (0 à 3, 3 par défaut), « all »
const {open}=require('./tl.js');const lang=process.argv[2]||'fr',CT=process.argv[3]==null?3:+process.argv[3],ALL=process.argv[4]=='all';
(async()=>{let {b,pg,errs,ev}=await open(CT,{vp:{width:1100,height:620},lang});await pg.waitForTimeout(1000);let bad=0,o,q;
 const ok=(n,c,x)=>{c||bad++;console.log((c?'ok  ':'FAIL')+' '+n+(x==null?'':' : '+JSON.stringify(x)))},click=s=>pg.evaluate(s=>{let e=document.querySelector(s);e&&e.click();return!!e},s),
  land=async n=>{for(let i=0;i<(n||90);i++){await pg.waitForTimeout(700);if(await ev(()=>!AP))break}},ent=()=>ev(()=>$('ent').style.display=='block'?$('ent').textContent:'');
 // --- 1. endocytose
 await ev(()=>{p=ma(e0,v0,.1);f=ml(v0,-1);u=pp(f);cf=f;cu=u;z=.03;vel=.02;LU=0;return 1});for(let i=0;i<25;i++){await pg.waitForTimeout(500);if(await ev(()=>ct>=0))break}for(let i=0;i<8;i++){await pg.waitForTimeout(600);if(await ev(()=>/sicule|vesicle/i.test($('st').textContent)))break}      // l'affichage se rafraîchit par à-coups en rendu logiciel
 o=await ev(()=>({ct:+ct.toFixed(2),st:$('st').textContent.split(' · ')[0],last:CAP[CAP.length-1][0],f:dt(f,v0)}));ok('capture au puits à clathrine ; déroulé raccourci',o.ct>=0&&/sicule|vesicle/i.test(o.st)&&o.last<=11,o);
 await pg.keyboard.down('ArrowLeft');for(let i=0;i<12;i++){await pg.waitForTimeout(600);if(await ev(a=>Math.abs(dt(f,v0)-a)>.03,o.f))break}await pg.keyboard.up('ArrowLeft');q=await ev(()=>({ct:+ct.toFixed(2),f:dt(f,v0),r:+(ds(p,vesC())/rv).toFixed(2),ENP}));
 ok('dans la vésicule, le joueur tourne et reste confiné',q.ct>=0&&Math.abs(q.f-o.f)>.02&&(q.ENP||q.r<1),q);
 await ev(()=>{ct=max(ct,4.55);return 1});for(let i=0;i<20;i++){await pg.waitForTimeout(500);if(await ev(()=>ENP))break}await pg.waitForTimeout(1500);
 o=await ev(()=>({ENP,ct:+ct.toFixed(1),st:$('st').textContent.split(' · ')[0],it:$('it').textContent,ent:$('ent').style.display=='block'?$('ent').textContent:'',n:LY.flatMap(L=>L.ch).filter(h=>h.cap==220)[0].n,r:+(ds(p,ECN)/ERA).toFixed(2),poi}));
 ok('endosome précoce : fiche, bouton de sortie, protons et cargaison animés',o.ENP==1&&/ndosom/.test(o.st)&&/ndosom/.test(o.it)&&/ndosom/.test(o.ent)&&o.n>20&&o.r<1&&o.poi==1,o);
 await ev(()=>{p=ma(ECN,pp(v0),ERA*3);return 1});await pg.keyboard.down('Space');await pg.waitForTimeout(1500);await pg.keyboard.up('Space');
 o=await ev(()=>({r:+(ds(p,ECN)/ERA).toFixed(2),ct:+ct.toFixed(1),ENP}));ok('le vaisseau reste dans l\'endosome tant que le joueur ne sort pas',o.r<1&&o.ENP==1&&o.ct>0,o);
 await pg.screenshot({path:'gs_'+lang+'_'+CT+'_endo.png'});await click('#ent');await land(40);
 o=await ev(()=>({ct,reg,ENP,out:ds(p,ECN)>ERA,A:chV.A,n:LY.flatMap(L=>L.ch).filter(h=>h.cap==220)[0].n}));ok('sortie : cytosol, vaisseau hors de l\'endosome',o.ct<0&&o.reg==1&&!o.ENP&&o.out&&!o.n,o);
 // --- 2. destinations
 const T=CT>2?(ALL?['cyt','mit','rer','gol','lys','nuc','nol','gen','myf','dya','icd']:['mit','gen','dya','icd']):(ALL?['cyt','mit','rer','gol','lys','nuc','nol','gen','myf']:['lys','nol','myf']),R=[];
 for(const k of T){await ev(k=>{ORG=0;OC=[];AP=0;goT(k);return 1},k);await pg.waitForTimeout(1500);await land();
   o=await ev(()=>({reg,org:ORG&&(ORG.pl||ORG.i),ct}));let w=k=='cyt'||k=='myf'&&CT<3?!o.org&&o.reg==1:k=='nuc'||k=='gen'?!o.org&&o.reg==2:o.org==k;w&&o.ct<0||bad++;R.push(k+(w?'':' ✗ '+JSON.stringify(o)))}
 ok('arrivée directe sur chaque destination (organite ouvert, noyau, gène ; repli sur le cytoplasme)',!R.some(x=>/✗/.test(x)),R);
 if(CT==2){await ev(()=>{ORG=0;OC=[];AP=0;goT('nxi');return 1});await pg.waitForTimeout(1500);o=await ev(()=>({d:$('pm').style.display,b:[...$('pmo').querySelectorAll('button')].length}));ok('neurone : la destination « influx nerveux » ouvre son écran d\'accueil',o.d=='block'&&o.b>=2,o);await click('#pmo button[data-r="Sx"]')}
 // --- 3. récit de l'influx cardiaque
 if(CT>2){const chan=()=>ev(()=>{let L=LY.flatMap(L=>L.ch),d=sb(p,Cc),s=dt(d,A0),w=sb(d,ml(A0,s));return{beads:L.filter(h=>h.cap==3400)[0].n,halo:L.filter(h=>h.cap==260)[0].n,ro:+ln(w).toFixed(3),s,face:+dt(f,nm(w)).toFixed(2),z:+z.toFixed(3),t:sT%7,
     st:$('st').textContent.split(' · ')[0],pmt:$('pmt').textContent,osc:osc.style.display,hl:parseInt($('hl').style.top)||0,pmb:$('pm').getBoundingClientRect().bottom|0,cap:$('cap').textContent,it:$('it').textContent,XK:XK&&I[XK][0],poi:POI[poi][0]}}),wv=s=>1+(s+51)/102*.3;
   await ev(()=>{ORG=0;OC=[];AP=0;reg=1;p=ma(Cc,A0,3);z=.1;$('nxb').onclick();return 1});await pg.waitForTimeout(300);
   o=await ev(()=>({t:$('pmt').textContent,b:[...$('pmo').querySelectorAll('button')].map(b=>b.dataset.r)}));ok('écran d\'accueil du récit',o.b.join()=='Yg,Sihb,Sx',o);
   await click('#pmo button[data-r="Yg"]');await pg.waitForTimeout(600);await land();await pg.waitForTimeout(600);o=await chan();let lead=((wv(o.s)-o.t)%7+7)%7;
   ok('étape 1 : le vaisseau est contre le sarcolemme, tourné vers lui',Math.abs(o.ro-8.6)<.15&&o.face>.8&&Math.abs(o.z-.02)<.003&&/^1\/5/.test(o.pmt)&&/sarcolem/i.test(o.st),{ro:o.ro,face:o.face,z:o.z,st:o.st,pmt:o.pmt});
   ok('canaux dessinés, vague recalée pour passer peu après l\'arrivée',o.beads>300&&lead<1.6,{beads:o.beads,vagueDans:+lead.toFixed(2)});
   ok('oscilloscope affiché, fiche du lieu sous le panneau, fiche du canal le plus proche',o.osc=='block'&&o.hl>=o.pmb&&o.XK&&o.it==o.XK,{osc:o.osc,hl:o.hl,pmb:o.pmb,XK:o.XK,it:o.it});
   let rest=o,na;for(let i=0;i<6;i++){await ev(()=>{let s=dt(sb(p,Cc),A0);sT=1+(s+51)/102*.3+.1;return 1});await pg.waitForTimeout(350);na=await chan();if(/Phase 0/.test(na.cap))break}
   await pg.screenshot({path:'gs_'+lang+'_na.png'});await ev(()=>{sT=5.5;return 1});await pg.waitForTimeout(900);rest=await chan();
   ok('au passage de la vague : le sodium entre (plus de billes et de halos qu\'au repos), légende de la phase 0',na.beads>rest.beads+80&&na.halo>rest.halo&&/Phase 0/.test(na.cap),{repos:[rest.beads,rest.halo],vague:[na.beads,na.halo],cap:na.cap.slice(0,60)});
   let S=[];for(let i=1;i<5;i++){await click('#pmo button[data-r="Yn"]');await pg.waitForTimeout(600);await land();await pg.waitForTimeout(1300);o=await chan();let e=await ent();S.push({pmt:o.pmt.slice(0,34),ent:e,osc:o.osc,z:o.z,poi:o.poi.slice(0,30)});
     (new RegExp('^'+(i+1)+'/5')).test(o.pmt)&&o.osc!='block'&&(i==1?/dyad/i.test(e):i==2?/myofibril/i.test(e):i==3?/intercala/i.test(e):o.z>.25)||bad++}
   ok('étapes 2 à 5 : dyade, myofibrille, disque intercalaire (bouton d\'entrée proposé), puis recul',S.length==4,S);
   await click('#pmo button[data-r="Yz"]');await pg.waitForTimeout(1500);o=await ev(()=>({sx:!!SX,st:SX&&SX.st,k:SX&&SX.Q&&SX.Q.st&&SX.Q.st[SX.st]&&SX.Q.st[SX.st].k}));ok('« Zoom arrière jusqu\'au cœur » ouvre la vue guidée à l\'échelle du tissu',o.sx&&o.st>=10,o);
   await ev(()=>{sxEnd();return 1});await pg.waitForTimeout(1200);await click('#pmo button[data-r="Yq"]');await pg.waitForTimeout(600);
   o=await ev(()=>({pm:$('pm').style.display,osc:osc.style.display,hl:$('hl').style.top,beads:LY.flatMap(L=>L.ch).filter(h=>h.cap==3400)[0].n}));ok('fin du récit : panneau fermé, oscilloscope masqué, fiche remise en place',o.pm=='none'&&o.osc=='none'&&!o.hl,o)}
 console.log(errs.length?'ERREURS '+JSON.stringify(errs).slice(0,1200):'aucune erreur de page');await b.close();
 // --- 4. écran d'accueil : destination choisie dans la liste
 {const k=CT>2?'dya':'mit',{b,pg,errs:e2,ev}=await open(CT,{vp:{width:1100,height:620},lang,go:k});await pg.waitForTimeout(2500);for(let i=0;i<90;i++){await pg.waitForTimeout(700);if(await ev(()=>!AP&&!!ORG))break}
   o=await ev(()=>({org:ORG&&(ORG.pl||ORG.i),reg,ct}));o.sel=await pg.evaluate(()=>({n:document.querySelectorAll('#tgs option').length,off:[...document.querySelectorAll('#cc button.off')].map(b=>b.dataset.b?'b':b.dataset.c).join(),lab:document.querySelector('#tgo b').textContent}));
   ok('écran d\'accueil : la destination choisie mène droit à l\'organite ; cellules sans ce lieu estompées',o.org==k&&o.ct<0&&o.sel.n>=13&&(CT>2?/0.*1.*2/.test(o.sel.off):!/[0-3]/.test(o.sel.off)),o);
   e2.length&&(bad++,console.log('ERREURS '+JSON.stringify(e2).slice(0,800)));await b.close()}
 console.log(bad?bad+' ÉCHEC(S)':'TOUT EST BON');process.exit(bad||errs.length?1:0)})();
