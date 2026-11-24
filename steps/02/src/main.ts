import "@guiexpert/table/css/main.css";
import "./style.css";
import type { Cover } from "./cover";

const res = await fetch("/covers.json");
const covers: Cover[] = await res.json();
console.log(`${covers.length} Cover geladen`);
