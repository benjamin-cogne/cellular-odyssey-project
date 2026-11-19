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
| `t120.js` | Mendelian genetics focus: data integrity, card lines, halos, labels, panel, reaction steps. Arguments: language, cells (e.g. `012`). |

`t20`, `t90`, `t112`, `t113` and `t120` were run from this layout; `t22`, `t94`, `t96`, `t98` and `t111` were run on the same sources before the files were reorganised. The older scripts have not been rerun since earlier versions of the game.
