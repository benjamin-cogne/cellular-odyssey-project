// ================= naissance d'un ribosome =================
// Vue guidée (moteur SXQ de snrnp.js), ouverte par le bouton « ◉ Naissance d'un ribosome » dans le nucléole. Sept étapes : transcription de l'ADN ribosomique
// par la polymérase I, retouches du pré-ARNr par les snoRNP, clivages, assemblage des deux sous-unités avec les protéines ribosomiques et le RNP 5S,
// export par un pore nucléaire, finitions dans le cytoplasme, puis le ribosome au travail sur un ARNm.
// Unité de la scène : le nanomètre. Les régions du pré-ARNr 47S gardent leurs proportions (RBR) ; tout le reste est schématique : forme des particules (amas de billes),
// nombre de polymérases, de protéines et de facteurs dessinés, durée de chaque étape (la vraie chaîne prend des dizaines de minutes).
{const RBC={ets:[.55,.55,.62,1],s18:[.35,.9,.5,1],s58:[1.2,.65,.2,1],s28:[.4,.62,1.25,1],s5:[1.3,1.15,.3,1],rps:[.45,.95,.85,1],rpl:[.78,.7,1.2,1],af:[1.2,.5,.75,1],cd:[.3,1,.45,1],aca:[.8,.5,1.1,1],pol:[.65,.42,1.05,1],dna:[.85,.85,.92,1],exo:[1.3,.3,.25,1],xpo:[1.3,1,.3,1],nmd:[1.3,.6,.25,1],mr:[1.1,.6,.9,1],pep:[1,1,.6,1]},
 RBR=[['ets',3657],['s18',1869],['ets',1077],['s58',157],['ets',1167],['s28',5070],['ets',361]],RBL=RBR.reduce((a,r)=>a+r[1],0),
 rg=x=>{let a=0;for(let[k,n]of RBR){a+=n;if(x*RBL<a)return k}return'ets'},                                    // région du 47S à la fraction x de sa longueur
 hh=(a,b)=>{let v=sin(a*127.1+b*311.7+1.7)*43758.5453;return v-floor(v)},
 vr3=(i,s)=>{let a=TAU*hh(i,s),b=2*hh(i,s+1)-1,q=sqrt(1-b*b);return[q*cos(a),q*sin(a),b]},
 bb=(q,r,c)=>dS(dSx0,sxW(q),r*1e-3,c),cc=(a,b,r,c)=>dCy(dSx1,sxW(a),sxW(b),r*1e-3,c),lb=(q,s,e)=>sxL(sxW(q),s,e),
 // une sous-unité : billes d'ARNr tassées dans une ou deux boules, protéines à la surface. k : 0 ébauche étalée … 1 particule compacte ; pr : part des protéines en place ; af : facteurs d'assemblage (0 à 1)
 sub=(big,C,k,pr,af,o={})=>{let n=big?46:26,R=big?11.5:8.5,i,q,c=big?RBC.s28:RBC.s18;
   for(i=0;i<n;i++){let d=vr3(i,big?3:9),t=ml(d,R*cbrt(hh(i,5))*(big?1:i<8?.62:1));if(!big&&i<8)t=ad(t,[0,R*.95,0]);                                            // petite sous-unité : une tête (8 billes) sur un corps
     q=lp(ad(C,[(i-n/2)*(big?4.2:4.4),o.dy||0,6*sin(i*.9)]),ad(C,t),k);bb(q,3.1,big&&i>n-5?RBC.s58:c)}
   let m=big?24:14;for(i=0;i<m*pr;i++){let d=vr3(i,big?21:27);bb(ad(C,ml(d,R*(1.02+.9*max(0,1-(pr*m-i)))) ),2.3,big?RBC.rpl:RBC.rps)}
   for(i=0;i<(big?9:6)*af;i++){let d=vr3(i,big?41:47);bb(ad(C,ml(d,R*1.18)),2.6,RBC.af)}
   if(big&&o.s5)for(i=0;i<3;i++)bb(ad(C,[(i-1)*3.4,R*(1.05+1.6*(1-o.s5)),0]),i==1?3:2.4,i==1?RBC.s5:RBC.rpl)},                                                 // RNP 5S : protubérance centrale
 strand=(A,B,n,x0,x1,w)=>{let p=A,i;for(i=0;i<=n;i++){let t=i/n,q=ad(lp(A,B,t),[0,0,w*sin(t*9)]);bb(q,2.6,RBC[rg(x0+(x1-x0)*t)]);p=q}},                           // brin d'ARNr coloré par région
 RBS=[
  {k:'tx',c:[0,0,0],z:.15,T:10,leg:[['ARN polymérase I','#a66bff'],['ADN ribosomique','#d9d9eb'],['ARNr 18S','#59e680'],['ARNr 28S','#669eff'],['ARNr 5,8S','#ffa633'],['espaceurs','#8c8c9e']],d:a=>{let i,j;cc([-185,0,0],[185,0,0],1.6,RBC.dna);
     for(i=0;i<3;i++)bb([-178+i*5,3.5,0],3.2,[1.25,1.1,.45,1]);bb([178,0,0],3.6,[1.2,.35,.35,1]);
     for(i=0;i<22;i++){let s=(i/22+a/22*3)%1,x=-170+340*s,n=2+13*s|0,up=i%2?1:-1;bb([x,0,0],4.4,RBC.pol);
       for(j=1;j<=n;j++){let f=j/n;bb([x-10*f*s,up*(5+j*5.4),5*sin(j*.8+i)],2.3,RBC[rg(s*(1-f))])}
       s>.3&&bb([x-10*s,up*(9+n*5.4),0],4.2,[.35,1.1,1,1])}
     lb([-178,16,0],'promoteur : UBF, SL1');lb([178,-14,0],'terminateur');lb([-40,-12,0],'ARN polymérase I','e');lb([120,92,0],'pré-ARNr naissant');lb([150,-98,0],'bouton terminal : processome SSU')}},
  {k:'mod',c:[0,0,0],z:.05,T:10,leg:[['snoRNP à boîtes C/D : fibrillarine','#4dff73'],['snoRNP à boîtes H/ACA : dyskérine','#cc80ff'],['2′-O-méthyle','#ffe04d'],['pseudouridine','#ff66b3']],d:a=>{let i,k;strand([-60,0,0],[60,0,0],44,.3,.42,5);
     for(k=0;k<2;k++){let t=cl(a*2-k,0,1),x=k?26:-24,g=ss(t*2.5),h=ss(t*2.5-1.4),y=(k?-1:1)*(34*(1-g)+9+30*h),c=k?RBC.aca:RBC.cd;if(t<=0)continue;
       for(i=0;i<4;i++)bb([x+(i%2?4:-4),y+(i>1?4.2:-1)*(k?-1:1),0],3.4,c);for(i=0;i<6;i++)bb([x-7.5+i*3,y-(k?-5.5:5.5),1.5],1.5,[.9,.9,.6,1]);
       g>=1&&bb([x,k?-3.4:3.4,2],1.7,k?[1.3,.4,.75,1]:[1.4,1.2,.3,1]);lb([x,y+(k?-12:12),0],k?'dyskérine : U → Ψ':'fibrillarine : 2′-O-méthylation')}
     for(i=0;i<5;i++)bb([-50+i*23,i%2?-3.4:3.4,2],1.5,i%2?[1.3,.4,.75,1]:[1.4,1.2,.3,1]);lb([0,-22,0],'pré-ARNr','e')}},
  {k:'cut',c:[0,0,0],z:.13,T:11,leg:[['5′ETS, ITS1, ITS2, 3′ETS : éliminés','#8c8c9e'],['18S','#59e680'],['5,8S','#ffa633'],['28S','#669eff'],['exosome, XRN2','#ff4d40']],d:a=>{let L=300,X=f=>-L/2+L*f,e=[0,3657,5526,6603,6760,7927,12997,13358].map(v=>v/RBL),
       g1=ss(a*3),g2=ss(a*3-1),g3=ss(a*3-2),seg=(i,dx,dy,k)=>{let A=[X(e[i])+dx,dy,0],B=[X(e[i+1])+dx,dy,0],n=max(2,(e[i+1]-e[i])*60|0);k<1&&strand(A,B,n,e[i]+.001,e[i+1]-.001,3*(1-k))};
     seg(0,-30*g1-20*g3,34*g2+40*g3,g3);seg(1,-20*g2,34*g2,0);seg(2,-10*g2+(g2>0?0:0),34*g2*(1-g3)-20*g3,g3);                                                    // 5′ETS, 18S, ITS1 (côté 18S)
     seg(3,20*g2,-34*g2,0);seg(4,20*g2,-34*g2-26*g3,g3);seg(5,20*g2,-34*g2,0);seg(6,20*g2+34*g1,-34*g2-30*g1,g1);
     g1>0&&g1<1&&bb([X(1)+40*g1,-34*g1,0],4.5,RBC.exo);g3>0&&g3<1&&(bb([X(.14)-24*g3,44*g3,0],4.5,RBC.exo),bb([X(.55)+20,-62*g3,0],4.5,RBC.exo));
     lb([X(.2),62,0],a<.34?'pré-ARNr 47S':a<.67?'30S':'21S → 18S-E','e');lb([X(.75),-62,0],a<.34?'':a<.67?'32S':'28S + 5,8S','e');a>.34&&a<.6&&lb([X(.45),0,0],'coupure au site 2')}},
  {k:'asm',c:[0,0,0],z:.046,T:12,leg:[['protéines RPS','#73f2d9'],['protéines RPL','#c7b3ff'],['RNP 5S','#ffeb4d'],['facteurs d\'assemblage','#ff80bf']],d:a=>{let k=ss(a*1.6),pr=ss(a*1.5-.3),af=ss(a*4)*(1-ss(a*3-2)),i;
     sub(0,[-30,0,0],k,pr,af);sub(1,[28,0,0],k,pr,af,{s5:ss(a*2-.6)});
     for(i=0;i<10;i++){let f=(a*2+i*.37)%1,d=vr3(i,61);f<.9&&pr<1&&bb(ad([i%2?28:-30,0,0],ml(d,22+60*(1-f))),2.3,i%2?RBC.rpl:RBC.rps)}
     lb([-30,-24,0],'pré-40S','e');lb([28,-27,0],'pré-60S','e');a>.3&&lb([28,30,0],'RNP 5S : ARNr 5S, RPL5, RPL11');a<.75&&lb([-44,30,0],'protéines venues du cytoplasme')}},
  {k:'exp',c:[0,0,0],z:.09,T:11,leg:[['enveloppe nucléaire','#8c99b3'],['pore nucléaire','#b3bfd9'],['exportine XPO1 (CRM1)','#ffd94d'],['adaptateur NMD3','#ff9940']],d:a=>{let i,j;
     for(i=-6;i<=6;i++)for(j=-3;j<=3;j++){let y=i*17,z_=j*17;hypot(y,z_)>44&&(bb([-9,y,z_],5.5,[.5,.55,.68,1]),bb([9,y,z_],5.5,[.5,.55,.68,1]))}
     for(i=0;i<8;i++){let t=TAU*i/8;bb([-12,40*cos(t),40*sin(t)],7,[.7,.75,.88,1]);bb([12,40*cos(t),40*sin(t)],7,[.7,.75,.88,1])}
     for(j=0;j<2;j++){let f=(a*1.6-j*.5),x=-120+250*ss(f),y=j?8:-6;if(f<=0||f>=1.15)continue;sub(j,[x,y,0],1,1,.45);bb([x+(j?14:10),y+6,0],3.6,RBC.xpo);j&&bb([x+10,y-7,0],3.4,RBC.nmd)}
     lb([-90,70,0],'noyau','e');lb([90,70,0],'cytoplasme','e');lb([0,-64,0],'pore nucléaire')}},
  {k:'cyt',c:[0,0,0],z:.046,T:11,leg:[['eIF6','#ff80bf'],['SBDS, EFL1','#66d9ff'],['NOB1','#ff4d40'],['NMD3','#ff9940']],d:a=>{let g=ss(a*2),h=ss(a*2-.9),i;
     sub(0,[-30,0,0],1,1,.5*(1-g));for(i=0;i<3;i++)bb([-30+11+i*4.2*(1-0*g),-9-10*g*(i+1)/3*(g>0?1:0),0],2.2*(1-.9*g),RBC.ets);bb([-30+14+18*(1-g),-12,0],3.4,RBC.exo);
     sub(1,[28,0,0],1,1,.4*(1-h),{s5:1});bb(ad([28,0,0],[-13-30*h,4+22*h,0]),3.6,RBC.af);bb(ad([28,0,0],[13+34*h,-6-16*h,0]),3.4,RBC.nmd);bb([28-22+7*h,16-8*h,0],3.2,[.45,.9,1.3,1]);bb([28-27+7*h,11-8*h,0],3.2,[.45,.9,1.3,1]);
     lb([-30,-26,0],g<1?'NOB1 coupe l\'extrémité 3′ du 18S':'40S','e');lb([28,-28,0],h<1?'SBDS et EFL1 chassent eIF6':'60S','e')}},
  {k:'rib',c:[0,10,0],z:.07,T:12,leg:[['ARNm','#ff99e6'],['40S','#59e680'],['60S','#669eff'],['chaîne naissante','#ffff99']],d:a=>{let j=ss(a*3),x=-40+70*ss(a*1.4-.35),i,n=14*ss(a*1.4-.4)|0;
     for(i=0;i<56;i++)bb([-110+i*3.93,-9,2*sin(i*.6)],2.1,RBC.mr);sub(0,[x,-9,0],1,1,0);sub(1,[x,9+46*(1-j),0],1,1,0,{s5:1});
     for(i=0;i<n;i++)bb([x+6+i*2.2,24+i*4.6,6*sin(i*.9)],2.2,RBC.pep);j>=1&&bb([x-18+26*((a*6)%1),2,7],2.8,[1.2,.8,.4,1]);
     lb([x,-34,0],j<1?'la grande sous-unité rejoint la petite':'ribosome 80S','e');n>3&&lb([x+40,70,0],'protéine en cours de synthèse');lb([-100,-22,0],'ARNm')}}],
 RBT=[
  [`Transcription : l'arbre de Noël`,`Frontière du centre fibrillaire`,`Sur chaque gène d'ARN ribosomique actif, une centaine d'ARN polymérases I se suivent, recrutées au promoteur par UBF et SL1. Chacune fabrique le même transcrit, le pré-ARNr 47S, long d'environ 13 000 nucléotides : plus elle a avancé, plus son brin est long, d'où l'allure en arbre de Noël. Ce transcrit unique contient trois des quatre ARN du ribosome — 18S (vert), 5,8S (orange) et 28S (bleu) — séparés et encadrés par des espaceurs (gris) qui seront éliminés. Dès qu'elle sort, l'extrémité 5′ se replie avec le snoRNP U3 et des dizaines de protéines : c'est le processome de la petite sous-unité, le bouton au bout de chaque brin.`],
  [`Retouches : les snoRNP`,`Composant fibrillaire dense`,`Pendant que le brin s'allonge, de petits ARN guides s'y apparient et désignent, à la base près, les nucléotides à modifier. Les snoRNP à boîtes C/D portent la fibrillarine, qui méthyle le ribose en 2′-O ; les snoRNP à boîtes H/ACA portent la dyskérine, qui transforme l'uridine en pseudouridine. Un peu plus de cent sites de chaque sorte sur les ARNr humains, concentrés dans les régions fonctionnelles du futur ribosome : centre de décodage, centre peptidyl-transférase.`],
  [`Clivages : libérer les ARNr`,`Du DFC au composant granulaire`,`Le 47S est d'abord rogné à ses deux extrémités. Une coupure dans l'espaceur ITS1 sépare ensuite les deux lignées : à gauche, le précurseur de la petite sous-unité (30S, puis 21S, puis 18S-E) ; à droite, le 32S, d'où sortiront le 5,8S et le 28S après retrait de l'ITS2. Les espaceurs libérés sont détruits par l'exosome et l'exonucléase XRN2 (billes rouges). Chez l'humain, plusieurs ordres de coupure coexistent.`],
  [`Assemblage : ARN et protéines`,`Composant granulaire`,`Les 80 protéines ribosomiques (33 pour la petite sous-unité, 47 pour la grande) sont traduites dans le cytoplasme puis importées dans le noyau. Elles se posent sur l'ARNr dans un ordre précis, pendant qu'il se replie. Le quatrième ARNr, le 5S, transcrit hors du nucléole par l'ARN polymérase III, arrive lié à RPL5 et RPL11 et forme la protubérance centrale de la grande sous-unité. Plus de 200 facteurs d'assemblage (roses) — hélicases, GTPases, ATPases — guident chaque étape puis se retirent. Si l'assemblage échoue, le RNP 5S resté libre se fixe sur MDM2 et stabilise p53 : c'est le stress nucléolaire, au cœur de l'anémie de Blackfan-Diamond.`],
  [`Export : franchir le pore`,`Enveloppe nucléaire`,`Les deux particules quittent le nucléole séparément, traversent le nucléoplasme et passent chacune par un pore nucléaire. Trop grosses pour diffuser, elles sont prises en charge par l'exportine XPO1 (CRM1) et la GTPase Ran ; la grande sous-unité y est reliée par l'adaptateur NMD3. Seules les particules correctement assemblées sont exportées.`],
  [`Finitions dans le cytoplasme`,`Cytoplasme`,`Les sous-unités ne sont pas encore fonctionnelles. Sur la petite, l'endonucléase NOB1 coupe l'extrémité 3′ du 18S-E : l'ARNr 18S est mûr. Sur la grande, eIF6, qui empêchait toute association prématurée avec la petite, est chassé par SBDS et la GTPase EFL1 — l'étape en défaut dans le syndrome de Shwachman-Diamond ; NMD3 et les derniers facteurs se retirent.`],
  [`Le ribosome au travail`,`Cytoplasme`,`La petite sous-unité se charge sur un ARNm, la grande la rejoint au codon de départ : le ribosome 80S est complet. Quatre ARNr, 80 protéines, environ 4,3 millions de daltons, et un site catalytique fait d'ARN : le ribosome est un ribozyme. Une cellule en croissance en contient plusieurs millions et consacre une grande part de son énergie à en fabriquer.`]];
SXQ.rb={S:RBS,T:RBT,ti:'Naissance d\'un ribosome',solo:1,zn:.012,zx:.5,bg:[.03,.035,.06],sc:[0,0],sz:.15,
 in:`Sept étapes suivent la fabrication d'un ribosome, du gène au cytoplasme : transcription de l'ADN ribosomique par la polymérase I, retouches et clivages du pré-ARNr, assemblage des deux sous-unités avec les protéines ribosomiques, export par un pore nucléaire, finitions, puis le ribosome au travail sur un ARNm. Les couleurs suivent les ARNr tout du long : 18S vert, 28S bleu, 5,8S orange, 5S jaune. Le dessin est schématique ; les étapes, leur ordre et leurs acteurs sont ceux de la cellule humaine. Glissez pour tourner autour de la scène, molette ou pincement pour zoomer.`,
 su:`Un gène, trois polymérases, des centaines de facteurs : la polymérase I transcrit le 47S, les snoRNP le retouchent, des nucléases le découpent, 80 protéines s'y assemblent, le RNP 5S s'y ajoute, XPO1 exporte les deux particules, NOB1, SBDS et EFL1 les terminent. Chaque étape a ses maladies, les ribosomopathies : syndrome de Treacher Collins (transcription), dyskératose congénitale (dyskérine), anémie de Blackfan-Diamond (protéines ribosomiques), syndrome de Shwachman-Diamond (finition de la grande sous-unité).`,
 o:()=>{dSx0.r=dSx1.r=2;return NOL.slice()},en:()=>{dSx0.r=dSx1.r=1},
 fd:M=>{let S=RBS[M.st];if(!M.rb){M.rb=1;M.X=[1,0,0];M.Y=[0,1,0];M.Z=[0,0,1];M.fb=[0,0,-1];M.ub=[0,1,0];M.Cc=M.O.slice();M.Ct=M.O.slice()}S?S.d(M.ta,S):(sub(0,[-30,0,0],1,1,0),sub(1,[26,0,0],1,1,0,{s5:1}))}};
$('rbb').textContent='◉ Naissance d\'un ribosome';$('rbb').onclick=()=>sxIn('rb');
{const b0=btT;btT=()=>{b0();if(RX||NX||SX)return;$('rbb').style.display=go&&ORG&&ORG.i=='nol'&&!AP&&!PM?'block':'none'}}}
