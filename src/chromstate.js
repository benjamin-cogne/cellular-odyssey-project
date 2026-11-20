// ================= états de la chromatine le long du gène =================
// Des perles de la couleur des marques (MKC) sont posées sur les queues des nucléosomes du locus et le long de l'ADN du gène, selon l'état choisi :
// KMS[0] est l'état actif de la cellule visitée ; pour les trois gènes intégrés, KMS[1] est un état éteint ou en attente décrit dans la littérature.
// Ce sont des schémas : ils résument des mesures publiées (ChIP) ou, à défaut, le profil général des gènes transcrits ; les textes disent lequel.
Object.assign(MKC,{k9ac:0xffb84d});Object.assign(HXM,{k9ac:'H3K9ac'});
const Lkm=Ly(M1,3,0,{rg:2}),dKm=dy(Lkm,ceil((G.L+700)/8)+90,[0,0,0],GR+.6),
KML={k4me3:'promoteur actif',k27ac:'chromatine acétylée, active',k9ac:'promoteur actif',k4me1:'enhancer',k79me2:'début d\'un gène transcrit',k36me3:'corps d\'un gène transcrit',k9me3:'hétérochromatine',s10ph:'gène de réponse immédiate activé'},
kmR=GP.nu.map(([c])=>{let b=1e9,j=0;GP.p.forEach((q,i)=>{let d=ds(q,c);d<b&&(b=d,j=i)});return j-UP}),      // position de chaque nucléosome du locus, en pb depuis le site +1
kmK=kmR.map((r,i)=>kmR.filter(x=>r<0?x<0&&x>r:x>0&&x<r).length),                                               // son rang en s'éloignant du gène (0 : le plus proche)
// profil général d'un gène transcrit : H3K4me3 autour du site +1, H3K79me2 au début, H3K36me3 ensuite et jusqu'à la zone de terminaison
kmT=L=>[[-150,450,'k4me3'],[450,max(700,L*.45),'k79me2'],[max(700,L*.45),L+450,'k36me3']],
kmA=(n,t,pr,o)=>Object.assign({n,t,pr,en:['k27ac','k4me1'],up:0,dn:['k36me3',0],tr:kmT,tx:1},o),
KMS=GX?[kmA('schéma général','Les perles suivent le schéma général d\'un gène transcrit : H3K4me3 (rouge) et H3K27ac (orange) au promoteur, H3K4me1 (jaune) et H3K27ac aux enhancers, H3K79me2 (vert foncé) au début du gène, H3K36me3 (vert) ensuite. Ce n\'est pas une mesure faite sur ce gène ni dans cette cellule.',[['k4me3','k27ac'],['k4me3','k27ac']])]:[
 [kmA('érythroblaste, gène actif','Perles sur les nucléosomes et le long de l\'ADN : les marques décrites sur ce locus dans les cellules érythroïdes. LCR et promoteur : histones H3 et H4 acétylées (orange, H3K27ac) et méthylées sur H3K4 (jaune, H3K4me1 et me2 ; rouge, H3K4me3, sur la partie la plus transcrite). Dans le corps du gène : H3K79me2 (vert foncé) puis H3K36me3 (vert), qui suivent la polymérase. Le promoteur de HBB n\'a pas d\'îlot CpG. Schéma tiré de mesures faites surtout sur des lignées érythroïdes.',[['k4me3','k27ac'],['k27ac','k4me1']]),
  {n:'cellule non érythroïde, gène éteint',t:'Dans une cellule qui n\'exprime pas la β-globine (mesures faites sur des cellules HeLa), le locus ne porte ni acétylation ni méthylation de H3K4 ; H3K9 y est méthylée sur une vaste étendue (bleu-violet), la chromatine résiste à la DNase et se réplique tard. La méthylation de l\'ADN du promoteur est souvent élevée, mais elle varie selon le tissu. Aucune polymérase ne parcourt le gène.',
   pr:[['k9me3','k9me3'],['k9me3','k9me3']],en:['k9me3','k9me3'],up:'k9me3',dn:['k9me3','k9me3'],tr:L=>[[-G.pr,L+450,'k9me3']],tx:0}],
 [kmA('hépatocyte, gène actif','Au promoteur, où se fixent les SMAD (voie de BMP6) et STAT3 (voie de l\'interleukine 6) : H3K4me3 (rouge) et H3K9 acétylée (orange clair), mesurées dans le foie de souris. Ailleurs, les perles suivent le schéma général des gènes transcrits (H3K27ac et H3K4me1 à l\'enhancer, H3K79me2 puis H3K36me3 dans le corps du gène), qui n\'a pas été mesuré sur HAMP en particulier.',[['k4me3','k9ac'],['k4me3','k9ac']]),
  {n:'carence en fer, gène réprimé',t:'Quand le fer manque ou que l\'érythropoïétine stimule la production de globules rouges, la désacétylase HDAC3 et son partenaire NCOR1 répriment HAMP : l\'acétylation de H3K9 et H3K4me3 disparaissent du promoteur, et la transcription chute. Cette répression est réversible : ce n\'est pas de l\'hétérochromatine. Moins d\'hepcidine, c\'est plus de fer absorbé par l\'intestin et libéré dans le sang.',
   pr:[[0,0],[0,0]],en:[0,0],up:0,dn:[0,0],tr:L=>[],tx:0,q:'promoteur désacétylé, gène réprimé'}],
 [kmA('neurone stimulé, gène actif','Quelques minutes après un stimulus : au promoteur, une partie des nucléosomes reçoit un phosphate sur H3S10 (rose vif), posé par les kinases MSK1 et MSK2 en aval de ERK, sur des queues également acétylées. Les enhancers voisins, déjà marqués par H3K4me1 (jaune), recrutent CBP, gagnent H3K27ac (orange) et produisent des ARN d\'enhancers. Dans le corps du gène, le schéma général des gènes transcrits : H3K79me2 puis H3K36me3.',[['k4me3','k27ac'],['s10ph','k27ac']]),
  {n:'neurone au repos, gène en attente',t:'Sans stimulus, FOS n\'est pas éteint comme un gène d\'hétérochromatine. Comme la plupart des promoteurs, le sien porte H3K4me3, et son acétylation est sans cesse renouvelée ; une ARN polymérase II déjà engagée y attend en pause, retenue par NELF et DSIF (montré dans des fibroblastes et des cellules neuroendocrines). Les enhancers portent H3K4me1, pas encore H3K27ac. C\'est ce qui permet au gène de démarrer en quelques minutes.',
   pr:[['k4me3','k27ac'],['k4me3',0]],en:['k4me1',0],up:0,dn:[0,0],tr:L=>[[-150,150,'k4me3']],tx:0,q:'gène en attente, polymérase en pause'}]][CT];
