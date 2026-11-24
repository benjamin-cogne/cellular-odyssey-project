// ================= l'influx cardiaque dans le décor réel de la cellule =================
// Le cardiomyocyte bat : toutes les sept secondes (horloge sT, la même que celle du sarcomère et de la dyade), un potentiel d'action parcourt sa membrane.
// hsFr, appelée à chaque image, le montre là où est le joueur :
//  - une bande lumineuse court le long de la cellule, puis de ses voisines (visible depuis le tissu comme de l'intérieur) ;
//  - près de la membrane, les canaux ioniques sont dessinés un à un (réseau de 40 nm, type tiré au sort) : ils s'ouvrent au passage de la vague et les ions les traversent ;
//  - près des dyades, une bouffée de calcium s'allume un instant plus tard.
// Par-dessus, un récit en cinq étapes (HSS) que le joueur suit à son rythme : un repère ◎ montre l'endroit, un bouton y conduit le vaisseau, et le joueur garde les commandes.
// Les étapes renvoient aux lieux visitables (dyade, myofibrille, disque intercalaire) et, pour le détail des canaux et le zoom jusqu'au cœur, à la vue guidée (heartbeat.js).
let HS=0,hsIn=0,hsGo=0;      // hsIn : écran d'accueil du récit ; hsGo1(i) : aller à l'étape i (0 hors du cardiomyocyte)
if(CT>2){
const Lhs=Ly(M1,1e9,0,{ex:1}),Lhg=Ly(MW,1e9,0,{al:1,ex:1}),Lhp=Ly(M2,1e9,0,{al:1,ex:1}),dHc=dy(Lhs,3400,[0,0,0],1),dHw=dy(Lhg,40,Cc,300),dHp=dy(Lhp,70,Cc,300),dHq=dy(Lhp,260,[0,0,0],1),
 hsX=pp(A0),hsY=cr(A0,hsX),HSR=8.6,HSH=Rc+42,br=(c,k)=>[c[0]*k,c[1]*k,c[2]*k,1],
 hsTy=[['na',.3,[1,.85,.2,1]],['k1',.44,[.62,.42,1,1]],['ca',.58,[1,.5,.12,1]],['kr',.72,[.5,.45,1,1]],['pp',.83,[.95,.75,.25,1]],['nx',.92,[.95,.45,1,1]],['to',1,[.8,.6,1,1]]],      // types de canaux : clé, part cumulée, couleur
 // Le temps est ralenti, et inégalement : hsMs convertit les secondes de jeu écoulées depuis le passage de la vague en millisecondes réelles.
 // La phase 0 (1 à 2 ms) dure 0,3 s à l'écran, le plateau et la repolarisation (≈ 300 ms) trois secondes. Les fenêtres d'ouverture sont celles de la vue guidée (hbMe).
 hsMs=e=>e<0?e*40:e<.6?e*5:3+(e-.6)*132,
 hsOp=(k,m)=>k=='na'?m>0&&m<1.4:k=='to'?m>2.2&&m<19:k=='ca'?m>3.5&&m<245:k=='kr'?m>95&&m<330:k=='k1'?hbX.vAP(m)<-71:k=='nx'?m>150&&m<520:1,
 hsD=s=>1+(s+HSH)/(2*HSH)*.3,                                                                                                                                 // heure de passage de la vague à l'abscisse s de la cellule
 hsFib=[[ma(Cc,A0,-HSH-27),ma(Cc,A0,-HSH-.2),-.14],[ma(Cc,A0,HSH+.2),ma(Cc,A0,HSH+27),.3]],                                                                     // cellules voisines en amont et en aval : [début, fin, retard]
 hsCap=[`Phase 4 — repos, −85 mV. Les canaux Kir2.1 restent ouverts ; la pompe Na⁺/K⁺ et l'échangeur NCX1 rétablissent les gradients. La prochaine vague arrive…`,
  `Phase 0 — la vague passe : les canaux Nav1.5 s'ouvrent, le sodium (jaune) s'engouffre. Le potentiel dépasse 0 mV en une à deux millisecondes.`,
  `Phases 1 et 2 — les Nav1.5 sont inactivés (bille orangée). Le calcium (orangé) entre par les Cav1.2 : c'est le plateau.`,
  `Phase 3 — le potassium (violet) sort par hERG et KCNQ1 : la membrane se repolarise.`];
let hsPh=-1,hsO=0,hsHl=0;
function hsFr(){XK=0;dHc.n=dHw.n=dHp.n=dHq.n=0;let near=0,m=0,pmv=$('pm').style.display!='none';
  if(!(SX||NX||PM||ORG&&ORG.i!='dya')){
  let t=sT%7,d=sb(p,Cc),s=dt(d,A0),w=sb(d,ml(A0,s)),ro=ln(w),i,j,k;dHc.c=dHq.c=p;
  // la vague : un front, puis la cellule reste dépolarisée pendant le plateau
  if(!ORG){let band=(a,b,dl,R)=>{let e=t-1-dl,x=cl(e/.3,0,1),fd=e<0?0:e<2.6?1:1-ss((e-2.6)/.7);if(fd<=0)return;let q=lp(a,b,x);dCy(dHw,a,q,R,[1.25,.55,.15,.17*fd]);e<.34&&dCy(dHw,lp(a,b,max(0,x-.02)),lp(a,b,min(1,x+.02)),R+.07,[2.2,2,.8,.7])};
    band(ma(Cc,A0,-HSH),ma(Cc,A0,HSH),0,HSR+.06);for(let[a,b,dl]of hsFib)band(a,b,dl,HSR+.08);
    if(reg==1)for(let D of CDL){let q=D[0];if(ds(q,p)>4)continue;let e=t-hsD(dt(sb(q,Cc),A0))-.12;if(e>0&&e<1.6)dS(dHp,q,.1+.24*ss(e/.5),[1.6,.75,.15,.34*(1-ss((e-.7)/.9))])}}      // bouffées de calcium des dyades proches
  // les canaux de la membrane, près du vaisseau : anneau de six billes, halo quand le canal est ouvert, ions qui le traversent, sodium entré qui se disperse
  if(!ORG&&reg<2&&abs(ro-HSR)<.8&&abs(s)>Rc*.75&&abs(s)<HSH-.3&&z<.16){let g=.04,th0=atan2(dt(w,hsY),dt(w,hsX)),i0=Math.round(s/g),j0=Math.round(th0*HSR/g),b=0,bd=.05+3*z,n=6,e0=t-hsD(s);near=1;m=hsMs(e0);
    for(i=i0-n;i<=i0+n;i++)for(j=j0-n;j<=j0+n;j++){let h=inH(i,j),th=j*g/HSR,nr=ad(ml(hsX,cos(th)),ml(hsY,sin(th))),tg=ad(ml(hsX,-sin(th)),ml(hsY,cos(th))),Q=ad(ma(Cc,A0,i*g+.012*(inH(i,j+9)-.5)),ml(nr,HSR)),dq=ds(Q,p);if(dq>.27)continue;
      let T=hsTy.find(e=>h<e[1]),ty=T[0],e=t-hsD(i*g),mm=hsMs(e),op=hsOp(ty,mm),R=ty=='pp'?.0046:op?.0052:.0034,c=br(T[2],op?1.5:.6),ic=ty=='na'?IC.na:ty=='ca'?IC.ca:IC.k;
      for(k=0;k<6;k++){let a=k*TAU/6;dS(dHc,ad(Q,ad(ml(A0,R*cos(a)),ml(tg,R*sin(a)))),.0028,c)}
      ty=='na'&&mm>1.4&&mm<320&&dS(dHc,ma(Q,nr,-.0058),.0024,[1,.5,.12,1]);                                                                                      // bouchon d'inactivation
      if(op&&ty!='pp'&&ty!='nx'){let inw=ty=='na'||ty=='ca'?1:-1,sp=ty=='na'?2.6:1.1;dS(dHq,Q,ty=='na'?.013:.009,[T[2][0]*1.6,T[2][1]*1.6,T[2][2]*1.6,ty=='na'?.42:.22]);
        for(k=0;k<4;k++){let a=(sT*sp+k/4+h*7)%1;dS(dHc,ma(Q,nr,inw*(.034-.1*a)),.0019*(1-.5*a),br(ic,1.7))}}
      else if(ty=='pp'||ty=='nx'&&op)for(k=0;k<2;k++){let a=(sT*.9+k/2+h*7)%1,inw=k?1:-1;dS(dHc,ma(Q,nr,inw*(.028-.056*a)),.0015,br(ty=='nx'?k?IC.na:IC.ca:k?IC.k:IC.na,1.5))}      // pompe : Na⁺ dehors, K⁺ dedans ; échangeur : Ca²⁺ dehors, Na⁺ dedans
      if(ty=='na'&&e>0&&e<1.5)for(k=0;k<6;k++){let ag=e-k*.05;if(ag<=0||ag>1.1)continue;let dp=.03+.17*ss(ag/1.1),ja=TAU*inH(i+k*3,j),jr=dp*.45*inH(i,j+k*5);                 // le sodium entré diffuse vers l'intérieur
        dS(dHc,ad(ma(Q,nr,-dp),ad(ml(A0,jr*cos(ja)),ml(tg,jr*sin(ja)))),.002*(1-.75*ag/1.1),br(IC.na,1.7))}
      if(dq<bd)bd=dq,b=ty}
    b&&(XK='hc'+b);
    if(HS&&!HS.st&&!AP){let ph=e0<0||m>330?0:m<1.4?1:m<95?2:3;ph!=hsPh&&(hsPh=ph,say(hsCap[ph],ph==1?3:6))}}}
  up(dHc);up(dHw);up(dHp);up(dHq);
  if(HS&&!RX&&!AP&&!pmv)hsP(),pmv=1;
  // l'oscilloscope suit le potentiel de la membrane là où est le vaisseau (première étape) ; la fiche du lieu passe sous le panneau du récit
  let wo=HS&&!HS.st&&near&&pmv&&!RX&&!SX&&!NX&&!PM;if(wo)hbX.hbOs({ta:0},{o:{l:'Potentiel de la membrane, ici',ms:[-40,400],f:hbX.vAP,x:()=>cl(m,-40,400)}});else if(hsO)osc.style.display='none';hsO=wo;near||(hsPh=-1);
  let wh=HS&&pmv&&!RX&&!SX&&!NX&&!PM;if(wh)$('hl').style.top=($('pm').getBoundingClientRect().bottom+4|0)+'px';else if(hsHl)$('hl').style.top='';hsHl=wh}
{const o0=oT;oT=()=>{o0();hsFr()}}
// ---- le récit ----
const hsS0=Rc+12.6,hsG=3.5,hsDir=ad(ml(fr(A0)[0],cos(hsG)),ml(fr(A0)[2],sin(hsG))),      // abscisse et direction d'un tubule T du premier bras (celui du repère « Tubule T et dyade »)
HSS=[
 [`Une vague sur la membrane`,()=>ad(ma(Cc,A0,hsS0),ml(hsDir,HSR-.085)),.02,`Vous êtes contre le sarcolemme, la membrane de la cellule. Chaque anneau est un canal ou une pompe. Quand la vague arrive, regardez : le sodium (jaune) s'engouffre par les canaux Nav1.5, le calcium (orangé) entre pendant tout le plateau, puis le potassium (violet) sort et ramène la membrane au repos. La courbe suit le potentiel de la membrane ici même. Approchez-vous d'un anneau pour lire sa fiche ; suivez la membrane, la vague y repasse à chaque battement. « Canaux en détail » rejoue ces phases au ralenti dans la vue guidée.`,['Yd','Canaux en détail']],
 [`Le signal plonge dans le tubule T`,()=>ma(CDY,A0,.36),.03,`La vague ne reste pas en surface : elle s'enfonce dans la cellule par les tubules T, ces doigts de membrane que vous voyez traverser les myofibrilles. Un instant après son passage, une bouffée orangée s'allume contre chaque tubule : c'est le calcium que libère une dyade. Le bouton « ⇥ Entrer dans la dyade » vous y fait entrer : vous verrez le calcium du tubule ouvrir les récepteurs de la ryanodine, puis les pompes ranger le calcium.`],
 [`Le calcium atteint les myofibrilles`,()=>ad(ma(CDY,A0,1.15),ml(hsDir,.35)),.03,`Le calcium libéré diffuse jusqu'aux myofibrilles, les cylindres striés qui vous entourent. Il se fixe sur la troponine C, la tropomyosine tourne, et les têtes de myosine tirent sur l'actine : la cellule se contracte. Le bouton « ⇥ Entrer dans la myofibrille » vous glisse entre les filaments d'un sarcomère ; la vague de calcium y arrive au même rythme qu'ici.`],
 [`D'une cellule à la suivante`,()=>ad(ma(Cc,A0,Rc+41.55),ml(hsDir,1.2)),.035,`Au bout de la cellule, le disque intercalaire. La vague y arrive une fraction de seconde après avoir quitté l'autre bout, et passe à la cellule suivante par les jonctions communicantes. Le bouton « ⇥ Entrer dans le disque intercalaire » vous place entre les deux cellules. Puis prenez du recul : sortez de la cellule (⇤) et regardez les cellules voisines s'allumer l'une après l'autre.`],
 [`Du tissu au cœur entier`,()=>ad(ma(Cc,A0,Rc+30),ml(hsDir,HSR+2.5)),.3,`De cellule en cellule, la vague traverse tout le muscle. La suite ne se voit plus à l'échelle d'une cellule : la vue guidée reprend ici, avec la propagation dans le tissu, un long zoom arrière à travers la paroi du ventricule, puis le cœur entier, son tissu de conduction et son électrocardiogramme.`,['Yz','Zoom arrière jusqu\'au cœur']]];
function hsP(){let S=HSS[HS.st],n=HSS.length;$('pm').style.display='block';$('pm').classList.remove('mn');$('pmc').style.display='none';$('pmt').textContent=(HS.st+1)+'/'+n+' · '+S[0];$('pmx').textContent=S[3];
  $('pmo').innerHTML=rxBtn('➜ M\'y conduire','Yf')+(S[4]?rxBtn(S[4][1],S[4][0]):'')+(HS.st?rxBtn('◂ Précédent','Yb'):'')+(HS.st<n-1?rxBtn('Suivant ▸','Yn'):'')+rxBtn('Quitter','Yq')}
function hsN(i){HS={st:cl(i,0,HSS.length-1)};POI[NP]=POI[NP]||POI[2];POI[NP+1]=POI[NP+1]||POI[2];POI[HSI]=['Influx : '+HSS[HS.st][0],()=>HSS[HS.st][1]()];poi=HSI;hT=0;hsP()}
function hsGo1(i){if(ORG){ORG=0;OC=[];dO.n=0}if(reg!=1){reg=1;ct=-1;ENP=0;chV.A=0;chG.n=chR.n=0;vel=0}hsN(i||0);let S=HSS[HS.st],B=S[1](),st=HS.st;hsPh=-1;
  // à l'arrivée de la première étape, le battement est recalé pour que la vague passe une seconde et demie plus tard : le joueur voit l'influx dès qu'il est en place
  fly(B,S[2],()=>{if(st)return say('Vous y êtes : vous avez les commandes. Le repère ◎ montre l\'étape ; « Suivant ▸ » passe à la suivante.',7);
    sT+=((hsD(dt(sb(p,Cc),A0))-1.5-sT%7)%7+7)%7;hsPh=0;say('Vous êtes contre la membrane, aux commandes. Une vague arrive…',3)},st?0:ma(B,hsDir,.3))}
function hsEnd(){HS=0;osc.style.display='none';hsO=0;POI[HSI]=POI[2];poi=reg>1?2:1;$('pm').style.display='none'}
function hsIn1(){if(!go||PM||RX||NX||SX||AP)return;$('pm').style.display='block';$('pm').classList.remove('mn');$('pmc').style.display='none';$('pmt').textContent='Suivre l\'influx cardiaque';
  $('pmx').textContent='Cette cellule bat sous vos yeux : toutes les quelques secondes, un potentiel d\'action parcourt sa membrane, libère le calcium et la fait se contracter. Suivez-le dans la cellule en cinq étapes, à votre rythme : le vaisseau vous conduit à chaque endroit, puis vous gardez les commandes. Ou ouvrez la vue guidée, qui détaille les canaux sur un oscilloscope et recule jusqu\'au cœur entier.';
  $('pmo').innerHTML=rxBtn('▶ Suivre dans la cellule','Yg')+rxBtn('Vue guidée : 18 étapes','Sihb')+rxBtn('Fermer','Sx')}
const HSI=NP+2;      // repère du récit, après les deux repères libres (lieu du génome, structure de l'atlas)
{const h0=$('pmo').onclick;$('pmo').onclick=e=>{let b=e.target.closest('button'),r=b&&b.dataset.r;if(!r||r[0]!='Y')return h0(e);
  if(r=='Yg')return hsGo1(0);if(!HS)return;if(r=='Yq')return hsEnd();if(r=='Yn'||r=='Yb')return hsGo1(HS.st+(r=='Yn'?1:-1));if(r=='Yf')return hsGo1(HS.st);
  if(r=='Yd'){sxGo('hb');return}if(r=='Yz'){sxGo('hb');SX.st=10;sxN(1)}}}
Object.assign(I,{
 hcna:[`Canal sodique Nav1.5`,`Le canal qui lance le potentiel d'action (gène SCN5A). Fermé au repos, il s'ouvre dès que la membrane atteint le seuil : le sodium entre, et le potentiel dépasse 0 mV en une à deux millisecondes. Il se bouche presque aussitôt de lui-même (bille orangée, côté cytoplasme) et reste inactivé jusqu'à la repolarisation : c'est la période réfractaire. Dans le jeu, le temps est ralenti, et inégalement : cette ouverture d'une à deux millisecondes dure un tiers de seconde à l'écran, le plateau de 250 ms un peu plus de deux secondes.`],
 hck1:[`Canal potassique Kir2.1`,`Ouvert au repos, il laisse fuir un peu de potassium : c'est lui (courant IK1) qui fixe le potentiel de repos, voisin de −85 mV, près du potentiel d'équilibre du potassium. Il se ferme pendant le plateau et se rouvre pour terminer la repolarisation.`],
 hcca:[`Canal calcique Cav1.2`,`Le canal calcique de type L. Il s'ouvre juste après les canaux sodiques et reste ouvert pendant tout le plateau : le calcium qui entre maintient la dépolarisation et, dans les tubules T, déclenche la libération du calcium du réticulum.`],
 hckr:[`Canaux potassiques hERG et KCNQ1`,`Les deux canaux retardés qui repolarisent la membrane : hERG (courant IKr), qui fait l'essentiel du travail dans le ventricule humain, et KCNQ1 (courant IKs), qui sert de réserve. Ils s'ouvrent lentement pendant le plateau. Leurs pertes de fonction allongent le potentiel d'action : ce sont les syndromes du QT long de types 2 et 1.`],
 hcpp:[`Pompe Na⁺/K⁺`,`Elle travaille en permanence : trois sodiums sortis, deux potassiums entrés pour chaque ATP. Elle entretient les gradients que les canaux dépensent à chaque battement.`],
 hcnx:[`Échangeur NCX1`,`Il fait sortir un calcium contre l'entrée de trois sodiums. Il évacue, à chaque battement, le calcium entré par les canaux Cav1.2.`],
 hcto:[`Canal potassique Kv4.3`,`Un canal potassique transitoire (courant Ito) : il s'ouvre brièvement juste après le sommet du potentiel d'action et dessine l'encoche qui précède le plateau.`]});
hsIn=hsIn1;hsGo=hsGo1;
}
