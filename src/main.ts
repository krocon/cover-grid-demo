import "@guiexpert/table/css/main.css";
import "./style.css";
import {
  CoverGridFactory,
  EventAdapter,
  SimpleDomService,
  TableScope,
} from "@guiexpert/table";
import type { Cover } from "./cover";
import { createRenderer } from "./renderer";

const res = await fetch("/covers.json");
const covers: Cover[] = await res.json();
console.log(`${covers.length} Cover geladen`);

const RATIO = 220 / 165;   // Cover im Format 3 : 4
const CAPTION = 44;        // zwei Textzeilen
let wanted = 165;          // Wunschbreite einer Kachel
let selected: Cover | undefined;
let query = "";
const height = wanted * RATIO + CAPTION;

const model = CoverGridFactory.createCoverGridModel(
  covers, createRenderer(c => c === selected),
  wanted, height);
const options = {
  ...CoverGridFactory.createCoverGridDefaultOptions(height),
  externalFilterFunction: (c: Cover) =>
    `${c.title} ${c.author} ${c.genre}`
      .toLowerCase().includes(query),
};

const listener = new EventAdapter();
listener.onMouseClicked = evt => {
  const c = model.bodyModel.getValueAt(
    evt.rowIndex, evt.columnIndex);
  if (!c) return;
  selected = c;
  console.log(`Gewählt: ${c.title}`);
  api.repaint();
};
listener.onCellActivated = evt => {
  const c = evt.value as Cover;
  console.log(`Geöffnet: ${c.title} (${evt.source})`);
};

const host =
  document.querySelector<HTMLDivElement>("#grid")!;
const api = new TableScope(
  host, model, new SimpleDomService(), options, listener,
).firstInit().getApi();

function fillWidth() {
  const body = model.bodyModel;
  const cols = Math.max(1,
    Math.floor(body.width / wanted));
  body.coverWidth = Math.floor(body.width / cols);
  body.coverHeight =
    Math.round(body.coverWidth * RATIO) + CAPTION;
  api.repaintHard();
}
new ResizeObserver(() => {
  api.recalcColumnWidths();
  fillWidth();
}).observe(host);

const search =
  document.querySelector<HTMLInputElement>("#search")!;
const count =
  document.querySelector<HTMLSpanElement>("#count")!;
function showCount() {
  const n = model.bodyModel.filteredItems.length;
  count.textContent = `${n} Treffer`;
}
search.addEventListener("input", () => {
  query = search.value.trim().toLowerCase();
  api.externalFilterChanged();
  showCount();
});
showCount();

const de = new Intl.Collator("de", { numeric: true });
const SORTS = {
  id: (a: Cover, b: Cover) => a.id - b.id,
  title: (a: Cover, b: Cover) =>
    de.compare(a.title, b.title),
  year: (a: Cover, b: Cover) => b.year - a.year,
};
const sort =
  document.querySelector<HTMLSelectElement>("#sort")!;
sort.addEventListener("change", () => {
  api.sort(SORTS[sort.value as keyof typeof SORTS]);
});

const size =
  document.querySelector<HTMLInputElement>("#size")!;
size.addEventListener("input", () => {
  wanted = Number(size.value);
  fillWidth();
});
