// faux serveur UCSC pour les tests : mêmes formes de réponses que l'API réelle (search, getData/track, getData/sequence)
const fs=require('fs');
const CO={A:'T',C:'G',G:'C',T:'A'},rc=s=>s.split('').reverse().map(c=>CO[c]).join('');
const rnd=g=>'acgt'[(Math.imul(g^0x9e3779b9,2654435761)>>>13)&3];
const GEN={};   // sym -> {c,s,e,strand,cs,ce,ex:[[gs,ge]],seq:(g)=>base}
function add(sym,c,s,strand,L,exT,csT,ceT,TT,upK,desc){ // TT : séquence orientée transcrit couvrant [-upK, L)
  const e=s+L,pos=strand=='+',ex=exT.map(([a,b])=>pos?[s+a,s+b]:[e-b,e-a]).sort((x,y)=>x[0]-y[0]);
  GEN[sym]={sym,c,s,e,strand,desc,cs:pos?s+csT:e-ceT,ce:pos?s+ceT:e-csT,ex,
    seq:g=>{const t=pos?g-s:e-1-g;if(t<-upK||t>=L)return null;const b=TT[t+upK];return pos?b:CO[b]}}}
const up=f=>fs.readFileSync(f,'utf8').trim().toUpperCase();
add('FOS','chr14',75278827,'+',3403,[[0,296],[1049,1301],[1732,1840],[1955,3403]],155,2597,up('seq/fos.txt'),360,'Fos proto-oncogene, AP-1 transcription factor subunit');
add('HBB','chr11',5225465,'-',1606,[[0,142],[272,495],[1345,1606]],50,1474,up('hbb.txt'),108,'hemoglobin subunit beta');
// gènes synthétiques (séquence aléatoire mais sites d'épissage, ATG, stop et AATAAA en place)
function synth(sym,c,s,strand,exLens,inLens,csT,ceOff,desc){let R=1234567,r=()=>(R=Math.imul(R,1103515245)+12345>>>0,'ACGT'[R>>>16&3]),T='',ex=[],x=0;
  for(let i=0;i<400;i++)T+=r();
  exLens.forEach((l,k)=>{ex.push([x,x+l]);for(let i=0;i<l;i++)T+=r();x+=l;if(k<inLens.length){let n=inLens[k],I='GT';for(let i=2;i<n-2;i++)I+=r();I+='AG';I=I.slice(0,n-34)+'CACTAACTTTTTCTCTTTCTTTCCTTTTTTCCAG';T+=I;x+=n}});
  let L=x,ceT=L-ceOff,a=T.split('');const put=(t,w)=>{for(let i=0;i<w.length;i++)a[400+t+i]=w[i]};put(csT,'ATG');
  // longueur de CDS multiple de 3 : recule ceT si besoin
  const ml=p=>{let m=0;for(const[a,b]of ex){if(p<=b){return m+Math.max(0,p-a)}m+=b-a}return m};while((ml(ceT)-ml(csT))%3)ceT--;put(ceT-3,'TAA');put(L-26,'AATAAA');put(L-2,'CA');
  add(sym,c,s,strand,L,ex,csT,ceT,a.join(''),400,desc);return{L,ex,csT,ceT}}
const U9=fs.readFileSync('p6.js','utf8'),bs=/blockSizes:'([\d,]+)'/.exec(U9)[1].split(',').filter(x=>x).map(Number),st=/chromStarts:'([\d,]+)'/.exec(U9)[1].split(',').filter(x=>x).map(Number);
const inL=bs.slice(0,-1).map((l,k)=>st[k+1]-st[k]-l);
exports.U9=synth('USP9X','chrX',41085444,'+',bs,inL,41123628-41085444,4055,'ubiquitin specific peptidase 9 X-linked');   // structure réelle (45 exons), séquence synthétique
exports.S12=synth('SYN12','chr5',1000000,'-',[180,95,140,210,88,160,120,75,300,130,110,900],[5200,90,12000,800,40000,150,3000,7000,220,15000,2500],60,420,'synthetic test gene');
exports.S1=synth('SOLO1','chr7',2000000,'+',[1300],[],90,300,'synthetic intronless gene');
exports.GEN=GEN;
exports.install=async pg=>{const log=[];
  await pg.route(u=>/api\.genome\.ucsc\.edu|rest\.ensembl\.org/.test(u.href),async route=>{const u=route.request().url(),J=o=>route.fulfill({status:200,contentType:'application/json',headers:{'access-control-allow-origin':'*'},body:JSON.stringify(o)});log.push(u.slice(28,120));
    if(/ensembl/.test(u))return route.fulfill({status:404,headers:{'access-control-allow-origin':'*'},body:'{}'});
    let m;
    if(m=/search\?search=([^&]+)/.exec(u)){const g=GEN[decodeURIComponent(m[1]).toUpperCase()];return J({positionMatches:g?[{name:'mane',matches:[{position:g.c+':'+(g.s+1)+'-'+g.e,posName:g.sym+' (NM_TEST.1)',description:g.desc}]}]:[]})}
    const q={};u.split('?')[1].split(';').forEach(p=>{const[k,v]=p.split('=');q[k]=v});
    if(/getData\/sequence/.test(u)){const g=Object.values(GEN).find(g=>g.c==q.chrom);let d='';for(let p=+q.start;p<+q.end;p++)d+=(g&&g.seq(p))||rnd(p);return J({genome:'hg38',chrom:q.chrom,start:+q.start,end:+q.end,dna:d.replace(/[ACGT]/g,(c,i)=>i%7<2?c.toLowerCase():c)})}
    if(q.track=='mane'){const o=Object.values(GEN).filter(g=>g.c==q.chrom&&g.s<+q.end&&g.e>+q.start).map(g=>({chrom:g.c,chromStart:g.s,chromEnd:g.e,name:'ENST_TEST.1',strand:g.strand,thickStart:g.cs,thickEnd:g.ce,blockCount:g.ex.length,blockSizes:g.ex.map(e=>e[1]-e[0]).join(',')+',',chromStarts:g.ex.map(e=>e[0]-g.s).join(',')+',',geneName2:g.sym,ncbiId:'NM_TEST.1',maneStat:'MANE Select'}));return J({mane:o})}
    if(q.track=='encodeCcreCombined'){const g=Object.values(GEN).find(g=>g.c==q.chrom),t=g.strand=='+'?g.s:g.e;return J({encodeCcreCombined:[{chrom:g.c,chromStart:t-150,chromEnd:t+200,name:'EH38E0000001',score:800,encodeLabel:'PLS',ccre:'PLS,CTCF-bound'},{chrom:g.c,chromStart:t-9000,chromEnd:t-8700,name:'EH38E0000002',score:650,encodeLabel:'dELS',ccre:'dELS'}]})}
    if(q.track=='cpgIslandExt'){const g=Object.values(GEN).find(g=>g.c==q.chrom),t=g.strand=='+'?g.s:g.e;return J({cpgIslandExt:g.sym=='USP9X'?[{chrom:g.c,chromStart:t-1000,chromEnd:t+1200,cpgNum:203}]:[]})}
    return J({[q.track]:[]})});return log};
