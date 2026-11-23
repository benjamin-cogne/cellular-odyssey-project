// ================= fiches supplémentaires : intérieur des organites =================
Object.assign(I,{
mitI:['Matrice mitochondriale','Vous êtes dans la matrice (pH ≈ 7,8), entre les crêtes : cycle de Krebs, β-oxydation, pyruvate déshydrogénase, ADN mitochondrial, mitoribosomes. Les crêtes portent la chaîne respiratoire : complexes I (bleu), II (violet), III (vert), IV (rose) ; les ATP synthases (orange) s\'alignent en dimères sur leurs bords. Points jaunes : électrons ; points blancs : protons ; points verts : ATP. Touchez un complexe pour sa fiche.'],
crs:['Crête mitochondriale','Repli lamellaire de la membrane interne (lumière ≈ 20 nm), relié à la membrane interne périphérique par d\'étroites jonctions de crêtes tenues par le complexe MICOS. Membrane très riche en protéines (≈ 75 % de sa masse) et en cardiolipine. Les protons pompés s\'accumulent dans la lumière des crêtes : force proton-motrice ≈ 180–200 mV. Les transporteurs mobiles n\'apparaissent pas : ubiquinone dans la membrane, cytochrome c (12 kDa) côté lumière.'],
c1:['Complexe I — NADH:ubiquinone oxydoréductase','45 sous-unités, ≈ 1 MDa, en forme de L. Bras matriciel : NADH → FMN → chaîne de centres fer-soufre → ubiquinone. Bras membranaire : pompe 4 H⁺ par paire d\'électrons. Sept sous-unités (ND1–ND6, ND4L) sont codées par l\'ADN mitochondrial. Associé à III₂ et IV en « respirasome ». Inhibé par la roténone ; ses déficits donnent le syndrome de Leigh ou la neuropathie optique de Leber.'],
c2:['Complexe II — succinate déshydrogénase','Quatre sous-unités (SDHA à SDHD), toutes codées par le noyau. Seule enzyme commune au cycle de Krebs et à la chaîne respiratoire : succinate → fumarate, électrons vers le FAD, trois centres fer-soufre puis l\'ubiquinone. Ne pompe aucun proton. Variants SDHx : paragangliomes et phéochromocytomes héréditaires.'],
c3:['Complexe III — cytochrome bc₁','Dimère obligatoire, 11 sous-unités par monomère (le cytochrome b est codé par l\'ADN mitochondrial). Par le cycle Q, il oxyde l\'ubiquinol, réduit le cytochrome c et transfère 4 H⁺ par paire d\'électrons vers la lumière des crêtes. Inhibé par l\'antimycine A.'],
c4:['Complexe IV — cytochrome c oxydase','13 à 14 sous-unités (COX1 à COX3 codées par l\'ADN mitochondrial). Reçoit les électrons du cytochrome c (CuA → hème a → centre hème a₃–CuB) et réduit O₂ en 2 H₂O : c\'est ici qu\'est consommé l\'oxygène respiré. Pompe 2 H⁺ par paire d\'électrons. Inhibé par le cyanure, le monoxyde de carbone et l\'azoture.'],
c5:['ATP synthase (complexe V) — dimère','Moteur rotatif : les protons traversent Fo et font tourner l\'anneau c (8 sous-unités chez l\'humain) et l\'axe γ ; la tête F₁ (α₃β₃, côté matrice) fabrique 3 ATP par tour, soit ≈ 2,7 H⁺ par ATP. Les dimères, inclinés d\'environ 86°, forment des rangées qui courbent le bord des crêtes. ATP6 et ATP8 sont codées par l\'ADN mitochondrial. Inhibée par l\'oligomycine.'],
mtd:['Nucléoïde — ADN mitochondrial','Cercle double brin de 16 569 pb compacté par TFAM (≈ 100 nm). 37 gènes : 13 protéines de la chaîne respiratoire, 22 ARNt, 2 ARNr ; code génétique propre (UGA = Trp). Répliqué par la polymérase γ (POLG) et l\'hélicase Twinkle. Hérédité maternelle, hétéroplasmie.'],
mrb:['Mitoribosome','Ribosome 55S (sous-unités 28S et 39S), plus riche en protéines qu\'en ARN. Arrimé à la membrane interne, il traduit les 13 protéines codées par l\'ADN mitochondrial et les insère directement dans la membrane (OXA1L).'],
pdh:['Pyruvate déshydrogénase','Complexe géant (≈ 9 MDa, ≈ 45 nm) : E1, cœur E2, E3. Pyruvate + CoA + NAD⁺ → acétyl-CoA + CO₂ + NADH : la porte d\'entrée du cycle de Krebs. Cofacteurs : thiamine pyrophosphate, lipoate, FAD.'],
rerI:['Lumière du réticulum endoplasmique','Compartiment oxydant et riche en Ca²⁺ (points blancs), large d\'environ 50 nm. Les chaînes naissantes y entrent par le translocon, reçoivent leurs N-glycanes, forment leurs ponts disulfure et se replient avec l\'aide des chaperons, avant de partir vers le Golgi en vésicules COPII. Les protéines mal repliées sont renvoyées au cytosol et dégradées (ERAD).'],
tlc:['Translocon Sec61 et chaîne naissante','Le ribosome, côté cytosol, est arrimé au canal Sec61 après ciblage par la SRP. La chaîne entre dépliée ; la signal-peptidase coupe le peptide signal ; l\'oligosaccharyltransférase (violet) greffe en bloc Glc₃Man₉GlcNAc₂ sur les asparagines des motifs N-X-S/T. BiP (orange), une Hsp70, tire et replie la chaîne en consommant de l\'ATP.'],
cnx:['Calnexine','Lectine chaperon membranaire (la calréticuline est son équivalent soluble). Elle retient les glycoprotéines portant un seul glucose terminal ; l\'UGGT reglucosyle celles qui sont encore mal repliées : c\'est le cycle de contrôle qualité. ERp57 y catalyse les ponts disulfure.'],
clp:['CLIMP-63','Protéine transmembranaire dont les domaines luminaux en superhélice se font face et maintiennent l\'écartement des deux membranes d\'une citerne (≈ 50 nm).'],
srk:['Pompe SERCA et canaux calciques','La pompe SERCA, ATPase de type P, fait entrer 2 Ca²⁺ par ATP : ≈ 0,5 mM dans la lumière contre ≈ 100 nM dans le cytosol. Les récepteurs de l\'IP₃ et de la ryanodine libèrent ce calcium à la demande.'],
pdi:['Protéine disulfure isomérase (PDI)','Oxydoréductase à motifs CXXC : elle forme, casse et réarrange les ponts disulfure jusqu\'au bon appariement ; elle est réoxydée par Ero1.'],
gp:['Glycoprotéine repliée','Protéine prête à l\'export, avec son N-glycane (mannoses verts, N-acétylglucosamines bleues). Dans l\'érythroblaste, c\'est par exemple le récepteur TfR1. Elle sera concentrée aux sites de sortie par le manteau COPII (Sec23/24, Sec13/31).'],
gle:['Glycosyltransférase du Golgi','Protéine membranaire de type II : courte queue cytosolique, tige, domaine catalytique dans la lumière. Elle transfère un sucre depuis un nucléotide-sucre (UDP-GlcNAc, UDP-Gal, CMP-acide sialique…) importé par un antiport. Chaque citerne possède son jeu d\'enzymes, d\'où la maturation séquentielle.'],
glc:['Glycoprotéine en maturation','Symboles SNFG : mannose vert, N-acétylglucosamine bleue, galactose jaune, acide sialique violet, fucose rouge. Le glycane riche en mannose reçu dans le RE est raboté puis reconstruit en glycane complexe au fil des citernes.'],
golI:['','']});
const GOL=[['du réseau trans-golgien','Station de tri : sulfatation des tyrosines, clivage des pro-protéines par la furine, récepteurs du mannose-6-phosphate vers les endosomes (clathrine/AP-1), vésicules vers la membrane plasmique.'],
 ['trans','pH ≈ 6,0. Galactosyltransférases et sialyltransférases terminent les antennes des glycanes complexes.'],
 ['médiane','GlcNAc-transférase I, mannosidase II puis GlcNAc-transférase II : passage du glycane riche en mannose au glycane complexe ; fucosylation du cœur.'],0,
 ['cis','pH ≈ 6,7. Arrivée des vésicules COPII. Les mannosidases I retirent des mannoses (Man₉ → Man₅) ; la GlcNAc-phosphotransférase marque les enzymes lysosomales par le mannose-6-phosphate ; les protéines résidentes du RE (motif KDEL) repartent en vésicules COPI.']];GOL[3]=GOL[2];

