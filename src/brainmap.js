// ================= carte du cerveau en vol libre =================
// La maquette de brain.js, construite une fois pour toutes loin de la cellule (BNO), que le vaisseau parcourt librement : chaque région, chaque noyau, chaque
// organe a sa fiche (BNI). « Suivre un signal » lance l'un des six parcours de brain.js : le vaisseau se place devant la scène, suit le trajet principal de
// l'étape avec l'impulsion, puis revient ; toute commande de pilotage rend la main au joueur. Vue SXQ.bz du moteur de snrnp.js (pas fs, dessin fd).
// Sur cette carte, une unité du moteur vaut un centimètre.
const BNO=[0,4000,0],Lbm0=Ly(M1,1e9,0,{sx:1,ex:1}),Lbm1=Ly(MW,1e9,0,{sx:1,ex:1}),Lbm2=Ly(M3,1e9,0,{sx:1,ex:1}),BNC=[],bnA=q=>ad(BNO,q),
BNI={bn0:['Carte du cerveau','Une maquette de l\'hémisphère droit, vu par sa face interne, avec le tronc cérébral, la moelle et quelques organes. Approchez le vaisseau d\'une région pour lire sa fiche ; « Suivre un signal » lance un parcours, que le vaisseau accompagne. Formes et emplacements schématiques.'],
 l0:['Lobe frontal','En avant du sillon central. Il prépare et commande le mouvement, garde les buts en tête et pèse les décisions. Parcours : Bouger ; Décider et se contrôler.'],
 l1:['Lobe pariétal','En arrière du sillon central. Il reçoit le toucher et la position du corps, et situe les objets dans l\'espace pour guider le geste. Parcours : Voir.'],
 l2:['Lobe occipital','À l\'arrière du cerveau : le lobe de la vision. Parcours : Voir.'],
 l3:['Lobe temporal','Il reconnaît les objets et les visages, traite les sons, et abrite dans sa profondeur l\'hippocampe et l\'amygdale. Parcours : Voir ; Apprendre et se souvenir.'],
 m1:['Cortex moteur primaire (M1)','Dans le gyrus précentral. Ses grands neurones pyramidaux de la couche 5, dont les cellules de Betz, envoient leur axone jusqu\'à la moelle par le faisceau corticospinal. Parcours : Bouger.'],
 s1:['Cortex somatosensoriel primaire (S1)','Dans le gyrus postcentral, juste derrière le sillon central : il reçoit, par le thalamus, le toucher et la position du corps.'],
 pm:['Aires prémotrices','En avant du cortex moteur : elles assemblent le plan du geste avant son exécution. Parcours : Bouger.'],
 pfc:['Cortex préfrontal','Il garde présent ce qui n\'est plus sous les yeux : c\'est la mémoire de travail. Les aires d\'association, dont il fait partie, sont les dernières à mûrir. Parcours : Décider et se contrôler.'],
 ofc:['Cortex orbitofrontal','À la face inférieure du lobe frontal : il donne une valeur aux options. Parcours : Décider et se contrôler.'],
 v1:['Cortex visuel primaire (V1)','Au pôle occipital, autour de la scissure calcarine. Ses neurones répondent à des bords d\'une orientation précise. Parcours : Voir.'],
 ppc:['Cortex pariétal postérieur','Aboutissement de la voie visuelle dorsale : il situe les objets et guide le geste qui les saisit. Parcours : Voir.'],
 it:['Cortex temporal inférieur','Aboutissement de la voie visuelle ventrale : il reconnaît les objets ; une région du gyrus fusiforme répond sélectivement aux visages. Parcours : Voir.'],
 cb:['Cervelet','Il compare le geste prévu au geste réalisé et corrige l\'erreur. Les cellules de Purkinje sont la seule sortie de son cortex. Parcours : Bouger.'],
 th:['Thalamus','Relais de ce qui monte vers le cortex : le corps genouillé latéral pour la vision, d\'autres noyaux pour le toucher ou le mouvement. Les noyaux gris de la base renvoient aussi leur résultat au cortex par le thalamus.'],
 hy:['Hypothalamus','Il tient le corps en équilibre : soif, horloge, réponse au stress. Il commande l\'hypophyse et le système nerveux autonome. Parcours : Stress ; Tenir le corps en équilibre.'],
 pi:['Hypophyse','Suspendue sous l\'hypothalamus. Sa partie antérieure sécrète l\'ACTH ; sa partie postérieure libère dans le sang la vasopressine, fabriquée par des neurones de l\'hypothalamus. Parcours : Stress ; Tenir le corps en équilibre.'],
 am:['Amygdale','Sans elle, pas de peur apprise. Son noyau central alerte l\'hypothalamus et le tronc cérébral. Parcours : Stress ; Apprendre et se souvenir.'],
 st:['Striatum','Entrée des noyaux gris de la base : il reçoit le cortex et la dopamine. Ses neurones épineux moyens forment la voie directe (récepteur D1) et la voie indirecte (récepteur D2). Parcours : Décider et se contrôler.'],
 gp:['Pallidum','Relais des noyaux gris de la base vers le thalamus. Parcours : Bouger ; Décider et se contrôler.'],
 sn:['Substance noire et aire tegmentale ventrale','Les neurones à dopamine du mésencéphale. Ils signalent l\'erreur de prédiction ; leur perte dans la substance noire cause la maladie de Parkinson. Parcours : Décider et se contrôler.'],
 lgn:['Corps genouillé latéral','Noyau du thalamus où la plupart des axones de la rétine font relais avant le cortex visuel. Parcours : Voir.'],
 pt:['Prétectum','Relais du réflexe de la pupille à la lumière. Parcours : Voir.'],
 ew:['Noyau d\'Edinger-Westphal','Il commande, par le ganglion ciliaire, le muscle qui resserre la pupille. Parcours : Voir.'],
 scn:['Noyau suprachiasmatique','L\'horloge centrale de l\'organisme, remise à l\'heure chaque jour par la lumière. Parcours : Voir.'],
 pn:['Glande pinéale','Elle sécrète la mélatonine ; une lumière vive, le soir ou la nuit, freine cette sécrétion. Parcours : Voir.'],
 pb:['Complexe préBötzinger','Dans le bulbe : il engendrerait le rythme de l\'inspiration. Parcours : Tenir le corps en équilibre.'],
 os:['Osmorécepteurs','Neurones de la paroi antérieure du troisième ventricule : ils détectent la concentration du sang et déclenchent la soif. Parcours : Tenir le corps en équilibre.'],
 lc:['Locus coeruleus','Petit noyau du pont, source de noradrénaline pour le cerveau. Parcours : Apprendre et se souvenir.'],
 hp:['Hippocampe','Porte d\'entrée de la mémoire des faits et des événements ; un circuit à trois synapses, du gyrus denté à l\'aire CA1. Parcours : Apprendre et se souvenir.'],
 tc:['Tronc cérébral','Mésencéphale, pont et bulbe. Les grandes voies y passent entre le cerveau et la moelle ; dans le bulbe, la plupart des axones corticospinaux changent de côté. Le rythme de la respiration y naît.'],
 me:['Moelle épinière','Elle contient les motoneurones, qui commandent les muscles, et les neurones sympathiques, classiquement entre la première vertèbre thoracique et la deuxième lombaire. Parcours : Bouger ; Stress.'],
 ey:[LG?'Eye':'Œil','La rétine compte environ 92 millions de bâtonnets, 4,6 millions de cônes et un million de cellules ganglionnaires, dont les axones forment le nerf optique. Parcours : Voir.'],
 ht:[LG?'Heart':'Cœur','Sous l\'effet de l\'adrénaline, il bat plus vite et plus fort. Parcours : Stress.'],
 lv:['Foie','Sous l\'effet de l\'adrénaline, il dégrade son glycogène et libère du glucose. C\'est l\'organe de l\'hépatocyte que l\'on visite dans ce jeu. Parcours : Stress.'],
 kd:['Rein','La vasopressine y fait retenir l\'eau, par les aquaporines 2 du tube collecteur. Parcours : Tenir le corps en équilibre.'],
 ad:['Glande surrénale','Sa partie centrale libère l\'adrénaline, sur ordre des nerfs sympathiques ; son écorce sécrète le cortisol, sur ordre de l\'ACTH. Parcours : Stress.'],
 lu:['Poumon','Le diaphragme, commandé par le nerf phrénique, le remplit à chaque inspiration. Sous l\'effet de l\'adrénaline, les bronches se dilatent. Parcours : Stress ; Tenir le corps en équilibre.'],
 mu:['Muscle','À la jonction neuromusculaire, l\'acétylcholine déclenche la contraction. Parcours : Bouger.']},
