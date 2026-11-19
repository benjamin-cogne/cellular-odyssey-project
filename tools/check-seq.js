// Contrôle des séquences embarquées (src/seq) : longueur, cadre de lecture, sites d'épissage GT/AG, signaux du promoteur.
//   node tools/check-seq.js
const fs=require('fs');process.chdir(require('path').join(__dirname,'..','src','seq'));const GC="FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG",B="TCAG";
const tr=c=>{let o='';for(let i=0;i+2<c.length;i+=3)o+=GC[B.indexOf(c[i])*16+B.indexOf(c[i+1])*4+B.indexOf(c[i+2])];return o};
function chk(name,file,up,L,ex,cs,ce){const s=fs.readFileSync(file,'utf8').trim().toUpperCase();console.log(name,'len',s.length,'expected',up+L,/^[ACGT]+$/.test(s));
 const g=s.slice(up);let cds='';ex.forEach(([a,b])=>{cds+=g.slice(Math.max(a,cs),Math.max(Math.min(b,ce),Math.max(a,cs)))});
 const p=tr(cds);console.log(' CDS',cds.length,'aa',p.length-1,'stops inside',(p.slice(0,-1).match(/\*/g)||[]).length,'ends*',p.endsWith('*'),'startM',p[0]);console.log(' protein',p);
 ex.forEach(([a,b],i)=>{if(i<ex.length-1)console.log(' donor',i+1,g.substr(b,2),'acceptor',g.substr(ex[i+1][0]-2,2))});
 console.log(' polyA signal idx',g.lastIndexOf('AATAAA')-L,' first20',g.slice(0,20));return {s,g,cds,p}}
const H=chk('HAMP','hamp.txt',120,2616,[[0,140],[2261,2321],[2410,2616]],50,2515);
const F=chk('FOS','fos.txt',360,3403,[[0,296],[1049,1301],[1732,1840],[1955,3403]],155,2597);
const up=(o,re,n)=>{let m,r=new RegExp(re,'g'),out=[];while(m=r.exec(o.s.slice(0,o.s.length-o.g.length)))out.push(m.index-(o.s.length-o.g.length)+':'+m[0]);console.log(' ',n,out.join(' '))};
up(H,'GGCGCC','HAMP BMP-RE');up(H,'TTC...GAA','HAMP STAT');up(H,'[TC]ATAAA','HAMP TATA');up(H,'CCAAT','HAMP CCAAT');
up(F,'CC[AT]{6}GG','FOS CArG/SRE');up(F,'TGACG','FOS CRE');up(F,'TATAAA','FOS TATA');up(F,'TTCCCGTCAA','FOS SIE');
// HAMP variants: c. positions (1-based in CDS)
const c=(o,n,len)=>o.cds.substr(n-1,len||1),cod=(o,k)=>o.cds.substr((k-1)*3,3)+'='+tr(o.cds.substr((k-1)*3,3));
console.log('HAMP c.166',c(H,166),'codon56',cod(H,56),'| c.175',c(H,175),'codon59',cod(H,59),'| c.208',c(H,208),'codon70',cod(H,70),'| c.212',c(H,212),'codon71',cod(H,71),'| c.93',c(H,93),'around',H.cds.substr(88,10),'| codon 60-84 mature',tr(H.cds.substr(59*3,75)));
console.log('FOS bZIP region aa 137-200',F.p.slice(136,200));
