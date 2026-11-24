// Zum Vergleich: ein CSS-Grid legt für JEDES Cover Elemente an – auch für die, die niemand sieht.
import type { AreaModelIf } from "@guiexpert/table";
import { BookCoverRenderer } from "@guiexpert/demo-table-models";
import type { BookIf } from "@guiexpert/demo-table-models";

const covers: BookIf[] = await (await fetch("/covers.json")).json();
const grid = document.querySelector<HTMLDivElement>("#grid")!;
const renderer = new BookCoverRenderer();
// dieselben Cover wie im Grid; der Renderer liest aus dem Modell nur coverWidth (Schriftgröße)
const model = { coverWidth: 165 } as unknown as AreaModelIf;

function show(n: number) {
  const t0 = performance.now();
  grid.replaceChildren(...covers.slice(0, n).map(c => {
    const cell = document.createElement("div");
    cell.className = "cell";
    renderer.render(cell, 0, 0, "body", model, c);
    return cell;
  }));
  grid.getBoundingClientRect();   // Layout erzwingen: gemessen bis zum fertigen Layout
  const ms = Math.round(performance.now() - t0);
  const count = grid.querySelectorAll("*").length;
  console.log(`${n} Cover · Elemente im DOM: ${count} · ${ms} ms`);
}

document.querySelectorAll<HTMLButtonElement>("button[data-n]")
  .forEach(b => b.addEventListener("click", () => show(Number(b.dataset.n))));
show(60);
