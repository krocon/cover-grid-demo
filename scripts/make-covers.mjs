// npm run covers: 10.000 Bücher für das Cover Grid → public/covers.json
// generateBooks() ist fest (kein Zufall): jeder Lauf ergibt dieselben Titel und Farben – wie im Showcase auf gui.expert.
import { writeFileSync } from "node:fs";
import { generateBooks } from "@guiexpert/demo-table-models";

const books = generateBooks(10_000);
writeFileSync("public/covers.json", "[\n" + books.map(b => JSON.stringify(b)).join(",\n") + "\n]\n");
console.log(`${books.length} Bücher in public/covers.json`);
