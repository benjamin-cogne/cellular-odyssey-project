// ================= focus « génétique mendélienne » : étiquettes, fiches, panneau =================
// Actif quand MEN vaut 1 (case de l'écran d'accueil). Les données MG, MGC et MGR sont dans mendel-data.js, généré depuis tools/mendel.tsv
// (associations gène–maladie : PanelApp Australia, gènes « verts »). Rien n'est modifié ni ajouté dans le décor : le nom des gènes flotte
// au-dessus des structures les plus proches dont la fiche a une entrée dans MG.
const MGL=[],
MGO=['crs','c1','c2','c3','c4','c5','mtd','mrb','pdh','rerI','tlc','cnx','srk','pdi','gp','gle'],      // fiches de l'intérieur des organites, absentes de l'atlas
MGP=PD.map(d=>{let q=ma(Nc,d,Rn-.02);return{a:q,b:q,r:.062,i:'npc'}}).concat({a:e0,b:e0,r:.1,i:'tfr'}),      // pores nucléaires et récepteur d'entrée : repérés par leur position, sans collisionneur
mgG=a=>[...new Set(a.map(e=>e[0]))],                                                       // gènes d'une fiche, sans doublon
mgE=e=>'<i>'+esc(e[0])+'</i> — '+esc(e[1])+' ('+e[2]+')',                                  // « gène — maladie (transmission) »
mgF=e=>mgE(e)+(e[3]?' · <a href="https://omim.org/entry/'+e[3]+'" target="_blank" rel="noopener">OMIM '+e[3]+'</a>':'')+(e[4]?' · <a href="https://pubmed.ncbi.nlm.nih.gov/'+e[4]+'/" target="_blank" rel="noopener">PMID '+e[4]+'</a>':''),
mgK=()=>AK.filter(k=>MG[k]).concat(MGO.filter(k=>MG[k]&&I[k]&&!AG[k]));                    // fiches « mendéliennes » de cette cellule
let mgS=[],mgT=0;
for(let i=0;i<6;i++){let e=document.createElement('div');e.className='ql g';e.style.display='none';$('qls').appendChild(e);MGL.push(e)}

// lignes ajoutées à la fiche affichée (appelé par hud)
function mgH(k){let a=MEN&&k&&MG[k];return a?a.map(e=>'🧬 '+mgE(e)).join('<br>'):''}
// maladies liées à l'enzyme de l'étape en cours, dans le panneau des réactions (appelé par rxN)
function mgRx(k,s){let a=MEN&&MGR[k]&&MGR[k][s];if(!a)return;let b=document.createElement('span');b.className='mgr';b.innerHTML=a.map(e=>'🧬 '+mgF(e)).join('<br>');$('pmx').append(b)}
// maladies liées aux protéines de l'étape en cours d'une vue guidée (appelé par sxN)
function mgSx(q,k){let a=MEN&&MGX[q]&&MGX[q][k];if(!a)return;let b=document.createElement('span');b.className='mgr';b.innerHTML=a.map(e=>'🧬 '+mgF(e)).join('<br>');$('pmx').append(b)}
// bouton « 🧬 Génétique » : compteur des fiches vues
function mgN(){let b=$('mgb'),K=MEN?mgK():[];b.style.display=K.length?'block':'none';b.textContent='🧬 Génétique '+K.filter(k=>SN[k]).length+'/'+K.length}

// étiquettes de gènes (appelé à chaque image par tick)
function mgD(){let on=MEN&&go&&!RX&&!NX&&!SX&&!PM&&ct<0,t=performance.now()/1e3,n=0,d,o,c,R;
  if(!on)mgS=[];
  else if(t-mgT>.3){mgT=t;let C=[],rg=20*z+.05,m={},L;        // toutes les 0,3 s : la structure marquée la plus proche de chaque fiche, à portée du vaisseau
    for(L of ORG?[OC]:reg>1?[NU,DN,dyc,LMC,MGP]:reg?[CY,dyc,SYX,MGP]:[OX,SYI,MGP.slice(-1)])for(o of L){if(!MG[o.i])continue;
      c=o.e?o.c:o.a==o.b?o.a:lp(o.a,o.b,.5);R=o.e?max(o.s[0],o.s[1],o.s[2]):ds(o.a,o.b)/2+o.r;d=ds(p,c)-R;d<rg&&C.push([d,o,c,R])}
    C.sort((a,b)=>a[0]-b[0]);mgS=[];for(o of C){if(m[o[1].i])continue;m[o[1].i]=1;mgS.push(o);if(mgS.length>11)break}}
  for([d,o,c,R]of mgS){if(n>=MGL.length)break;let A=c,h=R;if(!o.e&&o.a!=o.b){let ab=sb(o.b,o.a);A=ma(o.a,ab,cl(dt(sb(p,o.a),ab)/(dt(ab,ab)||1),0,1));h=o.r}        // filament : au point le plus proche du vaisseau
    let v=sb(ma(A,vu,min(h,5*z)*1.1+.3*z),E),w=dt(v,vf),x=w>0?fx*dt(v,vr)/w:9,y=w>0?fy*dt(v,vu)/w:9;
    if(abs(x)<.92&&abs(y)<.88){let l=MGL[n++],s='🧬 '+mgG(MG[o.i]).join(' · ');l.style.display='';l.style.left=x*50+50+'%';l.style.top=50-y*50+'%';l.textContent!=s&&(l.textContent=s)}}
  for(;n<MGL.length;n++)MGL[n].style.display='none'}

// panneau « 🧬 Génétique » : il réutilise le cadre de l'atlas (un clic sur un nom pose le repère ◎ et affiche la fiche)
$('mgb').onclick=()=>{if(!go||PM)return;let h='',g,K=mgK();$('ath').textContent='🧬 Génétique mendélienne';
  for(let k of K){let G=AG[k]||'À l\'intérieur des organites';if(G!=g)g=G,h+='<h3>'+g+'</h3>';
    h+='<button class="mg'+(SN[k]?' sn':'')+'" data-k="'+k+'">'+(SN[k]?'✓ ':'○ ')+esc(I[k][0]||k)+'</button><div class="mgl">'+MG[k].map(mgF).join('<br>')+'</div>'}
  $('atl').innerHTML=h;$('atm').textContent=K.filter(k=>SN[k]).length+' structures vues sur '+K.length+' liées à une maladie mendélienne dans cette cellule et son tissu. AD : autosomique dominante ; AR : autosomique récessive ; XL : liée à l\'X. Associations gène–maladie : PanelApp Australia (gènes « verts »). Les voies de réactions marquées 🧬 détaillent leurs enzymes.';
  $('at').style.display='grid';NV=1};
mgN();