// ================= clic ou toucher : fiche de l'élément visé =================
let pin=0,pinK=0,pinT=0,ORG=0,OC=[],PM=0,eC=0,S1=[],S5=[];
function pick(e){let x=e.clientX/cv.clientWidth*2-1,y=1-e.clientY/cv.clientHeight*2,D=nm(ad(ad(vf,ml(vr,x/fx)),ml(vu,y/fy))),b=[1e9],L,o,t,k,
  sp=(c,r,far)=>{let o=sb(c,E),t=dt(o,D),d=dt(o,o)-t*t;if(d>r*r)return 1e9;d=sqrt(r*r-d);return far?t+d:t-d>0?t-d:1e9},        // intersection rayon–sphère
  T=(t,v)=>{t>0&&t<b[0]&&(b=[t,v])},pt=t=>ma(E,D,t);
  for(L of ORG?[OC,[ORG]]:reg>1?[NU,DN,dyc,LMC]:reg?[CY,dyc,SYX]:[OX,SYI])for(o of L)
    if(o.e){let q=sb(E,o.c),s=o.s,O=[dt(q,o.X)/s[0],dt(q,o.Y)/s[1],dt(q,o.Z)/s[2]],V=[dt(D,o.X)/s[0],dt(D,o.Y)/s[1],dt(D,o.Z)/s[2]],a=dt(V,V),h=dt(O,V),d=h*h-a*(dt(O,O)-1);
      if(d>0)t=(-h-sqrt(d))/a,T(t>0?t:(-h+sqrt(d))/a,o)}
    else for(k=0;k<5;k++){T(sp(lp(o.a,o.b,k/4),max(o.r,z*.3))+(o.bg?1e3:0),o);if(o.a==o.b)break}
  if(!ORG&&reg>1){CN.forEach((N,c)=>N.p.forEach((q,i)=>T(sp(q,.05),{ch:[c,i,q]})));TG.U&&TG.U.forEach(W=>T(sp(W.c,.006),{un:W}));t=sp(Nc,Rn-.04,1);if(t<1e9){let d=nm(sb(pt(t),Nc));T(t,{i:PD.some(q=>dt(q,d)>.99985)?'npc':'lam'})}}
  if(!ORG&&reg==1){t=sp(Nc,Rn);if(t<1e9){let d=nm(sb(pt(t),Nc));T(t,{i:PD.some(q=>dt(q,d)>.99985)?'npc':'ne'})}t=sp(Cc,Rc,1);t<1e9&&T(t,{i:mdk(pt(t))})}
  if(!reg){t=sp(Ce,Re);if(t<1e9&&!(b[1]&&b[1].sf&&b[0]<t+.12))k=ds(pt(t),e0),T(t,{i:k<.07?'pit':k<.6?'tfr':'mem'})}
  o=b[1];pinK=!o?ORG?ORG.i+'I':reg==1?rk():['ext',,'nuc'][reg]:o.ch||o.un?0:o.i;pin=pinK?I[pinK]:o.ch?cI(o.ch):uI(o.un);o&&sn(o.i);pinT=8;hT=0}

// ================= intérieur des organites (construit à l'entrée) =================
const Lx0=Ly(M1,.3,.12,{rg:1,vz:110}),Lx1=Ly(M1,.5,.12,{rg:1,vz:110}),Lxc=Ly(MD,.5,.12,{rg:1,vz:110}),Lxa=Ly(M3,.6,.12,{rg:1,vz:110,al:1}),dO=dy(Ldb,900,[0,0,0],.3),
sc=(p,r,i)=>OC.push({a:p,b:p,r,i,q:p,R:r,sf:1}),
gly=(P,n,k)=>{let o=pp(n),i,q=P,c=[0x36d,0x36d,0x3b5],m=k==4?['3b5','3b5','3b5']:k>1?['36d']:k?['36d','fd3','a4c']:['36d','fd3','a4c'];     // N-glycane, couleurs SNFG
  for(i=0;i<3;i++)q=ma(q,n,.0011),S(Lx0,q,.0006,K(c[i]));k<4&&S(Lx0,ma(P,o,.0011),.0006,K(0xe33));
  for(let s of[-1,1]){let a=q;S(Lx0,a=ad(a,ml(ad(n,ml(o,s*.9)),.0009)),.0006,K(0x3b5));m.forEach(h=>S(Lx0,a=ad(a,ml(ad(n,ml(o,s*.5)),.0009)),.0006,K(parseInt(h,16))))}};
