// Revérifie tools/mendel.tsv auprès de PanelApp Australia (réseau requis) : node tools/check-mendel.js
//   pour chaque gène : au moins une entrée « verte » (confidence_level 3) dans un panel ; le numéro OMIM de la ligne doit figurer dans les phénotypes
//   de ces entrées (sinon simple avertissement : PanelApp ne cite pas toujours le numéro) ; la transmission doit être compatible avec celle du gène.
const fs=require('fs'),path=require('path'),API='https://panelapp-aus.org/api/v1/genes/?format=json&entity_name=';
const rows=fs.readFileSync(path.join(__dirname,'mendel.tsv'),'utf8').split('\n').filter(l=>l.trim()&&l[0]!='#').map(l=>l.split('\t')).filter(r=>r[1][0]!='=');
const moi=s=>/^MONO/.test(s)?['AD']:/^BIALL/.test(s)?['AR']:/^BOTH/.test(s)?['AD','AR']:/^X-LINKED/.test(s)?['XL']:[];
(async()=>{const G={};let err=0,warn=0;
  for(const g of[...new Set(rows.map(r=>r[1]))]){let url=API+encodeURIComponent(g),E=[];
    while(url){const d=await(await fetch(url)).json();E=E.concat(d.results);url=d.next}
    G[g]=E.filter(e=>e.entity_type=='gene'&&e.confidence_level=='3')}
  for(const[k,g,mim,m]of rows){const E=G[g],ph=E.flatMap(e=>e.phenotypes).join(' ; '),ms=new Set(E.flatMap(e=>moi(e.mode_of_inheritance)));
    if(!E.length){err++;console.log('✗',k,g,': aucun panel ne classe ce gène en vert')}
    else{if(+mim&&!ph.includes(mim)){warn++;console.log('⚠',k,g,': OMIM',mim,'absent des phénotypes PanelApp')}
      if(ms.size&&!ms.has(m)){err++;console.log('✗',k,g,': transmission',m,'≠',[...ms].join('/'))}}}
  console.log(rows.length,'lignes,',Object.keys(G).length,'gènes :',err,'erreur(s),',warn,'avertissement(s)');process.exit(err?1:0)})();
