// ================= cardiomyocyte ventriculaire : structures propres et tissu (myocarde) =================
// La cellule est un bâtonnet d'environ 100 µm sur 18 : une zone centrale autour du noyau (la sphère commune à toutes les cellules) et deux bras (PRC, world.js)
// remplis de myofibrilles. Tailles réelles : sarcomère de 2,2 µm (bande A 1,6 µm), myofibrille d'environ 1 µm, tubule T de 0,2 µm, capillaire de 5 µm.
// Licences : les myofibrilles sont un peu écartées pour qu'on puisse circuler entre elles ; une partie seulement des mitochondries, du réticulum et des dyades est dessinée ;
// le disque intercalaire est une plaque plane (il est en marches d'escalier) ; les cellules voisines sont écartées, comme dans les autres tissus du jeu.
const CSL=2.2,CDL=[];let CDY=0;      // longueur du sarcomère ; dyades (pour l'influx) ; une dyade repère
// zone du sarcomère où se trouve un point d'un bras : strie Z, bande I ou bande A (pour la fiche affichée quand le vaisseau est petit)
function cdZ(q,o){let s=dt(sb(q,Cc),o.d)-Rc-1,f=((s%CSL)+CSL)%CSL;return s<0||s>40?'myf':f<.16||f>CSL-.16?'saz':f<.3||f>CSL-.3?'sai':'saa'}
if(CT>2){$('nxb').textContent=LG?'⚡ Follow the cardiac impulse':'⚡ Suivre l\'influx cardiaque';
  const cA=K(0xa34),cI=K(0xe9a),cZ=K(0x523),cT=K(0x9cd),cS2=K(0xdc7),cM=K(0x612);
  PRC.forEach(([d,r,l],ai)=>{let J=ma(Cc,d,sqrt(Rc*Rc-r*r)),Ee=ma(Cc,d,Rc+l),[x,,y]=fr(d),ax=s=>ma(Cc,d,Rc+s),P=(s,a,b)=>ad(ax(s),ad(ml(x,a),ml(y,b))),i,j,k,s,n=0;
    Cy(Lmt,J,Ee,r,K(CF.mc,.8));HO.push(ma(Cc,d,Rc).concat(Rc*1.17));                                        // paroi du bras, ouverture dans la zone centrale
    // myofibrilles : réseau hexagonal ; sarcomères en registre d'une myofibrille à l'autre
    for(i=-6;i<=6;i++)for(j=-6;j<=6;j++){let a=(i+(j&1)*.5)*1.45,b=j*1.256;if(hypot(a,b)>r-.75)continue;n++;
      Cy(Lmf,P(1,a,b),P(40.6,a,b),.4,cI);cC(CY,P(1,a,b),P(40.6,a,b),.5,'myf');
      for(k=0;k<18;k++){s=1+k*CSL;Cy(Lmfa,P(s+.3,a,b),P(s+1.9,a,b),.5,cA);Cy(Lmfa,P(s+1.06,a,b),P(s+1.14,a,b),.505,cM);Cy(Lmf,P(s-.04,a,b),P(s+.04,a,b),.56,cZ)}Cy(Lmf,P(40.56,a,b),P(40.64,a,b),.56,cZ);
      if((i+j)&1)for(k=(i&1);k<18;k+=2)mito(P(1+k*CSL+1.1,a+.72,b+.42),d,.75,.2);                           // mitochondries en files entre les myofibrilles
      if(n%4==0){for(k=0;k<4;k++){let g=k*TAU/4+.4;Cy(Lt,P(1.2,a+.6*cos(g),b+.6*sin(g)),P(40.4,a+.6*cos(g),b+.6*sin(g)),.03,cS2)}cC(CY,P(1.2,a+.6,b),P(40.4,a+.6,b),.08,'sel')}}      // réticulum longitudinal (quelques manchons)
    // tubules T et dyades, à chaque strie Z ; costamères sous la membrane
    for(k=0;k<19;k++){s=1+k*CSL;for(j=0;j<5;j++){let g=j*TAU/5+k*.7,c=cos(g),sn=sin(g),a=P(s,c*r,sn*r),b=P(s,c*r*.3,sn*r*.3);Cy(Lt,a,b,.1,cT);(j+k)%2||cC(CY,a,b,.1,'ttu');
        for(let h of[.82,.6,.4]){let q=P(s+.135,c*r*h,sn*r*h);El(Lo,q,ml(x,.26),ml(d,.02),ml(y,.26),K(0xec6));      // citerne du réticulum jonctionnel : son bord est à 15 nm du tubule T
          CDL.push([q,d,nm(ad(ml(x,c),ml(y,sn)))]);if(h==.6)cS(CY,q,.3,'dya',{sf:1});if(!ai&&k==5&&j==0&&h==.82)CDY=q}}
      for(j=0;j<20;j++){let g=j*TAU/20;S(Lr,P(s,cos(g)*(r-.04),sin(g)*(r-.04)),.045,K(0x8bd))}k%3||[0,1.6,3.2,4.8].forEach(g=>cS(CY,P(s,cos(g)*(r-.1),sin(g)*(r-.1)),.25,'cos',{sf:1}))}
    for(i=0;i<260;i++){let g=rr(0,TAU),q=P(rr(1,40),cos(g)*(r-.02),sin(g)*(r-.02));S(Lr,q,.035,K(0xfc8));i%9||cS(CY,q,.12,'cvl',{sf:1})}      // cavéoles
    // disque intercalaire : plaque, jonctions adhérentes au bout des myofibrilles, desmosomes, plaques de jonctions communicantes
    El(Lox,Ee,ml(x,r),ml(d,.06),ml(y,r),K(0x634));cS(CY,ma(Ee,d,-.3),2.5,'icd',{sf:1});
    for(i=0;i<46;i++){let g=i*2.4,h=r*.93*sqrt((i+.5)/46),q=P(l-.1,cos(g)*h,sin(g)*h);i%3==0?(El(Lo,q,ml(x,.5),ml(d,.04),ml(y,.32),K(0x3cb)),cS(CY,q,.4,'gjn',{sf:1})):i%3==1?(S(Lo,q,.14,K(0x412)),cS(CY,q,.2,'dsm',{sf:1})):(El(Lo,q,ml(x,.45),ml(d,.05),ml(y,.45),K(0xb65)),cS(CY,q,.4,'fad',{sf:1}))}});
  org(9,.15,.3,(q,r)=>{S(Lo,q,r,K(0x862));cS(CY,q,r,'lf')})}                                                                                // lipofuscine, aux pôles du noyau
