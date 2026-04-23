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
  process.exit(1);
}

console.log(`Using Python command: ${pythonCmd}`);
console.log("Installing Python dependencies from requirements.txt...");

const install = spawnSync(pythonCmd, ["-m", "pip", "install", "-r", "requirements.txt"], {
  stdio: "inherit",
  shell: true,
});

if (install.status !== 0) {
  console.error("Dependency installation failed.");
  process.exit(install.status ?? 1);
}

console.log("Setup complete. Run: npm run dev");
