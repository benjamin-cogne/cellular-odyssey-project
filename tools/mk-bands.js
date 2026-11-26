// Fabrique src/bands-data.js : les bandes G du caryotype humain (UCSC, hg38, piste cytoBand), embarquées dans le jeu.
//   node tools/mk-bands.js [fichier.json]     sans argument : interroge l'API UCSC (NODE_USE_ENV_PROXY=1 derrière un proxy)
// Une chaîne par chromosome (1 à 22, X, Y) : « nom,fin en Mb,coloration » séparés par « ; ».
// Coloration : n = gneg (bande R, claire), 1 à 4 = gpos25 à gpos100 (bandes G de plus en plus sombres), c = acen (centromère), v = gvar (hétérochromatine variable), s = stalk (tige des acrocentriques).
const fs=require('fs'),URL='https://api.genome.ucsc.edu/getData/track?genome=hg38;track=cytoBand',CODE={gneg:'n',gpos25:1,gpos50:2,gpos75:3,gpos100:4,acen:'c',gvar:'v',stalk:'s'};
(async()=>{const d=(process.argv[2]?JSON.parse(fs.readFileSync(process.argv[2],'utf8')):await(await fetch(URL)).json()).cytoBand;let n=0;
  const L=[...Array(22).keys()].map(i=>''+(i+1)).concat('X','Y').map(c=>d['chr'+c].sort((a,b)=>a.chromStart-b.chromStart).map(b=>{n++;if(CODE[b.gieStain]==null)throw b.gieStain;return b.name+','+ +(b.chromEnd/1e6).toFixed(1)+','+CODE[b.gieStain]}).join(';'));
  fs.writeFileSync(__dirname+'/../src/bands-data.js','// Bandes G du caryotype humain — UCSC Genome Browser, hg38, piste cytoBand. Fichier fabriqué par tools/mk-bands.js : ne pas modifier à la main.\nconst BND='+JSON.stringify(L).replace(/","/g,'",\n"')+';\n');
  console.log(n,'bandes ;',L.join('').length,'caractères')})();
