// ================= quartiers de cellules : six lieux à l'échelle du micromètre, où l'on entre depuis la carte du cerveau =================
// Colonne du cortex, cortex du cervelet, striatum, aire CA1 de l'hippocampe, moelle et muscle, rétine. Chaque lieu est construit à sa première visite
// (géométrie fixe, loin de tout), se parcourt en vaisseau comme la carte (brainmap.js) et donne une fiche à la cellule la plus proche.
// Ici une unité du moteur vaut un micromètre. Le nombre de cellules est très réduit, leur forme est tirée au hasard d'après leur allure réelle.
const BPL={},BPK=[],
BPS={ast:['Astrocyte','Il occupe son propre territoire, où il touche des dizaines de milliers de synapses ; il reprend le glutamate par ses transporteurs GLT-1 et GLAST, et pose ses pieds sur les capillaires.'],
 pv:['Cellule en panier (à parvalbumine)','Un interneurone rapide : son axone enserre le corps des neurones voisins et les freine par le GABA.'],
 cap:['Capillaire','Une paroi étanche : des cellules endothéliales soudées par des jonctions serrées, des péricytes, les pieds des astrocytes. C\'est la barrière hémato-encéphalique.'],
 mgl:['Microglie','La cellule immunitaire du cerveau : ses prolongements inspectent le tissu en permanence.']},
bpPy=(g,sc,ap)=>{let o=[[[0,6*sc,0],[0,ap,0],2.2*sc,0]],i;for(i=0;i<6;i++)bGr(g,[0,ap*(.15+i*.12),0],nm([i%2?1:-1,.5,(g()-.5)*1.4]),34*sc,1.1*sc,2,.9,o);bGr(g,[0,ap,0],[0,1,0],28*sc,1.5*sc,3,1.3,o);
  for(i=0;i<6;i++)bGr(g,[0,-3*sc,0],nm([cos(i*1.05),-.55,sin(i*1.05)]),38*sc,1.3*sc,3,.9,o);return o},
