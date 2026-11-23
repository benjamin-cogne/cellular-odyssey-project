// ================= navigation génomique : API UCSC (repli Ensembl, puis exemples embarqués) =================
const UC='https://api.genome.ucsc.edu/',EN='https://rest.ensembl.org/',
J=u=>fetch(u).then(r=>{if(!r.ok)throw 0;return r.json()}),
trk=(t,c,s,e)=>J(UC+'getData/track?genome=hg38;track='+t+(c?';chrom='+c+';start='+s+';end='+e:'')).then(d=>{let v=d[t];return Array.isArray(v)?v:Object.values(v).flat()}),
nf=x=>Math.round(x).toLocaleString(LG?'en-US':'fr-FR'),fkb=x=>x<1e3?x+(LG?' bp':' pb'):x<1e6?(x/1e3).toFixed(1).replace('.',LG?'.':',')+' kb':(x/1e6).toFixed(2).replace('.',LG?'.':',')+' Mb',
esc=s=>(s+'').replace(/[<&]/g,c=>c=='<'?'&lt;':'&amp;'),
c2i=c=>(c=c.replace('chr',''),c=='X'?22:c>0&&c<23?c-1:-1),
dQ=dy(Ldq,16000,[0,0,0],.1),RS=.00418,PHI=1.65*TAU,
FQ=[K(0x778),0,K(0xfb7),K(0xfd3),K(0x59c),K(0x6c8)],EC={PLS:[1.7,.15,.15,1],pELS:[1.7,1,.1,1],dELS:[1.5,1.35,.2,1],'CTCF-only':[.2,.9,1.7,1]},ecol=t=>EC[t]||[1.6,.95,.95,1],
EL={PLS:'Signature de promoteur (PLS)',pELS:'Enhancer proximal (pELS, à moins de 2 kb d\'un TSS)',dELS:'Enhancer distal (dELS)','CTCF-only':'Site CTCF seul (isolateur, ancre de boucle)'},
// lecture des réponses : piste MANE (bigGenePred), cCRE ENCODE, gène Ensembl
pM=m=>{let z=m.blockSizes.split(','),o=m.chromStarts.split(',');return{sym:m.geneName2,id:m.ncbiId||m.name,st:m.strand=='-'?-1:1,s:m.chromStart,e:m.chromEnd,cs:m.thickStart,ce:m.thickEnd,ex:z.slice(0,m.blockCount).map((l,i)=>[m.chromStart+ +o[i],m.chromStart+ +o[i]+ +l])}},
pC=m=>({s:m.chromStart,e:m.chromEnd,t:m.encodeLabel,ct:/CTCF-b/.test(m.ccre),sc:m.score,n:m.name}),
pE=g=>{let t=g.Transcript.find(x=>x.is_canonical)||g.Transcript[0],T=t.Translation;return{sym:g.display_name,id:t.MANE&&t.MANE[0]?t.MANE[0].refseq_match:t.id,st:t.strand,s:t.start-1,e:t.end,cs:T?T.start-1:t.end,ce:T?T.end:t.end,ex:t.Exon.map(e=>[e.start-1,e.end]).sort((a,b)=>a[0]-b[0])}},
// exemples embarqués (valeurs réelles relevées via l'API UCSC, hg38) pour l'usage hors ligne
OFF={USP9X:{g:pM({geneName2:'USP9X',ncbiId:'NM_001039591.3',strand:'+',chromStart:41085444,chromEnd:41236579,thickStart:41123628,thickEnd:41232524,blockCount:45,
  blockSizes:'665,254,146,80,113,219,116,252,139,153,105,207,137,134,88,343,96,212,241,150,121,131,279,126,126,167,109,147,147,223,221,191,174,142,754,124,226,130,186,221,89,157,213,96,4193,',
  chromStarts:'0,38026,43555,46012,49280,51359,55211,55521,55848,57846,59077,62924,65476,67503,77345,80427,82037,82562,84550,85025,86393,98553,98952,101072,102547,103864,110806,111147,111919,113083,115615,119858,125064,129123,130454,131775,132927,133657,137772,139297,139604,143808,144122,145056,146942,'}),
 cc:[[82487,82738,'dELS',0,165,81],[84057,84219,'pELS',1,399,83],[84257,84451,'pELS',1,543,84],[84516,84847,'pELS',1,712,85],[85092,85442,'pELS',1,568,86],[85584,85870,'PLS',1,438,87],[86023,86360,'pELS',0,410,88],[86369,86713,'pELS',1,432,89],[86729,86937,'pELS',0,312,90],[87165,87508,'pELS',0,307,91],[87735,87946,'dELS',0,204,92],[88930,89091,'dELS',1,209,93]].map(x=>({s:41e6+x[0],e:41e6+x[1],t:x[2],ct:x[3],sc:x[4],n:'EH38E27512'+x[5]})),
 cp:[[41084420,41086667,203]]}},
OFFL=[{lab:'USP9X',sub:'ubiquitin specific peptidase 9 X-linked — exemple embarqué',c:'chrX',s:41085444,e:41236579,x:1},
 {lab:'22q11.2 recurrent (DGS) region (proximal, A-B, A-C, or A-D) (includes TBX1)',sub:'22q11.21 · ClinGen : sufficient evidence for dosage pathogenicity — exemple embarqué (DiGeorge)',c:'chr22',s:18924717,e:21111383,reg:1},
 {lab:GY,sub:G.nm+' — locus détaillé (transcription, épissage)',c:G.loc[0],s:G.loc[1],e:G.loc[2],x:1}],
