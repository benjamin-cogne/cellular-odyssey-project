# Odyssée cellulaire

*[Version française](README.fr.md)*

An educational 3D game in a single HTML file. Aboard the nano-ship *Nautile* you arrive with the blood in a human tissue, enter a cell by endocytosis, explore its cytoplasm and organelles, pass through a nuclear pore and shrink down to 2 nm to read a gene while it is being transcribed.

The whole game is one self-contained page: a hand-written WebGL2 engine, no framework, no runtime dependency, no assets. It runs offline, on desktop and on phones, in French and in English.

## Play

Once GitHub Pages is enabled (see [Publishing](#publishing)), the game is served at `https://<account>.github.io/<repository>/`.

To play locally, build it and open `dist/index.html` in a browser:

```bash
npm ci
npm run build
```

## What is in it

- **Three cells, one patient.** An erythroblast in the bone marrow (gene *HBB*), a hepatocyte in the liver (*HAMP*) and a cortical neuron (*FOS*), linked by the bloodstream.
- **Cytoplasm and organelles.** Mitochondria, endoplasmic reticulum, Golgi and the nucleolus can be entered; every structure has a clickable card, collected in an atlas.
- **Nucleus.** Pores, lamina (A- and B-type lamins, LBR, emerin), nucleolus (FC / DFC / GC, Pol I transcription, pre-ribosome flux), speckles, Cajal bodies, PML bodies, paraspeckles.
- **Genes, base by base.** The three built-in genes use the real hg38 sequence, with promoter signals, exons, introns and splice sites. An "I am RNA polymerase II" mode walks through initiation, capping, pausing, splicing, polyadenylation and termination.
- **Any gene.** A search box loads another human gene through the UCSC Genome Browser API (Ensembl as fallback). This is the only network access in the game.
- **21 chemical pathways at molecular scale**, shown where they happen: Krebs cycle, respiratory chain, β-oxidation, haem synthesis, urea cycle, N-glycosylation, glycolysis, translation, ubiquitination, Na⁺/K⁺ pump, RNA polymerisation, capping, the DNA methylation cycle (DNMT, three TET oxidations, TDG, base excision repair), histone acetylation and methylation (including the LSD1 and JmjC demethylases), histone phosphorylation and ubiquitination, rRNA modification and more. Each has a narrated level and an expert level with a quiz.
- **Cell surface and ways in.** Outside the cell, a "⇲ Ways in" button lets the player choose a route. Clathrin-mediated endocytosis is flown in the scenery; caveolae, macropinocytosis and, in the neuron, ultrafast synaptic endocytosis are guided animations at nanometre scale that end inside the cell. A fourth view shows the surface receptors of the current cell with their ligand and the signal they start (TfR1, EPO receptor, KIT, integrin; LDL, insulin, glucagon and asialoglycoprotein receptors; TrkB, Cav2.1, mGluR2).
- **The brain.** A "Brain" entry on the start screen (and a "🧠 Explore the brain" button in the neuron) opens a brain map flown by ship and a cell gallery. On the map (a model of the right hemisphere with brainstem, spinal cord and a few organs), every region, nucleus and organ has a card, a list of structures flies the ship to any of them, and six tours let the ship follow a signal along its pathway while the player can take over the controls at any time. From the map, six cell neighbourhoods can be entered and flown at micrometre scale, each cell with its card: a cortical column (six layers, pyramidal neurons, interneurons, glia, a capillary), the cerebellar cortex (Purkinje cells, granule cells, parallel and climbing fibres), the striatum, area CA1 of the hippocampus, spinal cord to muscle (motoneuron, myelinated axon, neuromuscular junction, muscle fibres) and the retina; the cortical column leads to the neuron of the game. A guided gallery also shows the cells of the brain at micrometre scale (pyramidal neuron, interneurons, Purkinje and granule cells, striatum and dopamine, astrocyte, oligodendrocyte, microglia, barrier and ependyma), the six tours follow a signal to its effects in the body: seeing (pupil, circadian clock), moving (muscle contraction, cerebellar correction), learning and remembering, deciding and self-control, stress (heart, liver, cortisol feedback) and keeping the body in balance (vasopressin and the kidney, breathing).
- **Histone code.** Near the gene, a guided fifteen-step view shows a nucleosome at nanometre scale (147 bp of DNA, the histone octamer, the tails residue by residue) and one mark per step: H3K4me3, H3K4me1, H3K27ac, H4K16ac, H3K36me3, H2BK120ub1 with H3K79me2, H3K27me3, H2AK119ub1, H3K9me3, H3S10ph, γH2AX, DNA methylation, the bivalent promoter, remodellers and H2A.Z. Each mark comes with its writer, reader and eraser, and uses the colours of chromatin-state maps. With the Mendelian focus on, each step lists the disorders of its enzymes.
- **Chromatin actors in the nucleus.** Clickable objects with their own cards: linker histone H1, the variants H2A.Z and H3.3, the BAF remodeller, a cohesin ring and two CTCF proteins at the foot of the enhancer–promoter loop; pericentromeric heterochromatin with HP1 and CENP-A at every centromere; Polycomb bodies (PRC1, PRC2) on the four HOX clusters; the imprinted H19/IGF2 locus, drawn differently on the maternal and paternal chromosome 11.
- **"Decode this chromatin" quiz.** Reached from the histone-code view: ten nucleosomes carrying a few marks, four possible states each time, an explanation after every answer and a score. An expert level hides the names of the marks, which must then be read from their position, shape and colour.
- **Chromatin states along the gene.** Coloured beads on the nucleosomes of the locus and along the gene's DNA show the expected marks: H3K4me3 and acetylation at the promoter, H3K4me1 and H3K27ac at enhancers, H3K79me2 then H3K36me3 in the gene body. A "◆ Chromatin" button switches each built-in gene to a documented alternative state: HBB in a non-erythroid cell (widespread H3K9 methylation), HAMP in iron deficiency (HDAC3-dependent loss of H3K9ac and H3K4me3), FOS in a resting neuron (poised promoter, enhancers with H3K4me1 only). The sequence panel names the state at the ship's position.
- **snRNP assembly (Cajal body).** At a Cajal body, a guided eight-step view builds the U4/U6·U5 tri-snRNP at nanometre scale: return of a U5 core snRNP, 2′-O-methylation and pseudouridylation of U5 by the scaRNA U85, U5-specific proteins, U4 and U6 snRNPs, U4/U6 pairing with SART3, docking of U5. Each snRNA is drawn nucleotide by nucleotide in a warm colour; each of the 39 proteins is a labelled sphere of its own cool colour, sized by its mass.
- **Mendelian genetics focus.** A checkbox on the start screen highlights every structure, protein and pathway step whose genes cause a Mendelian disorder: gene labels over nearby structures in the scenery, gene and disease lines on the cards, a "🧬 Genetics" panel listing inheritance, OMIM number and a PubMed reference, and the disorders of each enzyme in the reaction pathways. 373 genes; the full table is in [docs/MENDELIAN.md](docs/MENDELIAN.md).
- **Synapses and nerve impulse (neuron).** Two excitatory synapses built molecule by molecule with a 20 nm cleft the ship can enter, and a 12-step guided tour that follows a signal from a stimulated spine to the next neuron, with an oscilloscope tracing the membrane potential.

## Scientific status

This is a teaching aid, not a reference.

- Geometries are schematic, molecule counts are reduced and animations are slowed down by several orders of magnitude.
- Numbers on the cards are orders of magnitude. Some were checked against the literature when the game was written; others were not.
- The 57 references used are listed in the game, on the start screen under *Sources*, with their PMID.
- The Mendelian focus lists gene–disease associations rated Green in [PanelApp Australia](https://panelapp-aus.org/) (Mendeliome v2.901 and specialised panels, November 2026). It is a selection of two to four well-known disorders per structure, not a complete list, and it is not a diagnostic resource. `npm run check-mendel` re-checks the table against PanelApp Australia.
- The content has not been peer reviewed. Corrections are welcome: please open an issue with a reference.

## Repository layout

| Path | Content |
| --- | --- |
| `src/` | Game sources: `shell.html` (page, CSS, static text) and 26 JavaScript files. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). |
| `src/seq/` | Genomic sequences of *HBB*, *HAMP* and *FOS* (hg38, gene plus upstream promoter). |
| `build.js` | Concatenates the sources, applies the translation pass and minifies. |
| `i18n/` | English translations and the tools that apply them. |
| `tests/` | Browser tests driven by Playwright. See [tests/README.md](tests/README.md). |
| `tools/` | `check-seq.js`, a sanity check of the embedded sequences. `mendel.tsv`, the gene–disease table of the Mendelian focus, with `mk-mendel.js` (generates the game data) and `check-mendel.js` (re-checks it against PanelApp Australia). |
| `dist/` | Build output, not committed. |

## Building

Developed and tested with Node.js 22.

| Command | Result |
| --- | --- |
| `npm run build` | `dist/index.html`, the minified single file to publish (≈ 870 kB, ≈ 340 kB gzipped). |
| `npm run dev` | `dist/dev.html`, not minified, with the test hook `window.__ev`. |
| `npm run check-seq` | Checks reading frames, splice sites and promoter signals of the embedded sequences. |
| `npm run mendel` | Regenerates `src/mendel-data.js`, `i18n/en/mendel.json` and `docs/MENDELIAN.md` from `tools/mendel.tsv`. Run it after editing the table, then build. |
| `npm run check-mendel` | Checks every gene of `tools/mendel.tsv` against the PanelApp Australia API (needs network access). |

The order in which `build.js` concatenates the source files matters; it is listed at the top of that file.

## Translations

The sources are written in French. At build time every translated French string literal is replaced by `(LG ? "English" : 'French')`, so both languages ship in the same file and the language can be switched on the start screen.

To add or change text:

1. Write the French string in the source.
2. Add its translation to `i18n/en/extra.json`, keyed by the exact French text.
3. Run `npm run build`. Strings without a translation are listed in `dist/i18n-missing.json`; many entries there are identical in both languages and need nothing.

Very short fragments (units, single lowercase words) are not picked up by the extractor; write them as `LG ? 'en' : 'fr'` in the source. Static page text is translated by the `HT` table in `src/start.js`.

## Publishing

The workflow in `.github/workflows/pages.yml` builds the game and deploys it to GitHub Pages on every push to `main` or `dev`: the `main` branch is served at the root of the site, the `dev` branch under `/dev/` (a preview of work in progress). Enable it once in the repository settings: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Credits

Concept, scientific direction and review: Benjamin Cogné.
Code and texts were written with Claude (Anthropic) under his direction, over successive design iterations.

Sequences and annotations: GRCh38/hg38 through the UCSC Genome Browser; custom genes are fetched live from the UCSC and Ensembl REST APIs.

## Licence

Released under the [MIT licence](LICENSE), © 2026 Benjamin Cogné. It covers the code and texts of this repository.

The human sequence excerpts come from the GRCh38/hg38 assembly, which UCSC distributes as freely available for public use; see the [UCSC credits page](https://genome.ucsc.edu/goldenPath/credits.html) for its conditions.