bpAs=g=>{let o=[];for(let i=0;i<10;i++)bGr(g,[0,0,0],nm([cos(i*.63)*sqrt(1-(i/5-1)**2*.6),i/5-1,sin(i*.63)]),13,1.3,3,1.5,o);return o},
bpMg=g=>{let o=[];for(let i=0;i<6;i++)bGr(g,[0,0,0],nm([cos(i*1.05),sin(i*1.05),(g()-.5)*1.2]),13,.9,3,1.3,o);return o},
bpMk=(id,n,from,st,z0,R,I,lab,build,dyn)=>{let P={id,n,from,st,z0,R,I:Object.assign({},BPS,I),lab,build,dyn,C:[],O:[9000+BPK.length*5000,9000,0],L0:Ly(M2,1e9,0,{sx:1,ex:1}),L1:Ly(MD,1e9,0,{sx:1,ex:1}),ix:BPK.length};BPL[id]=P;BPK.push(P)},
bpOf=k=>BPK.find(P=>P.from.includes(k));
const cA=0x8fbf6a,cPV=0x2fd07a,cGd=0xe8b04a,cRd=[.55,.16,.16,1];
bpMk('cx','Colonne du cortex','l0,l1,l2,l3,m1,s1,pm,pfc,ofc,v1,ppc,it'.split(','),[60,520,560],9,1500,
 {cx:['Colonne du cortex','Une tranche du cortex cérébral, de la surface (en haut) à la substance blanche (en bas) : de 1 à 4,5 mm d\'épaisseur selon la région, six couches. La couche 4 reçoit le thalamus ; les couches 2 et 3 parlent aux autres aires du cortex ; la couche 5 commande les centres situés plus bas ; la couche 6 répond au thalamus. Le nombre de cellules est très réduit pour rester lisible.'],
  py3:['Neurone pyramidal des couches 2 et 3','Son axone rejoint surtout d\'autres aires du cortex ; sa dendrite apicale monte jusqu\'à la couche 1. Un neurone pyramidal humain de ces couches reçoit de l\'ordre de 30 000 synapses excitatrices.'],
  py5:['Neurone pyramidal de la couche 5','Les grands neurones de sortie du cortex : leur axone part vers le tronc cérébral et la moelle. Dans le cortex moteur, les plus grands sont les cellules de Betz. C\'est un neurone pyramidal que l\'on visite dans ce jeu.'],
  sst:['Cellule de Martinotti (à somatostatine)','Son axone monte jusqu\'à la couche 1 freiner l\'extrémité des dendrites apicales.'],
  vip:['Cellule à VIP','Elle inhibe d\'autres interneurones, et lève ainsi le frein qu\'ils exerçaient.'],
  chc:['Cellule en chandelier','Ses terminaisons, alignées comme des bougies, visent le segment initial de l\'axone des neurones pyramidaux, là où naît le potentiel d\'action.'],
  oli:['Oligodendrocyte','Il enroule sa membrane autour de segments de nombreux axones, jusqu\'à une cinquantaine : c\'est la myéline.'],
  my:['Manchon de myéline','Entre deux manchons, au nœud de Ranvier, l\'axone concentre ses canaux sodiques Nav1.6 : le potentiel d\'action saute de nœud en nœud.']},
 [[[-430,1190,0],'couche 1'],[[-430,800,0],'couches 2 et 3'],[[-430,330,0],'couche 4'],[[-430,-100,0],'couche 5'],[[-430,-600,0],'couche 6'],[[-430,-1150,0],'substance blanche']],
 (A,g,P)=>{let i,j,p0;for(i=-6;i<=6;i++)for(j=-4;j<=4;j++)A.s([i*60,1262,j*60],26,[.5,.47,.5,1]);
  A.t([180,1250,-60],[150,320,-40],4.6,cRd,'cap');A.t([150,320,-40],[190,-760,-80],4,cRd,'cap');A.t([150,320,-40],[-210,140,70],3.2,cRd,'cap');
  for(i=0;i<5;i++){let o=[(i-2)*110+(g()-.5)*50,720+g()*200,(g()-.5)*300];p0=p0||o;A.tr(bpPy(g,.7,1190-o[1]),o,kc(0x6f9be8),'py3');A.s(o,8,kc(0x5a86d8),'py3',1);A.t(ad(o,[0,-6,0]),[o[0]+20,-1280,o[2]],.6,kc(cGd),'py3')}
  for(i=0;i<3;i++){let o=[(i-1)*240+(g()-.5)*60,-120+g()*80,(g()-.5)*240],e=[o[0],-1290,o[2]];A.tr(bpPy(g,1.25,1170-o[1]),o,kc(0x4f7fd8),'py5');A.s(o,14,kc(0x3f6fd8),'py5',1);A.t(ad(o,[0,-12,0]),e,1,kc(cGd),'py5');P.ax.push([ad(o,[0,-12,0]),e]);
    for(j=0;j<8;j++)A.t([o[0],-520-j*92,o[2]],[o[0],-602-j*92,o[2]],2.6,[.86,.88,.84,1],'my');A.t([0,-820,0],[o[0],-700,o[2]],.6,kc(0x6fbf8a),'oli')}
  A.s([0,-820,0],6.5,kc(0x6fbf8a),'oli',1);
  for(let[o,d]of[[[60,760,40],[-1,-.2,0]],[[-150,-60,-30],[1,.1,0]]]){A.s(o,7,kc(cPV),'pv',1);A.tr(bGr(g,[0,0,0],d,26,.9,4,1.5,[]),o,kc(cPV),'pv')}
  {let o=[-90,420,-80],c=kc(0xf2a03c);A.s(o,7,c,'sst',1);A.t(o,[-70,1130,-60],.8,c,'sst');A.tr(bGr(g,[0,0,0],[0,1,0],36,.8,3,1.8,[]),[-70,1130,-60],c,'sst')}
  {let o=[230,900,90],c=kc(0x9a7cf0),T=[];bGr(g,[0,6,0],[0,1,0],50,.9,2,.5,T);bGr(g,[0,-6,0],[0,-1,0],60,.9,2,.5,T);A.s(o,6,c,'vip',1);A.tr(T,o,c,'vip');A.t(ad(o,[0,-126,0]),[-90,430,-80],.6,kc(0xb99af4),'vip')}
  {let o=ad(p0,[70,-90,60]),c=kc(0x86d0f0);A.s(o,6,c,'chc',1);A.t(o,ad(p0,[3,-14,0]),.6,c,'chc');for(i=0;i<6;i++)A.s(ad(p0,[i%2?2.6:-2.6,-12-i*3.4,0]),1.4,c,'chc')}
  for(let[o,e]of[[[110,520,-10],[152,520,-42]],[[-160,60,40],[-190,150,66]],[[200,-420,-60],[178,-420,-76]]]){A.tr(bpAs(g),o,kc(cA),'ast',.4,3);A.s(o,6.5,kd(kc(cA),.8),'ast',1);A.t(o,e,1,kc(cA),'ast');A.s(e,5,kc(cA),'ast')}
  for(let o of[[-40,250,150],[90,-300,110]]){A.tr(bpMg(g),o,kc(0xe07a8a),'mgl',.4,2);A.s(o,4.6,kc(0xc0506a),'mgl',1)}},
 (P,t)=>{P.ax.forEach((a,i)=>brP(a,t*.5+i*.3,[1,.85,.25,1],4,2))});