BNK=Object.keys(BNI).slice(1);
[Lsh,Lshc,Lsha].forEach(L=>L.sx=1);      // le vaisseau reste visible dans cette vue
{let c=(a,b,r,i,s)=>BNC.push({a,b,r,i,s}),g=[.62,.56,.52,1],i;
 for(let e of BRM)S(Lbm0,bnA(e[0]),e[1],BRC[e[2]]);
 [[[-.6,-1.6,0],[-.9,-3,0],1,'tc'],[[-.9,-3,0],[-1.2,-4.7,0],1.3,'tc'],[[-1.2,-4.7,0],[-2,-6.9,0],.8,'tc'],[[-2,-6.9,0],[-2.3,-34,0],.45,'me']].forEach(([a,b,r,k])=>{Cy(Lbm1,bnA(a),bnA(b),r,g);c(a,b,r,k)});
 for(i=0;i<8;i++){let a=.35+i*.3,b=a+.3;Cy(Lbm1,bnA([-.3+4*cos(a),-1+3.4*sin(a),0]),bnA([-.3+4*cos(b),-1+3.4*sin(b),0]),.32,[.8,.8,.78,1])}
 for(let k in BRN){let n=BRN[k];S(Lbm2,bnA(n[0]),n[1],kd(kc(n[2]),.8));c(n[0],n[0],n[1],k,1)}
 BRH.forEach(q=>{S(Lbm0,bnA(q),.42,kd(kc(0x4fc47a),.8));c(q,q,.42,'hp',1)});
 for(let k in BRO){let o=BRO[k];S(Lbm2,bnA(o[0]),o[1],kc(o[2]));c(o[0],o[0],o[1],k,1);if(k=='mu')for(let d of[[1.6,-1.4,0],[-1.4,1.3,0]])S(Lbm2,bnA(ad(o[0],d)),1.15,kc(o[2])),c(ad(o[0],d),ad(o[0],d),1.15,k,1)}
 S(Lbm2,bnA(BRE),1.15,[.9,.9,.94,1]);S(Lbm2,bnA(ad(BRE,[1,0,0])),.52,[.3,.5,.7,1]);S(Lbm2,bnA(ad(BRE,[1.34,0,0])),.3,[.02,.02,.03,1]);c(BRE,BRE,1.15,'ey',1);
 for(i=1;i<BRV.length;i++)Cy(Lbm1,bnA(BRV[i-1]),bnA(BRV[i]),.12,[.6,.16,.16,1]);
 fin()}
