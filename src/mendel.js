// ================= focus « génétique mendélienne » : halos, étiquettes, fiches, panneau =================
// Actif quand MEN vaut 1 (case de l'écran d'accueil). Les données MG, MGC et MGR sont dans mendel-data.js, généré depuis tools/mendel.tsv
// (associations gène–maladie : PanelApp Australia, gènes « verts »). Rien n'est modifié dans le décor : un halo rose translucide est dessiné
// par-dessus les collisionneurs dont la fiche a une entrée dans MG, et le nom des gènes flotte au-dessus des plus proches.
const Lmh=Ly(M3,1e9,0,{al:1,ex:1}),Lmc=Ly(MC,1e9,0,{al:1,ex:1}),dMs=dy(Lmh,140,[0,0,0],1),dMc=dy(Lmc,120,[0,0,0],1),MGL=[],
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
// bouton « 🧬 Génétique » : compteur des fiches vues
function mgN(){let b=$('mgb'),K=MEN?mgK():[];b.style.display=K.length?'block':'none';b.textContent='🧬 Génétique '+K.filter(k=>SN[k]).length+'/'+K.length}

// halos et étiquettes (appelé à chaque image par tick)
function mgD(){let on=MEN&&go&&!RX&&!NX&&!PM&&ct<0,t=performance.now()/1e3,n=0,i,o,c,R;dMs.n=dMc.n=0;
  if(!on)mgS=[];
  else if(t-mgT>.3){mgT=t;let C=[],rg=40*z+.05,m={},L;        // toutes les 0,3 s : structures marquées à portée, les plus proches d'abord, 5 au plus par fiche
    for(L of ORG?[OC]:reg>1?[NU,DN,dyc,LMC,MGP]:reg?[CY,dyc,SYX,MGP]:[OX,SYI,MGP.slice(-1)])for(o of L){if(!MG[o.i])continue;
      c=o.e?o.c:o.a==o.b?o.a:lp(o.a,o.b,.5);R=o.e?max(o.s[0],o.s[1],o.s[2]):ds(o.a,o.b)/2+o.r;let d=ds(p,c)-R;d<rg&&C.push([d,o,c,R])}
    C.sort((a,b)=>a[0]-b[0]);mgS=[];for(o of C){if((m[o[1].i]=(m[o[1].i]||0)+1)>5)continue;mgS.push(o);if(mgS.length>70)break}}
  if(mgS.length){let pu=.5+.5*sin(t*2.6),col=[1.7,.3,1.1,.05+.05*pu],seen={};dMs.c=dMc.c=p;dMs.r=dMc.r=40*z+.1;        // alpha faible : le shader le renforce sur les bords, d'où un liseré plutôt qu'un voile
    for([i,o,c,R]of mgS){col[3]=(.05+.05*pu)*cl(6*z/R,.3,1);        // grosse structure vue de près : halo plus discret, pour ne pas voiler la scène
      if(o.e){let k=1.05,s=o.s,q=sb(E,o.c);if(hypot(dt(q,o.X)/s[0],dt(q,o.Y)/s[1],dt(q,o.Z)/s[2])>k+.02)mgEl(dMs,o,k,col)}        // pas de halo quand la caméra est dedans : il teinterait tout l'écran
      else if(o.a==o.b){let r=o.r*1.05+.0012;ds(E,o.a)>r*1.03&&dS(dMs,o.a,r,col)}
      else{let r=o.r*1.25+.0015,ab=sb(o.b,o.a),q=ma(o.a,ab,cl(dt(sb(E,o.a),ab)/(dt(ab,ab)||1),0,1));if(ds(E,q)>r*1.03)dT(dMc,o.a,o.b,r,col),dS(dMs,o.a,r,col),dS(dMs,o.b,r,col)}
      if(n<MGL.length&&!seen[o.i]&&i<20*z+.05){seen[o.i]=1;let A=c,h=R;if(!o.e&&o.a!=o.b){let ab=sb(o.b,o.a);A=ma(o.a,ab,cl(dt(sb(p,o.a),ab)/(dt(ab,ab)||1),0,1));h=o.r}        // filament : au point le plus proche du vaisseau
        let v=sb(ma(A,vu,min(h,5*z)*1.1+.3*z),E),w=dt(v,vf),x=w>0?fx*dt(v,vr)/w:9,y=w>0?fy*dt(v,vu)/w:9;        // étiquette : la structure la plus proche de chaque fiche
        if(abs(x)<.92&&abs(y)<.88){let l=MGL[n++],s='🧬 '+mgG(MG[o.i]).join(' · ');l.style.display='';l.style.left=x*50+50+'%';l.style.top=50-y*50+'%';l.textContent!=s&&(l.textContent=s)}}}
    up(dMs);up(dMc)}
  for(;n<MGL.length;n++)MGL[n].style.display='none'}
function mgEl(h,o,k,c){if(h.n>=h.cap)return;let f=h.f,i=h.n++*16,q=h.c,X=o.X,Y=o.Y,Z=o.Z,a=o.s[0]*k,b=o.s[1]*k,d=o.s[2]*k;      // ellipsoïde dans un bloc dynamique
  f[i]=X[0]*a;f[i+1]=Y[0]*b;f[i+2]=Z[0]*d;f[i+3]=o.c[0]-q[0];f[i+4]=X[1]*a;f[i+5]=Y[1]*b;f[i+6]=Z[1]*d;f[i+7]=o.c[1]-q[1];f[i+8]=X[2]*a;f[i+9]=Y[2]*b;f[i+10]=Z[2]*d;f[i+11]=o.c[2]-q[2];f[i+12]=c[0];f[i+13]=c[1];f[i+14]=c[2];f[i+15]=c[3]}

// panneau « 🧬 Génétique » : il réutilise le cadre de l'atlas (un clic sur un nom pose le repère ◎ et affiche la fiche)
$('mgb').onclick=()=>{if(!go||PM)return;let h='',g,K=mgK();$('ath').textContent='🧬 Génétique mendélienne';
  for(let k of K){let G=AG[k]||'À l\'intérieur des organites';if(G!=g)g=G,h+='<h3>'+g+'</h3>';
    h+='<button class="mg'+(SN[k]?' sn':'')+'" data-k="'+k+'">'+(SN[k]?'✓ ':'○ ')+esc(I[k][0]||k)+'</button><div class="mgl">'+MG[k].map(mgF).join('<br>')+'</div>'}
  $('atl').innerHTML=h;$('atm').textContent=K.filter(k=>SN[k]).length+' structures vues sur '+K.length+' liées à une maladie mendélienne dans cette cellule et son tissu. AD : autosomique dominante ; AR : autosomique récessive ; XL : liée à l\'X. Associations gène–maladie : PanelApp Australia (gènes « verts »). Les voies de réactions marquées 🧬 détaillent leurs enzymes.';
  $('at').style.display='grid';NV=1};
mgN();
