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
- **Synapses et influx nerveux (neurone).** Deux synapses excitatrices construites molécule par molécule, avec une fente de 20 nm où le vaisseau peut entrer, et un parcours guidé en 12 étapes qui suit un signal d'une épine stimulée jusqu'au neurone suivant, avec un oscilloscope du potentiel de membrane.

## Statut scientifique

C'est un support pédagogique, pas une référence.

- Les géométries sont schématiques, les nombres de molécules réduits, les animations ralenties de plusieurs ordres de grandeur.
- Les chiffres des fiches sont des ordres de grandeur. Certains ont été vérifiés dans la littérature à l'écriture du jeu, d'autres non.
- Les 57 références utilisées figurent dans le jeu, sur l'écran d'accueil, sous *Sources*, avec leur PMID.
- Le contenu n'a pas été relu par des pairs. Les corrections sont bienvenues : ouvrez une issue avec une référence.

## Organisation du dépôt

| Chemin | Contenu |
| --- | --- |
| `src/` | Sources du jeu : `shell.html` (page, CSS, textes fixes) et 15 fichiers JavaScript. Voir [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). |
| `src/seq/` | Séquences génomiques de *HBB*, *HAMP* et *FOS* (hg38, gène et promoteur en amont). |
| `build.js` | Concatène les sources, applique la passe de traduction et minifie. |
| `i18n/` | Traductions anglaises et outils qui les appliquent. |
| `tests/` | Tests en navigateur pilotés par Playwright. Voir [tests/README.md](tests/README.md). |
| `tools/` | `check-seq.js`, contrôle des séquences embarquées. |
| `dist/` | Sortie du build, non versionnée. |

## Construction

Développé et testé avec Node.js 22.

| Commande | Résultat |
| --- | --- |
| `npm run build` | `dist/index.html`, le fichier unique minifié à publier (≈ 510 ko, ≈ 210 ko compressé). |
| `npm run dev` | `dist/dev.html`, non minifié, avec le crochet de test `window.__ev`. |
| `npm run check-seq` | Vérifie cadres de lecture, sites d'épissage et signaux du promoteur des séquences embarquées. |

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

Aucune licence n'a encore été choisie. Tant qu'un fichier `LICENSE` n'est pas ajouté, le régime par défaut s'applique : tous droits réservés.
