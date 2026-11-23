// le chromosome à toutes les échelles (chrfibre.js, nucleosome.js) : près d'un tube, deux mégabases se résolvent en chaîne de nucléosomes (domaines en boucle, cohésine, H1) ;
// continuité de la chaîne ; puis, sur un nucléosome de cette chaîne : repères réels des paires de bases, raccord avec l'ADN de liaison, histones en lobes, en tracé des carbones α,
// puis en atomes avec contacts et molécules d'eau ; fiches à chaque échelle ; retrait de la chaîne en s'éloignant. Le temps avance seul (attentes). Argument : langue (fr|en)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr';
(async()=>{const {b,pg,errs,ev}=await open(0,{vp:{width:1100,height:620},lang});
 await pg.route(/getData\/sequence/,r=>{let u=r.request().url(),st=+u.match(/start=(\d+)/)[1],en=+u.match(/end=(\d+)/)[1],d='';for(let g=st;g<en;g++)d+='acgt'[(Math.imul(g^0x9e3779b9,2654435761)>>>13)&3];r.fulfill({contentType:'application/json',body:JSON.stringify({dna:d})})});await pg.route(/getData\/track|rest\.ensembl/,r=>r.abort());
 console.log('structure',JSON.stringify(await ev(()=>{let N=ncL(),d=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]),X=i=>[N.X[i*3],N.X[i*3+1],N.X[i*3+2]],bl=[],o={atoms:N.X.length/3,residues:N.R.length,chains:NCD.S.map(s=>s.length).join('/'),contacts:N.C.length/4,bridgingWaters:N.W.length/7,minorGrooveArg:Object.keys(N.rg).length};
   N.R.forEach(r=>{for(let i=0;i<r.b.length;i+=2)bl.push(d(X(r.b[i]),X(r.b[i+1])))});o.bondsA=bl.length+' from '+Math.min(...bl).toFixed(2)+' to '+Math.max(...bl).toFixed(2);
   let st=[];for(let k=1;k<147;k++)st.push(d(N.fr[k].o,N.fr[k-1].o));o.riseA='mean '+(st.reduce((a,b)=>a+b)/146).toFixed(2)+', '+Math.min(...st).toFixed(2)+' to '+Math.max(...st).toFixed(2);
   o.c1ToFrameA=Math.max(...[0,40,73,110,146].map(k=>{let f=N.fr[k],q=[0,1,2].map(i=>f.o[i]-2.479*f.ex[i]+5.346*f.ey[i]);return d(q,N.DB[0][k]["C1'"])})).toFixed(2);return o})));
 await ev(()=>{reg=2;ct=-1;chV.A=0;chG.n=chR.n=0;seenN=1;z=.6;vel=0;hT=0;return 1});
 await ev(()=>{let c=-1,i=-1,P;for(let k=4;k<44&&i<0;k++){P=CN[k].p;i=P.findIndex((q,i)=>i>5&&i<P.length-6&&ln(q)>GR+.8&&ds(q,Nc)<Rn-.6);c=k}window.__n=[c,i];window.__d=nm(cr(sb(P[i+1],P[i-1]),[.3,1,.2]));return 1});
 const st=()=>ev(()=>JSON.stringify({window:TG&&TG.auto?TG.lab:'',units:TG&&TG.U?TG.U.length:0,loops:TG&&TG.AN?TG.AN.length:0,detail:AT?(AT.za?'atoms':'ladder'):'',spheres:dQs.n,sticks:dQ.n,ship:$('st').textContent.split('·')[1],card:$('it').textContent.slice(0,64)}));
 const go=async(zz,dist,tag)=>{await ev(([zz,dist])=>{let[c,i]=window.__n,q=CN[c].p[i],d=window.__d;p=ma(q,d,dist);f=ml(d,-1);u=pp(f);cf=f;cu=u;z=zz;vel=0;nT=0;hT=0;return 1},[zz,dist]);await pg.waitForTimeout(1800);console.log(tag,await st())};
 await go(.6,1.4,'tube, 600 nm');await go(.1,.3,'chain, 100 nm');await pg.screenshot({path:'chr_'+lang+'_chain.png'});await go(.04,.13,'chain, 40 nm');
 console.log('chain',JSON.stringify(await ev(()=>{let U=TG.U,o={},mx=0,N=U.filter(W=>W.ty),G=new Map,P=CN[TG.ac].p,ax=[P[TG.ai],P[TG.ai+1],P[TG.ai+2]],far=0;for(let i=1;i<U.length;i++)mx=Math.max(mx,ds(ub(U[i-1],U[i-1].n)[0],U[i].P));o.largestBreakNm=+(mx*1e3).toFixed(1);
   N.forEach(W=>{let k=floor(W.c[0]/.011)+'_'+floor(W.c[1]/.011)+'_'+floor(W.c[2]/.011);G.set(k,(G.get(k)||0)+1);far=Math.max(far,Math.min(...[0,1].map(s=>{let a=ax[s],b=ax[s+1],ab=sb(b,a),t=cl(dt(sb(W.c,a),ab)/dt(ab,ab),0,1);return ds(W.c,ma(a,ab,t))})))});
   o.nucleosomes=N.length;o.crowdedCells=[...G.values()].filter(v=>v>2).length;o.maxFromAxisNm=+(far*1e3).toFixed(0);o.withH1=N.filter(W=>W.h1).length;o.tubeSegmentsHidden=CHS[2];
   let a=TG.U.slice(0,40).map(W=>W.c.map(x=>x.toFixed(5)).join()).join(';');chrFib();o.sameAfterRebuild=a==TG.U.slice(0,40).map(W=>W.c.map(x=>x.toFixed(5)).join()).join(';');return o})));
 console.log('nucleosome in the chain',JSON.stringify(await ev(()=>{let U=TG.U,W=U.filter(W=>W.ty)[1200],j=U.indexOf(W),o={},mx=0;window.__j=j;for(let k=1;k<W.n;k++)mx=Math.max(mx,ds(nuFr(U,j,k-1).o,nuFr(U,j,k).o)*1e4);o.maxStepA=+mx.toFixed(2);
   o.toNextUnitA=+(ds(nuFr(U,j,W.n-1).o,nuFr(U,j+1,0).o)*1e4).toFixed(2);o.linkerTwistDeg=+(W.sp.tw*180/PI).toFixed(1);o.linkerBp=W.n-147;return o})));
 const nu=async(zz,dist,tag)=>{await ev(([zz,dist])=>{let U=TG.U,W=U[window.__j],[P,T,N]=ub(W,70),d=nm(cr(T,N));p=ma(P,d,dist);f=ml(d,-1);u=T.slice();cf=f;cu=u;z=zz;vel=0;nT=0;hT=0;return 1},[zz,dist]);await pg.waitForTimeout(1800);
   console.log(tag,await st(),await ev(()=>AT&&AT.nr?' nearest residue '+NCT[AT.nr.r.c&3]+' '+AT.nr.r.a+AT.nr.r.n:''),'|',await ev(()=>QL.filter(e=>e.style.display!='none'&&e.textContent).map(e=>e.textContent).join(' ; ')))};
 await nu(.02,.03,'nucleosome, 20 nm');await nu(.012,.02,'histones, 12 nm');await nu(.006,.012,'alpha-carbon trace, 6 nm');await pg.screenshot({path:'chr_'+lang+'_histones.png'});await nu(.001,.0035,'atoms, 1 nm');await pg.screenshot({path:'chr_'+lang+'_atoms.png'});
 await ev(()=>{p=ma(p,f,-1.5);z=.6;nT=0;return 1});await pg.waitForTimeout(900);console.log('left',await st(),await ev(()=>' tube back: '+!CHS));
 console.log('errors',JSON.stringify(errs));await b.close()})();
