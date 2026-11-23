// nucléotides à l'échelle des atomes (nucleotides.js) : géométrie du modèle (liaisons hydrogène, distance C1′–C1′, raccord O3′–P le long de l'hélice, sens de l'hélice),
// vue guidée « Nucléotides et liaisons hydrogène » (dix étapes, formes dessinées, étiquettes), puis vol libre près d'un nucléosome : passage aux atomes sous 4,5 nm,
// taille minimale du vaisseau, fiche et étiquettes de la paire la plus proche, arginine dans le petit sillon, retour à la normale en s'éloignant.
// La séquence est servie par un faux serveur (bases tirées de la position). Argument : langue (fr|en)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr';
(async()=>{const {b,pg,errs,ev}=await open(0,{vp:{width:1100,height:620},lang});
 await pg.route(/getData\/sequence/,r=>{let u=r.request().url(),st=+u.match(/start=(\d+)/)[1],en=+u.match(/end=(\d+)/)[1],d='';for(let g=st;g<en;g++)d+='acgt'[(Math.imul(g^0x9e3779b9,2654435761)>>>13)&3];r.fulfill({contentType:'application/json',body:JSON.stringify({dna:d})})});await pg.route(/getData\/track|rest\.ensembl/,r=>r.abort());
 console.log('model',JSON.stringify(await ev(()=>{let o={},F=q=>q,N={k:1,S(){},T(){}},d=(a,b)=>+ds(a,b).toFixed(2);
   for(let b of'ATGC'){let r=ntPr(F,b,N);o[b+'-'+r.b2]={hbonds:r.hb.length,HtoAcceptor:r.hb.map(h=>d(h[0],h[1])).join('/'),C1C1:d(r.g(0,"C1'"),r.g(1,"C1'"))}}
   o.sources=($('src').innerHTML.match(/— PMID/g)||[]).length+'/'+SRC.length;return o})));
 await ev(()=>{reg=2;ct=-1;chV.A=0;chG.n=chR.n=0;seenN=1;p=[.25,.1,.3];z=.02;f=nm([-.3,0,-1]);u=pp(f);cf=f;cu=u;vel=0;hT=0;return 1});await pg.waitForTimeout(900);
 console.log('button',await ev(()=>$('ntb').style.display+' '+$('ntb').textContent));
 await pg.click('#ntb');await pg.waitForTimeout(300);console.log('intro',await ev(()=>$('pmt').textContent+' | '+[...$('pmo').querySelectorAll('button')].map(b=>b.textContent).join(' | ')));
 await pg.click('#pmo button[data-r="Sgnt"]');await pg.waitForTimeout(400);
 console.log('helix',JSON.stringify(await ev(()=>{let o={},N={k:1e-4,S(){},T(){}},d=(a,b)=>+(ds(a,b)*1e4).toFixed(2),O=sxW([0,0,0]);
   for(let f of'BA'){let R=ntHx([0,0,0],[0,1,0],[0,0,1],'ACGTACGTACGT',0,Object.assign({},N,{f})),p0=sb(R[0].g(0,'P'),O),p1=sb(R[1].g(0,'P'),O),rad=q=>sb(q,ml(SX.Y,dt(q,SX.Y)));
     o[f]={atomsPerNucleotide:ntM('A',f).a.length,O3toP_I:d(R[0].g(0,"O3'"),R[1].g(0,'P')),O3toP_II:d(R[1].g(1,"O3'"),R[0].g(1,'P')),rightHanded:dt(cr(rad(p0),rad(p1)),SX.Y)>0,risePerPair:+((R[11].C[1]-R[0].C[1])/11*10).toFixed(2),radiusP:+(ln(rad(f=='B'?p0:sb(p0,ml(R[0].ex,-.45e-3))))*1e4).toFixed(1)}}return o})));
 const n=await ev(()=>SX.Q.S.length);
 for(let i=0;i<n;i++){await ev(()=>{for(let j=0;j<60;j++)sxS(.05,SX);SX.t=SX.Q.S[SX.st].T*.8;SX.ta=.8;SX.pz=1;sxD();return 1});await pg.waitForTimeout(500);
  console.log(i,await ev(()=>$('pmt').textContent+' | text '+$('pmx').textContent.length+' | spheres '+dSx0.n+' tubes '+dSx1.n+' | '+QL.filter(e=>e.style.display!='none').map(e=>e.textContent).join(' ; ')));
  if(i==3||i==7)await pg.screenshot({path:'nt_'+lang+'_'+i+'.png'});await ev(()=>{SX.pz=0;sxN(1);return 1})}
 console.log('end',await ev(()=>$('pmt').textContent+' | zoom limit '+SX.Q.zn));await ev(()=>sxEnd());
 // vol libre : locus embarqué (USP9X), un nucléosome
 await ev(()=>{goT(OFFL[0]);return 1});await pg.waitForFunction(()=>window.__ev('TG&&TG.U?1:0'),null,{timeout:120000});await pg.waitForTimeout(3000);await ev(()=>{AP=0;return 1});
 const at=async(k,zz,dist,tag,side)=>{await ev(([k,zz,dist,side])=>{let W=TG.U.filter(W=>W.ty)[3],[P,T,N]=ub(W,k),B=cr(T,N),d=side?nm(ad(N,ml(B,.6))):nm(ad(ml(N,-.2),B));p=ma(P,d,dist);f=ml(d,-1);u=T.slice();cf=f;cu=u;z=zz;vel=0;nT=0;hT=0;return 1},[k,zz,dist,side]);await pg.waitForTimeout(1500);
   console.log(tag,JSON.stringify(await ev(()=>({atomic:!!(AT&&AT.za),spheres:dQs.n,sticks:dQ.n,ship:$('st').textContent.split('·')[1],pair:AT&&AT.np?AT.np.b+'-'+AT.np.b2+(AT.np.kn?'':' (unknown)'):'',card:$('it').textContent,button:$('ntb').style.display,labels:QL.filter(e=>e.style.display!='none'&&e.textContent).map(e=>e.textContent).join(' ; ')}))))};
 await at(40,.006,.012,'6 nm',1);await at(40,.003,.006,'3 nm',1);await at(40,.0012,.0032,'1.2 nm',1);await at(40,.0003,.0018,'asked 0.3 nm',1);
 const ka=await ev(()=>{let W=TG.U.filter(W=>W.ty)[3];for(let k=20;k<120;k++)if(cos((W.g+k)*.5984+1.15+PI)>.955&&(k/10.5|0)%3!=2)return k;return -1});
 await at(ka,.0008,.0024,'arginine site',0);await pg.screenshot({path:'nt_'+lang+'_flight.png'});
 await ev(()=>{p=ma(p,f,-.3);nT=0;hT=0;return 1});await pg.waitForTimeout(900);console.log('away',JSON.stringify(await ev(()=>({AT:!!AT,spheres:dQs.n,z,labels:QL.filter(e=>e.style.display!='none'&&e.textContent).length}))));
 console.log('errors',JSON.stringify(errs));await b.close()})();
