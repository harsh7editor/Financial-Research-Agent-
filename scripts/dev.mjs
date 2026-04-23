import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const CANDIDATES = ["python", "py", "python3"];

function resolvePython() {
  for (const candidate of CANDIDATES) {
    const check = spawnSync(candidate, ["--version"], { stdio: "pipe", shell: true });
    if (check.status === 0) return candidate;
  }
  return null;
}

const pythonCmd = resolvePython();

if (!pythonCmd) {
  console.error("No Python executable found in PATH.");
  console.error("Install Python 3.10+ and ensure it is added to PATH.");
  console.error("Then run: npm run setup");
  process.exit(1);
}

if (!existsSync(".env") && existsSync(".env.example")) {
  console.warn("No .env file found. Copy .env.example to .env and update keys as needed.");
}

console.log(`Using Python command: ${pythonCmd}`);
const result = spawnSync(pythonCmd, ["-m", "src.main", "api"], {
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