const bnCh=Lbm0.ch.concat(Lbm1.ch,Lbm2.ch);bnCh.forEach(h=>h.A=0);
let BNS={};try{BNS=JSON.parse(localStorage.oc_bn||'{}')}catch(e){}
const bnQ=()=>sb(p,BNO),bnZ=()=>(z<.95?Math.round(z*10)+' mm':z.toFixed(1).replace('.',LG?'.':',')+' cm'),
// structure la plus proche du vaisseau : noyau, organe, ou région du cortex d'après la bille la plus proche
bnNr=()=>{let q=bnQ(),b=0,lim=.9+2.5*z,bd=1e9,W={},R=max(2,6*z),w=0;for(let o of BNC){let ab=sb(o.b,o.a),t=o.a==o.b?0:cl(dt(sb(q,o.a),ab)/dt(ab,ab),0,1),d=ds(q,ma(o.a,ab,t))-o.r;if(d<lim+.8*o.r&&d<bd)bd=d,b=o.i}if(b)return b;      // un noyau ou un organe tout proche l'emporte
  for(let e of BRM){let d=ds(q,e[0]);if(d<R){let k=e[4][0]||'l'+e[2];W[k]=(W[k]||0)+1/(d+.3)}}for(let k in W)if(W[k]>w)w=W[k],b=k;return b||'bn0'},      // sinon la région du cortex la mieux représentée autour du vaisseau
