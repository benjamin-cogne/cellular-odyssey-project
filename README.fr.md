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
- **19 voies chimiques à l'échelle moléculaire**, montrées là où elles se produisent : cycle de Krebs, chaîne respiratoire, β-oxydation, synthèse de l'hème, cycle de l'urée, N-glycosylation, glycolyse, traduction, ubiquitination, pompe Na⁺/K⁺, polymérisation de l'ARN, coiffe, marques épigénétiques, modification de l'ARNr, etc. Chacune a un niveau commenté et un niveau expert avec quiz.
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
| `src/` | Sources du jeu : `shell.html` (page, CSS, textes fixes) et 17 fichiers JavaScript. Voir [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). |
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
| `npm run build` | `dist/index.html`, le fichier unique minifié à publier (≈ 570 ko, ≈ 230 ko compressé). |
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

Le workflow `.github/workflows/pages.yml` construit le jeu et le déploie sur GitHub Pages à chaque push sur `main`. À activer une fois dans les réglages du dépôt : **Settings → Pages → Build and deployment → Source : GitHub Actions**.

## Crédits

Conception, direction scientifique et relecture : Benjamin Cogné.
Le code et les textes ont été écrits avec Claude (Anthropic) sous sa direction, par itérations successives.

Séquences et annotations : GRCh38/hg38 via le UCSC Genome Browser ; les gènes personnalisés sont chargés en direct par les API REST de UCSC et d'Ensembl.

## Licence

Publié sous [licence MIT](LICENSE), © 2026 Benjamin Cogné. Elle couvre le code et les textes de ce dépôt.

Les extraits de séquence humaine proviennent de l'assemblage GRCh38/hg38, que l'UCSC diffuse en libre accès pour un usage public ; voir la [page de crédits de l'UCSC](https://genome.ucsc.edu/goldenPath/credits.html) pour ses conditions.
