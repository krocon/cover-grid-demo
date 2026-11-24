import { defineConfig } from "vite";
import { resolve } from "node:path";

// npm run step -- 04  →  STEP=04: Vite startet mit steps/04 als Wurzel (Stand nach Kapitel 4)
const step = process.env.STEP;

export default defineConfig({
  root: step ? `steps/${step}` : ".",
  publicDir: resolve(import.meta.dirname, "public"),
  build: step ? {} : {
    rollupOptions: { input: { main: "index.html", naive: "naive.html" } },
  },
});