bpMk('cbm','Cortex du cervelet',['cb'],[0,120,520],9,700,
 {cbm:['Cortex du cervelet','Trois couches : en haut, la couche moléculaire, où s\'étalent les arbres des cellules de Purkinje ; au milieu, la rangée de leurs corps cellulaires ; en bas, la couche des grains.'],
  pk:['Cellule de Purkinje','Son arbre dendritique s\'étale dans un seul plan. C\'est la seule sortie du cortex du cervelet, et elle est inhibitrice : son axone gagne les noyaux profonds du cervelet. Elle reçoit de l\'ordre de 175 000 synapses de fibres parallèles (mesuré chez le rat).'],
  gr:['Grain','Les neurones les plus nombreux du cerveau : un petit corps cellulaire, quatre courtes dendrites, et un axone qui monte se diviser en T.'],
  pf:['Fibres parallèles','Les axones des grains, après leur division en T : elles traversent à angle droit les arbres des cellules de Purkinje.'],
  cf:['Fibre grimpante','Une seule par cellule de Purkinje, enroulée sur ses dendrites. Elle signale les erreurs du mouvement et affaiblit durablement les synapses des fibres parallèles actives à ce moment.'],
  mli:['Interneurones de la couche moléculaire','Cellules étoilées et cellules en panier, à GABA : elles freinent les cellules de Purkinje.']},
 [[[-330,200,0],'couche moléculaire'],[[-330,0,0],'cellules de Purkinje'],[[-330,-200,0],'couche des grains']],
 (A,g,P)=>{let i,j,o,T,c=kc(0xf2a03c);for(i=0;i<3;i++)for(j=0;j<2;j++){o=[(i-1)*150,0,(j-.5)*90];T=[];bGr(g,[0,12,0],[0,1,0],46,2.8,7,1.7,T,1);A.tr(T,o,kc(0xb48ad6),'pk');A.s(o,13,kc(0x9a7cf0),'pk',1);A.t(ad(o,[0,-12,0]),[o[0],-420,o[2]],1,kc(cGd),'pk')}
  A.t([-140,-420,-45],[-146,24,-45],.9,c,'cf');A.t([-146,24,-45],[-186,160,-45],.9,c,'cf');A.t([-146,24,-45],[-112,176,-45],.9,c,'cf');P.ax.push([[-140,-420,-45],[-146,24,-45],[-186,160,-45]]);
  for(i=0;i<70;i++){let x=(g()-.5)*520,y=-60-g()*260,z=(g()-.5)*240,h=40+g()*250;A.s([x,y,z],3.4,kc(0x4fc4a0),'gr',1);A.t([x,y,z],[x,h,z],.45,kc(0x4fc4a0));A.t([x,h,-300],[x,h,300],.45,kc(0x7fdcc0),i%3?0:'pf');i<3&&P.ax.push([[x,y,z],[x,h,z],[x,h,300]])}
  for(i=0;i<4;i++){o=[(g()-.5)*400,60+g()*200,(g()-.5)*160];A.s(o,5,kc(cPV),'mli',1);A.tr(bGr(g,[0,0,0],nm([g()-.5,-.3,g()-.5]),22,.7,3,1.5,[]),o,kc(cPV),'mli')}},
 (P,t)=>{P.ax.forEach((a,i)=>brP(a,t*.5+i*.27,i?[.5,1,.85,1]:[1,.6,.2,1],3,2))});
