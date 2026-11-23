# Odyssée cellulaire

*[English version](README.md)*

Un jeu éducatif en 3D dans un seul fichier HTML. À bord du nano-vaisseau *Nautile*, vous arrivez par le sang dans un tissu humain, entrez dans une cellule par endocytose, explorez son cytoplasme et ses organites, franchissez un pore nucléaire et rétrécissez jusqu'à 2 nm pour lire un gène pendant sa transcription.

Tout le jeu tient dans une page autonome : un moteur WebGL2 écrit à la main, sans framework, sans dépendance à l'exécution, sans ressource externe. Il fonctionne hors ligne, sur ordinateur et sur téléphone, en français et en anglais.

## Jouer

Une fois GitHub Pages activé (voir [Publication](#publication)), le jeu est servi à l'adresse `https://<compte>.github.io/<dépôt>/`.

Pour jouer en local, construisez-le puis ouvrez `dist/index.html` dans un navigateur :

```bash
npm ci
npm run build
```

## Contenu

- **Trois cellules, une patiente.** Un érythroblaste de la moelle osseuse (gène *HBB*), un hépatocyte du foie (*HAMP*) et un neurone du cortex (*FOS*), reliés par la circulation.
- **Cytoplasme et organites.** On entre dans les mitochondries, le réticulum, le Golgi et le nucléole ; chaque structure a une fiche, rassemblée dans un atlas.
- **Noyau.** Pores, lamina (lamines A et B, LBR, émerine), nucléole (FC / DFC / GC, transcription par Pol I, flux des pré-ribosomes), speckles, corps de Cajal, corps PML, paraspeckles.
- **Gènes, base par base.** Les trois gènes intégrés utilisent la séquence réelle hg38 : signaux du promoteur, exons, introns, sites d'épissage. Le mode « Je suis l'ARN polymérase II » parcourt initiation, coiffe, pause, épissage, polyadénylation et terminaison.
- **N'importe quel gène.** Une recherche charge un autre gène humain par l'API du UCSC Genome Browser (repli sur Ensembl). C'est le seul accès réseau du jeu.
- **21 voies chimiques à l'échelle moléculaire**, montrées là où elles se produisent : cycle de Krebs, chaîne respiratoire, β-oxydation, synthèse de l'hème, cycle de l'urée, N-glycosylation, glycolyse, traduction, ubiquitination, pompe Na⁺/K⁺, polymérisation de l'ARN, coiffe, cycle de méthylation de l'ADN (DNMT, trois oxydations par TET, TDG, réparation par excision de base), acétylation et méthylation des histones (dont les déméthylases LSD1 et JmjC), phosphorylation et ubiquitination des histones, modification de l'ARNr, etc. Chacune a un niveau commenté et un niveau expert avec quiz.
- **Surface de la cellule et voies d'entrée.** Hors de la cellule, le bouton « ⇲ Voies d'entrée » laisse choisir sa route. L'endocytose par la clathrine se fait en vol ; les cavéoles, la macropinocytose et, dans le neurone, l'endocytose ultrarapide de la synapse sont des animations guidées à l'échelle du nanomètre, qui se terminent dans la cellule. Une quatrième vue montre les récepteurs de surface de la cellule en cours, leur ligand et le signal qu'ils déclenchent (TfR1, récepteur de l'EPO, KIT, intégrine ; récepteurs des LDL, de l'insuline, du glucagon et des asialoglycoprotéines ; TrkB, Cav2.1, mGluR2).
- **Le cerveau** (pour l'instant dans la version d'aperçu seulement : la version publiée masque ce mode, voir `BRAIN` dans `src/engine.js`)**.** L'entrée « Cerveau » de l'écran d'accueil (et le bouton « 🧠 Explorer le cerveau » dans le neurone) ouvre une carte du cerveau que l'on parcourt en vaisseau et une galerie de cellules. Sur la carte (une maquette de l'hémisphère droit avec le tronc cérébral, la moelle et quelques organes), chaque région, chaque noyau et chaque organe a sa fiche, une liste des structures y conduit le vaisseau, et six parcours lui font suivre un signal le long de son trajet, le joueur pouvant reprendre les commandes à tout moment. Depuis la carte, on entre dans six quartiers de cellules, que l'on parcourt à l'échelle du micromètre, chaque cellule ayant sa fiche : une colonne du cortex (six couches, neurones pyramidaux, interneurones, glie, un capillaire), le cortex du cervelet (cellules de Purkinje, grains, fibres parallèles et grimpantes), le striatum, l'aire CA1 de l'hippocampe, de la moelle au muscle (motoneurone, axone myélinisé, jonction neuromusculaire, fibres musculaires) et la rétine ; la colonne du cortex mène au neurone du jeu. Une galerie guidée montre aussi les cellules du cerveau à l'échelle du micromètre (neurone pyramidal, interneurones, cellules de Purkinje et grains, striatum et dopamine, astrocyte, oligodendrocyte, microglie, barrière et épendyme), les six parcours suivent un signal jusqu'à ses effets dans le corps : voir (pupille, horloge circadienne), bouger (contraction du muscle, correction par le cervelet), apprendre et se souvenir, décider et se contrôler, stress (cœur, foie, frein du cortisol) et tenir le corps en équilibre (vasopressine et rein, respiration).
- **Dans les cellules gliales.** Près d'un astrocyte, d'une cellule de microglie ou d'un oligodendrocyte du tissu du neurone (et, dans le mode « Cerveau », depuis leurs fiches dans la colonne du cortex), un bouton « ⤓ Entrer » fait entrer le vaisseau dans la cellule, dessinée en transparence à l'échelle du micromètre. Chaque organite et chaque protéine de membrane a sa fiche (50 en tout) : filaments de GFAP, glycogène, pied astrocytaire avec l'aquaporine 4, Kir4.1 et GLUT1, prolongement périsynaptique avec GLT-1 et la glutamine synthétase ; phagosome de la microglie, récepteurs P2Y12, CX3CR1, TREM2, CR3, TLR4 et CSF1R, inflammasome NLRP3 ; gaine de myéline, nœud de Ranvier avec son paranode et son juxtaparanode, granules d'ARN de MBP, peroxysomes, MCT1. Onze séquences guidées « En action » montrent ce que font ces cellules : recycler le glutamate, tamponner le potassium et propager une vague de calcium, nourrir le neurone et régler le débit du sang ; surveiller le tissu, converger vers une lésion, élaguer une synapse, donner l'alarme ; enrouler la myéline, expédier l'ARN de MBP, conduction saltatoire, nourrir l'axone. Les affirmations ont été vérifiées dans la littérature (espèces et points discutés sont indiqués), et le focus mendélien liste les maladies des protéines montrées.
- **Code des histones.** Près du gène, une vue guidée en quinze étapes montre un nucléosome à l'échelle du nanomètre (147 pb d'ADN, l'octamère d'histones, les queues résidu par résidu) et une marque par étape : H3K4me3, H3K4me1, H3K27ac, H4K16ac, H3K36me3, H2BK120ub1 avec H3K79me2, H3K27me3, H2AK119ub1, H3K9me3, H3S10ph, γH2AX, méthylation de l'ADN, promoteur bivalent, remodeleurs et H2A.Z. Chaque marque est montrée avec son écrivain, son lecteur et son effaceur, dans les couleurs des cartes d'états de la chromatine. Avec le focus mendélien, chaque étape indique les maladies liées à ses enzymes.
- **Nucléotides et liaisons hydrogène.** Près du gène, quand le vaisseau passe sous 4,5 nm (il peut désormais descendre à 0,5 nm, la taille d'un nucléotide), les paires de bases qui l'entourent sont dessinées atome par atome, avec la séquence réelle : sucres, phosphates, bases, hydrogènes engagés dans des liaisons hydrogène, et ces liaisons elles-mêmes en pointillés (deux pour A–T, trois pour G–C). Sur les nucléosomes, l'ADN s'enroule autour des histones, et une arginine plonge dans le petit sillon là où il se tourne vers l'octamère. Fiches et étiquettes nomment la paire la plus proche et ses sillons. Une vue guidée en dix étapes (« ⌬ Nucléotides et liaisons hydrogène ») explique le nucléotide, le brin et son sens, les deux paires avec leurs donneurs et leurs accepteurs, pourquoi elles ont la même forme, l'empilement et la double hélice, la lecture des sillons par les protéines, l'ADN autour des histones, la méthylation de la cytosine et les points chauds de mutation des CpG, puis l'ARN en forme A. Les bases suivent le repère standard des paires de bases ; le squelette est un nucléotide idéal, calculé pour que chacun se raccorde exactement au suivant.
- **Un chromosome à toutes les échelles.** De loin, un chromosome est un tube coloré. Approchez-vous de n'importe lequel avec un vaisseau de moins de 300 nm : les deux mégabases qui vous entourent se résolvent en leur chaîne de nucléosomes, un point par nucléosome, repliée en domaines en boucle dont le pied est tenu par un anneau de cohésine entre deux protéines CTCF ; les gènes, éléments régulateurs et îlots CpG de la région sont chargés et colorés quand le réseau le permet. En rétrécissant encore, chaque niveau apparaît à son tour : le disque du nucléosome avec son ADN enroulé et l'histone de liaison H1 ; sous 20 nm, les huit histones, d'abord en lobes, puis par le tracé de leur squelette avec les hélices α épaisses et les queues ; la double hélice avec la séquence réelle ; sous 4,5 nm, tous les atomes des histones et de l'ADN, les contacts directs histone–ADN et les molécules d'eau qui font le pont, avec le nom du résidu le plus proche (par exemple la lysine 27 de H3 et les marques qu'elle porte). Chaque nucléosome est une copie de la structure cristallographique à 1,9 Å (PDB 1KX5) : l'ADN suit son trajet réel et les arginines sont dans les vrais petits sillons ; la chaîne, elle, est tirée au hasard avec des tailles réalistes.
- **Acteurs de la chromatine dans le noyau.** Des objets cliquables, chacun avec sa fiche : l'histone de liaison H1, les variants H2A.Z et H3.3, le remodeleur BAF, un anneau de cohésine et deux protéines CTCF au pied de la boucle enhancer–promoteur ; l'hétérochromatine péricentromérique avec HP1 et CENP-A à chaque centromère ; des corps Polycomb (PRC1, PRC2) sur les quatre groupes de gènes HOX ; le locus soumis à empreinte H19/IGF2, dessiné différemment sur le chromosome 11 maternel et sur le paternel.
- **Quiz « décoder la chromatine ».** Accessible depuis le code des histones : dix nucléosomes portant quelques marques, quatre états possibles à chaque fois, une explication après chaque réponse et un score. Un niveau expert masque le nom des marques, qu'il faut alors lire à leur position, leur forme et leur couleur.
- **États de la chromatine le long du gène.** Des perles de couleur sur les nucléosomes du locus et le long de l'ADN du gène indiquent les marques attendues : H3K4me3 et acétylation au promoteur, H3K4me1 et H3K27ac aux enhancers, H3K79me2 puis H3K36me3 dans le corps du gène. Un bouton « ◆ Chromatine » fait passer chaque gène intégré à un autre état décrit dans la littérature : HBB dans une cellule non érythroïde (méthylation étendue de H3K9), HAMP en carence en fer (perte de H3K9ac et H3K4me3 dépendante de HDAC3), FOS dans un neurone au repos (promoteur en attente, enhancers marqués par H3K4me1 seul). Le panneau de séquence nomme l'état à la position du vaisseau.
- **Assemblage des snRNP (corps de Cajal).** Près d'un corps de Cajal, une vue guidée en huit étapes construit le tri-snRNP U4/U6·U5 à l'échelle du nanomètre : retour d'un snRNP U5, 2′-O-méthylation et pseudouridylation de U5 par le scaRNA U85, protéines propres à U5, snRNP U4 et U6, appariement U4/U6 avec SART3, arrimage de U5. Chaque snRNA est dessiné nucléotide par nucléotide dans une teinte chaude ; chacune des 39 protéines est une sphère nommée, d'une teinte froide qui lui est propre et d'une taille liée à sa masse.
- **Focus génétique mendélienne.** Une case à cocher sur l'écran d'accueil met en évidence chaque structure, protéine ou étape de voie dont les gènes sont responsables d'une maladie mendélienne : nom des gènes au-dessus des structures proches dans le décor, lignes « gène — maladie » sur les fiches, panneau « 🧬 Génétique » donnant la transmission, le numéro OMIM et une référence PubMed, et maladies liées à chaque enzyme dans les voies de réactions. 373 gènes ; la table complète est dans [docs/MENDELIAN.md](docs/MENDELIAN.md).
- **Synapses et influx nerveux (neurone).** Deux synapses excitatrices construites molécule par molécule, avec une fente de 20 nm où le vaisseau peut entrer, et un parcours guidé en 12 étapes qui suit un signal d'une épine stimulée jusqu'au neurone suivant, avec un oscilloscope du potentiel de membrane.

## Statut scientifique

C'est un support pédagogique, pas une référence.

- Les géométries sont schématiques, les nombres de molécules réduits, les animations ralenties de plusieurs ordres de grandeur.
- Les chiffres des fiches sont des ordres de grandeur. Certains ont été vérifiés dans la littérature à l'écriture du jeu, d'autres non.
- Les 57 références utilisées figurent dans le jeu, sur l'écran d'accueil, sous *Sources*, avec leur PMID.
- Le focus mendélien reprend des associations gène–maladie classées « vertes » par [PanelApp Australia](https://panelapp-aus.org/) (Mendeliome v2.901 et panels spécialisés, novembre 2026). C'est une sélection de deux à quatre maladies connues par structure, pas une liste complète, et ce n'est pas un outil de diagnostic. `npm run check-mendel` revérifie la table auprès de PanelApp Australia.
- Le contenu n'a pas été relu par des pairs. Les corrections sont bienvenues : ouvrez une issue avec une référence.

## Organisation du dépôt

| Chemin | Contenu |
| --- | --- |
| `src/` | Sources du jeu : `shell.html` (page, CSS, textes fixes) et 31 fichiers JavaScript. Voir [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). |
| `src/seq/` | Séquences génomiques de *HBB*, *HAMP* et *FOS* (hg38, gène et promoteur en amont). |
| `build.js` | Concatène les sources, applique la passe de traduction et minifie. |
| `i18n/` | Traductions anglaises et outils qui les appliquent. |
| `tests/` | Tests en navigateur pilotés par Playwright. Voir [tests/README.md](tests/README.md). |
| `tools/` | `check-seq.js`, contrôle des séquences embarquées. `mendel.tsv`, la table gène–maladie du focus mendélien, avec `mk-mendel.js` (génère les données du jeu) et `check-mendel.js` (la revérifie auprès de PanelApp Australia). |
| `dist/` | Sortie du build, non versionnée. |

## Construction

Développé et testé avec Node.js 22.

| Commande | Résultat |
| --- | --- |
| `npm run build` | `dist/index.html`, le fichier unique minifié à publier (≈ 1,06 Mo, ≈ 430 ko compressé). |
| `npm run dev` | `dist/dev.html`, non minifié, avec le crochet de test `window.__ev`. |
| `npm run check-seq` | Vérifie cadres de lecture, sites d'épissage et signaux du promoteur des séquences embarquées. |
| `npm run mendel` | Régénère `src/mendel-data.js`, `i18n/en/mendel.json` et `docs/MENDELIAN.md` à partir de `tools/mendel.tsv`. À lancer après toute modification de la table, avant le build. |
| `npm run check-mendel` | Vérifie chaque gène de `tools/mendel.tsv` auprès de l'API de PanelApp Australia (accès réseau requis). |

L'ordre dans lequel `build.js` concatène les fichiers sources compte ; il est indiqué en tête de ce fichier.

## Traductions

Les sources sont écrites en français. Au build, chaque chaîne française traduite est remplacée par `(LG ? "anglais" : 'français')` : les deux langues sont dans le même fichier et se choisissent sur l'écran d'accueil.

Pour ajouter ou modifier un texte :

1. Écrire la chaîne française dans la source.
2. Ajouter sa traduction dans `i18n/en/extra.json`, avec le texte français exact comme clé.
3. Lancer `npm run build`. Les chaînes sans traduction sont listées dans `dist/i18n-missing.json` ; beaucoup y sont identiques dans les deux langues et ne demandent rien.

Les fragments très courts (unités, mots isolés en minuscules) échappent à l'extracteur : les écrire `LG ? 'en' : 'fr'` dans la source. Les textes fixes de la page sont traduits par la table `HT` de `src/start.js`.

## Publication

Le workflow `.github/workflows/pages.yml` construit le jeu et le déploie sur GitHub Pages à chaque push sur `main` ou `dev` : la branche `main` est servie à la racine du site, la branche `dev` dans `/dev/` (aperçu du travail en cours). À activer une fois dans les réglages du dépôt : **Settings → Pages → Build and deployment → Source : GitHub Actions**.

## Crédits

Conception, direction scientifique et relecture : Benjamin Cogné.
Le code et les textes ont été écrits avec Claude (Anthropic) sous sa direction, par itérations successives.

Séquences et annotations : GRCh38/hg38 via le UCSC Genome Browser ; les gènes personnalisés sont chargés en direct par les API REST de UCSC et d'Ensembl.

## Licence

Publié sous [licence MIT](LICENSE), © 2026 Benjamin Cogné. Elle couvre le code et les textes de ce dépôt.

Les extraits de séquence humaine proviennent de l'assemblage GRCh38/hg38, que l'UCSC diffuse en libre accès pour un usage public ; voir la [page de crédits de l'UCSC](https://genome.ucsc.edu/goldenPath/credits.html) pour ses conditions.