function mkMit(m){let q=m.c,x=m.X,a=m.Y,y=m.Z,w=m.s[0],L=m.s[1],k=0,t,n=0;S1=[];S5=[];
  for(t=-L+.1;t<L-.08;t+=.085){let h=w*sqrt(1-t*t/L/L)*.86,c=ma(ma(q,a,t),x,(k++%2?1:-1)*h*.18),r1=h*.8,r2=h*.95,g,s,i,j;cE(OC,c,x,a,y,[r1,.011,r2],'crs');
    for(g=0;g<TAU;g+=.022/h){let R0=ad(ma(c,x,r1*cos(g)),ml(y,r2*sin(g))),ro=nm(ad(ml(x,r2*cos(g)),ml(y,r1*sin(g))));sc(ma(R0,ro,.008),.011,'c5');          // rangée de dimères d'ATP synthase sur le bord
      for(s of[-1,1]){let d=nm(ad(ml(ro,.73),ml(a,s*.68))),b=ma(R0,a,s*.004),F=ma(b,d,.0125);S(Lx0,b,.0035,K(0x3a9));Cy(Lxc,b,F,.0012,K(0x9a8));S(Lx0,F,.005,K(0xfa3));S5.push([b,F,d])}}
    for(s of[-1,1])for(i=-6;i<7;i++)for(j=-6;j<7;j++){let u=i*.045+rr(-.012,.012),v=j*.045+rr(-.012,.012),e=1-(u/r1)**2-(v/r2)**2;if(e<.3)continue;
      let P0=ad(ad(ma(c,x,u),ml(y,v)),ml(a,s*.011*sqrt(e))),N=ml(a,s),g=rr(0,TAU),e1=ad(ml(x,cos(g)),ml(y,sin(g))),e2=cr(N,e1),o=(d1,d2,dn)=>ad(ad(ma(P0,e1,d1),ml(e2,d2)),ml(N,dn));
      if(n++%5==4){S(Lx0,o(0,0,.003),.0036,K(0xa7d));S(Lx0,o(0,0,.008),.0028,K(0xc9e));sc(o(0,0,.005),.006,'c2');continue}                          // complexe II
      for(let d of[-.004,.004,.012])S(Lx0,o(d,0,.001),.0038,K(0x48d));for(let d of[.006,.0115,.017])S(Lx0,o(-.006,0,d),.0036,K(0x6af));sc(o(0,0,.008),.012,'c1');     // complexe I en L
      for(let d of[-.003,.003])S(Lx0,o(.004,.0085+d,.003),.0042,K(0x5b6));sc(o(.004,.0085,.003),.0065,'c3');S(Lx0,o(.013,.009,.0015),.0036,K(0xd67));sc(o(.013,.009,.0015),.005,'c4');
      S1.push([o(-.006,0,.019),o(-.006,0,.002),o(.004,.0085,.004),o(.013,.009,.004),N])}}
  for(k=0;k<34;k++){let j=floor(rr(1,(2*L-.2)/.085-1)),tt=-L+.1+.085*(j+.5),h=w*sqrt(1-tt*tt/L/L)*.6,g=rr(0,TAU),r=h*sqrt(R()),c=ad(ad(ma(q,a,tt),ml(x,r*cos(g))),ml(y,r*sin(g)));
    if(k<3){for(let i=0;i<60;i++){let f=i/60*TAU;S(Lx0,ad(ad(ma(c,x,.035*cos(f)*(1+.3*sin(5*f))),ml(y,.035*sin(f)*(1+.3*cos(3*f)))),ml(a,.012*sin(7*f))),.003,K(0xfe6))}sc(c,.04,'mtd')}
    else if(k<9)S(Lx1,c,.021,K(0x9c6)),sc(c,.022,'pdh');else S(Lx1,c,.011,K(0xdb8)),S(Lx1,ma(c,x,.011),.008,K(0xa86)),sc(c,.014,'mrb')}
  return ma(q,a,-L+.1+.085*(floor((L-.1)/.085)+.5))}
function mkER(m){let{c,X,Y,Z}=m,i,k;
  for(i=0;i<300;i++){let s=i%2?1:-1,g=rr(0,TAU),r=.44*sqrt(R()),h=.026*sqrt(1-r*r/.23),P0=ad(ad(ma(c,X,r*cos(g)),ml(Z,r*sin(g))),ml(Y,s*h)),n=ml(Y,-s),ty=i%5;
    if(ty<2){S(Lx0,P0,.003,K(0x4cd));S(Lx0,ma(P0,X,.006),.004,K(0xa7d));S(Lx1,ma(P0,n,-.017),.0125,K(0xdc9));S(Lx1,ma(P0,n,-.03),.009,K(0xa97));     // translocon, OST, ribosome côté cytosol
      let q=P0,l=rr(6,16)|0,d=rd();for(k=0;k<l;k++)q=ad(q,ml(nm(ad(n,ml(d,.7*sin(k*.9)))),.0011)),S(Lx0,q,.0007,K(0xeee)),k==4&&!ty&&gly(q,d,4);
      S(Lx0,ma(q,d,.003),.003,K(0xf93));sc(ma(P0,n,.008),.01,'tlc')}
    else if(ty==2)Cy(Lxc,P0,ma(P0,n,.006),.0008,K(0x7c9)),S(Lx0,ma(P0,n,.0075),.0028,K(0x7c9)),sc(ma(P0,n,.006),.005,'cnx');
    else if(ty==3)Cy(Lxc,P0,ma(P0,n,2*h),.0009,K(0x99b)),OC.push({a:P0,b:ma(P0,n,2*h),r:.001,i:'clp',q:ma(P0,n,h),R:h+.002});
    else S(Lx0,P0,.004,K(0xd95)),sc(P0,.005,'srk')}
  for(i=0;i<330;i++){let g=rr(0,TAU),r=.44*sqrt(R()),h=.02*sqrt(1-r*r/.23),q=ad(ad(ma(c,X,r*cos(g)),ml(Z,r*sin(g))),ml(Y,rr(-h,h)));
    if(i<45)S(Lx0,q,.0025,K(0xed5)),sc(q,.004,'pdi');else if(i<80)S(Lx0,q,.003,K(0xdbd)),gly(q,rd(),4),sc(q,.005,'gp');else S(Lx0,q,.0005,[2,2,2.6,1])}
  return c}
function mkGol(m){let{c,X,Y,Z,k}=m,w=m.s[2],i,E=[0xd6a,0xdb4,0x49d,0x49d,0x4b6][k];I.golI=['Lumière du Golgi — citerne '+GOL[k][0],'Lumière large de 15 à 30 nm. '+GOL[k][1]+' Sucettes : glycosyltransférases ancrées dans la membrane ; billes : glycoprotéines et leurs glycanes.'];
  for(i=0;i<260;i++){let g=rr(0,TAU),r=.9*sqrt(R()),u=.17*r*cos(g),v=w*r*sin(g),h=.012*sqrt(1-r*r);
    if(i<170){let s=i%2?1:-1,P0=ad(ad(ma(c,X,u),ml(Z,v)),ml(Y,s*h)),n=ml(Y,-s);Cy(Lxc,P0,ma(P0,n,.0035),.0006,K(E));S(Lx0,ma(P0,n,.0048),.0022,K(E));sc(ma(P0,n,.004),.004,'gle')}
    else{let q=ad(ad(ma(c,X,u),ml(Z,v)),ml(Y,rr(-.5,.5)*h));S(Lx0,q,.0026,K(0xddd));gly(q,rd(),k);sc(q,.005,'glc')}}
  return c}
const ENT={mit:[.012,'la mitochondrie',mkMit,'Entrée par la voie d\'import des protéines : complexe TOM (membrane externe) puis TIM23 (membrane interne). Licence narrative : seules des chaînes dépliées y passent.'],
 rer:[.008,'le réticulum',mkER,'Entrée par le translocon Sec61, comme une chaîne naissante (licence narrative).'],gol:[.004,'cette citerne du Golgi',mkGol,'Entrée comme le contenu d\'une vésicule qui fusionne avec la citerne (licence narrative).']};
