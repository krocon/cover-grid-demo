import "@guiexpert/table/css/main.css";
import "./style.css";
import {
  CoverGridFactory,
  EventAdapter,
  SimpleDomService,
  TableScope,
} from "@guiexpert/table";
import { BookCoverRenderer } from "@guiexpert/demo-table-models";
import type { Cover } from "./cover";

const res = await fetch("/covers.json");
const covers: Cover[] = await res.json();
console.log(`${covers.length} Cover geladen`);

const renderer = new BookCoverRenderer();
const model = CoverGridFactory.createCoverGridModel(
  covers, renderer, 165, 220);
const options =
  CoverGridFactory.createCoverGridDefaultOptions(220);

const host =
  document.querySelector<HTMLDivElement>("#grid")!;
new TableScope(
  host, model, new SimpleDomService(), options,
  new EventAdapter(),
).firstInit();
const n = host.querySelectorAll("*").length;
console.log(`Elemente im DOM: ${n}`);
