param(
  [string]$OutputDir = "backups"
)

$ErrorActionPreference = "Stop"
$CmsRoot = Split-Path -Parent $PSScriptRoot
Push-Location $CmsRoot

try {
  New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null

  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
  $dbBackup = Join-Path $OutputDir "directus-db-$timestamp.dump"
  $uploadsBackup = Join-Path $OutputDir "directus-uploads-$timestamp.tar.gz"

  # Export PostgreSQL in custom format (compatible with pg_restore).
  docker compose exec -T database sh -lc 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > $dbBackup

  # Export Directus uploads so file assets can be restored on another machine.
  docker compose exec -T directus sh -lc 'tar czf - -C /directus/uploads .' > $uploadsBackup

  Write-Host "Database backup created: $dbBackup"
  Write-Host "Uploads backup created:  $uploadsBackup"
}
finally {
  Pop-Location
}