bpMk('stm','Striatum',['st'],[0,40,520],8,620,
 {stm:['Striatum','Un tissu sans couches : des neurones épineux moyens, entre lesquels passent les axones du cortex et se ramifient ceux des neurones à dopamine.'],
  d1:['Neurone épineux moyen à récepteur D1','Voie directe : il facilite l\'action choisie. Environ 95 % des neurones du striatum sont des neurones épineux moyens (mesuré chez la souris).'],
  d2:['Neurone épineux moyen à récepteur D2','Voie indirecte : il retient les actions concurrentes.'],
  da:['Axone à dopamine','Venu de la substance noire, il se ramifie à l\'extrême : chez le rat, un seul couvre en moyenne 2,7 % du striatum. Il délivre le signal d\'erreur de prédiction.'],
  cxa:['Axones du cortex','Ils apportent au striatum, par le glutamate, le contexte et les actions possibles.']},[],
 (A,g,P)=>{let i,j;for(i=0;i<8;i++){let o=[(g()-.5)*420,(g()-.5)*320,(g()-.5)*260],k=i%2?'d1':'d2',c=kc(i%2?0x5aa0e0:0x35c9b8),T=[];for(j=0;j<7;j++)bGr(g,[0,0,0],nm([cos(j*.9),sin(j*.9)*.8,(g()-.5)*1.4]),34,1.4,3,1,T);A.tr(T,o,c,k);A.s(o,8,kd(c,.8),k,1)}
  for(i=0;i<2;i++){let T=[];bGr(g,[i?260:-280,-260,i?80:-60],nm([i?-1:1,.8,0]),50,.7,9,1.3,T);A.tr(T,[0,0,0],kc(0x9a7cf0),'da',.45,4)}
  for(i=0;i<6;i++){let y=(g()-.5)*300,z=(g()-.5)*240,a=[[-340,y,z],[340,y+(g()-.5)*80,z]];A.t(a[0],a[1],.6,kc(0xf2a03c),'cxa');i<3&&P.ax.push(a)}
  {let o=[150,-120,120];A.tr(bpAs(g),o,kc(cA),'ast',.4,3);A.s(o,6.5,kd(kc(cA),.8),'ast',1)}},
 (P,t)=>{P.ax.forEach((a,i)=>brP(a,t*.5+i*.3,[1,.63,.24,1],3,2))});
bpMk('hpm','Hippocampe : aire CA1',['hp'],[0,120,470],8,620,
 {hpm:['Hippocampe : aire CA1','Les corps des neurones pyramidaux sont rangés en une seule couche. Au-dessus, leurs dendrites apicales reçoivent les collatérales de Schaffer ; en dessous s\'étalent leurs dendrites basales.'],
  ca1:['Neurone pyramidal de CA1','Dernière étape du circuit à trois synapses de l\'hippocampe ; son axone retourne vers le cortex. Chez le rat, certains de ces neurones ne s\'activent qu\'en un lieu précis : ce sont des cellules de lieu.'],
  sch:['Collatérales de Schaffer','Les axones des neurones pyramidaux de CA3 : ils font synapse sur les épines des dendrites apicales de CA1. La potentialisation à long terme s\'étudie sur ces synapses.'],
  syn:['Une synapse qui apprend','Le récepteur NMDA ne laisse entrer le calcium que si le glutamate arrive sur une membrane déjà dépolarisée ; le calcium active la kinase CaMKII, et de nouveaux récepteurs AMPA sont insérés. Une synapse se visite de près dans le neurone de ce jeu : bouton « ⚡ Suivre un influx nerveux ».']},
 [[[-300,200,0],'dendrites apicales'],[[-300,0,0],'corps cellulaires'],[[-300,-110,0],'dendrites basales']],
 (A,g,P)=>{let i,j;for(i=0;i<7;i++){let o=[(i-3)*46,(g()-.5)*14,(g()-.5)*60];A.tr(bpPy(g,.8,330),o,kc(0x6f9be8),'ca1');A.s(o,9,kc(0x5a86d8),'ca1',1);A.t(ad(o,[0,-8,0]),[o[0]+80,-210,o[2]],.6,kc(cGd),'ca1')}
  for(i=0;i<8;i++){let y=120+i*22,z=(g()-.5)*100,a=[[-320,y,z],[320,y+(g()-.5)*30,z]];A.t(a[0],a[1],.6,kc(0xf2a03c),'sch');for(j=0;j<6;j++)A.s([-250+j*100+(g()-.5)*40,y,z],1.6,kc(0xffc070));i<3&&P.ax.push(a)}
  A.s([8,186,6],3.4,[2.4,1.8,.5,1],'syn',1);
  {let o=[140,-20,50];A.s(o,7,kc(cPV),'pv',1);A.tr(bGr(g,[0,0,0],[-1,.1,0],26,.9,4,1.2,[]),o,kc(cPV),'pv')}
  {let o=[-170,150,90];A.tr(bpAs(g),o,kc(cA),'ast',.4,3);A.s(o,6.5,kd(kc(cA),.8),'ast',1)}},
 (P,t)=>{P.ax.forEach((a,i)=>brP(a,t*.5+i*.3,[1,.63,.24,1],3,2))});