bnVw=k=>{let O=BNC.filter(o=>o.i==k),o=O[O.length>>1];if(o){let c=lp(o.a,o.b,.5),r=o.r,d=nm([.25,.2,1]);return{q:ma(c,d,r+max(.5,r*1.1)),f:ml(d,-1),z:cl(r*.3,.06,.6),k:2.2}}      // point de vue devant un noyau ou un organe
  let c=BRM.reduce((m,e)=>(e[4][0]||'l'+e[2])==k?[ad(m[0],e[0]),m[1]+1]:m,[[0,0,0],0]);c=ml(c[0],1/c[1]);let d=nm(sb(c,[-.5,.5,-2.5]));return{q:ma(c,d,1.5),f:ml(d,-1),z:.25,k:2.2}},      // ou face à une région du cortex, depuis l'extérieur
// pose de départ de l'étape i d'un parcours : devant la scène, comme dans la vue guidée
bnSv=S=>{let x=S.c[0]/1e3,y=S.c[1]/1e3;return{q:[x-S.z*.9,y+S.z*.25,S.z*3.2],f:nm([.1,-.06,-1]),z:S.z*.12,k:1.8}},
bnAt=(P,s)=>{let L=[0],i;for(i=1;i<P.length;i++)L[i]=L[i-1]+ds(P[i],P[i-1]);s*=L[L.length-1];i=1;while(i<P.length-1&&L[i]<s)i++;return[lp(P[i-1],P[i],(s-L[i-1])/(L[i]-L[i-1]||1)),nm(sb(P[i],P[i-1])),L[L.length-1]]};
// panneau : fiche de la structure la plus proche, ou étape du parcours en cours
function bnPn(M){let R=M.rd,b=rxBtn;$('pm').scrollTop=0;
  if(M.ls==1){$('pmt').textContent='Suivre un signal';$('pmx').textContent='Six parcours. Le vaisseau se place devant la scène, suit le signal le long de son trajet, puis revient ; « Suivant » passe à l\'étape d\'après. Dès que vous touchez aux commandes, vous reprenez la main.';
    $('pmo').innerHTML=BQ.slice(1).map((q,i)=>b(q[1]+' ('+q[2].length+')','Sh'+(i+1))).join('')+b('Retour','Sh14');return}
  if(M.ls==2){$('pmt').textContent='Structures de la carte';$('pmx').textContent=BNK.filter(k=>BNS[k]).length+' vues sur '+BNK.length+'. Touchez un nom : le vaisseau s\'y rend.';
    $('pmo').innerHTML=BNK.map((k,i)=>b((BNS[k]?'✓ ':'○ ')+BNI[k][0],'Sh'+(100+i))).join('')+b('Retour','Sh14');return}
  if(R){let S=R.q[2][R.i],T=R.q[3][R.i],n=R.q[2].length;
    if(!S){$('pmt').textContent=R.q[1]+' — bilan';$('pmx').textContent=R.q[7];$('pmo').innerHTML=b('Rejouer','Sh'+(BQ.indexOf(R.q)))+b('Autre parcours','Sh0')+b('Vol libre','Sh10');return}
    $('pmt').textContent=(R.i+1)+'/'+n+' · '+T[0];$('pmx').textContent=T[2];{let e=document.createElement('b');e.className='pw';e.textContent='◎ '+T[1]+' — ';$('pmx').prepend(e)}
    $('pmo').innerHTML=(R.fr?b('▶ Reprendre le parcours','Sh15'):'')+(R.i?b('◂ Précédent','Sh12'):'')+b('Suivant ▸','Sh11')+b('Vol libre','Sh10');return}
  let c=BNI[M.nk||'bn0'];$('pmt').textContent=c[0]+(LG?' · ship ':' · vaisseau ')+bnZ();$('pmx').textContent=c[1];$('pmo').innerHTML=b('Suivre un signal ▸','Sh0')+b('Structures','Sh13')+b('Quitter la carte','Sq')}
