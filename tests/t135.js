// l'intérieur d'une myofibrille (sarcomere.js) : bouton d'entrée près d'une myofibrille, construction du sarcomère (filaments, colliders), confinement entre les stries Z,
// fiches selon la zone, détail animé avec et sans calcium, quatre voies de réactions (bilan des atomes lourds de chaque étape, menu, une voie pas à pas en mode expert,
// lignes du focus mendélien), puis sortie vers le cytoplasme. Argument : langue (fr|en)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr';
(async()=>{const {b,pg,errs,ev}=await open(3,{vp:{width:1100,height:620},lang:lang+',mg'});await pg.waitForTimeout(1200);let bad=0,o;const ok=(n,c,x)=>{c||bad++;console.log((c?'ok  ':'FAIL')+' '+n+(x==null?'':' : '+JSON.stringify(x)))},
  dyn=()=>ev(()=>LY.flatMap(L=>L.ch).filter(h=>h.cap==5200&&h.L.rg==1||h.cap==4600).map(h=>h.n)),click=s=>pg.evaluate(s=>{let e=document.querySelector(s);e&&e.click();return!!e},s);
 // --- données : molécules et étapes des quatre voies
 o=await ev(()=>{let at=s=>{let o={};for(let w of s.split(' ')){let[x,y]=w.split('*'),k=y||x,n=y?+x:1,m=MOL[k];m[2]=m[2]||rxL(m[1]);for(let a of m[2].a)if(a.el!='H')o[a.el]=(o[a.el]||0)+n}return o};
   return['xbc','tnn','ckm','pka'].map(k=>{let P=RXP.find(P=>P[0]==k);return k+':'+P[6].length+':'+P[6].map((s,i)=>{let a=at(s[1]),c=at(s[2]),d=[...new Set(Object.keys(a).concat(Object.keys(c)))].filter(e=>a[e]!=c[e]).map(e=>e+(a[e]||0)+'→'+(c[e]||0));return d.length?i+'('+d+')':''}).filter(x=>x).join(' ')+':'+P[6].filter(s=>s.length!=9).length+':'+(P[1]=='myf'&&P[2]==3&&!!RXW[k])})});
 ok('quatre voies, étapes équilibrées (atomes lourds et groupes), neuf champs par étape',o.join('|')=='xbc:4::0:true|tnn:3::0:true|ckm:3::0:true|pka:4::0:true',o);
 o=await ev(()=>({cards:['myfI','thk','czn','mbd','mck','thn','thi','zdk','xbr','tnx'].filter(k=>!I[k]||I[k][1].length<150),mg:['thk','czn','thn','thi','zdk','tnx'].filter(k=>!(MGC[3]&&MGC[3][k])),rx:Object.keys(MGR.xbc||{}).length+Object.keys(MGR.tnn||{}).length+Object.keys(MGR.pka||{}).length}));
 ok('fiches du sarcomère',!o.cards.length,o.cards);ok('focus mendélien : fiches et étapes des voies',!o.mg.length&&o.rx>=5,o);
 // --- approche d'une myofibrille : le bouton d'entrée apparaît même si le réticulum est plus proche
 await ev(()=>{let M=CY.filter(o=>o.i=='myf'),m=M[Math.floor(M.length/2)],Y=nm(sb(m.b,m.a)),X=pp(Y),c=ma(m.a,Y,9.9);p=ma(c,X,.66);f=ml(X,-1);u=Y;cf=f;cu=u;z=.05;vel=0;reg=1;ct=-1;AP=0;hT=0;chV.A=0;chG.n=chR.n=0;return 1});await pg.waitForTimeout(1500);
 o=await ev(()=>({d:$('ent').style.display,t:$('ent').textContent,near:nI&&nI.i}));ok('bouton « Entrer dans la myofibrille »',o.d=='block'&&/myofibril/i.test(o.t),o);
 await click('#ent');for(let i=0;i<45;i++){await pg.waitForTimeout(900);if(await ev(()=>!AP))break}
 o=await ev(()=>{let n=k=>OC.filter(c=>c.i==k).length;return{org:ORG&&ORG.i,z:+z.toFixed(4),zm:ORG.zm,thick:n('mbd'),thin:n('thn')/2,czn:n('czn'),ck:n('mck'),xbr:n('xbr'),tnx:n('tnx'),tubes:LY.flatMap(L=>L.ch).filter(h=>!h.cap&&h.L.vz==110).reduce((a,h)=>a+h.n,0),
   st:$('st').textContent.split(' · ')[0],ent:$('ent').textContent,rxb:$('rxb').style.display,axial:+Math.abs(dt(sb(p,ORG.c),ORG.Y)).toFixed(2)}});
 ok('entré dans le sarcomère',o.org=='myf'&&Math.abs(o.z-.006)<.001&&/Sarcom/.test(o.st)&&/myofibril/i.test(o.ent)&&o.rxb=='block',o);
 ok('réseau : deux filaments fins pour un épais, zone C, créatine kinase, repères',o.thick>250&&o.thick<320&&Math.abs(o.thin/o.thick-2)<.25&&o.czn==2*o.thick&&o.ck>50&&o.xbr>20&&o.tnx>20&&o.tubes>5000,o);
 // --- fiches selon l'endroit, détail animé, calcium
 const at=async(y,r,zz,t)=>{await ev(([y,r,zz,t])=>{let o=ORG;p=ad(o.c,ad(ml(o.Y,y),ml(o.X,r)));f=nm(ad(o.Y,ml(o.X,.3)));u=nm(cr(cr(f,o.Z),f));cf=f;cu=u;z=zz;vel=0;if(t!=null)sT=t;return 1},[y,r,zz,t]);await pg.waitForTimeout(1400);return ev(()=>nI&&I[nI.i]?I[nI.i][0]:$('it').textContent)};
 let seen={};for(const[y,r]of[[.45,.004],[.45,.021],[.01,.004],[.012,.024],[.7,.004],[.9,.021],[1.03,.021],[.3,.004]])seen[await at(y,r,.006,.2)]=1;
 ok('fiches : filament épais, zone C, bande M, filament fin, bande I, strie Z',Object.keys(seen).length>=6,Object.keys(seen));
 await at(.45,.01,.008,.3);let d0=await dyn();await at(.45,.01,.008,2.8);let d1=await dyn();
 ok('détail animé près du vaisseau ; le calcium déplie des têtes de myosine (plus de bras de levier)',d0[0]>800&&d0[1]>400&&d1[1]>d0[1]+20&&d1[0]>d0[0],{repos:d0,calcium:d1});
 await at(.45,.01,.03,.3);await ev(()=>{z=.031;return 1});await pg.waitForTimeout(700);ok('le vaisseau reste sous 30 nm',(await ev(()=>z))<=.0301);
 await ev(()=>{p=ma(ORG.c,ORG.Y,3);return 1});await pg.waitForTimeout(700);o=await ev(()=>+dt(sb(p,ORG.c),ORG.Y).toFixed(3));ok('confinement : la strie Z arrête le vaisseau',o<1.05&&o>.9,o);
 await ev(()=>{p=ma(ORG.c,ORG.X,2);return 1});await pg.waitForTimeout(700);o=await ev(()=>+ln(sb(p,ORG.c)).toFixed(3));ok('confinement : le bord de la myofibrille aussi',o<.4,o);
 // --- réactions : menu, puis le cycle du pont actine–myosine en mode expert
 await at(.42,.01,.006,.3);await ev(()=>{rxMenu();return 1});await pg.waitForTimeout(300);o=await ev(()=>({t:$('pmt').textContent,b:[...$('pmo').querySelectorAll('button')].map(b=>b.textContent)}));
 ok('menu des réactions du sarcomère',o.b.length>=5&&!/undefined/.test(o.t),o.t+' : '+o.b.join(' / '));
 for(const P of['xbc','ckm']){await ev(()=>{rxMenu();return 1});await click('#pmo button[data-r="p'+P+'"]');await pg.waitForTimeout(200);await click('#pmo button[data-r="l1'+P+'"]');await pg.waitForTimeout(600);const n=await ev(()=>RX.P[6].length);let T=[];
   for(let k=0;k<n;k++){await pg.waitForTimeout(3200);o=await ev(()=>({t:$('pmt').textContent,mol:QL.filter(e=>e.style.display!='none').length,mg:[...$('pmx').querySelectorAll('.mgr i')].map(e=>e.textContent).join(' '),sp:LY.flatMap(L=>L.ch).filter(h=>h.L.rx&&h.cap).reduce((a,h)=>a+h.n,0)}));T.push(o.t.slice(0,34)+' ['+o.mol+' noms, '+o.sp+' atomes'+(o.mg?', 🧬 '+o.mg:'')+']');o.mol>1&&o.sp>10||bad++;
     if(P=='xbc'&&k==2)await pg.screenshot({path:'sm_'+lang+'_xbc.png'});await click('#pmo button[data-r="ok"]');await pg.waitForTimeout(250)}
   await pg.waitForTimeout(1200);o=await ev(()=>$('pmt').textContent);ok('voie '+P+' pas à pas',n>=3&&T.length==n,T.concat('fin : '+o));await click('#pmo button[data-r="q"]');await pg.waitForTimeout(400)}
 // --- sortie
 await click('#ent');for(let i=0;i<45;i++){await pg.waitForTimeout(900);if(await ev(()=>!AP))break}
 o=await ev(()=>({org:ORG&&ORG.i,reg,st:$('st').textContent.split(' · ')[0],dyn:LY.flatMap(L=>L.ch).filter(h=>h.cap==4600).map(h=>h.n)[0]}));ok('sortie vers le cytoplasme',!o.org&&o.reg==1&&!o.dyn,o);
 console.log(errs.length?'ERREURS '+JSON.stringify(errs).slice(0,1200):'aucune erreur de page');console.log(bad?bad+' ÉCHEC(S)':'TOUT EST BON');await b.close();process.exit(bad||errs.length?1:0)})();