bpMk('spm','De la moelle au muscle',['me','mu'],[60,60,640],12,1100,
 {spm:['De la moelle au muscle','À gauche, la corne antérieure de la moelle ; à droite, le muscle. Le nerf qui les relie, long de plusieurs dizaines de centimètres en réalité, est ici très raccourci.'],
  mn:['Motoneurone α','Son corps cellulaire mesure environ 40 µm (mesuré chez le rat). Avec les fibres musculaires qu\'il innerve, il forme une unité motrice.'],
  csa:['Axone corticospinal','Venu du cortex moteur, il a changé de côté dans le bulbe ; il excite le motoneurone.'],
  max:['Axone moteur','Myélinisé : chez l\'humain, les plus rapides conduisent à 50 ou 60 mètres par seconde.'],
  nmj:['Jonction neuromusculaire','L\'acétylcholine libérée par la terminaison ouvre les récepteurs nicotiniques de la fibre musculaire, concentrés aux crêtes des replis de sa membrane : un potentiel d\'action naît dans la fibre. Chaque fibre ne reçoit qu\'une jonction.'],
  mf:['Fibre musculaire','Une cellule géante à plusieurs noyaux. Son potentiel d\'action gagne les tubules T, où le canal Cav1.1, couplé à RyR1, fait libérer le calcium ; les sarcomères raccourcissent. Les stries dessinées ici sont très grossies.']},
 [[[-420,170,0],'moelle : corne antérieure'],[[0,-20,0],'nerf (très raccourci)'],[[620,60,0],'muscle']],
 (A,g,P)=>{let i,j,o=[-420,0,0],T=[],c=kc(0x6f9be8);for(i=0;i<7;i++)bGr(g,[0,0,0],nm([cos(i*.9),sin(i*.9),(g()-.5)*1.2]),60,2.4,4,1,T);A.tr(T,o,c,'mn');A.s(o,20,kc(0x5a86d8),'mn',1);
  A.t([-520,440,0],[-470,90,10],1,kc(0xf2a03c),'csa');for(i=0;i<3;i++)A.s([-468+i*10,84-i*22,8],3,kc(0xffc070),'csa');
  A.t([-402,-8,0],[-300,-60,0],1.6,kc(cGd),'max');for(i=0;i<8;i++)A.t([-296+i*76,-60,0],[-226+i*76,-60,0],3.4,[.86,.88,.84,1],'max'),A.s([-223+i*76,-60,0],1.6,[2.4,2,.4,1]);A.t([-300,-60,0],[312,-60,0],1.2,kc(cGd));
  for(i=0;i<3;i++){let y=-60+(i-1)*74;A.t([330,y,0],[900,y,0],28,kc(0xb8504a),'mf');for(j=0;j<46;j++)A.t([336+j*12.2,y,0],[337.4+j*12.2,y,0],28.5,[.45,.16,.16,1]);for(j=0;j<5;j++)A.s([400+j*110,y+27,(j%2?10:-10)],5.5,kc(0x8a5ad0),'mf')}
  for(i=0;i<3;i++){A.t([312,-60,0],[352+i*16,-30,8],.9,kc(cGd),'nmj');A.s([352+i*16,-30,8],5,kc(cGd),'nmj',1);for(j=0;j<4;j++)A.s([348+i*16+j*3,-34,6],1.2,[1,.5,.7,1])}
  P.ax.push([[-520,440,0],[-470,90,10]],[[-402,-8,0],[-300,-60,0],[312,-60,0],[368,-30,8]])},
 (P,t)=>{brP(P.ax[0],t*.6,[1,.63,.24,1],4,2);brP(P.ax[1],t*.45,[1,.85,.25,1],4,3)});
