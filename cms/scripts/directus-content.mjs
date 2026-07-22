import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cmsRoot = join(__dirname, "..");

function run(cmd, args, options = {}) {
  const result = spawnSync(cmd, args, {
    cwd: cmsRoot,
    stdio: options.capture ? "pipe" : "inherit",
    maxBuffer: options.capture ? 512 * 1024 * 1024 : undefined,
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if ((result.status ?? 1) !== 0) {
    if (options.capture && result.stderr) {
      process.stderr.write(result.stderr);
    }
    process.exit(result.status ?? 1);
  }

  return result.stdout;
}

function toComposePath(inputPath) {
  const absPath = isAbsolute(inputPath) ? inputPath : join(cmsRoot, inputPath);
  const relPath = relative(cmsRoot, absPath);

  if (relPath.startsWith("..")) {
    console.error("Only files inside the cms directory are supported for compose copy operations.");
    process.exit(1);
  }

  return `./${relPath.replace(/\\/g, "/")}`;
}

function backup() {
  const outDirArg = process.argv[3];
  const outDir = outDirArg || "backups";
  const outPath = join(cmsRoot, outDir);
  mkdirSync(outPath, { recursive: true });

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

  const dbFile = join(outPath, `directus-db-${timestamp}.dump`);
  const uploadsFile = join(outPath, `directus-uploads-${timestamp}.tar.gz`);

  const dbDump = run("docker", [
    "compose",
    "exec",
    "-T",
    "database",
    "sh",
    "-lc",
    'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc',
  ], { capture: true });

  const uploadsDump = run("docker", [
    "compose",
    "exec",
    "-T",
    "directus",
    "sh",
    "-lc",
    "tar czf - -C /directus/uploads .",
  ], { capture: true });

  writeFileSync(dbFile, dbDump);
  writeFileSync(uploadsFile, uploadsDump);

  console.log(`Database backup created: ${dbFile}`);
  console.log(`Uploads backup created:  ${uploadsFile}`);
}

function restore() {
  const dbBackup = process.argv[3];
  const uploadsBackup = process.argv[4];

  if (!dbBackup) {
    console.error("Usage: npm run content:restore -- <db-backup.dump> [uploads-backup.tar.gz]");
    process.exit(1);
  }

  const dbPath = toComposePath(dbBackup);
  if (!existsSync(join(cmsRoot, dbBackup))) {
    console.error(`Database backup not found: ${join(cmsRoot, dbBackup)}`);
    process.exit(1);
  }

  run("docker", ["compose", "stop", "directus"]);

  run("docker", ["compose", "cp", dbPath, "database:/tmp/directus.dump"]);
  run("docker", [
    "compose",
    "exec",
    "-T",
    "database",
    "sh",
    "-lc",
    'set -e; dropdb -U "$POSTGRES_USER" --if-exists "$POSTGRES_DB"; createdb -U "$POSTGRES_USER" "$POSTGRES_DB"; pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists /tmp/directus.dump; rm -f /tmp/directus.dump || true',
  ]);

  if (uploadsBackup) {
    const uploadsPath = toComposePath(uploadsBackup);
    if (!existsSync(join(cmsRoot, uploadsBackup))) {
      console.error(`Uploads backup not found: ${join(cmsRoot, uploadsBackup)}`);
      process.exit(1);
    }

    run("docker", ["compose", "cp", uploadsPath, "directus:/tmp/uploads.tar.gz"]);
    run("docker", [
      "compose",
      "exec",
      "-T",
      "directus",
      "sh",
      "-lc",
      "rm -rf /directus/uploads/*; tar xzf /tmp/uploads.tar.gz -C /directus/uploads; rm -f /tmp/uploads.tar.gz || true",
    ]);
  }

  run("docker", ["compose", "start", "directus"]);
  console.log("Restore completed successfully.");
}

const command = process.argv[2];

if (command === "backup") {
  backup();
} else if (command === "restore") {
  restore();
} else {
  console.error("Usage:");
  console.error("  node ./scripts/directus-content.mjs backup [output-dir]");
  console.error("  node ./scripts/directus-content.mjs restore <db-backup.dump> [uploads-backup.tar.gz]");
  process.exit(1);
}
