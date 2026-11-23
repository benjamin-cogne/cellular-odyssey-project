// Assemble src/*.js et src/shell.html en un seul fichier HTML autonome.
//   node build.js       → dist/dev.html (non minifié, avec le crochet de test window.__ev) et dist/all.js
//   node build.js min   → en plus dist/index.html (minifié avec terser) : c'est le fichier à publier
// La passe de traduction remplace chaque chaîne française traduite par (LG?"anglais":'français') ; voir i18n/.
const fs=require('fs'),path=require('path'),P=(...a)=>path.join(__dirname,...a);
fs.mkdirSync(P('dist'),{recursive:true});
(async()=>{
const rd=f=>fs.readFileSync(P(f),'utf8'),seq=f=>rd(f).trim().toUpperCase();
// ordre de concaténation à l'intérieur de boot(CT,GX) : il compte (déclarations const/let utilisées par les fichiers suivants)
const ORDER=['cells','world','nucleus','chromatin','cell-structures','cardio','synapses','tissues','physics','loop','genes','interact','nucleolus-lamina','reactions','impulse','snrnp','heartbeat','sarcomere','interiors','interiors-text','histone','decode','nucleotides','nucleosome-data','nucleosome','entry','chrfibre','brain','brainmap','places','glia','chromstate','mendel-data','mendel'];
const inner=ORDER.map(f=>rd('src/'+f+'.js')).join('\n').replace('__SEQ0__',seq('src/seq/hbb.txt')).replace('__SEQ1__',seq('src/seq/hamp.txt')).replace('__SEQ2__',seq('src/seq/fos.txt')).replace('__SEQ3__',seq('src/seq/tnnc1.txt'));
const {scan}=require('./i18n/ext.js'),EN=fs.existsSync(P('i18n/en.json'))?JSON.parse(rd('i18n/en.json')):{S:{},T:{}},TOK={'Glycogène':'Glycogen','Protéine':'Protein','ARNt':'tRNA','Cible':'Target','ARN':'RNA','ADN':'DNA','Pompe':'Pump','Myosine':'Myosin','Actine':'Actin'};
let miss=[];
const tr=src=>{const it=scan(src).sort((a,b)=>b.s-a.s);miss=[];       // de la fin vers le début : les positions restent valides
  for(const i of it){let en,o=src.slice(i.s,i.e);
    if(i.smi){en=i.raw.replace(/\[([^\]]+)\]/g,(m,t)=>TOK[t]?'['+TOK[t]+']':m);if(en==i.raw)continue;en='`'+en+'`'}
    else{en=(i.t?EN.T:EN.S)[i.k];if(en==null){miss.push(i.k);continue}if(en===''||en===i.k)continue;en=i.t?'`'+en+'`':JSON.stringify(en)}
    src=src.slice(0,i.s)+'(LG?'+en+':'+o+')'+src.slice(i.e)}
  return src};
const mk=dev=>tr(rd('src/engine.js')+'\nfunction boot(CT,GX){\n'+inner+(dev?'\nwindow.__ev=c=>eval(c);':'')+'\n}\n'+rd('src/start.js'));
const shell=rd('src/shell.html');
fs.writeFileSync(P('dist/dev.html'),shell.replace('/*JS*/',()=>mk(1)));fs.writeFileSync(P('dist/all.js'),mk(1));if(miss.length)console.log('non traduit :',new Set(miss).size,'chaînes');fs.writeFileSync(P('dist/i18n-missing.json'),JSON.stringify([...new Set(miss)]));
if(process.argv[2]){const {minify}=require('terser');
 const r=await minify(mk(0),{toplevel:true,ecma:2020,compress:{passes:3,unsafe:true,unsafe_math:true,unsafe_arrows:true,booleans_as_integers:true},mangle:{toplevel:true},format:{comments:false}});
 const html=shell.replace(/\/\*[^J][^*]*\*\//,'').replace(/\n(?=[#*.@h<c:d])/g,'').replace('/*JS*/',()=>r.code);
 fs.writeFileSync(P('dist/index.html'),html);console.log('min bytes',html.length,'gz',require('zlib').gzipSync(html).length)}
})();