bpMk('rtm','Rétine',['ey'],[20,60,330],6,460,
 {rtm:['Rétine','La lumière arrive par le haut et traverse toute la rétine avant d\'atteindre les photorécepteurs, tout en bas, contre l\'épithélium pigmentaire. Le message, lui, remonte : photorécepteurs, cellules bipolaires, cellules ganglionnaires, dont les axones partent vers le nerf optique.'],
  rod:['Bâtonnet','Vision dans la pénombre : il peut répondre à un seul photon. Éclairé, il s\'hyperpolarise et libère moins de glutamate. La rétine humaine en compte environ 92 millions.'],
  cone:['Cône','Vision de jour et des couleurs : trois types chez l\'humain. La rétine humaine en compte environ 4,6 millions.'],
  bip:['Cellule bipolaire','Elle relie les photorécepteurs aux cellules ganglionnaires. Il en existe deux familles, ON et OFF.'],
  hor:['Cellules horizontales et amacrines','Elles relient latéralement les cellules voisines : les horizontales du côté des photorécepteurs, les amacrines du côté des cellules ganglionnaires. Les horizontales assurent une inhibition latérale.'],
  rgc:['Cellule ganglionnaire','La seule sortie de la rétine : environ un million d\'axones forment le nerf optique.'],
  ipr:['Cellule ganglionnaire à mélanopsine','Elle est elle-même sensible à la lumière ; elle renseigne l\'horloge centrale et contribue au réflexe de la pupille.'],
  rpe:['Épithélium pigmentaire','Les photorécepteurs y appuient leur extrémité sensible à la lumière. Il régénère le pigment visuel et digère chaque jour le bout usé de cette extrémité.']},
 [[[-150,150,0],'cellules ganglionnaires'],[[-150,48,0],'cellules bipolaires'],[[-150,-40,0],'photorécepteurs'],[[-150,-112,0],'épithélium pigmentaire'],[[0,250,0],'lumière']],
 (A,g,P)=>{let i,j,x,z;for(i=-8;i<=8;i++)for(j=-2;j<=2;j++)A.s([i*14,-112,j*14],8,kc(0x5a3a2a),'rpe',1);
  for(i=-8;i<=8;i++)for(j=-1;j<=1;j++){x=i*12+(g()-.5)*3;z=j*13;let co=(i+j+16)%5==0,k=co?'cone':'rod',c=kc(co?0xe07a5a:0x8fa3d8);
    if(co)A.t([x,-100,z],[x,-84,z],1.1,c,k),A.t([x,-84,z],[x,-44,z],2.4,c,k);else A.t([x,-102,z],[x,-62,z],1,c,k),A.t([x,-62,z],[x,-42,z],1.5,c,k);A.s([x,-30+(i%2?4:-3),z],3.2,kd(c,.85),k,1);A.t([x,-26,z],[x,0,z],.4,c);A.s([x,2,z],1.6,c)}
  for(i=0;i<10;i++){x=-96+i*21;z=(g()-.5)*24;A.s([x,46,z],4,kc(0x4fc4a0),'bip',1);A.t([x,46,z],[x,6,z],.5,kc(0x4fc4a0),'bip');A.t([x,46,z],[x,112,z],.5,kc(0x4fc4a0),'bip');A.s([x,112,z],1.6,kc(0x7fdcc0))}
  for(i=0;i<2;i++){x=i?50:-50;A.s([x,16,6],5,kc(0xf2a03c),'hor',1);for(j=0;j<4;j++)A.t([x,16,6],[x+(j-1.5)*26,8,6+(j%2?8:-8)],.5,kc(0xf2a03c),'hor');A.s([x+10,92,-6],5,kc(0xc078d0),'hor',1);for(j=0;j<4;j++)A.t([x+10,92,-6],[x+10+(j-1.5)*26,112,-6+(j%2?8:-8)],.5,kc(0xc078d0),'hor')}
  for(i=0;i<4;i++){x=-90+i*58;let k=i==2?'ipr':'rgc',c=kc(i==2?0x4cc7f2:cGd),T=[];bGr(g,[0,-8,0],[0,-1,0],14,1,3,1.6,T);A.tr(T,[x,150,0],c,k);A.s([x,150,0],8,c,k,1);A.t([x,158,0],[x+14,176+i*3,0],.7,c,k);A.t([x+14,176+i*3,0],[330,176+i*3,0],.7,c,k);i<2&&P.ax.push([[x,150,0],[x+14,176+i*3,0],[330,176+i*3,0]])}},
 (P,t)=>{let g=wyG(4);for(let i=0;i<14;i++){let u=(t*.3+g())%1;bS([(g()-.5)*190,250-350*u,(g()-.5)*24],1.3,[2.6,2.3,.8,1])}P.ax.forEach((a,i)=>brP(a,t*.5+i*.3,[1,.85,.25,1],2.4,2))});
