# Tests

Browser tests driven by [Playwright](https://playwright.dev). They open the built game in headless Chrome with software rendering, so they run without a GPU but slowly (a few frames per second; most scripts take 1 to 5 minutes).

```bash
npm ci                      # installs Playwright (optional dependency)
npx playwright install chromium
npm run dev && npm run build
cd tests
node t20.js                 # one script at a time
```

Set `CHROME_PATH=/path/to/chrome` to use an installed Chrome instead of Playwright's Chromium.

The scripts print values and write screenshots; they are regression checks read by a person, not pass/fail assertions. A run is healthy when it ends with an empty error list. `tl.js` is the shared launcher and `mock.js` a fake UCSC API for offline runs.

Scripts that use `ev(...)` need `dist/dev.html`; those marked *minified* drive `dist/index.html` through the interface only.

| Script | What it exercises |
| --- | --- |
| `t20.js` | Start-up of the three cells: load time, instance counts, errors. |
| `t22.js` | Longer per-cell run through the main stages. |
| `t25.js` | *Minified.* The three cells start. |
| `t53.js`, `t80.js` | Cytoplasm: cards, colliders. |
| `t54.js`, `t83.js` | *Minified.* Entry into the cell by keyboard, small and mobile viewports. |
| `t60.js` | Start screenshots, including mobile portrait. |
| `t71.js` | Entry flight at two frame durations. |
| `t81.js`, `t82.js` | Organelle interiors and reaction menus, landscape and portrait. |
| `t90.js` | Nucleus: nuclear bodies, lamina, nucleolus. Argument: cell. |
| `t91.js`, `t95.js` | Lamina and nucleolus views, landscape and portrait. |
| `t92.js`, `t93.js` | Frame rate and triangle counts. |
| `t94.js` | *Minified.* Custom gene (mock API), nucleus, nucleolus, quiz. |
| `t96.js`, `t97.js` | Reaction mode: step traces and anchoring; one pathway. |
| `t98.js`, `t99.js` | English mode: leftover French strings, main screens. |
| `t100.js`, `t101.js` | *Minified* English play-through; English portrait. |
| `t110.js` | Synapses: static screenshots. |
| `t111.js` | Nerve impulse: all 12 steps. Arguments: language, `p` for portrait, level. |
| `t112.js` | Free flight into the synaptic cleft, picking molecules. |
| `t113.js` | *Minified.* Nerve impulse then synapse visit. Argument: language. |
| `t121.js` | snRNP assembly in the Cajal body: button, the eight steps and the summary, exit. Argument: language. |
| `t122.js` | Histone code: data integrity, the fifteen steps and the summary, contents, exit. Arguments: language, `mg` for the Mendelian focus. |
| `t123.js` | Chromatin states along the gene: states of the three cells, beads, sequence-panel line, switch to the alternative state. Argument: language. |
| `t124.js` | Chromatin actors: cards, atlas and Mendelian entries of the fourteen new objects, their counts, and picking from eight sides. Arguments: language, cells. |
| `t125.js` | "Decode this chromatin" quiz: data integrity, access from the histone-code view, ten questions with right and wrong answers, score, replay. Arguments: language, level (`hq` or `hQ`). |
| `t126.js` | Epigenetic reaction pathways (`dme`, `epi`, `hpu`): heavy-atom balance of each step, expert mode step by step, Mendelian lines. Argument: language. |
| `t127.js` | Cell surface: entry-route menu, caveola, macropinocytosis, ultrafast endocytosis and receptor views, then entering the cell. Arguments: language, cells. |
| `t128.js` | The brain: hub menu, cell gallery and six circuits step by step; model integrity. Arguments: language, views. |
| `t129.js` | Brain map in free flight: static model, card of the nearest structure, structure list and fly-to, the six rides (phases and distance to the pathway), manual takeover, exit. Game time is advanced by hand. Argument: language. |
| `t130.js` | Cell neighbourhoods: entrances on the map, build of each place, card of the nearest cell, list and fly-to, return to the map, visit of the neuron. Argument: language. |
| `t131.js` | Glial-cell interiors: entry button next to each glial cell of the neuron's tissue, build of the three places, card shown after flying to each organelle, Mendelian lines, every step of the "In action" sequences (phases, pathway followed, shapes drawn), exit to the neuron, entry from the cortical column and return. Argument: language. |
| `t134.js` | The cardiomyocyte (cell 3, gene *TNNC1*): boot, tissue and cell structures, gene sequence (ATG, stop, splice sites, variants), regions and sarcomere-zone cards inside an arm, Mendelian rows; then the cardiac impulse view: its 18 steps (animated and fixed pieces, labels, oscilloscope), the shape of the action potential and of the electrocardiogram, the construction of the heart, the summary and the way out. Argument: language (`fr` or `en`). |
| `t120.js` | Mendelian genetics focus: data integrity, card lines, labels, panel, reaction steps. Arguments: language, cells (e.g. `012`). |

`t128` to `t130` call the brain mode directly, so they run whatever the value of `BRAIN`.

`t20`, `t90`, `t112`, `t113`, `t120`, `t121`, `t122` to `t131` and `t134` were run from this layout; `t22`, `t94`, `t96`, `t98` and `t111` were run on the same sources before the files were reorganised. The older scripts have not been rerun since earlier versions of the game.
