param(
  [Parameter(Mandatory = $true)]
  [string]$DatabaseBackup,

  [string]$UploadsBackup
)

$ErrorActionPreference = "Stop"
$CmsRoot = Split-Path -Parent $PSScriptRoot
Push-Location $CmsRoot

try {
  if (-not (Test-Path -Path $DatabaseBackup)) {
    throw "Database backup not found: $DatabaseBackup"
  }

  # Stop Directus briefly to avoid active DB connections during restore.
  docker compose stop directus

  docker compose cp $DatabaseBackup database:/tmp/directus.dump
  docker compose exec -T database sh -lc 'set -e; dropdb -U "$POSTGRES_USER" --if-exists "$POSTGRES_DB"; createdb -U "$POSTGRES_USER" "$POSTGRES_DB"; pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists /tmp/directus.dump; rm -f /tmp/directus.dump || true'

  if ($UploadsBackup) {
    if (-not (Test-Path -Path $UploadsBackup)) {
      throw "Uploads backup not found: $UploadsBackup"
    }

    docker compose cp $UploadsBackup directus:/tmp/uploads.tar.gz
    docker compose exec -T directus sh -lc 'rm -rf /directus/uploads/*; tar xzf /tmp/uploads.tar.gz -C /directus/uploads; rm -f /tmp/uploads.tar.gz || true'
  }

  docker compose start directus
  Write-Host "Restore completed successfully."
}
finally {
  Pop-Location
}