// ---- entrée, vol, fiches, sortie : en surcouche de la carte du cerveau (SXQ.bz) ----
const bpQ=M=>sb(p,M.O),bpKs=P=>Object.keys(P.I).filter(k=>k!=P.id&&P.C.some(c=>c.i==k)),
bpNr=M=>{let P=M.pl,q=bpQ(M),b=P.id,bd=max(16,7*z);for(let o of P.C){let ab=sb(o.b,o.a),t=o.a==o.b?0:cl(dt(sb(q,o.a),ab)/dt(ab,ab),0,1),d=ds(q,ma(o.a,ab,t))-o.r-(o.s?min(12,o.r):0);if(d<bd)bd=d,b=o.i}return b},
bpVw=(P,k)=>{let O=P.C.filter(o=>o.i==k&&o.s).sort((a,b)=>b.a[2]-a.a[2]),o=O[0]||P.C.find(o=>o.i==k),      // la cellule la plus en avant, pour que rien ne la masque
  c=lp(o.a,o.b,.5),r=o.r,d=nm([.2,.15,1]);return{q:ma(c,d,r+(o.s?max(10,r*1.2):4)),f:ml(d,-1),z:cl(r*.4,1.5,8),k:2.2}};
function bpIn(M,P){if(!P.ok){P.ax=[];P.L0.k=new Map;P.L1.k=new Map;      // fin() a déjà clos ces couches, encore vides : on les rouvre
  let g=wyG(P.ix*17+5),O=P.O,C=P.C;P.build({s:(q,r,c,k,sl)=>{S(P.L0,ad(O,q),r,c);k&&C.push({a:q,b:q,r,i:k,s:sl})},t:(a,b,r,c,k)=>{Cy(P.L1,ad(O,a),ad(O,b),r,c);k&&C.push({a,b,r,i:k})},
      tr:(T,o,c,k,mn=.5,ev=2)=>T.forEach(([a,b,r],j)=>{a=ad(o,a);b=ad(o,b);Cy(P.L1,ad(O,a),ad(O,b),max(r,mn),c);k&&j%ev==0&&C.push({a,b,r:max(r,mn),i:k})})},g,P);fin();P.ch=P.L0.ch.concat(P.L1.ch);P.ok=1}
  M.bk={p,f,u,z};M.pl=P;M.rd=0;M.ls=0;M.go=0;M.nk=P.id;M.O=P.O.slice();bnCh.forEach(h=>h.A=0);P.ch.forEach(h=>h.A=1);p=ad(P.O,P.st);f=nm(sb([0,P.st[1]*.6,0],P.st));u=nm(cr(cr(f,[0,1,0]),f));cf=f;cu=u;z=P.z0;vel=0;bpPn(M)}
function bpOut(M){let P=M.pl,b=M.bk;P.ch.forEach(h=>h.A=0);bnCh.forEach(h=>h.A=1);M.pl=0;M.O=BNO.slice();p=b.p;f=b.f;u=b.u;z=b.z;cf=f;cu=u;vel=0;M.nk='';M.ls=0;bnPn(M)}
function bpPn(M){let P=M.pl,b=rxBtn,K=bpKs(P);$('pm').scrollTop=0;
  if(M.ls==2){$('pmt').textContent=P.n;$('pmx').textContent='Touchez un nom : le vaisseau s\'y rend.';$('pmo').innerHTML=K.map((k,i)=>b(P.I[k][0],'Sh'+(100+i))).join('')+b('Retour','Sh14');return}
  let c=P.I[M.nk]||P.I[P.id];$('pmt').textContent=c[0]+(LG?' · ship ':' · vaisseau ')+fm(z);$('pmx').textContent=c[1];
  $('pmo').innerHTML=(P.id=='cx'&&/py/.test(M.nk)?b('Visiter ce neurone ▸','Sh17'):'')+b('Cellules de ce lieu','Sh13')+b('Retour à la carte','Sh16')}
