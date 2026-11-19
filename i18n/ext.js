// i18n : repère les chaînes traduisibles du source (littéraux et gabarits). Utilisé par l'extraction (node i18n/ext.js → dist/i18n-strings.json) et par le build (remplacement).
const acorn=require('acorn');
const isText=s=>{s=s.replace(/<[^>]*>/g,' ');if(/^[A-ZÉÀÈÎ][a-zà-ÿ]{2,}$/.test(s)||/^(hepcidine|promoteur|codant|peroxysome|chromatine)$/.test(s))return true;if(/void main|#version/.test(s))return false;return /[A-Za-zÀ-ÿ]{3}/.test(s)&&(/[ À-ÿ’'′→·]/.test(s)||/^[A-ZÉ][a-zà-ÿ]{2,}/.test(s))&&!/^[#.]?[\w-]+(\s*[,>]\s*[#.]?[\w-]+)*$/.test(s.trim())&&!/^\s*[\w-]+="?[\w-]*"?\s*$/.test(s)};
exports.scan=src=>{const ast=acorn.parse(src,{ecmaVersion:'latest'}),items=[],mol=new Set,smi=[];
  (function fm(n){if(!n||typeof n.type!='string')return;if(n.type=='VariableDeclarator'&&n.id.name=='MOL'&&n.init&&n.init.type=='ObjectExpression')n.init.properties.forEach(p=>{mol.add(p.key.name||p.key.value);const e=p.value.elements&&p.value.elements[1];e&&smi.push(e)});
    for(const k in n){const v=n[k];if(Array.isArray(v))v.forEach(c=>c&&typeof c=='object'&&fm(c));else if(v&&typeof v=='object'&&typeof v.type=='string')fm(v)}})(ast);
  const isRx=s=>s.trim().split(/\s+/).every(w=>mol.has(w.split('*').pop()));
  (function walk(n,par,key,inT){if(!n||typeof n.type!='string')return;
    if(smi.includes(n)){items.push({k:'§smi',s:n.start,e:n.end,smi:1,raw:src.slice(n.start+1,n.end-1)});return}
    if(n.type=='ExpressionStatement'&&n.directive)return;
    if(n.type=='Literal'&&typeof n.value=='string'){if(!inT&&!(par&&par.type=='Property'&&key=='key'&&!par.computed)&&isText(n.value)&&!isRx(n.value))items.push({k:n.value,s:n.start,e:n.end})}
    else if(n.type=='TemplateLiteral'&&!(par&&par.type=='TaggedTemplateExpression')&&!inT){const raw=src.slice(n.start+1,n.end-1);
      if(isText(raw)&&!isRx(raw)){items.push(n.expressions.length?{k:raw,s:n.start,e:n.end,t:1}:{k:n.quasis[0].value.cooked,s:n.start,e:n.end});inT=1}}
    for(const k in n){const v=n[k];if(k=='type')continue;if(Array.isArray(v))v.forEach(c=>c&&typeof c=='object'&&walk(c,n,k,inT));else if(v&&typeof v=='object'&&typeof v.type=='string')walk(v,n,k,inT)}})(ast);
  return items};
if(require.main===module){const fs=require('fs'),it=exports.scan(fs.readFileSync(process.argv[2]||'dist/all.js','utf8')),u=[],seen=new Set,tok=new Set;
  for(const i of it){if(i.smi){(i.raw.match(/\[[^\]]+\]/g)||[]).forEach(t=>tok.add(t));continue}const key=(i.t?'T':'S')+i.k;if(!seen.has(key))seen.add(key),u.push([i.t?1:0,i.k])}
  fs.writeFileSync('dist/i18n-strings.json',JSON.stringify(u));console.log('strings',u.length,'chars',u.reduce((m,e)=>m+e[1].length,0),'templates',u.filter(e=>e[0]).length);console.log('tokens',[...tok].join(' '))}