function pO(r){let o=ORG,d=sb(p,o.c),s=o.s,m=r+.003,a=s[0]-m,b=max(.002,s[1]-m),c=s[2]-m,q=[dt(d,o.X)/a,dt(d,o.Y)/b,dt(d,o.Z)/c],l=ln(q);       // confinement dans l'organite
  if(o.cy){let h=dt(d,o.Y),w=sb(d,ml(o.Y,h)),e=ln(w);if(e>a||abs(h)>b)p=ad(o.c,ad(ml(w,e>a?a/e:1),ml(o.Y,cl(h,-b,b))))}       // organite en cylindre (sarcomère)
  else if(l>1)p=ad(o.c,ad(ad(ml(o.X,q[0]/l*a),ml(o.Y,q[1]/l*b)),ml(o.Z,q[2]/l*c)));
  if(hit(OC,r))vel*=.985}
function btT(){if(RX||NX||SX)return;$('csb').style.display=KMS.length>1&&go&&!PM&&!AP&&!ORG&&reg>1&&ct<0&&ln(p)<GR+.3?'block':'none';{let v=go&&!PM&&!AP&&!ORG&&reg>1&&ct<0&&ln(p)<GR+.3;$('hxb').style.display=v?'block':'none';v&&!hxHi&&z<.12&&(hxHi=1,say('Chromatine : le bouton « ◈ Code des histones » montre une à une les marques d\'un nucléosome, avec leurs écrivains, lecteurs et effaceurs.',8))}{let v=go&&!PM&&!AP&&!ORG&&reg>1&&ct<0&&CBS.some(c=>ds(p,c)<.45+2*z);$('sxb').style.display=v?'block':'none';v&&!sxHi&&(sxHi=1,say('Corps de Cajal : le bouton « ⚛ Assemblage des snRNP » montre la fabrication du tri-snRNP, molécule par molécule.',8))}$('nxb').style.display=CT>1&&go&&!PM&&!AP&&!ORG&&reg<2&&ct<0?'block':'none';$('rxb').style.display=go&&!PM&&!AP&&reg>0&&ct<0&&rxHere().length?'block':'none';let e=$('ent'),o=nI;eC=ORG||AP||PM?0:reg>1?z<.2&&ds(p,NOL)<1.08+3*z?NOC:0:reg==1&&o&&ENT[o.i]&&nD<3*z+.06?o:0;!eC&&!ORG&&!AP&&!PM&&reg>1&&z>=.2&&ds(p,NOL)<1.2+z*.42&&say('Nucléole : le vaisseau est trop gros pour y entrer. Rétrécissez-le sous 200 nm (Q, − ou molette).',3);          // avertissement de taille
  e.style.display=eC||ORG&&!AP?'block':'none';e.textContent=ORG?ORG.i=='nol'?'⇤ Sortir du nucléole':ORG.i=='myf'?'⇤ Sortir de la myofibrille':ORG.xt||'⇤ Sortir de l\'organite':eC?'⇥ Entrer dans '+ENT[eC.i][1]:'';
  $('gui').style.display=go&&!reg&&ct<0&&!AP&&ds(p,LU&&LU.bbb?TCY:e0)>.6?'block':'none';$('xit').style.display=go&&reg==1&&!ORG&&!AP&&!PM&&ct<0?'block':'none';$('bld').style.display=go&&!reg&&LU&&ct<0?'block':'none';$('tcy').style.display=go&&!reg&&TCY&&ds(p,TCY)<1.4&&ct<0?'block':'none';
  $('pmb').style.display=go&&!PM&&!ORG&&!AP&&reg>1&&(ln(p)<GR-.5||TG.U&&ds(p,TG.C)<TG.Rl+.5)?'block':'none'}
$('ent').onclick=()=>{if(AP)return;pinT=0;
  if(ORG){let o=ORG,d=sb(p,o.c),h=dt(d,o.Y),B=o.i=='nol'?ma(NOL,nm(d),1.14):o.i=='mit'||o.cy?ad(ma(o.c,o.Y,h),ml(ln(sb(d,ml(o.Y,h)))>1e-5?nm(sb(d,ml(o.Y,h))):o.X,o.s[0]+(o.cy?.16:.12))):ma(p,o.Y,(h<0?-1:1)*(o.s[1]+.07)-h);ORG=0;OC=[];dO.n=0;fly(B,.02)}
  else if(eC){let o=eC,e=ENT[o.i];[Lx0,Lx1,Lxc,Lxa].forEach(clr);OC=[];let B=e[2](o);fin();o.zm=o.zx||e[0]*(o.i=='nol'?3:2);dO.c=o.c;ORG=o;fly(B,e[0],()=>say(e[3],9))}};
function oT(){dO.n=0;dO.c=p;if(ORG&&ORG.i=='mit'&&!AP){let i,s,f,q,n=0;                    // animation : électrons, protons, ATP près du vaisseau
    for(i=0;i<S1.length&&n<700;i++){s=S1[i];if(ds(s[1],p)>.09)continue;f=(sT*.7+i*.37)%1;q=f<.3?lp(s[0],s[1],f/.3):f<.65?lp(s[1],s[2],(f-.3)/.35):lp(s[2],s[3],(f-.65)/.35);dS(dO,q,.0009,[3,2.5,.3,1]);
      for(let k=1;k<4;k++)dS(dO,ma(s[k],s[4],.012*(1-(f*2+k*.3)%1)),.0006,[2.2,2.6,3,1]),n+=1}
    for(i=0;i<S5.length&&n<850;i++){s=S5[i];if(ds(s[1],p)>.09)continue;f=(sT*.9+i*.61)%1;dS(dO,lp(s[0],s[1],f),.0006,[2.2,2.6,3,1]);dS(dO,ma(s[1],s[2],.006+.016*f),.0012,[.5,3,.8,1]);n+=2}}
  dO.n&&up(dO)}

