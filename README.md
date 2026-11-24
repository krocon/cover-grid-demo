# Cover Grid zum Nachbauen

10.000 Cover flüssig in voller Breite – mit der [GuiExpert Table](https://gui.expert) (`@guiexpert/table`, MIT),
TypeScript und Vite, ohne Framework. Demo-Projekt zum YouTube-Film „Cover Grid zum Nachbauen“.

*Build a cover grid: 10,000 covers, full width, smooth – with GuiExpert Table, TypeScript and Vite. Demo project of a
German hands-on video.*

```bash
git clone https://github.com/krocon/cover-grid-demo.git
cd cover-grid-demo
npm install
npm run dev            # Endstand: http://localhost:5173/
```

Die Cover sind erfundene Magazin-Cover, gezeichnet von `BookCoverRenderer` aus `@guiexpert/demo-table-models` –
dieselben wie im [Showcase](https://gui.expert/showcase/covergrid/run/). Keine Bilddateien, keine fremden Cover.

## Stände zum Mitmachen

Jeder Stand liegt zweimal vor: als Ordner `steps/<Stand>/` (zum direkten Starten) und als Git-Tag `stand-<Stand>`
(der ganze Code so, wie er nach dem Schritt aussieht).

```bash
npm run step -- 04     # Dev-Server mit dem Stand 04
git checkout stand-04  # oder: das ganze Projekt auf Stand 04
```

| Stand | Was dazukommt | Dateien |
|---|---|---|
| `01` | Leeres Projekt: ein `div` mit fester Höhe, Stylesheet der Tabelle | `index.html`, `src/style.css`, `src/main.ts` |
| `02` | Daten laden: `public/covers.json` mit `fetch`, `interface Cover` | `src/cover.ts`, `src/main.ts` |
| `03` | Erstes Grid: `BookCoverRenderer`, `CoverGridFactory`, `TableScope` | `src/main.ts` |
| `04` | Volle Breite: Kacheln strecken, `ResizeObserver` | `src/main.ts` |
| `05a` | Eigener Renderer mit Titel und Untertitel (Text noch abgeschnitten) | `src/renderer.ts` |
| `05` | Kachelhöhe mit Untertitel, CSS | `src/style.css`, `src/main.ts` |
| `06` | Ereignisse: Klick auf ein Cover | `src/main.ts` |
| `07` | Auswahl merken und markieren | `src/main.ts`, `src/renderer.ts`, `src/style.css` |
| `08` | Cover öffnen: Enter und Doppelklick (`onCellActivated`) | `src/main.ts` |
| `09` | Suchen (`externalFilterFunction`) | `index.html`, `src/main.ts`, `src/style.css` |
| `10` | Sortieren und Kachelgröße = Endstand | `index.html`, `src/main.ts` |

Mit der Tastatur: ein Cover anklicken oder mit Tab in das Grid, dann Pfeiltasten, Pos1/Ende, Bild↑/↓ und Enter.

## Zum Vergleich: CSS-Grid

`npm run dev`, dann http://localhost:5173/naive.html – dieselben Cover als CSS-Grid
(`repeat(auto-fill, minmax(165px, 1fr))`). Die Konsole zählt die Elemente im DOM und die Zeit bis zum Layout.

## Weitere Befehle

| Befehl | Was |
|---|---|
| `npm run covers` | `public/covers.json` neu erzeugen (`generateBooks(10_000)`, ohne Zufall – immer dieselben Bücher) |
| `npm run check` | TypeScript-Prüfung von `src/`, `naive/` und allen Ständen |
| `npm run build` | Produktions-Build nach `dist/` |

## Links

- GuiExpert Table: https://gui.expert · Doku Cover Grid: [instructions.md §5.10](https://github.com/guiexperttable/mono/blob/main/instructions.md)
- Showcase: https://gui.expert/showcase/covergrid/run/

## Lizenz

MIT – siehe [LICENSE](LICENSE).
