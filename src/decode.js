// ================= quiz « décoder la chromatine » =================
// Vue guidée (moteur de snrnp.js, SXQ.hq et SXQ.hQ) : un nucléosome porte quelques marques (dessin de histone.js), le joueur nomme l'état de la chromatine.
// Deux niveaux : avec le nom des marques, ou sans (il faut alors lire la position, la forme et la couleur de chaque marque).
const HQA=['Promoteur actif','Enhancer actif','Enhancer en attente','Corps d\'un gène transcrit','Début d\'un gène transcrit','Promoteur bivalent','Gène éteint par Polycomb','Hétérochromatine constitutive','Chromosome en mitose','Cassure double brin de l\'ADN'],
// manche : a bonne réponse et w leurres (rangs dans HQA) ; m marques [queue (B : H2BK120, K : H3K79, C : CpG de l'ADN), résidu, type, clé, décalage du nom, direction] ; z : H2A.Z ; t explication
HQ=[{a:0,w:[1,5,4],z:1,m:[['h3',4,'me3','k4me3'],['h3b',27,'ac','k27ac']],t:'H3K4me3 avec H3K27ac : un promoteur actif. H3K4me3 borde le site de départ de la transcription, l\'acétyle ouvre la chromatine, et le variant H2A.Z occupe souvent les nucléosomes qui encadrent ce site.'},
 {a:1,w:[0,2,3],m:[['h3',4,'me1','k4me1'],['h3b',27,'ac','k27ac']],t:'H3K4me1 avec H3K27ac : un enhancer actif. Un seul méthyle sur la lysine 4, au lieu de trois, distingue l\'enhancer du promoteur ; l\'acétyle sur la lysine 27 dit qu\'il est actif.'},
 {a:2,w:[1,0,5],m:[['h3',4,'me1','k4me1'],['h3b',4,'me1','k4me1']],t:'H3K4me1 seule : un enhancer en attente, marqué mais pas encore actif. Il lui manque H3K27ac.'},
 {a:3,w:[4,0,7],m:[['h3',36,'me3','k36me3',.0026,[-.5,.6,.6]],['C',0,'me1','m5c']],t:'H3K36me3 et ADN méthylé : le corps d\'un gène transcrit. SETD2 voyage avec l\'ARN polymérase II et écrit H3K36me3 ; DNMT3B lit cette marque et méthyle l\'ADN du corps du gène.'},
 {a:4,w:[3,6,8],m:[['B',0,'ub','h2bub',-.0034],['K',0,'me2','k79me2',.0022]],t:'H2BK120ub1 et H3K79me2 : le début d\'un gène en cours de transcription. L\'ubiquitine est ici sur H2B, et non sur H2A comme dans la chromatine Polycomb ; elle stimule DOT1L, qui écrit H3K79me2.'},
 {a:5,w:[0,6,2],m:[['h3',4,'me3','k4me3'],['h3b',27,'me3','k27me3']],t:'H3K4me3 sur une queue de H3, H3K27me3 sur l\'autre : un promoteur bivalent, éteint mais prêt à démarrer. Cet état a été décrit dans les cellules souches embryonnaires, sur les gènes du développement.'},
 {a:6,w:[5,7,4],m:[['h3',27,'me3','k27me3'],['a',119,'ub','h2aub',-.0034,[.2,-.75,.6]]],t:'H3K27me3 et H2AK119ub1 : un gène éteint par Polycomb (hétérochromatine facultative). PRC2 écrit la première marque, PRC1 la seconde.'},
 {a:7,w:[6,8,3],m:[['h3',9,'me3','k9me3'],['h4',20,'me3','k20me3',.0018,[-.2,-.6,.8]],['C',0,'me1','m5c']],t:'H3K9me3, H4K20me3 et ADN méthylé : l\'hétérochromatine constitutive, fermée dans toutes les cellules (régions péricentromériques, éléments transposables). HP1 lit H3K9me3.'},
 {a:8,w:[7,9,6],m:[['h3',9,'me3','k9me3',-.003,[0,-.5,1]],['h3',10,'ph','s10ph',.003,[0,.5,1]]],t:'H3S10ph juste à côté de H3K9me3 : un chromosome en mitose. Aurora B phosphoryle la sérine 10, et HP1 se détache de la lysine 9 voisine.'},
 {a:9,w:[8,4,7],m:[['a',139,'ph','gh2ax']],t:'Un phosphate sur la sérine 139, au bout de la queue C-terminale du variant H2AX : c\'est γH2AX, le signal d\'une cassure double brin de l\'ADN. ATM l\'écrit ; MDC1 le lit et rassemble la machinerie de réparation.'}],
