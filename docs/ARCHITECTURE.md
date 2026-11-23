# Architecture

The game is one HTML page. `build.js` produces it by pasting JavaScript into `src/shell.html`:

```
engine.js
function boot(CT, GX) {      // CT: 0 erythroblast, 1 hepatocyte, 2 neuron; GX: custom gene or undefined
  cells.js … mendel.js       // 29 files, in the order listed in build.js
}
start.js
```

Everything inside `boot` shares one function scope, in strict mode. A file can use any `const` or `let` declared by a file placed before it, which is why the order matters. Choosing another cell calls `boot` again and rebuilds the world.

The code is deliberately compact: short helper names, long lines, comments in French. Lengths are in micrometres throughout.

## Source files

| File | Role |
| --- | --- |
| `engine.js` | Vector helpers, seeded random generator, WebGL2 setup, shaders, meshes, layers, instance writers, dynamic chunks. |
| `cells.js` | Per-cell configuration (`CF`), the four built-in genes and their annotated signals, cell-specific cards. |
| `world.js` | Common cards (`I`), world constants, cell shape, collider lists, plasma membrane and entry pit. |
| `nucleus.js` | Nuclear interior (chromatin, nucleolus shell, speckles, Cajal, PML, paraspeckles), common cytoplasmic organelles, the ship. |
| `cell-structures.js` | Structures specific to the hepatocyte and to the neuron (processes, spines, axon, bouton). |
| `cardio.js` | The ventricular cardiomyocyte (cell 3, gene *TNNC1*): a rod of two arms (`PRC`) filled with a hexagonal lattice of myofibrils with sarcomeres in register, mitochondria in rows, sarcoplasmic reticulum, T-tubules and dyads at the Z-lines (`CDL`), costameres, caveolae and the two intercalated discs; `cdZ` gives the sarcomere zone (A band, I band, Z-disc) of a point; `cdTis` builds the myocardium (three capillaries, pericyte, neighbouring cardiomyocytes, fibroblasts, macrophage, sympathetic fibre, collagen) and its cards. |
| `synapses.js` | The two detailed synapses, the axon initial segment patch, their cards. |
| `tissues.js` | Surrounding tissue, blood vessel and blood. Ends with the final `fin()`. |
| `physics.js` | Dynamic objects, game state, controls, collisions, automatic ship sizing. |
| `loop.js` | Rendering, camera, per-frame loop, HUD, pointer and keyboard input, points of interest. |
| `chromatin.js` | Chromatin actors added to the nucleus, with their cards: H1, H2A.Z, H3.3, BAF, cohesin and CTCF on the detailed locus; pericentromeric heterochromatin, HP1 and CENP-A at each centromere; Polycomb bodies on the HOX clusters; the imprinted H19/IGF2 locus on both chromosomes 11. Uses its own random generator so the rest of the scenery is unchanged. Built right after `nucleus.js`. |
| `genes.js` | Gene navigation: UCSC and Ensembl REST calls, custom gene construction, autopilot. |
| `interact.js` | Picking and cards, atlas, organelle interiors (mitochondrion, ER, Golgi; the sarcomere interior of `sarcomere.js` plugs into the same table `ENT`), mode buttons. |
| `nucleolus-lamina.js` | Nucleolus interior and its animation, procedural lamina near the envelope. |
| `reactions.js` | Chemical reaction mode: molecules (`MOL`), pathways (`RXP`), placement in the scenery, quiz. |
| `impulse.js` | Nerve impulse mode: the 12 steps, their animations, the oscilloscope (the canvas is reused by the cardiac impulse view). |
| `snrnp.js` | Engine of the guided nanometre-scale views (`SXQ` registry, camera, panel, labels) and the snRNP assembly view in the Cajal body: RNA builder (helices, loops, single strands), protein table, eight steps. |
| `heartbeat.js` | Cardiac impulse view (`SXQ.hb`, cardiomyocyte only): 18 steps drawn at real size (1 unit = 1 µm) around one cell of the left ventricular wall (`HBO`). Scenes in the cell frame (`fA`, `fB`, `fN`): membrane patch with channels and pump (`hbMe`), dyad (`hbDy`), thin and thick filaments (`hbTn`), sarcomere (`hbSa`), gap junction (`hbGj`), cells end to end (`hbFi`), tissue block (`hbTi`), fibre sheets (`hbFs`). The whole heart is built once (`hbBuild`) in millimetres in its own frame (`hLx`, `hLy`, `hLz`) from ellipsoids and tubes: ventricles, atria, great vessels, coronary arteries, conduction system with arrival times (`HCS`), beads carrying activation and repolarisation times (`HP`). `hbH(t)` draws it at time *t* of a beat, opaque or in glass; the ventricle and atrium blocks beat through their block matrices (`HM_V`, `HM_A`). `hbOs` draws the oscilloscope and the electrocardiogram. |
| `sarcomere.js` | Inside a myofibril (cardiomyocyte only), through the organelle-interior mechanism of `interact.js` (`ENT.myf`, builder `mkMyf`, cylindrical confinement `cy` in `pO`). The builder keeps the sarcomere where the ship is and draws its fixed parts at real size: hexagonal lattice of thick filaments (`SMT`, 42 nm apart) and thin filaments (`SMN`), titin, M-band bridges and creatine kinase, α-actinin links, plus zone colliders for the cards. `smT` (hooked on `oT`) draws the molecular detail around the ship only: actin monomers, tropomyosin, troponins, crowns of myosin heads every 14.3 nm, myosin-binding protein C; `smA` is the calcium wave that unfolds the heads. The file also adds four reaction pathways to `RXP` (`xbc`, `tnn`, `ckm`, `pka`) with their molecules (`MOL`) and anchors (`RXW`), and widens the entry button so that a myofibril can be entered even when the reticulum is nearer. |
| `histone.js` | Histone-code view: the nucleosome (DNA superhelix, octamer, tails residue by residue), marks, writers, readers and erasers, fifteen steps. |
| `decode.js` | "Decode this chromatin" quiz, a guided view with its own panel (`SXQ.hq`, expert level `SXQ.hQ`): rounds `HQ` (marks, right answer, decoys, explanation), states `HQA`. |
| `nucleotides.js` | DNA and RNA at atomic scale. Model: base atoms in the standard base-pair reference frame (`NTB`), an ideal sugar-phosphate backbone in B form for DNA and A form for RNA (`NTK`, computed offline by `tools/nt-geometry.py`), polar hydrogens and hydrogen bonds (`NTH`, `NTHB`); `ntM` builds a nucleotide, `ntPr` draws a base pair through any frame and returns its key positions, `ntHx` a straight helix, `ntAr` a histone arginine in the minor groove. Free flight: `ntFF` is called by `atom()` in `genes.js` for the pairs within 6.5 nm of the ship once it is smaller than 4.5 nm (spheres in `dQs`, sticks in `dQ`), `ntD` places the labels each frame and `ntI` supplies the card. Guided view `SXQ.nt` (ten steps), opened by `#ntb`. |
| `nucleosome-data.js` | Generated by `tools/mk-nucleosome.py` from the crystal structure 1KX5: base-pair frames, histone atoms, real DNA backbone, direct histone–DNA contacts, bridging waters, helices, all in the frame of a nucleosome unit of the fibre. Do not edit by hand. |
| `nucleosome.js` | The real nucleosome. `ncL` decodes the data once; `nuFr(U,j,k)` gives the frame of base pair `k` of unit `j` (real on the nucleosome; on linker DNA a straight B-DNA whose twist is adjusted to meet the next nucleosome); `ncOv` supplies the real backbone to `ntPr`; `ncH` draws the eight histones as lobes, α-carbon trace or atoms depending on the distance, with contacts and waters; `ncI` is the card of a residue. |
| `chrfibre.js` | Chromatin chain along the chromosomes. `chrT` (called by `nvT`) decides when the two megabases nearest to the ship replace their tube segments (`CHS`, `drawChr`); `chrMb` draws one megabase deterministically (loop domains, guide curve, seven candidate orientations per unit, no overlap); `chrFib` assembles the window into `TG.U` and calls `fibGeo` (in `genes.js`), so everything that works on a locus chosen by the player works here too; `chrAn` fetches the annotations. |
| `entry.js` | Cell surface: menu of entry routes, guided views for caveolae (`SXQ.wv`), macropinocytosis (`wm`), ultrafast synaptic endocytosis (`wu`, neuron) and the surface receptors of the current cell (`wr`); membrane and pit drawing helpers (`wyS`, `wyB`, `wyP`); `wyIn` puts the ship inside the cell. |
| `brain.js` | The brain: bead model of the right hemisphere seen from its inner face (`BRM`), deep structures (`BRN`), body organs (`BRO`), pathways with travelling pulses (`brP`), procedural cell shapes (`bGr`), the cell gallery (`SXQ.bc`) and six circuits (`bv`, `bm`, `bl`, `bb`, `bs`, `bh`); `bnMenu` opens the hub. |
| `brainmap.js` | Brain map in free flight (`SXQ.bz`): the model of `brain.js` built once as static geometry far from the cell (`BNO`), pick zones (`BNC`) and cards (`BNI`), nearest-structure card (`bnNr`), fly-to (`bnVw`), manual flight and ride autopilot (`bnS`), ride steps reused from `brain.js`. On this map one engine unit is one centimetre. |
| `places.js` | Cell neighbourhoods entered from the brain map (`BPL`): cortical column, cerebellar cortex, striatum, hippocampal CA1, spinal cord to muscle, retina. Each is built on first visit (`bpIn`) as static geometry with pick zones and cards, flown like the map (`bpS`, `bpD`), with travelling pulses (`dyn`). Here one engine unit is one micrometre. |
| `glia.js` | Interiors of the astrocyte (`ga`), the microglial cell (`gm`) and the oligodendrocyte (`go`): three places of `places.js` with their own cards (`own`), translucent cell bodies and processes (`A.g`, `A.gt`), organelles and enlarged membrane proteins, and guided "In action" sequences (`gCi`: steps with a viewpoint `v`, a target `c`, a ship size `z`, a draw function `d(a,S,P)` and `fo` to follow the first pulsed pathway). `gVw` picks an unobstructed side to look at a point of an axon. The `#glb` button enters a cell from the neuron's tissue (`bpGo`); the cortical column links to the same places (`lk`). One engine unit is one micrometre. |
| `chromstate.js` | Chromatin states along the gene: per-cell state tables (`KMS`), mark beads on the locus nucleosomes and along the DNA (`kmD`), state line of the sequence panel (`kmQ`), "◆ Chromatin" button. |
| `mendel-data.js` | Generated from `tools/mendel.tsv` by `tools/mk-mendel.js`: `MG` (card key → gene, disease, inheritance, OMIM, PMID), `MGC` (per-cell overrides) and `MGR` (pathway → step). Do not edit by hand. |
| `mendel.js` | Mendelian genetics focus: gene labels, card lines, "🧬 Genetics" panel, disorders shown on reaction steps. |
| `start.js` | Cell selection, saved progress, language switch and static page text. |

