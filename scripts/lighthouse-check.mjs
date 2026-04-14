import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const targetUrl = process.env.LH_URL || "http://127.0.0.1:5173";
const outDir = path.resolve(process.cwd(), "lighthouse-reports");
const outDirRel = "lighthouse-reports";
const chromeProfileDirRel = ".lighthouse-chrome-profile";
const tmpDirRel = ".lighthouse-tmp";
mkdirSync(outDir, { recursive: true });
mkdirSync(path.resolve(process.cwd(), chromeProfileDirRel), { recursive: true });
mkdirSync(path.resolve(process.cwd(), tmpDirRel), { recursive: true });
const chromeFlags = `--headless=new --user-data-dir=${chromeProfileDirRel} --disable-dev-shm-usage`;

function run(label, outputBaseRel, args) {
  console.log(`\nRunning Lighthouse: ${label}`);
  const result = spawnSync("npx", ["--yes", "lighthouse", targetUrl, ...args], {
    stdio: "pipe",
    encoding: "utf-8",
    shell: true,
    env: {
      ...process.env,
      TMP: path.resolve(process.cwd(), tmpDirRel),
      TEMP: path.resolve(process.cwd(), tmpDirRel),
    },
  });
  const combinedOutput = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  if (combinedOutput.trim()) {
    console.log(combinedOutput);
  }

  if (result.status !== 0) {
    const reportJson = path.resolve(process.cwd(), `${outputBaseRel}.report.json`);
    const reportHtml = path.resolve(process.cwd(), `${outputBaseRel}.report.html`);
    const hasReports = existsSync(reportJson) && existsSync(reportHtml);
    const isKnownWindowsCleanupIssue =
      combinedOutput.includes("EPERM") && combinedOutput.includes("Permission denied");

    if (hasReports && isKnownWindowsCleanupIssue) {
      console.warn(`${label}: completed with Windows cleanup warning (EPERM). Reports were generated successfully.`);
      return;
    }

    throw new Error(`${label} lighthouse run failed`);
  }
}

try {
  const mobileOut = path.join(outDirRel, "mobile");
  run("mobile", mobileOut, [
    "--quiet",
    "--only-categories=performance",
    "--emulated-form-factor=mobile",
    "--throttling-method=simulate",
    "--preset=perf",
    `--chrome-flags=${chromeFlags}`,
    "--output=html",
    "--output=json",
    `--output-path=${mobileOut}`,
  ]);

  const desktopOut = path.join(outDirRel, "desktop");
  run("desktop", desktopOut, [
    "--quiet",
    "--only-categories=performance",
    "--emulated-form-factor=desktop",
    "--throttling-method=simulate",
    "--preset=desktop",
    `--chrome-flags=${chromeFlags}`,
    "--output=html",
    "--output=json",
    `--output-path=${desktopOut}`,
  ]);

  console.log(`\nLighthouse reports saved in: ${outDir}`);
  console.log("Tip: start dev server first with `npm run dev`.");
} catch (error) {
  console.error(`\n${error instanceof Error ? error.message : "Lighthouse check failed"}`);
  process.exit(1);
}