AL=[[/di.?george|v[eé]lo.?card|22q11/i,'DGS 22q11.2'],[/williams/i,'Williams 7q11.23'],[/prader|angelman/i,'PWS/AS 15q11'],[/smith.?magenis/i,'SMS 17p11.2'],[/potocki.?lupski/i,'PTLS 17p11.2'],[/cri.?du.?chat/i,'Cri 5p15'],[/wolf|4p-/i,'Wolf 4p16'],
 [/miller.?dieker/i,'Miller 17p13.3'],[/sotos/i,'Sotos 5q35'],[/koolen/i,'Koolen 17q21.31'],[/kleefstra/i,'EHMT1 9q34'],[/phelan/i,'SHANK3 22q13'],[/wagr/i,'WAGR 11p13'],[/charcot|cmt1a|hnpp/i,'HNPP PMP22 17p12'],[/neurofibro/i,'NF1 17q11.2'],
 [/rubinstein/i,'CREBBP 16p13.3'],[/langer/i,'TRPS1 8q24'],[/rett/i,'MECP2 Xq28']];
let TG=0,AT=0,CL=0,ENG={},AP=0,NV=0,SQC={},RES=[],nT=0,OFl=0;
// bandes cytogénétiques réelles (si l'API répond) : recolore les chromosomes
trk('cytoBand').then(v=>{if(gen!=GEN)return;BD=CHR.map(_=>[]);v.forEach(b=>{let i=c2i(b.chrom);i>=0&&BD[i].push([b.chromStart/1e6,b.chromEnd/1e6,b.name,b.gieStain])});BD.forEach(l=>l.sort((a,b)=>a[0]-b[0]));drawChr(1);TG.on&&hl()}).catch(e=>0);