## Rendering

- **Meshes.** Icospheres `M0` to `M5` (20 to 20,480 triangles) and a few cylinders. Everything on screen is an instance of one of them.
- **Layers.** `Ly(mesh, visibleDistance, gridSize, options)` creates a layer; instances are grouped into spatial chunks for culling. Options select the region where the layer is drawn (`rg`), whether it shows from outside the cell (`ex`), transparency (`al`, `two`) and shader clipping modes (`G`).
- **Static geometry.** `S(layer, centre, radius, colour)` writes a sphere, `Cy` a cylinder, `El` an ellipsoid; `K(0xRGB, alpha)` makes a colour. `fin()` uploads everything written so far. All static geometry must be written before the last `fin()`, at the end of `tissues.js`.
- **Dynamic geometry.** `dy(layer, capacity, origin, radius)` reserves a chunk rewritten every frame with `dS` (sphere) and `dT` (tube), then sent with `up`.
- **Precision.** Instance positions are stored relative to their chunk centre and the camera offset is computed in double precision, so nanometre detail survives at tens of micrometres from the origin.

## World and collisions

- **Regions.** `reg` is 0 outside the cell, 1 in the cytoplasm, 2 in the nucleus. `ORG` is set while inside an organelle.
- **Colliders.** Plain objects `{a, b, r, i}` (capsule, or sphere when `a == b`) pushed into lists: `SH` own cell shape, `OX` objects outside, `CY` cytoplasm, `NU` nucleus, `DN` DNA, `OC` current organelle. `sf: 1` makes a collider soft (pickable, not blocking).
- **Cards.** The key `i` of a collider indexes the card table `I`: `I[key] = [title, text]`. Touching an object shows its card and adds it to the atlas.
- **Random layout.** The world is generated from a seeded generator `R()`. Adding or removing a call to it shifts everything generated afterwards; new code that needs randomness should use its own local generator, as `synapses.js` does.