hqR=k=>k=='gh2ax'?'H2AX S139':k=='m5c'?'CpG':HXM[k].replace(/me\d$|ac$|ub1$|ph$/,''),      // nom du résidu, sans la marque (niveau expert)
hqS=a=>{for(let i=a.length;i>1;){let j=Math.random()*i--|0;[a[i],a[j]]=[a[j],a[i]]}return a},
hqD=a=>{let M=SX,Z=M.qz,q=Z.q,g=sxA(a,.1,.5),rv=!M.Q.lv||Z.an>=0,P,n;hxB({q:1,z:q.z?1:0});
  for(let[t,r,ty,k,o,v]of q.m){
    if(t=='C'){P=ma(hxC(29.5).C,hxC(29.5).N,1.3);if(g>0)for(let i of[29,35])dS(dSx0,sxW(ma(hxS(i,0,0),hxC(i).N,.45)),.00024*g,hxk(k)),dS(dSx0,sxW(ma(hxS(i+1,0,2.4),hxC(i+1).N,.45)),.00024*g,hxk(k));
      g>.5&&sxL(ma(sxW(P),vr,.0036),rv?'5-méthylcytosines (CpG)':'CpG','e');continue}
    if(t=='B')P=HXB,n=nm([-.3,-.6,.75]);else if(t=='K')P=HXK,n=[0,0,1];else P=hxR(t,r),n=nm(v||[0,.5,1]);
    hxM(P,n,ty,k,g);g>.5&&sxL(ma(sxW(ma(P,n,t=='B'?2:t=='K'?1.2:0)),vu,o||(ty=='ub'?-.0034:-.0019)),rv?HXM[k]:hqR(k),'e')}
  q.z&&sxL(sxW([.7,-1.2,3.2]),'H2A.Z')},
// panneau : la question et ses quatre réponses, puis l'explication
hqP=M=>{let Z=M.qz,q=Z.q,n=HQ.length,ok=Z.an==q.a;$('pmt').textContent='Question '+(M.st+1)+'/'+n+(Z.an<0?'':(ok?' · ✓ ':' · ✗ ')+HQA[q.a]);
  if(Z.an<0){$('pmx').textContent='Quel est l\'état de cette chromatine ?'+(M.Q.lv?' Les noms sont masqués : un, deux ou trois petits grains pour autant de méthyles, un grain orangé pour un acétyle, un grain rose pour un phosphate, une boule au bout d\'une tige pour une ubiquitine.':'');
    $('pmo').innerHTML=Z.b.map(k=>rxBtn(HQA[k],'Sh'+k)).join('')+rxBtn('Quitter','Sq');return}
  $('pmx').textContent=(ok?'Exact. ':'Vous avez répondu : '+HQA[Z.an]+'. ')+q.t;
  {let l=document.createElement('span');l.className='sxl';l.innerHTML=[...new Set(q.m.map(m=>m[3]))].map(ML).map(([t,c])=>'<span><i style="background:'+c+'"></i>'+esc(t)+'</span>').join('');$('pmx').append(l)}
  [...new Set(q.m.map(m=>m[3]))].forEach(k=>mgSx('hx',k));
  $('pmo').innerHTML=rxBtn(M.st<n-1?'Suivant ▸':'Résultat ▸','Sn')+rxBtn('Quitter','Sq')};
SXQ.hq={S:HQ.map(()=>({k:'q',T:2.5,h:1e9,z:.0086,c:[-3,-.5],leg:[],d:hqD})),T:[],ti:'Décoder la chromatine',solo:1,sc:[-5,-.5],sz:.0084,sd:SXQ.hx.sd,o:()=>p.slice(),
 in:'Dix nucléosomes, chacun avec quelques marques : à vous de nommer l\'état de la chromatine, comme on lit une carte d\'états le long du génome. Quatre réponses sont proposées à chaque fois ; l\'explication suit. Glissez pour tourner autour du nucléosome, molette ou pincement pour zoomer.',
 go:rxBtn('Commencer, avec le nom des marques','Sghq')+rxBtn('Niveau expert, sans les noms','SghQ'),
 pn:(M,S)=>{let n=HQ.length,Z=M.qz;
   if(!S){let k=Z?Z.ok:0;$('pmt').textContent='Décoder la chromatine — résultat';
     $('pmx').textContent='Score : '+k+'/'+n+'. '+(k==n?'Sans faute : vous lisez la chromatine couramment.':k>6?'Le code est presque acquis.':'Le code des histones se relit étape par étape, puis le quiz se rejoue : l\'ordre des questions change à chaque partie.')+' À retenir : la même lysine change de sens selon la marque (H3K27ac active, H3K27me3 éteint) et selon le nombre de méthyles (H3K4me1 à l\'enhancer, H3K4me3 au promoteur) ; c\'est la combinaison des marques qui désigne l\'état.';
     $('pmo').innerHTML=rxBtn('Rejouer','Sr')+rxBtn('Revoir le code des histones','Sghx')+rxBtn('Terminer','Sq');return}
   if(!M.st||!Z)Z=M.qz={o:hqS(HQ.map((_,i)=>i)),ok:0};
   Z.q=HQ[Z.o[M.st]];Z.an=-1;Z.b=hqS([Z.q.a].concat(Z.q.w));hqP(M)},
 cl:(M,k)=>{let Z=M.qz;if(Z.an>=0)return;Z.an=k;k==Z.q.a&&Z.ok++;hqP(M)}};
SXQ.hQ=Object.assign({},SXQ.hq,{lv:1});
SXQ.hx.xb=rxBtn('Quiz : décoder la chromatine','Sihq');