// ---------------- myocarde : capillaires, cellules voisines, fibroblastes, collagène, macrophage, fibre sympathique ----------------
function cdTis(){let X=A0,Y=v0,Z=nm(cr(A0,v0)),o=(a,b,c)=>ad(Cc,ad(ad(ml(X,a),ml(Y,b)),ml(Z,c))),V=vsl(o(0,13.2,0),X,2.6,.22,0xb65,'tvs',{bbb:1}),k,q,d,g,s,cm=0x934;
  TC=Cc;TR=78;TCY=o(0,10.55,0);S0=[o(-6,13.2,0),X.slice()];RL='Capillaire du myocarde';
  for(k=0;k<10;k++)for(s of[-.24,.24]){g=k*TAU/10;S(Lts,ad(TCY,ad(ad(ml(X,.32*cos(g)),ml(Z,.32*sin(g))),ml(Y,s))),.05,K(0xfc3))}OX.push({a:TCY,b:TCY,r:.5,i:'ttc',sf:1});      // point de transcytose (cavéoles)
  for(let[b,c]of[[-7.5,12],[-7.5,-12]])vsl(o(0,b,c),X,2.5,.22,0xb65,'tvs',{bbb:1});                                                     // deux autres capillaires : environ un par cellule
  VS.forEach((v,i)=>{for(k=-5;k<6;k++){d=nm(ad(ml(Y,cos(k*2.3+i)),ml(Z,sin(k*2.3+i))));q=vq(v,k*11+3,d,v.R+.05);El(Ltn,q,ml(X,2.6),ml(d,.4),ml(cr(X,d),1.5),K(0x957))}});      // noyaux des cellules endothéliales
  d=nm(ad(Y,ml(Z,.8)));q=vq(V,-14,d,3.05);El(Ltn,q,ml(X,1.7),ml(d,.6),ml(cr(X,d),1.1),K(0xc85));OX.push({a:q,b:q,r:1,i:'tpc'});pth([vq(V,-14,d,2.9),vq(V,-26,d,2.9)],.24,0xc85,'tpc');pth([vq(V,-14,d,2.9),vq(V,-3,d,2.9)],.24,0xc85,'tpc');      // péricyte
  lum(V,10,.25,q=>rbc(q,X,.85));lum(V,4,1.2,plt);
  // cardiomyocytes voisins : dans le prolongement (au-delà des disques intercalaires) et sur les côtés ; stries, noyaux, disques
  let fib=(a,b,nu)=>{let ab=sb(b,a),L=ln(ab),e=ml(ab,1/L);Cy(Ltk,a,b,8.6,K(cm));OX.push({a,b,r:8.6,i:'tcm'});for(s=1;s<L;s+=CSL)Cy(Ltk,ma(a,e,s),ma(a,e,s+.3),8.63,K(0x612));
     nu.forEach(t=>El(Ltn,ma(a,e,t),ml(e,5.5),ml(pp(e),3),ml(cr(e,pp(e)),3),K(0x537)))};
  fib(o(51.2,0,0),o(78,0,0),[14]);fib(o(-51.2,0,0),o(-78,0,0),[14]);
  for(let[b,c,x0]of[[3,21,-12],[3,-21,20],[-20.5,0,6],[25.5,4.5,-30]]){fib(o(-78,b,c),o(x0-.15,b,c),[x0+78-30]);fib(o(x0+.15,b,c),o(78,b,c),[30]);El(Ltn,o(x0,b,c),ml(Y,8.7),ml(X,.12),ml(Z,8.7),K(0x412));OX.push({a:o(x0,b,c),b:o(x0,b,c),r:3,i:'tcm'})}
  fib(o(60,6,7),o(74,3,19),[]);                                                                                                         // une branche : les cardiomyocytes forment un réseau
  // fibroblastes, macrophage résident, fibre sympathique et ses varicosités
  for(let[a,b,c]of[[18,-13.5,2],[-24,11,-13.5],[34,12.5,13]]){q=cel(o(a,b,c),2.3,0xbc9,'tfb',1.6,0x436);for(k=0;k<4;k++){d=nm(ad(ml(X,k%2?1:-1),ml(rd(),.5)));pth([ma(q,d,2),ad(ma(q,d,9),ml(rd(),1.5)),ad(ma(q,d,17),ml(rd(),2.5))],.2,0xbc9,'tfb')}}
  q=cel(o(-15,10.5,12.5),3,0xa8a,'tmc',2,0x436);for(k=0;k<5;k++){d=rd();pth([ma(q,d,2.8),ad(ma(q,d,6.5),ml(rd(),1.2))],.3,0xa8a,'tmc')}
  {let P=[];for(s=-70;s<=70;s+=7)P.push(o(s,10.6+1.2*sin(s*.11),5.2+1.5*cos(s*.07)));pth(P,.18,0xdd6,'tsy');P.forEach((q,i)=>i%2&&(S(Lts,q,.55,K(0xee7)),OX.push({a:q,b:q,r:.55,i:'tsy'})))}
  // collagène : fibres de l'endomysium autour de chaque cellule, un faisceau plus épais (périmysium)
  for(k=0;k<70;k++){g=rr(0,TAU);s=rr(-70,60);let R0=rr(9.6,11.2),a=o(s,R0*cos(g),R0*sin(g)),b=o(s+rr(6,16),R0*cos(g+rr(-.5,.5)),R0*sin(g+rr(-.5,.5)));if(VS.every(v=>ds(lp(a,b,.5),ma(v.A,v.d,dt(sb(lp(a,b,.5),v.A),v.d)))>v.R+.6)){prc(a,b,.11,0xeed,k%5?0:'tcl')}}
  {let P=[];for(s=-75;s<=75;s+=10)P.push(o(s,-13+sin(s*.08),-19.5+cos(s*.06)));pth(P,.7,0xeed,'tcl')}
  Object.assign(I,TX,{
   tvs:['Capillaire du myocarde','Lumière d\'environ 5 µm : les globules rouges y passent un par un. L\'endothélium est continu, sans fenêtre, posé sur une lame basale. Le myocarde est l\'un des tissus les plus riches en capillaires (2 000 à 3 000 par mm² dans le ventricule gauche humain) : il extrait déjà au repos 70 à 80 % de l\'oxygène qu\'on lui apporte, et ne peut guère en extraire davantage quand l\'effort augmente ; il lui faut alors plus de débit.'],
   tlu:['Lumière du capillaire du myocarde','Le cœur se nourrit lui-même : les artères coronaires naissent de l\'aorte, juste au-dessus de la valve, et se ramifient jusqu\'à ces capillaires. Le ventricule gauche est surtout irrigué pendant la diastole, quand le muscle relâché n\'écrase plus ses vaisseaux. La paroi ne se traverse que par transcytose (anneau doré, repère ◎). Le bouton « Voyager par le sang » vous emmène vers un autre organe.'],
   ttc:['Transcytose par les cavéoles','L\'endothélium continu des capillaires du cœur est riche en cavéoles. Elles peuvent se détacher d\'une face de la cellule et fusionner avec l\'autre : chez la souris privée de cavéoline 1, l\'endothélium ne capte plus ni ne transporte l\'albumine. C\'est l\'une des voies par lesquelles l\'albumine et ce qu\'elle transporte traversent une paroi sans fenêtre.'],
   tpc:['Péricyte','Cellule murale enchâssée dans la lame basale du capillaire, qu\'elle enserre de ses prolongements. Elle stabilise la paroi et participe au réglage de son diamètre.'],
   tcm:['Cardiomyocyte voisin','Les cardiomyocytes sont attachés bout à bout par les disques intercalaires, et se ramifient : ils forment un réseau continu, où le courant passe de cellule en cellule par les jonctions communicantes. Longues d\'environ 140 µm, elles ont le plus souvent un seul noyau (74 %), parfois deux (25 %). Elles ne se renouvellent presque pas : environ 1 % par an à 25 ans, 0,45 % à 75 ans — moins de la moitié sont remplacées au cours d\'une vie. Elles occupent l\'essentiel du volume du myocarde, mais ne sont qu\'un tiers à la moitié de ses cellules.'],
   tfb:['Fibroblaste cardiaque','Petite cellule aux longs prolongements, glissée entre les cardiomyocytes. Elle fabrique et renouvelle le collagène de la matrice. Après un infarctus, les fibroblastes se multiplient et comblent la zone détruite par une cicatrice : le muscle perdu n\'est pas remplacé.'],
   tcl:['Collagène — matrice extracellulaire','Des fibres de collagène, surtout de type I (résistant) et de type III (plus souple), tissent une gaine autour de chaque cardiomyocyte (endomysium) et autour des faisceaux (périmysium). Elles transmettent la force, empêchent l\'étirement excessif et alignent les cellules. Leur excès, la fibrose, raidit le cœur et gêne le passage de l\'influx.'],
   tmc:['Macrophage résident','Le cœur héberge ses propres macrophages. Ils éliminent les débris et les mitochondries que les cardiomyocytes rejettent. Dans le nœud auriculo-ventriculaire, ils s\'intercalent entre les cellules conductrices, auxquelles ils sont couplés par la connexine 43 ; chez la souris, les supprimer ralentit la conduction.'],
   tsy:['Fibre sympathique','Un axone du système nerveux sympathique, parsemé de varicosités qui libèrent la noradrénaline au voisinage des cardiomyocytes. Elle se fixe sur les récepteurs β1 : le cœur bat plus vite et plus fort. C\'est par ce récepteur que le vaisseau entre dans la cellule.']})}