## Modes

One flag is non-zero at a time and replaces the normal flight controls in the frame loop:

| Flag | Mode | File |
| --- | --- | --- |
| `AP` | Autopilot towards a target | `genes.js` |
| `PM` | "I am RNA polymerase II" | `interact.js` |
| `RX` | Chemical reactions | `reactions.js` |
| `NX` | Nerve impulse | `impulse.js` |
| `SX` | Guided nanometre-scale views: snRNP assembly (`SXQ.sn`), histone code (`SXQ.hx`), chromatin quiz (`SXQ.hq`, `SXQ.hQ`), entry routes and receptors (`SXQ.wv`, `wm`, `wu`, `wr`), cardiac impulse (`SXQ.hb`), brain tours (`SXQ.bc`, `bv`, `bm`, `bl`, `bb`, `bs`, `bh`) | `snrnp.js`, `heartbeat.js`, `histone.js`, `decode.js`, `entry.js`, `brain.js` |

`RX`, `NX` and `SX` share the side panel (`#pm`), the label pool (`QL`) and the orbit and zoom gestures.

## Recipes

- **Add a card.** Add `key: [title, text]` to `I`, give the key to a collider, add the English text to `i18n/en/extra.json`.
- **Add a reaction pathway.** Add its molecules to `MOL` and an entry to `RXP` in `reactions.js`: `[key, location, cell, title, intro, summary, steps]`, each step being `[enzyme, inputs, outputs, text, expertText, question, right, wrong, wrong]`. `RXW` anchors steps to structures in the scenery.
- **Add an impulse step.** Add its texts to `NXT` and an entry to `NXS` in `impulse.js`: camera target `c`, zoom `z`, view direction `v`, loop duration `T`, oscilloscope trace `o` and a draw function `d(phase, time)`.

