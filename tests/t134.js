// le cardiomyocyte (cellule 3, gène TNNC1 : cardio.js, heartbeat.js) : démarrage, tissu (capillaires, cellules voisines), intérieur (myofibrilles, zones du sarcomère,
// dyades, disque intercalaire), gène et protéine, puis la vue « influx cardiaque » : ses 18 étapes, les courbes (potentiel d'action, électrocardiogramme),
// la construction du cœur (ventricules, oreillettes, vaisseaux, réseau de Purkinje, billes de la vague), le bilan et la sortie. Argument : langue (fr|en)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr';
(async()=>{const {b,pg,errs,ev}=await open(3,{vp:{width:1100,height:620},lang});await pg.waitForTimeout(1200);let bad=0;const ok=(n,c,x)=>{c||bad++;console.log((c?'ok  ':'FAIL')+' '+n+(x==null?'':' : '+JSON.stringify(x)))};
 // --- la cellule et son tissu
 let o=await ev(()=>{let n=k=>CY.filter(c=>c.i==k).length;return{CT,gene:G.sy,L:G.L,cds:G.ce-G.cs,exons:G.ex.length,shapes:SH.length,vessels:VS.length,dyads:CDL.length,myf:n('myf'),ttu:n('ttu'),icd:n('icd'),gjn:n('gjn'),
   tis:['tcm','tfb','tmc','tsy','tcl','tpc'].map(k=>OX.filter(o=>o.i==k).length),cards:['myf','saa','sai','saz','ttu','dya','icd','gjn','dsm','fad','cos','cvl','sel','tcm','tfb','tcl','tmc','tsy','tvs','ttc'].filter(k=>!I[k]||!I[k][1]),
   region:RL,nxb:$('nxb').textContent}});
 ok('cellule 3, gène TNNC1',o.CT==3&&o.gene=='TNNC1'&&o.L==2942&&o.exons==6,o);ok('région codante : 161 codons et un codon stop',o.cds==2741);
 ok('structures de la cellule',o.myf>100&&o.dyads>300&&o.ttu>50&&o.icd==2&&o.gjn>20,[o.myf,o.dyads,o.ttu,o.icd,o.gjn]);ok('tissu : voisines, fibroblastes, macrophage, fibre sympathique, collagène, péricyte',o.tis.every(n=>n>0),o.tis);
 ok('toutes les fiches existent',!o.cards.length,o.cards);ok('trois capillaires',o.vessels==3);
 o=await ev(()=>{let q=G.q,c='';for(let[a,b]of G.ex)c+=q.slice(G.up+a,G.up+b);c=c.slice(G.cs,c.length-(G.L-G.ce));return{len:c.length,atg:c.slice(0,3),stop:c.slice(-3),gt:G.ex.slice(0,-1).every(e=>q.substr(G.up+e[1],2)=='GT'),ag:G.ex.slice(1).every(e=>q.substr(G.up+e[0]-2,2)=='AG'),vc:Object.keys(G.vc)}});
 ok('séquence : ATG, stop, sites GT/AG, 486 nt',o.len==486&&o.atg=='ATG'&&/TAA|TAG|TGA/.test(o.stop)&&o.gt&&o.ag,o);ok('variants c.23 et c.435',o.vc.join()=='23,435');
 // --- régions et fiches à l'intérieur d'un bras
 const at=async(q,dir,zz)=>{await ev(([q,dir,zz])=>{let X=A0,Y=v0,Z=nm(cr(A0,v0)),o=(a,b,c)=>ad(Cc,ad(ad(ml(X,a),ml(Y,b)),ml(Z,c)));p=o(...q);f=nm(sb(o(...dir),p));u=nm(cr(cr(f,Y),f));cf=f;cu=u;z=zz;vel=0;reg=1;ct=-1;AP=0;hT=0;chV.A=0;chG.n=chR.n=0;return 1},[q,dir,zz]);await pg.waitForTimeout(1300);
   return ev(()=>({st:$('st').textContent.split(' · ')[0],it:$('it').textContent}))};
 o=await at([30,0,3],[20,0,0],.5);ok('bras, vaisseau de 500 nm : région « Myofibrilles »',/Myofibril/.test(o.st),o);
 o=await at([14,1.2,.6],[16,0,0],.06);ok('vaisseau de 60 nm : zone du sarcomère',/Sarcom/.test(o.st)&&/Bande|band|Strie|disc/i.test(o.it),o);
 o=await at([2,5.5,1],[0,0,0],.3);ok('centre : zone périnucléaire',/nucl/i.test(o.st),o);
 o=await ev(()=>({mg:!!(MGC[3]&&MGC[3].sai&&MGC[3].dsm&&MGX.hb&&MGX.hb.ph3&&MGX.hb.tnc),n:Object.keys(MGX.hb||{}).length}));ok('focus mendélien : fiches et étapes de la vue',o.mg&&o.n>=12,o);
 // --- la vue « influx cardiaque »
 await ev(()=>{$('nxb').onclick();return 1});await pg.waitForTimeout(300);await pg.evaluate(()=>document.querySelector('#pmo button[data-r="Sihb"]').click());await pg.waitForTimeout(300);      // le bouton ouvre d'abord le récit dans la cellule (t137) ; « Vue guidée » mène ici
 o=await ev(()=>({t:$('pmt').textContent,x:$('pmx').textContent.length,b:$('pmo').textContent}));ok('écran d\'accueil de la vue',o.x>300&&/Commencer|Start|Begin/.test(o.b),o.t);
 await ev(()=>{sxGo('hb');return 1});await pg.waitForTimeout(1500);
 o=await ev(()=>{let Q=SXQ.hb,ch=LY.filter(L=>L.sx).flatMap(L=>L.ch).filter(h=>h.m&&h.m.length==16).length;return{steps:Q.S.length,texts:Q.T.length,keys:Q.S.map(S=>S.k).join(),solo:SX.solo,movable:ch}});
 ok('18 étapes, 18 textes',o.steps==18&&o.texts==18,o.keys);ok('le cœur est construit (blocs mobiles des ventricules et des oreillettes)',o.movable>=8,o.movable);
 let seen=[];
 for(let s=0;s<18;s++){await ev(s=>{SX.st=s-1;sxN(1);return 1},s);await pg.waitForTimeout(500);await ev(()=>{let S=SX.Q.S[SX.st];if(SX.zt&&!S.zf)z=SX.zt;SX.Cc=SX.Ct.slice();return 1});await pg.waitForTimeout(900);
   o=await ev(()=>{let L=LY.filter(L=>L.sx).flatMap(L=>L.ch),dyn=L.filter(h=>h.cap&&h.n).reduce((a,h)=>a+h.n,0),st=L.filter(h=>!h.cap&&h.A>0&&h.n).length;
     return{t:$('pmt').textContent,x:$('pmx').textContent.length,dyn,st,lab:[...document.querySelectorAll('.ql')].filter(e=>e.style.display!='none').length,osc:getComputedStyle($('osc')).display,z}});
   seen.push(o.dyn+'/'+o.st+'/'+o.lab);if(s==15)ok('cœur de verre : billes de la vague',o.dyn>1500,o.dyn);ok('étape '+(s+1)+' : '+o.t.replace(/^\d+\/18 · /,''),o.x>200&&o.dyn>20&&(s<12?o.st==0:o.st>0)&&(s==11||s==12||o.lab>2)&&(o.osc=='block')==(s!=11&&s!=12),{dyn:o.dyn,fixes:o.st,noms:o.lab,osc:o.osc})}
 // courbes : potentiel d'action et électrocardiogramme
 o=await ev(()=>{let S=SXQ.hb.S,f=S[0].o.f,e=S[17].o.f,mx=0,tm=0,apd=0,r=0,tr=0;for(let t=-10;t<400;t+=.25){let v=f(t);if(v>mx)mx=v,tm=t;if(t>50&&!apd&&v<-85+.1*(mx+85))apd=t}for(let t=0;t<860;t++){let v=e(t);if(v>r)r=v,tr=t}
   return{rest:f(-5),peak:+mx.toFixed(1),tPeak:tm,apd90:apd,plateau:+f(150).toFixed(1),R:+r.toFixed(2),tR:tr,P:+e(62).toFixed(2),T:+e(457).toFixed(2),iso:+e(330).toFixed(3)}});
 ok('potentiel d\'action : repos −85 mV, sommet positif en moins de 5 ms, plateau, durée 250–400 ms',o.rest==-85&&o.peak>15&&o.peak<45&&o.tPeak<5&&o.plateau>-10&&o.apd90>250&&o.apd90<400,o);
 ok('électrocardiogramme : P, QRS, T ; PR ≈ 160 ms ; ligne de base au segment ST',o.R>.9&&o.tR>170&&o.tR<210&&o.P>.08&&o.T>.2&&Math.abs(o.iso)<.02,o);
 o=await ev(()=>({fixed:LY.filter(L=>L.sx).flatMap(L=>L.ch).filter(h=>!h.cap&&h.m).reduce((a,h)=>a+h.n,0)}));ok('pièces du cœur (coronaires, réseau de Purkinje)',o.fixed>1500,o);
 // bilan, puis sortie
 await ev(()=>{SX.st=17;sxN(1);return 1});await pg.waitForTimeout(900);o=await ev(()=>({t:$('pmt').textContent,b:$('pmo').textContent}));ok('bilan',/bilan|summary/i.test(o.t),o.t);
 await ev(()=>{sxEnd();return 1});await pg.waitForTimeout(600);o=await ev(()=>({sx:!!SX,vis:LY.filter(L=>L.sx).flatMap(L=>L.ch).filter(h=>!h.cap&&h.m instanceof Float32Array&&h.A>0).length,osc:getComputedStyle($('osc')).display,hud:$('hl').style.display}));
 ok('sortie : le cœur disparaît, le pilotage revient',!o.sx&&!o.vis&&o.osc=='none'&&o.hud=='flex',o);
 console.log('étapes (animés/fixes/noms) :',seen.join(' '));console.log(errs.length?'ERREURS '+JSON.stringify(errs).slice(0,1200):'aucune erreur de page');console.log(bad?bad+' ÉCHEC(S)':'TOUT EST BON');await b.close();process.exit(bad||errs.length?1:0)})();
