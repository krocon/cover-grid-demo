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
const wanted = 165;        // Wunschbreite einer Kachel
const height = wanted * RATIO + CAPTION;

const model = CoverGridFactory.createCoverGridModel(
  covers, createRenderer(),
  wanted, height);
const options =
  CoverGridFactory.createCoverGridDefaultOptions(height);

const listener = new EventAdapter();

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
  console.log(`${cols} Spalten à ${body.coverWidth} px`);
}
new ResizeObserver(() => {
  api.recalcColumnWidths();
  fillWidth();
}).observe(host);