let KMI=0;
// marque attendue à la position i (pb depuis le site +1) dans l'état courant
function kmAt(i){let S=KMS[KMI],s=S.tr(G.L).find(([a,b])=>i>=a&&i<b);return s?s[2]:i<0&&i>=-G.pr?S.pr[0][0]:0}
// ligne ajoutée au panneau de séquence (appelé par hud)
function kmQ(i){let S=KMS[KMI],k=kmAt(i);return k?'<br><span style="color:'+kh(MKC[k])+'">◈ '+HXM[k]+' · '+KML[k]+'</span>':S.q?'<br><span style="opacity:.75">◈ '+S.q+'</span>':''}
function kmD(){let S=KMS[KMI],p2=(P,m,r)=>m&&dS(dKm,P,r,hxk(m));dKm.n=0;
  GP.nu.forEach((u,i)=>{let k=kmK[i],m=kmR[i]<0?k<2?S.pr[k]:[S.up,S.up]:k<3?[S.dn[0],S.dn[0]]:[S.dn[1],S.dn[1]];p2(GP.tb[2*i],m[0],.0011);p2(GP.tb[2*i+1],m[1],.0011)});
  LP.nu.forEach((u,i)=>{p2(LP.tb[2*i],S.en[0],.0011);p2(LP.tb[2*i+1],S.en[1],.0011)});
  for(let[a,b,m]of S.tr(G.L))for(let i=ceil(a/8)*8;i<b;i+=8){let j=UP+i;j>=0&&j<GP.p.length&&p2(ma(GP.p[j],GP.N[j],.0036),m,.00085)}
  up(dKm);[dA.t,dA.j,dA.s,dB].forEach(h=>h.A=S.tx);$('csb').textContent='◆ Chromatine : '+S.n}        // gène éteint ou en attente : polymérases et ARN naissants masqués
function kmSet(k){KMI=k;kmD();let S=KMS[k];pin=['Chromatine de '+G.sy+' — '+S.n,S.t];pinK=0;pinT=22;hT=0}
$('csb').onclick=()=>{go&&!PM&&!AP&&!SX&&kmSet((KMI+1)%KMS.length)};
{const h=$('pmb').onclick;$('pmb').onclick=e=>{KMI&&kmSet(0);h(e)}}        // « Je suis l'ARN polymérase II » : retour à l'état actif
kmD();
