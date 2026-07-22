import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cmsRoot = join(__dirname, "..");
const schemaDir = join(cmsRoot, "schema");
const snapshotPath = join(schemaDir, "snapshot.yaml");
const snapshotPathRelative = "./schema/snapshot.yaml";
const containerSnapshotPath = "/tmp/directus-schema-snapshot.yaml";

function run(cmd, args) {
  const result = spawnSync(cmd, args, {
    cwd: cmsRoot,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function exportSchema() {
  mkdirSync(schemaDir, { recursive: true });

  run("docker", [
    "compose",
    "exec",
    "-T",
    "directus",
    "sh",
    "-lc",
    `node /directus/cli.js schema snapshot ${containerSnapshotPath} --yes --format yaml`,
  ]);

  run("docker", ["compose", "cp", `directus:${containerSnapshotPath}`, snapshotPathRelative]);
  run("docker", ["compose", "exec", "-T", "directus", "sh", "-lc", `rm -f ${containerSnapshotPath} >/dev/null 2>&1 || true`]);

  console.log(`Schema snapshot exported to: ${snapshotPath}`);
}

function applySchema({ dryRun = false } = {}) {
  if (!existsSync(snapshotPath)) {
    console.error(`Schema snapshot not found: ${snapshotPath}`);
    console.error("Run `npm run schema:export` first.");
    process.exit(1);
  }

  run("docker", ["compose", "cp", snapshotPathRelative, `directus:${containerSnapshotPath}`]);

  const applyCommand = dryRun
    ? `node /directus/cli.js schema apply ${containerSnapshotPath} --yes --dry-run`
    : `node /directus/cli.js schema apply ${containerSnapshotPath} --yes`;

  run("docker", ["compose", "exec", "-T", "directus", "sh", "-lc", applyCommand]);
  run("docker", ["compose", "exec", "-T", "directus", "sh", "-lc", `rm -f ${containerSnapshotPath} >/dev/null 2>&1 || true`]);

  console.log(dryRun ? "Schema dry-run completed." : "Schema applied successfully.");
}

const command = process.argv[2];
const dryRun = process.argv.includes("--dry-run");

if (command === "export") {
  exportSchema();
} else if (command === "apply") {
  applySchema({ dryRun });
} else {
  console.error("Usage:");
  console.error("  node ./scripts/directus-schema.mjs export");
  console.error("  node ./scripts/directus-schema.mjs apply [--dry-run]");
  process.exit(1);
}