- **Add a guided view.** Register it in `SXQ` (steps `S`, texts `T`, title, intro and summary texts, summary framing and drawing, scene origin `o()`, `solo` to hide the scenery), add a button that calls `sxIn(key)`. Mark colours shared across the game are in `MKC` (`world.js`).
- **Add a brain circuit.** In `brain.js`, write its texts (`[title, place, text]`) and steps (`{k, T, z, c: bC(x, y), d}`) and add a row to `BQ`. In a step, `brD(highlights, deepStructures, organs)` draws the model (`highlights` maps a cortical region of `BRM` to a colour), `brP(path, phase, colour)` draws a pathway and its pulses, `bL` a label. Coordinates are in centimetres (micrometres in the cell gallery). A guided view can set its background (`bg`), default pitch (`pit`) and zoom limit (`zx`). The same steps drive the rides of the free-flight map: the first pathway a step draws with pulses is the one the ship follows. A view becomes free-flight by providing `fs(d,M)` (step) and `fd(M)` (draw), with `en(M)` called on exit.
- **Show or hide the brain mode.** `const BRAIN` at the top of `engine.js` is 1 on the `dev` branch and 0 on `main`: at 0 the start-screen "Brain" button, the "🧠 Explore the brain" button and the brain references of the source list (`.brs`) are hidden, while the code stays in the build because the glial-cell interiors use the same engine (`brain.js`, `brainmap.js`, `places.js`). This line is the only difference between the two branches; merging `dev` into `main` keeps the value of `main`.
- **Add a cell neighbourhood.** In `places.js`, call `bpMk(id, name, mapKeys, start, shipSize, radius, cards, labels, build, dyn)`. `mapKeys` are the map structures that offer the entrance; `build(A, g, P)` draws with `A.s` (sphere), `A.t` (tube) and `A.tr` (tree of segments), each taking a card key to make the shape pickable (a sphere marked solid stops the ship); `P.ax` collects pathways for the pulses drawn by `dyn`. An eleventh argument sets options: `own` (cards of this place only), `nr` (cell scale: an organelle is picked within three times its size, the smallest wins, and fly-to chooses the clearest side), `zm`/`zx` (ship size limits), `lk` (`{cardKey: placeId}`, adds an "⤓ Enter" button on that card), and `ci` (guided sequences, listed under "In action"). `A.g` and `A.gt` draw a translucent sphere and tube. Leaving a place returns to the previous one, to the map, or to the game when it was entered with `bpGo(id)`.
- **Add a quiz round.** Add an entry to `HQ` in `decode.js`: right answer `a` and three decoys `w` (ranks in `HQA`), marks `m` as `[tail, residue, type, mark key, label offset, direction]` (tail `B` for H2BK120, `K` for H3K79, `C` for CpGs on the DNA), `z: 1` for an H2A.Z nucleosome, explanation `t`. A view can replace the standard panel with `pn(M,S)`, add start buttons with `go`, extra buttons with `xb`, and receive its own answer buttons (codes `Sh<n>`) in `cl(M,n)`.
- **Add a chromatin object.** In `chromatin.js`, add its card to `I`, draw it on an existing layer and add a collider to `NU` (nucleus) or `DN` (detailed locus): the atlas and the Mendelian focus pick it up from the collider lists. Use the local generator `rn`/`rv`, not `R`/`rd`, so that the layout of everything built afterwards does not shift.
- **Add an snRNP assembly step.** Add its texts to `SXT` and an entry to `SXS` in `snrnp.js`: loop duration `T`, view size `z`, camera target `c` (nm), legend `leg` and a draw function `d(phase)`. Scene coordinates are in nanometres; `sxH` builds a helix or stem-loop, `sxG` a single strand, `sxD1` draws an RNA, `sxD2` a protein, `sxD3` a seven-protein ring.

## Mendelian genetics focus

The global flag `MEN` (declared in `engine.js`, set by the start-screen checkbox in `start.js`, saved in `localStorage.oc_mg`, forced by `#mg` in the address) turns the mode on. Nothing in the scenery is rebuilt: every frame `mgD()` finds the colliders near the ship whose card key has an entry in `MG` and floats the gene symbols over the closest one of each key (six labels at most). `mgH(key)` returns the lines added to the card shown by `hud`, `mgRx(pathway, step)` adds the disorders of the current enzyme to the reaction panel, and the "🧬" button reuses the atlas overlay.

The data lives in `tools/mendel.tsv`, one row per card key, gene and disease. `npm run mendel` turns it into `src/mendel-data.js` (French names), `i18n/en/mendel.json` (their English translations) and `docs/MENDELIAN.md`. To add an entry, add a row, run `npm run mendel` and `npm run check-mendel`, then build.

## Testing hook

`dist/dev.html` defines `window.__ev = c => eval(c)` inside `boot`, which lets the tests read and set any internal variable. The minified build does not have it.