function bnRd(M,q,i){M.ls=0;M.go=0;M.rd=q?{q,i,ph:0,pt:0,at:0,P:0,fr:0}:0;M.pz=0;bnPn(M)}
// pas : pilotage manuel, ou pilote du parcours
function bnS(d,M){let o=(...a)=>a.some(k=>keys[k])|0,jx=cl(o('ArrowRight','KeyD')-o('ArrowLeft','KeyA')+tjx,-1,1),jy=cl(o('ArrowUp','KeyW')-o('ArrowDown','KeyS')+tjy,-1,1),bo=o('ControlLeft','ControlRight','KeyF')|tbo,
   th=cl(o('Space')-o('ShiftLeft','ShiftRight','KeyX')+tth+bo,-1,1),zm=cl(o('KeyE','Equal','NumpadAdd')-o('KeyQ','Minus','NumpadSubtract')+tzm,-1,1),R=M.rd,S=R&&R.q[2][R.i],a=0;
  M.t+=d;if(abs(jx)+abs(jy)+abs(th)>.05){M.go=0;if(R&&S&&!R.fr)R.fr=1,bnPn(M)}
  if(M.go)a=M.go,ds(bnQ(),a.q)<.03+z*.1&&(M.go=0);
  else if(R&&S&&!R.fr&&!M.pz){let V=bnSv(S);R.pt+=d;      // 0 : se placer devant la scène ; 1 : rejoindre le début du trajet ; 2 : le suivre ; 3 : revenir
    if(R.ph==0){a=V;R.pt>4.2&&(R.ph=R.P?1:3,R.pt=0)}
    else if(R.ph==1){let[q,t,L]=bnAt(R.P,0);a={q,f:t,z:cl(L*.035,.07,.5),k:2.4};R.pt>1.8&&(R.ph=2,R.pt=0)}
    else if(R.ph==2){let[,,L]=bnAt(R.P,0),T=cl(L*.5,3.5,8),[q,t]=bnAt(R.P,min(1,R.pt/T));a={q,f:t,z:cl(L*.035,.07,.5),k:7};R.pt>T+.6&&(R.ph=3,R.pt=0)}
    else a=V}
  if(a){let k=min(1,d*a.k);p=lp(p,bnA(a.q),k);f=nm(lp(f,a.f,k));u=nm(cr(cr(f,abs(f[1])>.97?[1,0,0]:[0,1,0]),f));z+=(a.z-z)*min(1,d*2.4);vel=0}
  else{f=rot(f,u,-jx*1.5*d);let r=nm(cr(f,u));f=nm(rot(f,r,jy*1.2*d));u=cr(r,f);z=cl(z*2**(zm*1.5*d),.03,4);BO+=((bo&&th>0?1:0)-BO)*min(1,d*5);TH+=(max(0,th)-TH)*min(1,d*7);
    vel+=((th>0?th*(1+3*BO):th*.5)*z*7-vel)*min(1,d*(4+4*BO));p=ma(p,f,vel*d);let q=bnQ(),r0=z*.42;
    for(let c of BNC)if(c.s){let e=sb(q,c.a),l=ln(e);l<c.r+r0&&(q=ma(c.a,l?ml(e,1/l):[0,1,0],c.r+r0))}      // noyaux et organes : pleins ; le cortex, lui, se traverse
    let e=sb(q,[0,-14,0]),l=ln(e);l>52&&(q=ad([0,-14,0],ml(e,52/l)));p=bnA(q)}
  if(R&&S&&!M.pz){R.at+=d;R.at>S.T*1.45&&(R.at=0);M.ta=min(R.at/S.T,1)}
  if((M.ct=(M.ct||0)+d)>.25&&!R&&!M.ls){M.ct=0;let k=bnNr(),zs=bnZ();if(k!=M.nk||zs!=M.zs){M.nk=k;M.zs=zs;if(k!='bn0'&&!BNS[k]){BNS[k]=1;try{localStorage.oc_bn=JSON.stringify(BNS)}catch(e){}}bnPn(M)}}
  nI=0}
