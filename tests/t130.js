// quartiers de cellules (places.js) : entrée depuis la carte du cerveau, construction de chaque lieu, fiche de la cellule la plus proche, liste et vol vers une cellule,
// retour à la carte, visite du neurone. Le temps du jeu est avancé à la main. Argument : langue (fr|en)
const {open}=require('./tl.js');const lang=process.argv[2]||'fr';
(async()=>{const {b,pg,errs,ev}=await open(2,{vp:{width:1100,height:620},lang});await pg.waitForTimeout(400);
 await ev(()=>{bnGo(0);return 1});await pg.waitForTimeout(500);
 console.log('portals',await ev(()=>['m1','cb','st','hp','me','mu','ey','th'].map(k=>{let v=bnVw(k);p=bnA(v.q);f=v.f;u=nm(cr(cr(f,[0,1,0]),f));z=v.z;vel=0;for(let i=0;i<8;i++)bnS(.05,SX);let e=$('pmo').querySelector('button');return k+': '+(/^Sh2\d\d$/.test(e.dataset.r)?e.textContent:'—')}).join(' | ')));
 await pg.click('#pmo button[data-r="Sh13"]');console.log('map list',await ev(()=>[...$('pmo').querySelectorAll('button')].slice(0,6).map(b=>b.textContent).join(' | ')));await ev(()=>SXQ.bz.cl(SX,14));
 for(const id of ['cx','cbm','stm','hpm','spm','rtm']){const r=await ev(id=>{let P=BPL[id];SX.pl&&SXQ.bz.cl(SX,16);SXQ.bz.cl(SX,200+P.ix);for(let i=0;i<6;i++)bpS(.05,SX);let K=bpKs(P),near=[];
    let o={title:$('pmt').textContent,spheres:P.L0.ch.map(h=>h.n).join(),tubes:P.L1.ch.map(h=>h.n).join(),colliders:P.C.length,noCard:[...new Set(P.C.map(c=>c.i))].filter(k=>!P.I[k]),nan:P.C.filter(c=>!c.a.every(isFinite)).length};
    for(let k of K){let v=bpVw(P,k);p=ad(P.O,v.q);f=v.f;u=nm(cr(cr(f,[0,1,0]),f));z=v.z;for(let i=0;i<7;i++)bpS(.05,SX);near.push(k+(SX.nk==k?'✓':'→'+SX.nk))}o.near=near.join(' ');
    SXQ.bz.cl(SX,13);o.list=$('pmo').querySelectorAll('button').length-1;SXQ.bz.cl(SX,100);for(let i=0;i<160;i++)bpS(.05,SX);o.flown=SX.nk;sxD();o.labels=QL.filter(e=>e.style.display!='none').length;return o},id);
  console.log(id,JSON.stringify(r));if(id=='rtm'||id=='cbm'){await pg.waitForTimeout(1300);await pg.screenshot({path:'place_'+lang+'_'+id+'.png'})}}
 await ev(()=>SXQ.bz.cl(SX,16));console.log('back on map',await ev(()=>$('pmt').textContent+' | model '+bnCh[0].A+' | places '+BPK.map(P=>P.ok?P.ch[0].A:'-').join('')));
 await ev(()=>{SXQ.bz.cl(SX,200);let P=SX.pl,v=bpVw(P,'py5');p=ad(P.O,v.q);z=v.z;for(let i=0;i<7;i++)bpS(.05,SX);return 1});console.log('neuron button',await ev(()=>[...$('pmo').querySelectorAll('button')].map(b=>b.textContent).join(' / ')));
 await pg.click('#pmo button[data-r="Sh17"]');await pg.waitForTimeout(500);console.log('visit',JSON.stringify(await ev(()=>({SX:SX?1:0,reg,near:+ds(p,e0).toFixed(2),cap:$('cap').textContent.slice(0,70),ship:shp[0].A}))));
 console.log('errors',JSON.stringify(errs));await b.close()})();