// ================= « Je suis l'ARN polymérase II » : transcription guidée du gène de la cellule =================
// étape : [déclencheur (pb, ou -100-s pour une durée, 9001 clivage, 9002 fin), titre, texte simple, texte expert, question, [réponses, la 1re est juste]]
const e1=G.ex[0][1],NI=G.I.length,i1=NI?G.ex[1][0]:G.L,li=NI?G.I[NI-1].b:0,b1=BP[0]||{},sqR=(a,n)=>{let s='';for(let k=0;k<n;k++)s+=SQ(a+k);return s.replace(/T/g,'U')},x4=max(60,min(110,e1-20)),x5=max(x4+15,e1+18),pm=G.pm,
ST0=[[-8,`Recrutement au promoteur`,`Vous êtes l'ARN polymérase II, devant le gène ${G.sy}. Les facteurs généraux de transcription vous installent sur le promoteur. ${pm[0]} L'hélicase de TFIIH ouvre la double hélice : le brin matrice entre dans votre site actif.`,
 `Assemblage du complexe de pré-initiation : ${pm[1]} La translocase XPB de TFIIH (ATP) fait fondre 11 à 15 pb : complexe ouvert. Votre CTD (52 heptades Y₁S₂P₃T₄S₅P₆S₇) n'est pas phosphorylé (gris).`,`Quelle sous-unité de TFIIH ouvre le promoteur ?`,[`XPB (translocase à ATP)`,`CDK7 (kinase)`,`TBP`]],
[12,`Initiation et échappement du promoteur`,`Premières liaisons phosphodiester : l'ARN commence par le ${sqR(0,1)} du site +1. La kinase de TFIIH phosphoryle votre queue CTD (elle vire à l'orange) : vous lâchez le promoteur.`,
 `Après quelques cycles abortifs (< 10 nt), l'hybride ARN–ADN atteint 8–9 pb et vous quittez le promoteur. CDK7 (TFIIH) phosphoryle Ser5 et Ser7 du CTD : rupture du lien avec le Médiateur, recrutement de l'enzyme de coiffe et de SET1/COMPASS (H3K4me3 sur les nucléosomes en 5′). TFIID reste en place pour la réinitiation.`,`Quelle marque du CTD signe l'initiation ?`,[`Ser5-P (CDK7)`,`Ser2-P (CDK9)`,`Tyr1-P`]],
[27,`Coiffe en 5′`,`À 25 nucléotides, l'extrémité 5′ de l'ARN émerge : on y greffe aussitôt une coiffe 7-méthylguanosine, liée « tête-bêche ». Elle protège l'ARN et servira à l'export puis à la traduction. Le complexe CBC (blanc) s'y fixe.`,
 `L'enzyme de coiffe RNGTT, arrimée au CTD Ser5-P, retire le phosphate γ (triphosphatase) puis transfère un GMP : liaison 5′–5′ triphosphate. RNMT/RAM méthyle le N7 (coiffe 0, m⁷GpppN) ; CMTR1 méthyle le 2′-OH du premier nucléotide (coiffe 1), marque du « soi » pour l'immunité innée. CBC (CBP80/CBP20) lie la coiffe.`,`Quelle liaison unit la coiffe au premier nucléotide ?`,[`5′–5′ triphosphate`,`3′–5′ phosphodiester`,`2′–5′ phosphodiester`]],
[42,`Pause proximale`,`Arrêt obligatoire vers +40 : deux facteurs, DSIF et NELF, vous retiennent. C'est un point de contrôle majeur de l'expression des gènes. La kinase P-TEFb vous libère en phosphorylant NELF et votre CTD (qui virera au cyan).${pm[2]}`,
 `Pause entre +20 et +60 : DSIF (SPT4/SPT5) et NELF vous immobilisent. P-TEFb (CDK9/cycline T1, libéré du snRNP 7SK, recruté par BRD4 ou le complexe de super-élongation) phosphoryle NELF (éjecté), SPT5 (qui devient facteur positif) et Ser2 du CTD. PAF1C et SPT6 vous rejoignent.${pm[2]}`,`Quelle kinase lève la pause ?`,[`CDK9 (P-TEFb)`,`CDK7 (TFIIH)`,`ATM`]],
[x4,`Élongation`,`Vous filez à ≈ 30 nucléotides par seconde. À chaque pas, un nucléotide complémentaire du brin matrice est ajouté en 3′ de l'ARN. Le codon d'initiation AUG (${G.cs==CM?`+${G.cs+1}`:`nt ${CM+1} de l'ARNm, dans l'exon ${XN[G.cs]+1}`}) ${G.cs<x4?`vient de passer`:`n'est pas encore sorti`}, mais rien ne sera traduit avant le cytoplasme.`,
 `Cycle d'addition : entrée du NTP, fermeture de la boucle gâchette, catalyse à deux Mg²⁺ (attaque du 3′-OH sur le phosphate α, départ du pyrophosphate), translocation. Bulle de 12 à 14 nt. FACT et SPT6 démontent puis remontent les nucléosomes ; RNF20/40 ubiquitine H2B. TFIIS relance la polymérase après un recul en clivant l'ARN.`,`Quel groupe de l'ARN attaque le NTP entrant ?`,[`Le 3′-OH`,`Le 2′-OH`,`Le 5′-phosphate`]],
[x5,`Site donneur : arrivée de U1`,`La fin de l'exon 1 est sortie. La petite ribonucléoprotéine U1 (bleu clair) reconnaît le début de l'intron, qui commence presque toujours par GU : c'est le site donneur d'épissage.`,
 `Le 5′ de l'ARNsn U1 s'apparie au site donneur (ici ${sqR(e1-3,3)}|${sqR(e1,6)} ; consensus MAG|GURAGU) : complexe E. U1-70K interagit avec les protéines SR fixées sur l'exon et avec le CTD. U1 protège aussi le transcrit d'une polyadénylation prématurée.${pm[3]}`,`Par quoi U1 reconnaît-il le site donneur ?`,[`Un appariement de bases avec son ARNsn`,`Une protéine à doigts de zinc`,`La coiffe`]],
[i1+26,`Ralenti — complexe A : U2 au point de branchement`,`L'intron 1 (${nf(NI?G.I[0].n:0)} nt${NI&&G.I[0].n>i1-e1?`, dont ${i1-e1} modélisés`:``}) est entièrement sorti. Le snRNP U2 (vert) se fixe sur le point de branchement, une adénosine clé, pendant que U2AF (orange) marque la fin de l'intron, terminée par AG.`,
 `SF1 puis U2 : l'ARNsn U2 s'apparie autour du point de branchement (consensus yUnAy${b1.d?` ; candidat le mieux classé dans cette séquence : ${rU(b1.s)}, A à ${b1.d} nt de l'accepteur, ${b1.v<4?`accord seulement partiel avec le consensus, `:``}prédit et non validé expérimentalement`:``}) en laissant l'adénosine en saillie, 2′-OH exposé ; SF3B1 la maintient (gène muté dans les myélodysplasies). U2AF2 lie le tract polypyrimidique, U2AF1 le AG (ici ${sqR(i1-12,12)}|${sqR(i1,3)}). Complexe A, dépendant de l'ATP (Prp5, UAP56).${pm[4]}`,`Quel nucléotide sert de point de branchement ?`,[`Une adénosine`,`Une guanosine`,`Une uridine`]],
[-103.5,`Ralenti — complexe B : le tri-snRNP U4/U6·U5`,`Trois autres snRNP arrivent soudés en un bloc : U4, U6 et U5. Le spliceosome est complet mais encore inactif : U6, le futur cœur catalytique, est tenu en laisse par U4.`,
 `Le tri-snRNP U4/U6·U5 (≈ 1,5 MDa) rejoint le complexe A : complexe pré-B puis B. U6 y est apparié à U4, donc inactif ; la boucle I de U5 se place contre l'exon 1 ; Prp8 forme l'échafaudage du futur site actif.`,`Quel ARNsn maintient U6 inactif ?`,[`U4`,`U1`,`U2`]],
[-103.5,`Ralenti — activation et 1re transestérification`,`Deux hélicases remodèlent tout : U1 et U4 s'en vont. U6 prend la place de U1 sur le site donneur et s'apparie à U2. Le point de branchement attaque alors le début de l'intron : l'exon 1 est détaché et l'intron forme un lasso.`,
 `Prp28 décroche U1 ; Brr2 déroule U4/U6 ; le complexe NTC (Prp19) stabilise l'ensemble : complexe B activé, puis B* après Prp2. U6 (ACAGAGA sur le site donneur, boucle interne coordonnant 2 Mg²⁺) et U2 forment un site actif fait d'ARN : le spliceosome est un ribozyme. Étape 1 : le 2′-OH de l'adénosine attaque le phosphate du site donneur → exon 1 libre (3′-OH) et lasso à liaison 2′–5′.`,`Quelle liaison ferme le lasso ?`,[`2′–5′ phosphodiester`,`3′–5′ phosphodiester`,`Un pont disulfure`]],
[-104,`Ralenti — 2e transestérification, ligature, EJC`,`Second geste : l'extrémité libre de l'exon 1 attaque la fin de l'intron. Les exons 1 et 2 sont soudés ; le lasso est libéré puis détruit. Un complexe EJC (rose) est déposé juste avant la jonction : il garde la mémoire de l'épissage.`,
 `Prp16 remodèle le site actif (complexe C*) ; le 3′-OH de l'exon 1, tenu par U5, attaque le site accepteur (AG) : exons ligaturés (complexe P), libérés par Prp22. Le lasso part avec U2/U5/U6, est débranché par DBR1 puis dégradé. L'EJC (eIF4A3, MAGOH, RBM8A, CASC3) se fixe 20 à 24 nt en amont de la jonction : export, traduction, surveillance NMD. La chimie ne consomme aucune énergie ; seules les hélicases hydrolysent de l'ATP.`,`Où l'EJC est-il déposé ?`,[`20–24 nt en amont de la jonction`,`Sur le lasso`,`Sur la coiffe`]],
[min(i1+150,G.L-80),`Marques chimiques`,`Vitesse normale. Votre queue CTD est maintenant phosphorylée sur Ser2 (cyan) : elle sert de plate-forme aux enzymes qui décorent l'ARN et la chromatine pendant que vous avancez.`,
 `Ser2-P (CDK9, CDK12) domine, Ser5-P décroît (phosphatases SSU72, RPAP2). SETD2, lié au CTD, dépose H3K36me3 sur le corps du gène. Le complexe METTL3/METTL14 méthyle des adénosines en m⁶A (motif DRACH, surtout près du codon stop et dans le 3′UTR ; points magenta à venir : ${M6.length?`les motifs DRACH réels de cette séquence les plus proches du codon stop (${M6.map(m=>rU(m[2])).join(`, `)}), sites candidats car seule une partie des motifs est méthylée`:`aucun motif DRACH proche du codon stop dans cette séquence`}). ADAR peut désaminer A en inosine ; des pseudouridines sont posées par les PUS.`,`Quelle marque d'histone signe le corps d'un gène transcrit ?`,[`H3K36me3`,`H3K27me3`,`H3K9me3`]],
[min(li+30,G.L-50),`${G.I.length>2?`Introns suivants`:`Intron 2`} : même chorégraphie`,`Avance rapide. Le même ballet recommence sous vos yeux pour ${G.I.length>2?`chacun des ${G.I.length-1} introns suivants`:G.I[1]?`l'intron 2 (${nf(G.I[1].n)} nt)`:``} : U1 au site donneur, U2 au point de branchement, tri-snRNP, lasso, ligature des exons.`,
 `Introns de type U2 (GU…AG, comme plus de 99 % des introns humains). Définition d'exon : U1 en aval et U2AF en amont d'un exon interne se reconnaissent à travers lui grâce aux protéines SR.${pm[5]}`,`Quels dinucléotides bornent presque tous les introns ?`,[`GU … AG`,`AU … AC`,`GC … AU`]],
[PAS?min(PAS.x+10,G.L-6):G.L-14,`Signal de polyadénylation`,`Dernier exon terminé : le codon stop puis le 3′UTR sont transcrits (points magenta : sites m⁶A candidats). ${PAS?`Le signal ${rU(PAS.h)}, lu dans la séquence (il commence ${PAS.d} nt avant le site de clivage), vient de sortir : il annonce la fin du message.`:`Aucun hexamère de polyadénylation classique n'est reconnaissable dans les 45 derniers nucléotides de cette séquence ; la fin du message est celle du transcrit de référence.`}${pm[6]}`,
 `CPSF (WDR33 et CPSF30) reconnaît ${PAS?rU(PAS.h)+(PAS.h!=`AATAAA`?`, variante de l'hexamère canonique AAUAAA`:``):`le signal de polyadénylation`} ; CstF (CstF64) lie la région riche en GU en aval ; CFIm et CFIIm complètent. Le CTD Ser2-P (et Thr4-P) recrute ces facteurs via Pcf11.${pm[6]}`,`Quel complexe reconnaît le signal de polyadénylation ?`,[`CPSF`,`CstF`,`L'exosome`]],
[9001,`Clivage et queue poly(A)`,`Coupure ! L'ARN est sectionné peu après le signal. La poly(A) polymérase lui ajoute ≈ 200 adénosines (vert) sans matrice. Le messager, coiffé, ${NI?`épissé `:``}et polyadénylé, partira vers un pore nucléaire.`,
 `L'endonucléase CPSF73 coupe, le plus souvent après un dinucléotide CA. La PAP ajoute 200 à 250 A ; PABPN1 fixe la longueur. TREX (ALYREF, UAP56), recruté par la coiffe et les EJC, charge le récepteur d'export NXF1–NXT1. Vous continuez pourtant à transcrire en aval : l'ARN résiduel porte un 5′-monophosphate sans coiffe.`,`Quelle enzyme coupe le pré-ARNm ?`,[`CPSF73`,`Dicer`,`XRN2`]],
[9002,`Terminaison`,`L'exonucléase XRN2 (rouge) a dévoré l'ARN résiduel et vous a rattrapée : vous lâchez l'ADN. Vos phosphates sont retirés et vous pouvez recommencer sur un promoteur. Bilan : ${nf(G.rl||G.L)} nucléotides transcrits${G.rl>G.L?` (${nf(G.L)} modélisés)`:``}, ${NI?NI+(NI>1?` introns retirés`:` intron retiré`):`aucun intron`}, un ARNm de ${nf(MR.length)} nt plus sa queue poly(A).`,
 `Modèle « torpille » : XRN2 (5′→3′) dégrade le transcrit aval ; PP1–PNUTS déphosphoryle SPT5, vous ralentissez, XRN2 vous déloge. FCP1 et SSU72 effacent Ser2-P et Ser5-P : CTD recyclé.${pm[7]}`,`Dans quel sens XRN2 dégrade-t-elle l'ARN ?`,[`5′ → 3′`,`3′ → 5′`,`Les deux`]]],
// clés des étapes ; un gène sans intron saute l'épissage, un gène à un seul intron saute « introns suivants »
KX='pic,ini,cap,pau,elo,u1,cA,cB,ac,lig,mk,ix,pas,cut,ter'.split(',').map((k,i)=>[k,i]).filter(([k])=>NI>1||!(NI?/ix/:/u1|c[AB]|ac|lig|ix/).test(k)),
KS=KX.map(x=>x[0]),ST=KX.map(x=>ST0[x[1]]),SPD=KX.map(x=>[1,1,1,1,1,1,.03,.03,.03,1,5,2,1,.4,0][x[1]]);
function pmR(){let M=PM,s=ST[M.st],e=M.st==ST.length-1;$('pmt').textContent=(M.st+1)+'/'+ST.length+' · '+s[1];$('pmx').textContent=s[M.lv?3:2];M.au=M.aT=max(9,s[2].length/16);
  $('pmo').innerHTML=(M.lv?'<p>'+s[4]+'</p>'+s[5].map((t,i)=>[R(),'<button data-k='+i+'>'+t+'</button>']).sort((a,b)=>a[0]-b[0]).map(x=>x[1]).join(''):e?'<button data-k=0>Terminer</button>':'<div id=pmp><i></i></div><button data-k=p>'+(M.pz?'▶ Reprendre':'⏸ Pause')+'</button><button data-k=0>Suivant ▸</button>')+'<button data-k=q>Quitter</button>'}
function pmN(){let M=PM,g;if(M.st==ST.length-1)return pmEnd();M.wait=0;M.t=0;g=ST[M.st+1][0];M.sp=SPD[M.st]<1||g<0||g>9e3?SPD[M.st]:max(SPD[M.st],(g-M.P.x)/240);       // les longs trajets sont accélérés (≤ 8 s)
  $('pmo').innerHTML=(M.lv?'':'<button data-k=p>'+(M.pz?'▶ Reprendre':'⏸ Pause')+'</button>')+'<button data-k=q>Quitter</button>';
  let k=KS[M.st];if(k=='pau')M.P.cc=[.6,.8,.5,1];if(k=='cA')M.an=1;if(k=='cB')M.an=2,M.r.I[0].s=2;if(k=='ac')M.an=3,M.r.I[0].s=3,M.r.I[0].t=0}
function pmGo(lv){pols=[];trs=trs.filter(T=>T.ph>1);nxt=1e9;if(reg<2)reg=2,ct=-1,chV.A=0,chG.n=chR.n=0,seenN=1;AP=0;ORG=0;TG.on&&(TG.on=0);
  let P={x:-8,w:0,pm:1,pd:1,cc:K(0x999),r:nR()};P.r.pm=1;pols.push(P);
  PM={lv,P,r:P.r,st:0,wait:1,t:0,yaw:0,pit:0,an:0,sp:1};z=.012;shp.forEach(h=>h.A=0);$('hl').style.display=mk.style.display='none';cap.style.opacity=0;$('pmb').style.display=$('pmc').style.display='none';pmR()}
function pmEnd(){PM.P.pm=0;PM.r.pm=0;PM=0;nxt=sT+1;shp.forEach(h=>h.A=1);$('pm').style.display='none';$('hl').style.display='flex';mk.style.display='';z=.02;hT=0}
function pmS(d){let M=PM,P=M.P,r=M.r,I1=r.I[0],N=ST[M.st+1],al=pols.includes(P);
  M.yaw-=(tjx+(keys.ArrowRight|0)-(keys.ArrowLeft|0))*d*1.5;M.pit=cl(M.pit+(tjy+(keys.ArrowUp|0)-(keys.ArrowDown|0))*d,-1.2,1.2);z=cl(z*2**(tzm*1.5*d),.003,.2);
  let X=al?P.x:G.L+240,th=tth+(keys.Space|0)+(keys.KeyW|0)-(keys.ShiftLeft|0)-(keys.ShiftRight|0)-(keys.KeyS|0);       // ▲ ▼ : la caméra quitte la polymérase et glisse le long du gène
  if(th){if(!M.fr)M.fr=1,M.fx=X,$('pmc').style.display='inline-block';M.fx=cl(M.fx+th*max(50,z*8e3)*d,-G.pr,G.L+300)}
  if(M.wait||M.pz){P.cut&&(P.cut+=d);if(M.wait&&!M.lv&&!M.pz&&N){M.au-=d;let b=$('pmp');b&&(b.firstChild.style.width=cl(M.au/M.aT*100,0,100)+'%');M.au<=0&&pmN()}}       // mode simple : lecture puis avance automatique
  else if(N){M.t+=d;al&&(P.x+=30*M.sp*d);if(M.an==3)I1.t=M.t;let g=N[0];
    if(g<-50?M.t>-g-100:g==9001?P.cut:g==9002?!al:P.x>=g){if(M.an==3)I1.s=4,M.an=0;M.st++;M.wait=1;
      let k=KS[M.st];if(k=='ini')P.cc=K(0xfb3);if(k=='cA')I1.s=1;if(k=='mk')P.cc=K(0x3de);if(k=='cut')r.pm=0;pmR()}}
  r.pm&&r.I.forEach((J,k)=>{if(k&&P.x>J.b+25&&J.s<4){J.t+=d;if(!J.s)J.s=1,J.t=0;else if(J.t>[0,1.2,1.5,2.5][J.s])J.s++,J.t=0}});       // épissage automatique des introns suivants
  let[c,t]=gp(M.fr?M.fx:X),tg=!M.fr&&/c[AB]|ac|lig/.test(KS[M.st])&&I1.p5?lp(I1.p5,I1.pb||I1.p5,.5):ma(c,WX,.012),v=nm(ad(ad(ml(t,.5),ml(WX,-.35)),ml(cr(t,WX),.8)));
  v=rot(v,WX,M.yaw);v=nm(rot(v,nm(cr(v,WX)),M.pit*.6));f=v;u=nm(cr(cr(f,WX),f));p=M.sn?lp(p,tg,min(1,d*7)):tg;M.sn=1;vel=0;nI=0}
function pmD(){let M=PM,r=M.r,I1=r.I[0],P=M.P,a=cl(M.t/3.5,0,1),T=I1&&I1.p5&&lp(I1.p5,I1.pb||I1.p5,.5),A=pp(WX),k;        // snRNP en mouvement et marques m6A
  if(T&&M.an==1){let q=lp(ma(T,WX,.07),ma(T,WX,.012),M.wait?1:ss(a));dS(dB,ma(q,A,.006),.004,K(0x9d5));dS(dB,q,.0035,K(0xe95));dS(dB,ma(q,A,-.006),.0055,K(0x5ad))}
  if(T&&M.an==2&&!M.wait){let e=ss(a);dS(dB,ad(I1.p5,ml(ad(WX,A),.06*e)),.0045*(1-e*.7),K(0x5cf));dS(dB,ad(ma(T,WX,.012+.06*e),ml(A,.006+.05*e)),.004*(1-e*.7),K(0x9d5))}
  if(M.st>=KS.indexOf('mk')&&pols.includes(P)&&P.r){let[c,t]=gp(P.x),U=nm(ma(WX,t,-.4)),B2=nm(cr(U,t)),C2=cr(U,B2),O=ma(c,U,.0075);
    for([,k]of M6)if(r.len>k){let o=0;r.I.forEach(J=>{J.b<=k&&J.s>1&&(o+=J.b-J.a)});dS(dB,cvN((r.m-(k-o)/3)*DSB,O,U,B2,C2),.0013,[3,.4,2.5,1])}}}
$('pmb').onclick=()=>{$('pm').style.display='block';$('pmt').textContent='Mode ARN polymérase II';$('pmx').textContent='Vous prenez la place d\'une ARN polymérase II sur le gène '+G.sy+' ('+nf(G.rl||G.L)+(LG?' bp, ':' pb, ')+G.ex.length+' exon'+(NI?'s':'')+') : fixation au promoteur, coiffe, pause, épissage au ralenti, polyadénylation, terminaison. Vous restez libre de vos mouvements pendant toute la transcription — manette ou glisser sur l\'écran : tourner autour de la scène ; ▲ ▼ : parcourir le gène ; − +, molette ou pincement : zoom, de la base au gène entier ; toucher le titre replie le texte.'+(ln(p)>GR-.2?' Le vaisseau sera transporté jusqu\'au locus '+G.sy+', seul gène modélisé à l\'échelle moléculaire dans cette cellule.':'');
  $('pmo').innerHTML='<button data-l=0>Simple : visite guidée automatique</button><button data-l=1>Expert : une question par étape</button><button data-k=q>Annuler</button>'};
$('pmo').onclick=e=>{let b=e.target,k=b.dataset.k,l=b.dataset.l,M=PM;
  if(l)return pmGo(+l);if(k=='q')return M?pmEnd():($('pm').style.display='none');if(k==null||!M)return;
  if(k=='p'){M.pz=!M.pz;b.textContent=M.pz?'▶ Reprendre':'⏸ Pause';return}
  if(!M.wait)return;if(k!=0){b.textContent='✗ '+b.textContent;b.disabled=1;return}
  pmN()};
$('pmc').onclick=()=>{PM&&(PM.fr=0);$('pmc').style.display='none'};$('pmt').onclick=()=>$('pm').classList.toggle('mn');

// ================= sortie de la cellule, voyage par le sang, transcytose =================
$('xit').onclick=()=>{if(reg!=1||ORG||AP||PM||ct>=0)return;$('fd').style.opacity=1;setTimeout(()=>{reg=0;ct=-1;vel=0;p=ad(ma(e0,v0,.45),ml(tX,.3));f=nm(sb(e0,p));u=pp(f);cf=f;cu=u;z=.06;ZM=1;chG.n=chG.N;chR.n=chR.N;chV.A=1;vh=.6*rv;poi=0;$('fd').style.opacity=0;
  say('Sortie par la voie de recyclage : comme les récepteurs qui regagnent la surface, vous quittez la cellule dans un endosome de recyclage (Rab11) qui fusionne avec la membrane plasmique. Le puits ◎ reste ouvert pour revenir.',10)},400)};
$('bld').onclick=()=>{$('ld').textContent='Le sang vous emporte : choisissez votre destination.';$('ov').style.display='grid'};
$('tcy').onclick=()=>{$('fd').style.opacity=1;setTimeout(()=>{let i=LU;p=ma(TCY,v0,i?-.7:.75);f=ml(v0,i?-1:1);u=pp(f);cf=f;cu=u;vel=0;poi=0;$('fd').style.opacity=0;
  say(i?(CT>2?'Transcytose : enfermé dans une cavéole côté sang, vous traversez la cellule endothéliale et ressortez dans l\'interstitium du myocarde. Cap sur le cardiomyocyte ◎.':'Transcytose : capté par un récepteur TfR1 côté sang, enfermé dans une vésicule, vous traversez la cellule endothéliale et ressortez côté cerveau, entre les pieds des astrocytes. Cap sur le bouton synaptique ◎.'):'Transcytose en sens inverse : vous voilà dans la lumière du capillaire.',10)},400)};
// ================= atlas : toutes les structures présentes, celles déjà vues, un repère vers les autres =================
const AK=[],AG={};
{let a=(k,g)=>{I[k]&&!AG[k]&&!/^cu\d/.test(k)&&(AG[k]=g,AK.push(k))};
 ['ext','tlu','mem','tfr','pit','lat','cyt','ais','axn','den','btn','ne','npc','nuc'].forEach(k=>a(k,'Milieux et membranes'));
 ['syf','abt','aax','spo','spn','ast','glt','dv','snr','cpx','syt','m18','m13','rim','rbp','cav','vat','vgl','bsn','lip','syn1','ccp','dyn','nrx','nlg','cad','amp','trp','nmd','mgl','p95','gkp','shk','hmr','cmk','sac','spa'].forEach(k=>a(k,'Synapses'));['nav','kvc','nka','k2p','ank'].forEach(k=>a(k,'Membrane excitable'));
 for(let[L,g]of[[VS.concat(OX),'Autour de la cellule'],[CY,'Dans le cytoplasme'],[NU,'Dans le noyau'],[DN,'Sur le gène '+G.sy]])for(let o of L)a(o.i,g);
 ['lam','lmA','lmB','lbr','lad','eme','linc'].forEach(k=>a(k,'Enveloppe et lamina'));['nolI','fc','rdn','po1','ssu','fbl','dkc','pdf','p60','p40','npm','r5s'].forEach(k=>a(k,'Dans le nucléole'));
 ['ves','pol','rna','spl','mrn','ply'].forEach(k=>a(k,'En mouvement'))}
function atN(){$('atb').textContent='☰ Atlas '+AK.filter(k=>SN[k]).length+'/'+AK.length}
function sn(k){if(k&&(AG[k]||MEN&&MG[k])&&!SN[k]){SN[k]=1;try{localStorage.oc_sn=JSON.stringify(SN)}catch(e){}atN();mgN()}}
$('atb').onclick=()=>{if(!go||PM)return;let h='',g;$('ath').textContent='Atlas';for(let k of AK){if(AG[k]!=g)g=AG[k],h+='<h3>'+g+'</h3>';h+='<button data-k="'+k+'"'+(SN[k]?' class="sn"':'')+'>'+(SN[k]?'✓ ':'○ ')+esc(I[k][0])+'</button>'}
  $('atl').innerHTML=h;$('atm').textContent=AK.filter(k=>SN[k]).length+' structures vues sur '+AK.length+' dans ce tissu et cette cellule. Touchez un nom : sa fiche s\'affiche et le repère ◎ vous y conduit.';$('at').style.display='grid';NV=1};
$('atc').onclick=()=>{$('at').style.display='none';NV=0};
$('atl').onclick=e=>{let b=e.target.closest('button');if(!b)return;let k=b.dataset.k,B=0,q,o;
  for(o of VS.concat(OX,CY,NU,DN,dyc))if(o.i==k){q=o.A||o.q||(o.b?lp(o.a,o.b,.5):o.a);if(!B||ds(q,p)<B[0])B=[ds(q,p),q]}
  if(!B&&AG[k]=='Dans le nucléole')B=[0,NOL];if(!B&&AG[k]=='Enveloppe et lamina')B=[0,ma(Nc,nm(sb(p,Nc)),Rn-.2)];
  $('at').style.display='none';NV=0;
  if(B){POI[NP]=POI[NP]||POI[2];POI[NP+1]=[I[k][0].slice(0,30),()=>B[1]];poi=NP+1;say('Repère ◎ placé sur : '+I[k][0]+'.',5)}
  pin=I[k];pinK=k;pinT=B?5:12;hT=0};
atN();

// ================= « Me conduire à l'entrée » : pilote automatique jusque devant le puits (ou devant le point de transcytose) =================
$('gui').onclick=()=>{if(reg||ct>=0||AP||NV)return;poi=0;
  if(LU&&LU.bbb)fly(ma(TCY,v0,.55),.08,()=>{DM=.3;say('Vous êtes devant le point de transcytose (anneau doré) : touchez « Traverser par transcytose ».',9)},TCY);
  else fly(ma(e0,v0,.16),.03,()=>{DM=.1;say('Vous êtes devant l\'entrée de la cellule : avancez (▲) pour vous poser sur le puits à clathrine.',9)},e0)};
