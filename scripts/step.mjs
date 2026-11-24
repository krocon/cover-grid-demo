// npm run step -- 04: startet den Dev-Server mit dem Stand nach Kapitel 04 (steps/04).
import { existsSync, readdirSync } from "node:fs";
import { spawn } from "node:child_process";

const step = process.argv[2];
if (!step || !existsSync(`steps/${step}`)) {
  console.error(`Aufruf: npm run step -- <Stand>   (vorhanden: ${readdirSync("steps").join(", ")})`);
  process.exit(1);
}
spawn("npx", ["vite"], { stdio: "inherit", shell: true, env: { ...process.env, STEP: step } })
  .on("exit", code => process.exit(code ?? 0));
