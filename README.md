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

- **Four cells, one patient.** An erythroblast in the bone marrow (gene *HBB*), a hepatocyte in the liver (*HAMP*), a cortical neuron (*FOS*) and a ventricular cardiomyocyte (*TNNC1*), linked by the bloodstream.
- **The heart, from ion channel to whole organ.** The cardiomyocyte sits in its myocardium (capillaries, pericyte, neighbouring cells, fibroblasts, resident macrophage, sympathetic fibre, collagen) and can be entered: myofibrils with their sarcomeres, mitochondria in rows, sarcoplasmic reticulum, T-tubules and dyads, costameres, caveolae, intercalated discs. A "⚡ Follow the cardiac impulse" button opens 18 guided steps drawn at real size around that one cell: resting potential and the four phases of the action potential on an oscilloscope, calcium-induced calcium release, troponin C and the sliding filaments, relaxation, gap junctions, the wave from cell to cell and through the tissue, then a continuous zoom out through the ventricular wall to a whole beating heart with its conduction system, coronary arteries and electrocardiogram. The impulse can also be followed in the cell itself, at the player's own pace: the cell beats every few seconds, a wave runs along its real membrane (and on to the neighbouring cells, visible from the tissue), calcium puffs light up at the dyads, and a five-stage story takes the ship to the sarcolemma — where each channel and pump is drawn, opens in turn and lets its ions through while a trace follows the local membrane potential — then to a T-tubule, a myofibril and the intercalated disc, leaving the controls to the player at each stage.
- **Inside a myofibril.** Close to a myofibril, an "⇥ Enter" button slips the ship between the filaments of one sarcomere, drawn at real size from Z-disc to Z-disc: the hexagonal lattice of thick and thin filaments, titin, the myomesin bridges and creatine kinase of the M-band, the α-actinin links of the Z-disc. Around the ship, actin monomers, tropomyosin, troponins, crowns of myosin heads and myosin-binding protein C are drawn one by one; waves of calcium unfold the heads and set them cycling. Four reaction pathways are played there: the actin–myosin cross-bridge cycle, calcium and troponin, the phosphocreatine shuttle, and the phosphorylations that tune force.
- **Dyad, intercalated disc and lysosome.** Three more places can be entered. The *dyad* (cardiomyocyte): the 15 nm cleft between a T-tubule and a cistern of the sarcoplasmic reticulum, with its fourteen ryanodine receptors, Cav1.2 channels, junctophilin, calsequestrin, SERCA2a pumps and the NCX exchanger; calcium release and re-uptake are played every few seconds, and the ship can cross into the T-tubule lumen or the reticulum lumen. The *intercalated disc* (cardiomyocyte): the gap between two cells, with a gap junction plaque of connexin 43 channels, Nav1.5 channels around it, a desmosome and an adherens junction seen through translucent membranes. The *lysosome* (all four cells): sugar coat of LAMP proteins, V-ATPase proton pumps, acid hydrolases, glycogen being digested, internal vesicles, lipofuscin.
- **Reactions of the heart cell.** Thirteen pathways come with these places: lysosomal acidification and four digestions; calcium-induced calcium release and calcium re-uptake in the dyad; current flow, the life of a connexin and cadherin adhesion in the disc; in the cardiomyocyte's mitochondrion, the carnitine shuttle, ketone body oxidation, mitochondrial creatine kinase, the calcium uniporter and cardiolipin remodelling; in its cytosol, the β-adrenergic signal from receptor to protein kinase A and back.
- **Cytoplasm and organelles.** Mitochondria, endoplasmic reticulum, Golgi and the nucleolus can be entered; every structure has a clickable card, collected in an atlas.
- **Nucleus.** Pores, lamina (A- and B-type lamins, LBR, emerin), nucleolus (FC / DFC / GC, Pol I transcription, pre-ribosome flux), speckles, Cajal bodies, PML bodies, paraspeckles.
- **Genes, base by base.** The four built-in genes use the real hg38 sequence, with promoter signals, exons, introns and splice sites. An "I am RNA polymerase II" mode walks through initiation, capping, pausing, splicing, polyadenylation and termination.
- **Any gene.** A search box loads another human gene through the UCSC Genome Browser API (Ensembl as fallback). This is the only network access in the game.
- **38 chemical pathways at molecular scale**, shown where they happen: Krebs cycle, respiratory chain, β-oxidation, haem synthesis, urea cycle, N-glycosylation, glycolysis, translation, ubiquitination, Na⁺/K⁺ pump, RNA polymerisation, capping, the DNA methylation cycle (DNMT, three TET oxidations, TDG, base excision repair), histone acetylation and methylation (including the LSD1 and JmjC demethylases), histone phosphorylation and ubiquitination, rRNA modification and more. Each has a narrated level and an expert level with a quiz.
- **Straight to a destination.** On the start screen, a "⌖ Destination" list sends the ship directly to a place instead of the full journey from the blood: cytoplasm, mitochondrion, endoplasmic reticulum, Golgi apparatus, lysosome, nucleus, nucleolus, the cell's gene, and, in the cells that have them, a sarcomere, a dyad, the intercalated disc, the cardiac or the nerve impulse. Organelles that can be visited are entered automatically.
- **Cell surface and ways in.** Outside the cell, a "⇲ Ways in" button lets the player choose a route. Clathrin-mediated endocytosis is flown in the scenery, with the player at the controls throughout: inside the coated vesicle (scission, uncoating), then inside the early endosome it fuses with (proton pumps, cargo, recycling tubules), which the player leaves when they choose; caveolae, macropinocytosis and, in the neuron, ultrafast synaptic endocytosis are guided animations at nanometre scale that end inside the cell. A fourth view shows the surface receptors of the current cell with their ligand and the signal they start (TfR1, EPO receptor, KIT, integrin; LDL, insulin, glucagon and asialoglycoprotein receptors; TrkB, Cav2.1, mGluR2).
- **The brain** (preview build only for now: the published version hides this mode, see `BRAIN` in `src/engine.js`)**.** A "Brain" entry on the start screen (and a "🧠 Explore the brain" button in the neuron) opens a brain map flown by ship and a cell gallery. On the map (a model of the right hemisphere with brainstem, spinal cord and a few organs), every region, nucleus and organ has a card, a list of structures flies the ship to any of them, and six tours let the ship follow a signal along its pathway while the player can take over the controls at any time. From the map, six cell neighbourhoods can be entered and flown at micrometre scale, each cell with its card: a cortical column (six layers, pyramidal neurons, interneurons, glia, a capillary), the cerebellar cortex (Purkinje cells, granule cells, parallel and climbing fibres), the striatum, area CA1 of the hippocampus, spinal cord to muscle (motoneuron, myelinated axon, neuromuscular junction, muscle fibres) and the retina; the cortical column leads to the neuron of the game. A guided gallery also shows the cells of the brain at micrometre scale (pyramidal neuron, interneurons, Purkinje and granule cells, striatum and dopamine, astrocyte, oligodendrocyte, microglia, barrier and ependyma), the six tours follow a signal to its effects in the body: seeing (pupil, circadian clock), moving (muscle contraction, cerebellar correction), learning and remembering, deciding and self-control, stress (heart, liver, cortisol feedback) and keeping the body in balance (vasopressin and the kidney, breathing).
- **Inside glial cells.** Next to an astrocyte, a microglial cell or an oligodendrocyte of the neuron's tissue (and, in the brain mode, from their cards in the cortical column), an "⤓ Enter" button takes the ship inside the cell, drawn in transparency at micrometre scale. Each organelle and membrane protein has its card (50 in all): GFAP filaments, glycogen, the endfoot with aquaporin-4, Kir4.1 and GLUT1, the perisynaptic process with GLT-1 and glutamine synthetase; the microglial phagosome, the receptors P2Y12, CX3CR1, TREM2, CR3, TLR4 and CSF1R, the NLRP3 inflammasome; the myelin sheath, the node of Ranvier with its paranode and juxtaparanode, MBP mRNA granules, peroxisomes, MCT1. Eleven guided "In action" sequences show what these cells do: recycling glutamate, potassium buffering and calcium waves, feeding the neuron and tuning blood flow; surveying the tissue, converging on an injury, pruning a synapse, raising the alarm; wrapping myelin, shipping MBP mRNA, saltatory conduction, feeding the axon. Statements were checked against the literature (species and debated points are stated), and the Mendelian focus lists the disorders of the proteins shown.
- **Histone code.** Near the gene, a guided fifteen-step view shows a nucleosome at nanometre scale (147 bp of DNA, the histone octamer, the tails residue by residue) and one mark per step: H3K4me3, H3K4me1, H3K27ac, H4K16ac, H3K36me3, H2BK120ub1 with H3K79me2, H3K27me3, H2AK119ub1, H3K9me3, H3S10ph, γH2AX, DNA methylation, the bivalent promoter, remodellers and H2A.Z. Each mark comes with its writer, reader and eraser, and uses the colours of chromatin-state maps. With the Mendelian focus on, each step lists the disorders of its enzymes.
- **Nucleotides and hydrogen bonds.** Near the gene, when the ship shrinks below 4.5 nm (it can now go down to 0.5 nm, about one nucleotide), the base pairs around it are drawn atom by atom with the real sequence: sugars, phosphates, bases, the hydrogens that take part in hydrogen bonds, and the bonds themselves as dotted lines (two for A–T, three for G–C). On nucleosomes the DNA wraps around the histones, and an arginine reaches into the minor groove where it faces the octamer. Cards and labels name the nearest pair and its grooves. A ten-step guided view ("⌬ Nucleotides and hydrogen bonds") explains the nucleotide, the strand and its polarity, the two pairs and their donors and acceptors, why both pairs have the same shape, stacking and the double helix, how proteins read the grooves, DNA around the histones, cytosine methylation and CpG mutation hotspots, and RNA in the A form. Bases use the standard reference frame of base pairs; the backbone is an ideal nucleotide computed so that each one joins the next exactly.
- **A chromosome at every scale.** From afar a chromosome is a coloured tube. Fly close to any of them with a ship smaller than 300 nm and the two megabases around you resolve into their chain of nucleosomes, one dot per nucleosome, folded into loop domains whose base is held by a cohesin ring between two CTCF proteins; genes, regulatory elements and CpG islands of that region are fetched and coloured when the network allows. Shrink further and each level appears in turn: the nucleosome disc with its wrapped DNA and the linker histone H1; below 20 nm the eight histones, first as lobes, then as the trace of their backbone with thick α-helices and their tails; the DNA double helix with the real sequence; below 4.5 nm every atom of the histones and of the DNA, the direct histone–DNA contacts and the water molecules that bridge them, with the nearest residue named (for example H3 lysine 27 and the marks it carries). Every nucleosome is a copy of the 1.9 Å crystal structure (PDB 1KX5), so the DNA follows its real path and the arginines sit in the real minor grooves; the chain itself is drawn at random with realistic sizes.
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
- In the cardiac impulse view, sizes, durations and the order of events follow the literature, but the shape of the proteins (beads) and of the heart (ellipsoids and tubes), the course of the Purkinje network, and the oscilloscope and electrocardiogram traces are drawn by hand; several textbook values that could not be traced to a primary source (resting potential near −85 mV, conduction velocity along the fibres, wall thickness) are given as approximate.
- The references used (442) are listed in the game, on the start screen under *Sources*, with their PMID.
- The Mendelian focus lists gene–disease associations rated Green in [PanelApp Australia](https://panelapp-aus.org/) (Mendeliome v2.901 and specialised panels, November 2026). It is a selection of two to four well-known disorders per structure, not a complete list, and it is not a diagnostic resource. `npm run check-mendel` re-checks the table against PanelApp Australia.
- The content has not been peer reviewed. Corrections are welcome: please open an issue with a reference.

## Repository layout

| Path | Content |
| --- | --- |
| `src/` | Game sources: `shell.html` (page, CSS, static text) and 38 JavaScript files. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md). |
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
| `npm run build` | `dist/index.html`, the minified single file to publish (≈ 1.30 MB, ≈ 525 kB gzipped). |
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