// dessin : étape du parcours, ou noms des structures proches en vol libre
function bnD(M){let R=M.rd,S=R&&R.q[2][R.i];if(S)return S.d(M.ta,S);let q=bnQ(),n=0,s={};
  for(let c of BNC){if(s[c.i]||!c.s||n>9)continue;let m=lp(c.a,c.b,.5);if(ds(q,m)<c.r+5+14*z)s[c.i]=1,n++,sxL(ma(bX(m),vu,c.r+z*.45),BNI[c.i][0],c.i==M.nk?'e':'r')}}
SXQ.bz={S:[{c:[0,0],z:1,T:9,leg:[],d:()=>{}}],T:[['','','']],ti:'Carte du cerveau',solo:1,zx:4,bg:[.035,.04,.07],o:()=>BNO.slice(),fs:bnS,fd:bnD,
 pn:M=>{if(!M.fly){M.fly=1;document.body.classList.remove('rx');document.body.classList.add('fl');      // vol libre : la manette et les boutons de pilotage restent à l'écran
     M.O=BNO.slice();M.X=[1,0,0];M.Y=[0,1,0];M.Z=[0,0,1];M.st=0;bnCh.forEach(h=>h.A=1);shp.forEach(h=>h.A=1);p=bnA([3,3,24]);f=nm([-.1,-.12,-1]);u=nm(cr(cr(f,[0,1,0]),f));cf=f;cu=u;z=.9;vel=0;
     M.rd=0;M.ls=0;M.nk='bn0';if(SXQ.bz.r0){let q=SXQ.bz.r0;SXQ.bz.r0=0;return bnRd(M,q,0)}}bnPn(M)},
 en:M=>{bnCh.forEach(h=>h.A=0);document.body.classList.remove('fl')},
 cl:(M,k)=>{let R=M.rd;if(k==0){M.ls=1;return bnPn(M)}if(k==13){M.ls=2;return bnPn(M)}if(k==14){M.ls=0;return bnPn(M)}if(k==10)return bnRd(M,0);
   if(k>=100){M.ls=0;M.rd=0;M.go=bnVw(BNK[k-100]);M.nk='';return bnPn(M)}if(k<7)return bnRd(M,BQ[k],0);if(!R)return;
   if(k==15){R.fr=0;R.ph=0;R.pt=0;return bnPn(M)}if(k==11||k==12){R.i=cl(R.i+(k==11?1:-1),0,R.q[2].length);R.ph=0;R.pt=0;R.at=0;R.P=0;R.fr=0;bnPn(M)}}};
// le menu du cerveau mène désormais à la carte : en vol libre, ou directement sur un parcours
function bnGo(i){if(!go||PM||RX||NX||AP)return;SX&&sxEnd();SXQ.bz.r0=i?BQ[i]:0;sxGo('bz')}
{const h0=$('pmo').onclick;$('pmo').onclick=e=>{let b=e.target.closest('button'),r=b&&b.dataset.r;if(!r||r[0]!='B')return h0(e);bnGo(+r.slice(1))}}