// ---------- recherche
async function gS(q){let o=[],Q=q.toUpperCase(),seen={};
  try{let d=await J(UC+'search?search='+encodeURIComponent(q)+'&genome=hg38');
    for(let t of['hgnc','mane','knownGene','geneReviews'])for(let m of(d.positionMatches.find(x=>x.name==t)||{matches:[]}).matches){
      let r=/^(chr[\dXY]+):(\d+)-(\d+)$/.exec(m.position),y=(m.posName||'').split(/[ (]/)[0].toUpperCase();if(!r||seen[y])continue;seen[y]=1;
      o.push({lab:y,sub:(m.description||'').replace(/&#x2F;/g,'/').trim().slice(0,120),c:r[1],s:r[2]-1,e:+r[3],x:y==Q,src:'UCSC'})}}
  catch(e){try{let g=await J(EN+'lookup/symbol/homo_sapiens/'+encodeURIComponent(q)+'?content-type=application/json;expand=1');ENG[g.display_name]=g;
      o.push({lab:g.display_name,sub:(g.description||'').split(' [')[0],c:'chr'+g.seq_region_name,s:g.start-1,e:g.end,x:1,src:'Ensembl'})}catch(e){}}
  return o.sort((a,b)=>b.x-a.x).slice(0,7)}
async function sS(q){let w=q;AL.forEach(a=>a[0].test(q)&&(w+=' '+a[1]));w=w.toLowerCase().split(/[^a-z0-9.\/]+/).filter(x=>x.length>2&&!/^(syndrom|r[eé]gion|d[eé]l[eé]tion|micro|recurrent)/.test(x));
  if(!CL)try{CL=(await trk('clinGenHaplo')).filter(m=>/^ISCA/.test(m.name)&&!/population/.test(m.geneId)).map(m=>({lab:m.geneId,sub:m.cytoBand+' · ClinGen : '+m.haploDescription,c:m.chrom,s:m.chromStart,e:m.chromEnd,hs:+m.haploScore,reg:1,src:'ClinGen via UCSC'}))}catch(e){}
  return(CL||OFFL).map(m=>[w.filter(x=>(m.lab+' '+m.sub).toLowerCase().includes(x)).length+(m.hs==3)*.5,m]).filter(x=>x[0]>=1).sort((a,b)=>b[0]-a[0]).slice(0,6).map(x=>x[1])}
async function find(q){q=q.trim();if(!q)return;$('qm').textContent='Recherche…';$('qr').innerHTML='';let r=[],m,n=s=>+s.replace(/\D/g,'');
  if(m=/^(?:chr)?([\dXY]+)[:\s]+([\d\s,.]+)-([\d\s,.]+)$/i.exec(q))r=[{lab:q,sub:'Région saisie',c:'chr'+m[1].toUpperCase(),s:n(m[2]),e:n(m[3]),reg:1}];
  else{if((m=/^([\dXY]+)([pq][\d.]*)$/i.exec(q))&&BD){let ci=c2i(m[1].toUpperCase()),l=ci<0?[]:BD[ci].filter(b=>b[2].startsWith(m[2].toLowerCase()));if(l.length)r=[{lab:cnm(ci)+m[2].toLowerCase(),sub:'Bande chromosomique',c:'chr'+cnm(ci),s:l[0][0]*1e6,e:l[l.length-1][1]*1e6,reg:1}]}
    else r=await gS(q);
    if(!r.some(x=>x.x))r=r.concat(await sS(q));
    OFl=0;if(!r.length)OFl=1,r=OFFL.filter(o=>(o.lab+o.sub).toLowerCase().includes(q.toLowerCase())||AL.some(a=>a[0].test(q)&&a[0].test(o.sub)))}
  OFl=r.some(x=>OFFL.includes(x));RES=r;$('qr').innerHTML=r.map((o,i)=>'<button data-i='+i+'><b>'+esc(o.lab)+'</b> <small>'+o.c+':'+nf(o.s+1)+'–'+nf(o.e)+' · '+fkb(o.e-o.s)+(o.src?' · '+o.src:'')+'</small><br><i>'+esc(o.sub||'')+'</i></button>').join('');
  $('qm').textContent=r.length?OFl?'API injoignable depuis cette page : exemples embarqués uniquement.':'':'Aucun résultat (ou API injoignable depuis cette page).'}

// ---------- chargement d'une cible et construction du locus
const fU=(x,y)=>{let r={f:0,gi:-1,k:-1},gi,g,k;                          // annotation d'un intervalle : 2 UTR, 3 exon codant, 4 intron, 5 îlot CpG, 0 intergénique
  r.cg=TG.cp.some(c=>x<c[1]&&y>c[0]);
  for(gi=0;gi<TG.G.length;gi++){g=TG.G[gi];if(y<=g.s||x>=g.e)continue;
    for(k=0;k<g.ex.length;k++)if(x<g.ex[k][1]&&y>g.ex[k][0])return{f:min(y,g.ex[k][1],g.ce)>max(x,g.ex[k][0],g.cs)?3:2,gi,k,cg:r.cg};
    r.f=4;r.gi=gi;r.k=g.ex.filter(e=>e[1]<=x).length-1}
  if(!r.f&&r.cg)r.f=5;return r},
ub=(U,k)=>{let{P,t,u}=U;if(!U.ty)return[ma(P,t,k*.00034),t,u];                // géométrie du pb k d'une unité : [position, tangente, normale]
  let A=cr(t,u),a=min(k,147)/147*PHI,e=ad(ml(u,-cos(a)),ml(t,sin(a))),T=nm(ad(ad(ml(u,sin(a)),ml(t,cos(a))),ml(A,-.095))),q=ad(ma(ma(P,u,RS),e,RS),ml(A,-.0025*a/TAU));
  return[k>147?ma(q,T,(k-147)*.00034):q,T,e]},
gpos=g=>{let U=TG.U,lo=0,hi,m;if(!U||g<TG.a||g>=TG.b)return 0;hi=U.length-1;while(lo<hi)m=lo+hi+1>>1,U[m].g<=g?lo=m:hi=m-1;return ub(U[lo],g-U[lo].g)},
tss=g=>g.st>0?g.s:g.e-1,xn=(g,k)=>g.st>0?k+1:g.ex.length-k;
function mkFib(){let{a,b,cc,C,Rl}=TG,N=(b-a)/197,rh=.7*Rl,tu=N*.005*min(1,(1500/N)**.3)/(TAU*rh),[X,Z,Y]=fr(TG.ax),
  gd=f=>ad(C,ad(ad(ml(X,rh*cos(f*tu*TAU)),ml(Y,rh*sin(f*tu*TAU))),ml(Z,(f-.5)*1.6*Rl))),                  // guide : la fibre s'enroule en hélice lâche (schématique)
  P=gd(0),t=nm(sb(gd(1e-3),P)),u=pp(t),U=[],ci=0,g=a,k,B,o;
  while(g<b){while(cc[ci]&&cc[ci].e<=g)ci++;
    let c=cc[ci],gap=c?c.s-g:1e9,ty=gap>=147,n=gap<=0?min(c.e,b)-g:ty?min(197,gap,b-g):min(gap,b-g),tg=gd((g+n-a)/(b-a)),W={g,n,cr:gap<=0?ci:-1};B=0;
    for(k=0;k<6;k++){o=ty?{P,t,u:rot(u,t,rr(0,TAU)),ty:1}:{P,t:nm(ad(t,ml(rd(),.6))),ty:0};if(!ty)o.u=pp(o.t);let x=ub(o,n),s=-ds(x[0],tg);if(!B||s>B[0])B=[s,o,x]}
    Object.assign(W,B[1]);W.c=ty?ad(ma(P,W.u,RS),ml(cr(W.t,W.u),-.002)):ma(P,W.t,n*.00017);W.f=fU(g,g+n);U.push(W);
    P=B[2][0];t=B[2][1];u=ty?ml(B[2][2],-1):B[2][2];g+=n}
  TG.U=U;[Lq0,Lq0c,Lq1,Lq1c,Lqm].forEach(clr);
  U.forEach((W,i)=>{let c=FQ[W.f.f],k,a,b;i&&Cy(Lq0c,U[i-1].c,W.c,.0035,W.cr<0?c:K(0xc6f));
    if(W.ty){let A=cr(W.t,W.u);S(Lq0,W.c,.0055,c);El(Lq1,W.c,ml(W.u,.0034),ml(A,.0027),ml(cr(W.u,A),.0034),[c[0]*.7,c[1]*.7,c[2]*.7,1]);
      a=W.P;for(k=1;k<13;k++)b=ub(W,k<12?k*13:W.n)[0],Cy(Lq1c,a,b,.001,c),a=b}
    else{Cy(Lq1c,W.P,ub(W,W.n)[0],.001,W.cr<0?c:K(0xc6f));
      if(W.cr<0)S(Lq0,W.c,.003,c);else{let e=cc[W.cr],q=ma(W.c,W.u,.005),r=.0035+e.sc/3e5;S(Lq0,q,r+.002,ecol(e.t));S(Lq1,q,r,ecol(e.t));e.ct&&S(Lq1,ma(W.c,W.u,-.004),.003,EC['CTCF-only'])}}});
  for(let g of TG.G){let q=gpos(tss(g));q&&S(Lqm,ma(q[0],q[2],.0028),.0016,[3,3,3,1]);                    // TSS (blanc) ; sites donneurs GT (rose) et accepteurs AG (cyan)
    g.ex.forEach((e,k)=>{for(let j of[0,1]){if(j?k==g.ex.length-1:!k)continue;let x=gpos(j?e[1]+1:e[0]-2);x&&S(Lqm,ma(x[0],x[2],.0022),.0012,(j?g.st>0:g.st<0)?[3,.5,1.5,1]:[.3,2,3,1])}})}
  fin()}
function hl(){clr(Lkh);let t=TG,ci=t.ci;for(let c of[ci*2,ci*2+1]){let{p,xi}=CN[c];for(let i=0;i<p.length-1;i++){let h=t.e>i*1e6&&t.s<(i+1)*1e6,o=bcol(ci,i+.5,xi);Cy(Lkh,p[i],p[i+1],h?.09:.05,h?[1.7,.45,.12,1]:[o[0]*1.5,o[1]*1.5,o[2]*1.5,1])}}fin()}
async function goT(t){let ci=c2i(t.c),L=t.e-t.s,fl=cl(L*.15,1e4,1e5)|0,a=max(0,t.s-fl),b=t.e+fl,G=[],cc=[],cp=[],src='UCSC',m=$('qm');
  if(ci<0){m.textContent='Ce chromosome n\'existe pas dans ce caryotype 46,XX.';return}
  m.textContent='Chargement des annotations…';
  if(t.lab!=GY&&b-a<3.3e6)try{let[x,y,w]=await Promise.all([trk('mane',t.c,a,b),trk('encodeCcreCombined',t.c,a,b),trk('cpgIslandExt',t.c,a,b)]);
      G=x.filter(v=>v.maneStat=='MANE Select').map(pM);cc=y.map(pC);cp=w.map(v=>[v.chromStart,v.chromEnd,v.cpgNum])}
    catch(e){try{src='Ensembl';G=[pE(ENG[t.lab]||await J(EN+'lookup/symbol/homo_sapiens/'+t.lab+'?content-type=application/json;expand=1'))];
        cc=(await J(EN+'overlap/region/human/'+t.c.slice(3)+':'+(a+1)+'-'+b+'?feature=regulatory;content-type=application/json')).map(v=>{let d=v.description||v.feature_type||'';return{s:v.start-1,e:v.end,t:/promoter/i.test(d)?'PLS':/enhancer/i.test(d)?'dELS':/CTCF/i.test(d)?'CTCF-only':'',ct:/CTCF/i.test(d),sc:500,n:v.id||''}})}
      catch(e){src='hors ligne';let o=OFF[t.lab];if(o)G=[o.g],cc=o.cc,cp=o.cp}}
  cc.sort((x,y)=>x.s-y.s);
  let A=CN[ci*2].p,mb=(t.s+t.e)/2e6,i=min(A.length-2,mb|0),N=lp(A[i],A[i+1],cl(mb-i,0,1)),bd=bnd(ci,mb),mn=G.find(g=>g.sym==t.lab);
  TG={...t,ci,a,b,G,cc,cp,on:1,N,M:N,main:mn,ri:-1,xi:-1};SQC={};AT=0;dQ.n=0;hl();
  if(t.lab==GY)TG.M=[0,0,0];
  else if(G.length||cc.length){let n=(b-a)/197,Rl=TG.Rl=max(.15,.046*cbrt(n)),B=0,k,q,s;
    for(k=0;k<30;k++){q=ma(N,rd(),Rl+.1);if(ds(q,Nc)>Rn-Rl-.1||ds(q,NOL)<1.05+Rl)continue;s=0;CN.forEach(c=>c.p.forEach(x=>s-=ds(x,q)<Rl));if(!B||s>B[0])B=[s,q]}
    q=B?B[1]:ma(N,nm(sb(Nc,N)),Rl+.1);if(ds(q,Nc)>Rn-Rl-.1)q=ma(Nc,nm(sb(q,Nc)),max(0,Rn-Rl-.1));
    TG.C=q;TG.ax=rd();mkFib();q=gpos(mn?tss(mn):t.s+t.e>>1);if(q)TG.M=q[0]}
  POI[NP]=[t.lab.slice(0,24),()=>TG.M];poi=NP;$('nv').style.display='none';NV=0;$('lb').style.display=TG.U?'flex':'none';$('lbm').style.display=mn?'':'none';m.textContent='';
  let T=TG.U?TG.C:TG.M,sum=t.lab+' · chr'+cnm(ci)+(bd?bd[2]:'')+' · '+fkb(L)+(mn?' · '+mn.ex.length+' exons, brin '+(mn.st>0?'+':'−'):'')+(G.length>1?' · '+G.length+' gènes MANE':'')+(cc.length?' · '+cc.length+' éléments cis-régulateurs':'')+(t.lab==GY?' · locus détaillé':TG.U?' ('+src+'). Rétrécissez, ou utilisez TSS / exon ▸ / régul. ▸.':' : région surlignée sur le chromosome'+(b-a<3.3e6?' (aucune annotation chargée).':' (trop grande pour le détail : choisissez un gène).')),
  st=()=>fly(ma(T,nm(sb(p,T)),TG.U?TG.Rl+.3:.45),TG.U?.04:.06,()=>say(sum,12),T);
  if(reg>1)st();else{$('fd').style.opacity=1;setTimeout(()=>{reg=2;ct=-1;chV.A=0;chG.n=chR.n=0;seenN=1;p=ma(T,nm(ad(sb(Nc,T),[.01,0,0])),1.3);if(ds(p,Nc)>Rn-.3)p=lp(T,Nc,.5);z=.15;f=nm(sb(T,p));u=pp(f);cf=f;cu=u;$('fd').style.opacity=0;st()},450)}}

// ---------- pilote automatique
function fly(B,zb,cb,L){if(ORG&&ORG.i=='nol'&&ds(B,NOL)>1)ORG=0,OC=[];let d=ds(p,B);AP={A:p,B,M:ad(lp(p,B,.5),ml(pp(sb(B,p)),d*.12)),za:z,zb,T:cl(1.5+d*1.1,2,6),t:0,cb,L}}
function apS(d){let a=AP,k,q,v;a.t+=d;k=ss(a.t/a.T);q=lp(lp(a.A,a.M,k),lp(a.M,a.B,k),k);v=a.L&&k>.5?sb(a.L,q):sb(lp(a.M,a.B,k),lp(a.A,a.M,k));
  if(ln(v)>1e-9)f=nm(lp(f,nm(v),min(1,d*4))),u=nm(cr(cr(f,u),f));p=q;z=a.za*(a.zb/a.za)**k;vel=0;nI=0;
  if(a.t>=a.T)AP=0,a.cb&&a.cb()}
function lbA(a){let m=TG.main||TG.G[0],g,q,s;if(!TG.U||AP)return;
  if(a[0]=='r'){if(!TG.cc.length)return;let l=TG.rl||(TG.rl=TG.cc.map((c,i)=>[m?abs((c.s+c.e>>1)-tss(m)):c.s,i]).sort((x,y)=>x[0]-y[0])),n=l.length,e;TG.ri=(TG.ri+(a[1]=='+'?1:n-1)+(TG.ri<0&&a[1]=='-'))%n;e=TG.cc[l[TG.ri][1]];g=e.s+e.e>>1;s=e.n+' · '+(EL[e.t]||'DNase–H3K4me3')}
  else if(!m)return;
  else if(a=='t')g=tss(m),TG.xi=0,s='Site d\'initiation de la transcription (TSS) de '+m.sym;
  else{let n=m.ex.length,e;TG.xi=(TG.xi+(a[1]=='+'?1:n-1)+(TG.xi<0&&a[1]=='-'))%n;e=m.ex[m.st>0?TG.xi:n-1-TG.xi];g=e[0]+e[1]>>1;s=m.sym+' · exon '+(TG.xi+1)+'/'+n}
  q=gpos(g);q&&(fly(ad(ma(q[0],q[2],.009),ml(q[1],-.008)),.004,0,q[0]),say(s,6))}

// ---------- ADN à l'échelle atomique autour du vaisseau (séquence réelle chargée à la demande)
const sq=g=>{let k=g/2e3|0,v=SQC[k],c=TG.c,s=k*2e3;
  if(v===undefined)SQC[k]='',J(UC+'getData/sequence?genome=hg38;chrom='+c+';start='+s+';end='+(s+2e3)).then(d=>d.dna,e=>J(EN+'sequence/region/human/'+c.slice(3)+':'+(s+1)+'..'+(s+2e3)+':1?content-type=application/json').then(d=>d.seq)).then(d=>{if(TG.c==c)SQC[k]=d,AT=0},e=>0);
  return v?v[g-s]||'':''};
function atom(){let U=TG.U,i=TG.ni,Rr=cl(z*7,.012,.03),k,j,W,g,x,y,pa,pb,m,c;dQ.n=0;dQ.c=AT=[p[0],p[1],p[2],Rr];
  for(j=max(0,i-14);j<min(U.length,i+15);j++){W=U[j];if(ds(W.c,p)>Rr+.03)continue;pa=0;
    for(k=0;k<W.n;k++){let[P,T,N]=ub(W,k);if(ds(P,p)>Rr+.001){pa=0;continue}
      g=W.g+k;let B=cr(T,N),th=g*.5984,s=sq(g).toUpperCase();c=W.cr<0?FQ[fU(g,g+1).f]:K(0xc6f);
      x=ma(ma(P,N,.00095*cos(th)),B,.00095*sin(th));y=ma(ma(P,N,.00095*cos(th+2.3)),B,.00095*sin(th+2.3));m=lp(x,y,.5);
      if(pa)dCy(dQ,pa,x,.00028,c),dCy(dQ,pb,y,.00028,[c[0]*.6,c[1]*.6,c[2]*.6,1]);
      dCy(dQ,x,m,.00017,BC[s]||BC['']);dCy(dQ,m,y,.00017,BC[CO[s]]||BC['']);pa=x;pb=y}}
  gl.bindBuffer(34962,dQ.b);gl.bufferSubData(34962,0,dQ.f,0,max(16,dQ.n*16))}
function nvT(d){if((nT-=d)>0)return;nT=.15;let U=TG.U;
  if(U&&reg>1){let b=1e9,i=0,j,e;if(ds(p,TG.C)<TG.Rl*2+.6)for(j=0;j<U.length;j++)e=ds(U[j].c,p),e<b&&(b=e,i=j);TG.ni=i;TG.nd=b;
    if(z<.02&&b<.05){if(!AT||ds(p,AT)>AT[3]*.35||abs(AT[3]-cl(z*7,.012,.03))>.004)atom()}else if(AT)AT=0,dQ.n=0}
  else if(AT)AT=0,dQ.n=0}

// ---------- fiches et séquence pour le noyau et le locus
function uI(W){let F=W.f,g=F.gi<0?0:TG.G[F.gi],m=TG.main,k,x=' '+TG.c+':'+nf(W.g+1)+'–'+nf(W.g+W.n)+' (hg38).'+(F.cg?' Dans un îlot CpG.':'');
  if(W.cr>=0){let e=TG.cc[W.cr],r=m?((e.s+e.e>>1)-tss(m))*m.st:0;
    return['Élément cis-régulateur '+e.n,(EL[e.t]||'DNase–H3K4me3')+(e.ct?', lié par CTCF':'')+' · score ENCODE '+e.sc+' · '+W.n+' pb accessibles à la DNase : ADN sans nucléosome, occupé par des facteurs de transcription.'+(m?' À '+fkb(abs(r))+(r<0?' en amont':' en aval')+' du TSS de '+m.sym+'.':'')+x]}
  if(F.f==2||F.f==3)return[g.sym+' · exon '+xn(g,F.k)+'/'+g.ex.length,(g.ex[F.k][1]-g.ex[F.k][0])+(LG?' bp, ':' pb, ')+(F.f==3?'codant':'non traduit (UTR)')+' · transcrit '+g.id+', brin '+(g.st>0?'+':'−')+'. Repères : site accepteur AG (cyan) en 5′ de l\'exon, site donneur GT (rose) en 3′.'+x];
  if(F.f==4&&g.ex[F.k]&&g.ex[F.k+1]){k=g.st>0?F.k+1:g.ex.length-1-F.k;return[g.sym+' · intron '+k+'/'+(g.ex.length-1),fkb(g.ex[F.k+1][0]-g.ex[F.k][1])+' · commence par GT (donneur), finit par AG (accepteur) ; transcrit puis excisé du pré-ARNm.'+x]}
  return['Chromatine intergénique','Fibre de nucléosomes (≈200 pb par unité) entre deux gènes.'+x]}
function cI(o){let N=CN[o[0]],mb=o[1],bd=bnd(N.ci,mb+.5);return N.xi?I.xi:['Chromosome '+cnm(N.ci)+' — '+CHR[N.ci]+' Mb','Ici : ≈ '+mb+' Mb'+(bd?', bande '+cnm(N.ci)+bd[2]:'')+'. '+I.chr[1]]}
function nuI(){let U=TG.U,b=0,i,j,k,l,o;if(U&&TG.nd<.03+6*z)return uI(U[TG.ni]);
  for(i=-1;i<2;i++)for(j=-1;j<2;j++)for(k=-1;k<2;k++)if(l=NH.get((floor(p[0]/.4)+i)+'_'+(floor(p[1]/.4)+j)+'_'+(floor(p[2]/.4)+k)))for(o of l){let e=ds(o[2],p);if(e<.3+4*z&&(!b||e<b[0]))b=[e,o]}
  if(b)return cI(b[1])}
function lqS(){let W,k,b=1e9,g,o,c,s='',F,gn,n='';if(!AT||!TG.U||TG.nd>.02)return'';W=TG.U[TG.ni];
  for(k=0;k<W.n;k++)o=ds(ub(W,k)[0],p),o<b&&(b=o,g=W.g+k);
  F=fU(g,g+1);gn=F.gi<0?0:TG.G[F.gi];
  for(o=-12;o<13;o++)c=sq(g+o).toUpperCase(),s+='<i class="'+(c||'N')+(o?'':' m')+'">'+(c?fU(g+o,g+o+1).f%4>1?c:c.toLowerCase():'·')+'</i>';
  if(gn)gn.ex.forEach((e,k)=>{if(k&&abs(g-e[0]+1.5)<2.5)n=gn.st>0?'site accepteur AG':'site donneur GT (brin −)';if(k<gn.ex.length-1&&abs(g-e[1]-.5)<2.5)n=gn.st>0?'site donneur GT':'site accepteur AG (brin −)'});
  return'<b>'+TG.c+':'+nf(g+1)+(gn?' · '+gn.sym+(F.k<0||F.f==4?' intron':' exon '+xn(gn,F.k)):'')+'</b><br>5′ '+s+' 3′'+(n?'<br><u>'+n+'</u>':'')}

// ---------- interface de navigation
$('nvb').onclick=()=>{if(go)$('nv').style.display='grid',NV=1,$('q').focus()};
$('qc').onclick=()=>{$('nv').style.display='none';NV=0};
$('qf').onsubmit=e=>{e.preventDefault();find($('q').value)};
$('qx').onclick=e=>{e.target.tagName=='A'&&($('q').value=e.target.textContent,find(e.target.textContent))};
$('qr').onclick=e=>{let b=e.target.closest('button');b&&goT(RES[b.dataset.i])};
$('lb').onclick=e=>{let a=e.target.dataset.a;a=='m'?ldG():a&&lbA(a)};
$('qx').innerHTML='Exemples : <a>USP9X</a><a>DiGeorge</a><a>Williams</a><a>7q11.23</a><a>'+GY+'</a>';
$('chg').onclick=()=>{$('nv').style.display='none';NV=0;$('ov').style.display='grid'};

// ---------- modèle à la base d'un gène quelconque : structure MANE Select + séquence hg38, introns longs raccourcis
const UB=400,HIS=/^H(1-\d+|2AC\d+|2BC\d+|3C\d+|4C\d+)$/,ng=x=>'−'+-x;
function mkG(g,dna,t){
  let pos=g.st>0,S=dna.toUpperCase(),T=pos?S:S.split('').reverse().map(c=>CO[c]||'N').join(''),L=g.e-g.s,sy=g.sym,        // T : séquence dans le sens du transcrit, T[UB] = site +1
   ex=g.ex.map(([x,y])=>pos?[x-g.s,y-g.s]:[g.e-y,g.e-x]).sort((a,b)=>a[0]-b[0]),cs=pos?g.cs-g.s:g.e-g.ce,ce=pos?g.ce-g.s:g.e-g.cs,
   E=ex.reduce((s,e)=>s+e[1]-e[0],0),iv=ex.slice(1).map((e,k)=>[ex[k][1],e[0]]),F,M,q=T.slice(0,UB),off=0,X=[],cu=[],ir=[],nc=[],nt={},tf=[];
  if(T.length!=L+UB)throw'Séquence incomplète pour '+sy+'.';
  if(cs>=ce)throw sy+' : transcrit non codant, non pris en charge.';
  let TH,sz=iv.map(([a,b])=>b-a).sort((a,b)=>b-a);        // on garde entiers le plus d'introns possible (budget 18 kb) ; au-delà d'un seuil TH, seules les F bases de chaque extrémité restent
  o:for(F of[150,120,90,60])for(TH of[1e9].concat(sz,2*F+10)){TH=max(TH,2*F+10);M=E+iv.reduce((s,[a,b])=>s+(b-a>TH?2*F:b-a),0);if(M<=18e3)break o}
  if(M>24e3)throw sy+' est trop long pour le modèle à la base : '+fkb(E)+' d\'exons et '+iv.length+' intron'+(iv.length>1?'s':'')+' dépassent 24 kb, même avec des introns raccourcis.';
  ex.forEach(([a,b],k)=>{X.push([a-off,b-off]);q+=T.slice(UB+a,UB+b);
    if(k<iv.length){let[c,d]=iv[k],n=d-c,s=T.substr(UB+c,2)+'–'+T.substr(UB+d-2,2);ir.push(n);s!='GT–AG'&&nc.push([k+1,s]);
      if(n>TH)q+=T.substr(UB+c,F)+T.substr(UB+d-F,F),cu.push({x:c+F-off,n:n-2*F,k,f:F}),off+=n-2*F;else q+=T.slice(UB+c,UB+d)}});
  let mp=x=>{let k=ex.findIndex(([a,b])=>x>=a&&x<=b);return X[k][0]+x-ex[k][0]},CS=mp(cs),CE=mp(ce),Lm=q.length-UB,im=x=>X.reduce((m,[a,b])=>m+max(0,min(b,x)-a),0),ML=im(Lm),
   cds=X.map(([a,b])=>q.slice(UB+max(a,CS),UB+max(min(b,CE),max(a,CS)))).join(''),ok=/^ATG/.test(cds)&&cds.length%3==0&&/(TAA|TAG|TGA)$/.test(cds),aa=cds.length/3-1|0,
   // motifs du promoteur proximal, cherchés dans la séquence (sites candidats)
   u=(a,n)=>T.substr(UB+a,n),fnd=(re,a,b)=>{let o=[],i;for(i=a;i<b;i++){let m=re.exec(u(i,8));m&&o.push([i,m[0]])}return o},
   tata=fnd(/^TATA[AT]A/,-36,-23).pop()||fnd(/^[CT]ATAAA/,-36,-23).pop(),tn=tata&&(tata[1][0]=='T'?'Boîte TATA':'Boîte TATA non canonique'),inr=/^[CT][CT]A[ACGT][AT][CT][CT]/.test(u(-2,7)),cca=fnd(/^(CCAAT|ATTGG)/,-160,-40).pop(),gc=fnd(/^(GGGCGG|CCGCCC)/,-200,-5),
   tg=pos?g.s:g.e-1,cpg=t.cp.some(c=>tg>=c[0]&&tg<c[1]),
   en=t.cc.filter(c=>/ELS/.test(c.t)).sort((a,b)=>b.sc-a.sc)[0],ed=en&&((en.s+en.e>>1)-tg)*g.st,et=en&&fkb(abs(ed))+(ed<0?' en amont':' en aval')+' du TSS',
   nm=(t.sub||'').replace(/ — exemple embarqué.*/,'').replace(/\s*\(from .*/,''),mi=NaN,mx=0;
  ir.forEach(n=>{mi=min(mi,n)||n;mx=max(mx,n)});
  if(tata)for(let k=0;k<6;k++)nt[tata[0]+k]=tn+' ('+tata[1]+', '+ng(tata[0])+') : site candidat pour TBP';
  if(inr)nt[0]='Initiateur (Inr, '+u(-2,7)+') : le A est le site +1 du transcrit MANE Select';
  if(cca){for(let k=0;k<5;k++)nt[cca[0]+k]='Boîte CCAAT ('+ng(cca[0])+') : site candidat pour NF-Y';tf.push([cca[0]+2,.003,0x8ce])}
  gc.slice(-2).forEach(m=>{for(let k=0;k<6;k++)nt[m[0]+k]='Boîte GC ('+m[1]+', '+ng(m[0])+') : site candidat pour SP1';tf.push([m[0]+3,.0027,0xd6c])});
  let pro=(tata?tn+' '+tata[1]+' à '+ng(tata[0]):'Pas de boîte TATA reconnaissable entre −36 et −24')+(inr?' ; initiateur (Inr, '+u(-2,7)+') au site +1':'')+(cca?' ; boîte CCAAT à '+ng(cca[0])+' (candidat pour NF-Y)':'')+
    (gc.length?(LG?'; '+gc.length+' GC box'+(gc.length>1?'es':'')+' within the 200 bp upstream (candidate'+(gc.length>1?'s':'')+' for SP1)':' ; '+gc.length+' boîte'+(gc.length>1?'s':'')+' GC dans les 200 pb en amont (candidat'+(gc.length>1?'s':'')+' pour SP1)'):'')+(cpg?' ; le site +1 est dans un îlot CpG (annotation UCSC)':' ; pas d\'îlot CpG au site +1')+'.';
  return{sy,nm,cx:1,ci:c2i(t.c),mb:tg/1e6,loc:[t.c,g.s,g.e],up:UB,pr:UB,L:Lm,rl:L,ex:X,cs:CS,ce:CE,q,eo:-100,tf,vc:{},nt,cu,ir,
   hi:sy+' est chargé à l\'échelle moléculaire : '+X.length+' exon'+(X.length>1?'s':'')+', '+fkb(L)+(cu.length?', dont '+fkb(Lm)+' modélisés (introns longs raccourcis, anneaux gris)':'')+'. Motifs et signaux sont lus dans la séquence hg38.'+(ok?'':' Attention : la séquence codante reconstituée n\'est pas cohérente.')+' Licence narrative : le gène est montré en pleine transcription, sans vérifier qu\'il s\'exprime dans cette cellule. Approchez-vous, puis « Je suis l\'ARN polymérase II ».',
   i:{pro:['Promoteur de '+sy,pro+' Motifs repérés dans la séquence hg38 autour du site +1 du transcrit '+g.id+' (MANE Select) : ce sont des sites candidats, non validés expérimentalement'+(cpg?' ; dans un promoteur à îlot CpG, la transcription démarre en réalité sur plusieurs sites voisins':'')+'. Le complexe de pré-initiation (TFIIA, B, D, E, F, H et Médiateur) place l\'ARN polymérase II au site +1.'],
    lcr:en?['Enhancer candidat '+en.n,(EL[en.t]||'Enhancer')+' du catalogue ENCODE, score '+en.sc+', à '+et+' de '+sy+' : le mieux noté des '+t.cc.length+' éléments cis-régulateurs de la fenêtre chargée. Sa mise en contact avec le promoteur est schématique : ENCODE ne dit pas quel gène un enhancer régule.']:['Boucle enhancer–promoteur','Aucun enhancer ENCODE dans la fenêtre chargée autour de '+sy+' : la boucle dessinée est schématique.'],
    u5:['5′UTR de '+sy+' — '+nf(im(CS))+' nt','Transcrit mais non traduit. Le ribosome balaie depuis la coiffe jusqu\'au premier AUG.'],
    ex:['Exon de '+sy,X.length+' exon'+(X.length>1?'s':'')+' ; séquence codante de '+nf(aa)+' codons plus le codon stop, transcrit '+g.id+' (MANE Select), brin '+(pos?'+':'−')+'.'+(nm?' '+nm[0].toUpperCase()+nm.slice(1)+'.':'')],
    in:['Intron de '+sy,ir.length?ir.length+' intron'+(LG?ir.length>1?'s, from '+fkb(mi)+' to '+fkb(mx):' of '+fkb(mx):ir.length>1?'s, de '+fkb(mi)+' à '+fkb(mx):' de '+fkb(mx))+'. '+(nc.length?'Introns non GT–AG : '+nc.slice(0,5).map(x=>(LG?'no. ':'n° ')+x[0]+' ('+x[1]+')').join(', ')+'. ':'Tous commencent par GT (site donneur) et finissent par AG (site accepteur). ')+(cu.length?cu.length+' sont raccourcis à '+2*F+' nt (anneaux gris) : seules leurs extrémités sont modélisées. ':'')+'Transcrits puis excisés.':'Ce gène n\'a pas d\'intron.'],
    u3:['3′UTR de '+sy+' — '+nf(ML-im(CE))+' nt','Du codon stop au site de clivage. Le signal de polyadénylation, quand il est reconnaissable, est marqué de perles bleu clair près de l\'extrémité.'],
    rna:['Pré-ARNm de '+sy,'Coiffe 7-méthylguanosine + complexe CBC (blanc) dès 25 nt. Exons dorés, introns bleus, queue poly(A) verte ajoutée après clivage par CPSF. L\'épissage est co-transcriptionnel. Licence narrative : rien ne garantit ici que '+sy+' soit transcrit dans cette cellule.'],
    mrn:['mRNP en cours d\'export','ARNm mûr : '+nf(ML)+' nt + poly(A), compacté avec CBC, EJC et PABPN1. Le complexe TREX recrute le récepteur d\'export NXF1–NXT1 ; passage du pore, coiffe en tête. Suivez-le !'],
    ply:['Polysome — '+sy,'L\'ARNm est traduit en une chaîne de '+nf(aa)+' acides aminés (point rouge = chaîne naissante). Il est dessiné sur des ribosomes libres : si la protéine porte un peptide signal, sa traduction se poursuit en réalité sur le réticulum (non déterminé pour ce gène).'],
    spk:['Speckle nucléaire','Condensat de forme irrégulière (20 à 50 par noyau), fait de granules interchromatiniens de 20–25 nm. Au cœur (rose) : les protéines SON et SRRM2, sans lesquelles il se dissout. Autour : protéines SR (cyan) et snRNP (bleu). En périphérie : le long ARN non codant MALAT1 (orange). Ni ADN ni transcription à l\'intérieur : c\'est une réserve de facteurs d\'épissage qui échange sans cesse avec le nucléoplasme. Les gènes placés à son contact sont épissés plus efficacement.']},
   pm:[tata?'TBP reconnaît la '+tn.replace('B','b')+' ('+tata[1]+', '+ng(tata[0])+').':'Ce promoteur n\'a pas de boîte TATA reconnaissable'+(cpg?' : il est porté par un îlot CpG, comme la majorité des promoteurs humains':'')+' ; TFIID s\'y positionne par ses autres sous-unités, les TAF.',
    'TFIID ('+(tata?'TBP sur '+tata[1]:'sans boîte TATA : reconnaissance du promoteur par les TAF')+(inr?', Inr '+u(-2,7)+' au +1':'')+'), TFIIA, TFIIB, Pol II–TFIIF, TFIIE, TFIIH.'+(gc.length?(LG?' '+gc.length+' GC box'+(gc.length>1?'es':'')+' upstream (candidate'+(gc.length>1?'s':'')+' for SP1).':' '+gc.length+' boîte'+(gc.length>1?'s':'')+' GC en amont (candidat'+(gc.length>1?'s':'')+' pour SP1).'):'')+(cca?' Boîte CCAAT à '+ng(cca[0])+' (candidat pour NF-Y).':'')+(en?' L\'enhancer candidat '+en.n+' (ENCODE, '+et+') agirait par l\'intermédiaire du Médiateur.':''),
    '',nc[0]&&nc[0][0]==1?' Attention : cet intron 1 est bordé par '+nc[0][1]+' et non GT–AG'+(/^AT/.test(nc[0][1])?' — un intron de type U12, pris en charge en réalité par le spliceosome mineur (U11, U12, U4atac, U6atac, U5)':' — variante reconnue par le même spliceosome')+' ; la chorégraphie montrée reste celle du spliceosome majeur.':'',
    '',cu.length?' Sur '+sy+', '+cu.length+(LG?' long intron'+(cu.length>1?'s are':' is')+' shortened':' intron'+(cu.length>1?'s longs sont raccourcis':' long est raccourci'))+' à l\'affichage (anneaux gris) : à 30 nt/s, un intron de 100 kb demanderait près d\'une heure.':'','','']}}
async function ldG(){let g=TG.main,t=TG,a,b,dna,X;if(!g||PM)return;AP=0;
  if(HIS.test(g.sym))return say(g.sym+' est un gène d\'histone dépendant de la réplication : son ARNm n\'a ni intron ni queue poly(A) (tige-boucle en 3′, maturation par le snRNP U7). Ce cas n\'est pas modélisé.',12);
  if(g.e-g.s>3e6)return say(g.sym+' s\'étend sur '+fkb(g.e-g.s)+' : trop grand pour être chargé.',8);
  say('Chargement de la séquence de '+g.sym+' ('+fkb(g.e-g.s)+')…',90);a=g.st>0?g.s-UB:g.s;b=g.st>0?g.e:g.e+UB;
  try{dna=await J(UC+'getData/sequence?genome=hg38;chrom='+t.c+';start='+a+';end='+b).then(d=>d.dna,e=>J(EN+'sequence/region/human/'+t.c.slice(3)+':'+(a+1)+'..'+b+':1?content-type=application/json').then(d=>d.seq));X=mkG(g,dna,t)}
  catch(e){return gen==GEN&&say(typeof e=='string'?e:'Séquence injoignable depuis cette page : cette fonction demande une connexion et le fichier autonome odyssee-cellulaire.html.',12)}
  if(gen!=GEN)return;$('fd').style.opacity=1;setTimeout(()=>{if(gen==GEN)boot(CT,X);$('fd').style.opacity=0},400)}
