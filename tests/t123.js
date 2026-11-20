// états de la chromatine le long du gène : états des trois cellules, perles, ligne du panneau de séquence, bascule vers l'autre état. Argument : langue (fr|en)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr';
(async()=>{for(const ct of[0,1,2]){const {b,pg,errs,ev}=await open(ct,{vp:{width:1100,height:620},lang});
 console.log('cell',ct,JSON.stringify(await ev(()=>({gene:G.sy,states:KMS.map(S=>S.n),nucleosomes:[GP.nu.length,GP.tb.length,LP.nu.length,LP.tb.length],upstream:kmR.filter(r=>r<0).sort((a,b)=>b-a).join(','),beads:dKm.n,cap:dKm.cap,
   badMarks:KMS.flatMap(S=>S.pr.flat().concat(S.en,S.dn,S.up,S.tr(G.L).map(x=>x[2]))).filter(k=>k&&!(MKC[k]&&HXM[k]&&KML[k])),track:KMS[0].tr(G.L).map(x=>x.join(':')).join(' ')}))));
 const at=async(n,i,zz)=>{await ev(a=>{let P=GP.p[UP+a.i];reg=2;ct=-1;chV.A=0;chG.n=chR.n=0;seenN=1;p=ma(P,GP.N[UP+a.i],.02);z=a.z;f=nm(sb(P,p));u=pp(f);cf=f;cu=u;vel=0;hT=0;return 1},{i,z:zz});await pg.waitForTimeout(1400);
   console.log('  '+n,JSON.stringify(await ev(()=>({button:$('csb').style.display+'|'+$('csb').textContent,card:$('it').textContent.slice(0,60),panel:$('sq').textContent.replace(/5′.*3′/,' … ').slice(0,120),beads:dKm.n,transcription:dA.t.A}))));await pg.screenshot({path:'km_'+lang+ct+'_'+n+'.png'})};
 const L=await ev(()=>G.L);await at('tss',60,.012);await at('body',L-200,.012);
 await pg.click('#csb');await pg.waitForTimeout(500);console.log('  switched',JSON.stringify(await ev(()=>({title:$('it').textContent,text:$('ix').textContent.slice(0,80)}))));
 await at('tss2',60,.012);await at('body2',L-200,.012);
 await pg.click('#csb');await pg.waitForTimeout(400);console.log('  back',JSON.stringify(await ev(()=>({button:$('csb').textContent,beads:dKm.n,transcription:dA.t.A}))));
 console.log('  errors',JSON.stringify(errs));await b.close()}})();
