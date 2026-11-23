// Outil commun des tests : ouvre le jeu dans Chrome sans écran (rendu logiciel), choisit une cellule et renvoie la page.
//   open(ct,{vp,mobile,file,mock,lang}) → {b,pg,errs,ev} ; ct : 0 érythroblaste, 1 hépatocyte, 2 neurone, 3 cardiomyocyte
//   ev(fn,arg) exécute fn dans la portée interne du jeu (dist/dev.html seulement, via window.__ev)
//   CHROME_PATH=/chemin/vers/chrome pour utiliser un Chrome installé plutôt que le Chromium de Playwright
const path=require('path'),{chromium}=require('playwright');
exports.open=async(ct,opts={})=>{
 const b=await chromium.launch({executablePath:process.env.CHROME_PATH||undefined,args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist','--no-sandbox']});
 const pg=await b.newPage({viewport:opts.vp||{width:844,height:390},...(opts.mobile?{hasTouch:true,isMobile:true,deviceScaleFactor:2}:{})});
 const errs=[];pg.on('pageerror',e=>errs.push('PAGEERR '+e.message+' '+(e.stack||'').split('\n').slice(1,3).join(' ')));
 const mlog=opts.mock?await require('./mock.js').install(pg):[];
 await pg.goto('file://'+path.resolve(__dirname,'..','dist',opts.file||'dev.html')+(opts.lang?'#'+opts.lang:''));await pg.waitForTimeout(800);
 const t0=Date.now();await pg.click('#cc button[data-c="'+ct+'"]');
 await pg.waitForFunction(()=>document.getElementById('ov').style.display=='none'||/Erreur/.test(document.getElementById('ld').textContent),null,{timeout:120000});
 const ld=await pg.evaluate(()=>document.getElementById('ld').textContent);
 const ev=(fn,arg)=>pg.evaluate(([s,a])=>__ev('('+s+')('+JSON.stringify(a===undefined?null:a)+')'),[fn.toString(),arg]);
 return{b,pg,errs,ev,boot:Date.now()-t0,ld,mlog};
};
