# Architecture

The game is one HTML page. `build.js` produces it by pasting JavaScript into `src/shell.html`:

```
engine.js
function boot(CT, GX) {      // CT: 0 erythroblast, 1 hepatocyte, 2 neuron; GX: custom gene or undefined
  cells.js … impulse.js      // 13 files, in the order listed in build.js
}
start.js
```

Everything inside `boot` shares one function scope, in strict mode. A file can use any `const` or `let` declared by a file placed before it, which is why the order matters. Choosing another cell calls `boot` again and rebuilds the world.

The code is deliberately compact: short helper names, long lines, comments in French. Lengths are in micrometres throughout.

## Source files

| File | Role |
| --- | --- |
| `engine.js` | Vector helpers, seeded random generator, WebGL2 setup, shaders, meshes, layers, instance writers, dynamic chunks. |
| `cells.js` | Per-cell configuration (`CF`), the three built-in genes and their annotated signals, cell-specific cards. |
| `world.js` | Common cards (`I`), world constants, cell shape, collider lists, plasma membrane and entry pit. |
| `nucleus.js` | Nuclear interior (chromatin, nucleolus shell, speckles, Cajal, PML, paraspeckles), common cytoplasmic organelles, the ship. |
| `cell-structures.js` | Structures specific to the hepatocyte and to the neuron (processes, spines, axon, bouton). |
| `synapses.js` | The two detailed synapses, the axon initial segment patch, their cards. |
| `tissues.js` | Surrounding tissue, blood vessel and blood. Ends with the final `fin()`. |
| `physics.js` | Dynamic objects, game state, controls, collisions, automatic ship sizing. |
| `loop.js` | Rendering, camera, per-frame loop, HUD, pointer and keyboard input, points of interest. |
| `genes.js` | Gene navigation: UCSC and Ensembl REST calls, custom gene construction, autopilot. |
| `interact.js` | Picking and cards, atlas, organelle interiors (mitochondrion, ER, Golgi), mode buttons. |
| `nucleolus-lamina.js` | Nucleolus interior and its animation, procedural lamina near the envelope. |
| `reactions.js` | Chemical reaction mode: molecules (`MOL`), pathways (`RXP`), placement in the scenery, quiz. |
| `impulse.js` | Nerve impulse mode: the 12 steps, their animations, the oscilloscope. |
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

`RX` and `NX` share the side panel (`#pm`), the label pool (`QL`) and the orbit and zoom gestures.

## Recipes

- **Add a card.** Add `key: [title, text]` to `I`, give the key to a collider, add the English text to `i18n/en/extra.json`.
- **Add a reaction pathway.** Add its molecules to `MOL` and an entry to `RXP` in `reactions.js`: `[key, location, cell, title, intro, summary, steps]`, each step being `[enzyme, inputs, outputs, text, expertText, question, right, wrong, wrong]`. `RXW` anchors steps to structures in the scenery.
- **Add an impulse step.** Add its texts to `NXT` and an entry to `NXS` in `impulse.js`: camera target `c`, zoom `z`, view direction `v`, loop duration `T`, oscilloscope trace `o` and a draw function `d(phase, time)`.

## Testing hook

`dist/dev.html` defines `window.__ev = c => eval(c)` inside `boot`, which lets the tests read and set any internal variable. The minified build does not have it.
