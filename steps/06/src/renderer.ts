import type { CellRendererIf } from "@guiexpert/table";
import { BookCoverRenderer } from "@guiexpert/demo-table-models";
import type { Cover } from "./cover";

export function createRenderer(): CellRendererIf {
  const covers = new BookCoverRenderer();
  return {
    render(cell, row, col, area, model, value) {
      const c = value as Cover | undefined;
      if (!c) return undefined;
      const tile = document.createElement("div");
      tile.className = "tile";
      const pic = document.createElement("div");
      pic.className = "pic";
      covers.render(pic, row, col, area, model, c);
      const title = document.createElement("div");
      title.className = "title";
      title.textContent = c.title;
      const sub = document.createElement("div");
      sub.className = "sub";
      sub.textContent = `${c.author} · ${c.year}`;
      tile.append(pic, title, sub);
      cell.append(tile);
      return undefined;
    },
  };
}