function bpS(d,M){let o=(...a)=>a.some(k=>keys[k])|0,jx=cl(o('ArrowRight','KeyD')-o('ArrowLeft','KeyA')+tjx,-1,1),jy=cl(o('ArrowUp','KeyW')-o('ArrowDown','KeyS')+tjy,-1,1),bo=o('ControlLeft','ControlRight','KeyF')|tbo,
   th=cl(o('Space')-o('ShiftLeft','ShiftRight','KeyX')+tth+bo,-1,1),zm=cl(o('KeyE','Equal','NumpadAdd')-o('KeyQ','Minus','NumpadSubtract')+tzm,-1,1),P=M.pl,a=M.go;
  M.t+=d;if(abs(jx)+abs(jy)+abs(th)>.05)a=M.go=0;
  if(a){let k=min(1,d*a.k);p=lp(p,ad(P.O,a.q),k);f=nm(lp(f,a.f,k));u=nm(cr(cr(f,[0,1,0]),f));z+=(a.z-z)*min(1,d*2.4);vel=0;ds(bpQ(M),a.q)<1+z*.1&&(M.go=0)}
  else{f=rot(f,u,-jx*1.5*d);let r=nm(cr(f,u));f=nm(rot(f,r,jy*1.2*d));u=cr(r,f);z=cl(z*2**(zm*1.5*d),.3,40);BO+=((bo&&th>0?1:0)-BO)*min(1,d*5);TH+=(max(0,th)-TH)*min(1,d*7);
    vel+=((th>0?th*(1+3*BO):th*.5)*z*7-vel)*min(1,d*(4+4*BO));p=ma(p,f,vel*d);let q=bpQ(M),r0=z*.42,l=ln(q);
    for(let c of P.C)if(c.s){let e=sb(q,c.a),m=ln(e);m<c.r+r0&&(q=ma(c.a,m?ml(e,1/m):[0,1,0],c.r+r0))}      // corps cellulaires : pleins ; dendrites et axones se traversent
    l>P.R&&(q=ml(q,P.R/l));p=ad(P.O,q)}
  if((M.ct=(M.ct||0)+d)>.25&&!M.ls){M.ct=0;let k=bpNr(M),zs=fm(z);if(k!=M.nk||zs!=M.zs)M.nk=k,M.zs=zs,bpPn(M)}
  nI=0}
function bpD(M){let P=M.pl,q=bpQ(M),n=0,s={};P.dyn(P,M.t);for(let[a,t]of P.lab)bL(a,t,'r');
  for(let c of P.C){if(s[c.i]||!c.s||n>7||c.i==M.nk)continue;let m=c.a;if(ds(q,m)<c.r+40+18*z)s[c.i]=1,n++,sxL(ma(bX(m),vu,c.r+z*.45),P.I[c.i][0],'r')}}
{const Q=SXQ.bz,fs0=Q.fs,fd0=Q.fd,cl0=Q.cl,en0=Q.en,pn0=bnPn;
 Q.fs=(d,M)=>M.pl?bpS(d,M):fs0(d,M);Q.fd=M=>M.pl?bpD(M):fd0(M);Q.en=M=>{en0(M);M.pl&&M.pl.ch.forEach(h=>h.A=0)};
 Q.cl=(M,k)=>{let P=M.pl;if(k>=200)return bpIn(M,BPK[k-200]);if(!P)return cl0(M,k);
   if(k==16)return bpOut(M);if(k==13){M.ls=2;return bpPn(M)}if(k==14){M.ls=0;return bpPn(M)}if(k>=100){M.ls=0;M.go=bpVw(P,bpKs(P)[k-100]);return bpPn(M)}
   if(k==17){sxEnd();if(reg)return say('Vous voici de retour dans le neurone pyramidal de ce jeu.',8);vel=0;p=ma(e0,v0,.6);f=ml(v0,-1);u=pp(f);cf=f;cu=u;z=.06;say('Voici le neurone pyramidal de ce jeu, vu depuis son bouton synaptique : « ⇲ Voies d\'entrée » propose plusieurs façons d\'y entrer.',10)}};
 bnPn=M=>{if(M.pl)return bpPn(M);pn0(M);if(M.rd||M.ls==1)return;      // sur la carte : bouton d'entrée dans le quartier de la région survolée, et liste des six quartiers
   if(M.ls==2)return $('pmo').insertAdjacentHTML('afterbegin',BPK.map(P=>rxBtn('⤓ '+P.n,'Sh'+(200+P.ix))).join(''));
   let P=bpOf(M.nk);P&&$('pmo').insertAdjacentHTML('afterbegin',rxBtn('⤓ Entrer : '+P.n,'Sh'+(200+P.ix)))}}
