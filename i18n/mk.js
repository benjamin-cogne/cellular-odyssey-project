// assemble i18n/en.json à partir de la liste figée (fr_frozen.json) et des lots traduits (en/bNN.json, clés = indices), plus en/extra.json (clés = texte français)
const fs=require('fs'),fr=require('./fr_frozen.json'),out={S:{},T:{}};let n=0;
for(const f of fs.readdirSync(__dirname+'/en').filter(f=>/^b\d+\.json$/.test(f)).sort()){const b=JSON.parse(fs.readFileSync(__dirname+'/en/'+f,'utf8'));
  for(const k in b){const e=fr[+k];if(!e)throw f+': indice '+k;const m=e[0]?out.T:out.S;if(m[e[1]]!=null&&m[e[1]]!=b[k])throw 'doublon '+k;m[e[1]]=b[k];n++;
    if(e[0]){const a=(e[1].match(/\$\{/g)||[]).length,c=(b[k].match(/\$\{/g)||[]).length;if(a!=c)console.log('⚠ ${} différents',k,a,c)}
    else if(/`|\$\{/.test(b[k]))console.log('⚠ caractère suspect',k)}}
Object.assign(out.S,JSON.parse(fs.readFileSync(__dirname+'/en/extra.json','utf8')));
fr.forEach((e,i)=>{const m=e[0]?out.T:out.S;if(m[e[1]]==null)m[e[1]]=''});       // sans traduction = identique dans les deux langues
fs.writeFileSync(__dirname+'/en.json',JSON.stringify(out));console.log('traduites',n,'sur',fr.length,'; identiques',fr.length-n);
