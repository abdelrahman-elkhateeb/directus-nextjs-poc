#!/usr/bin/env sh
set -eu

if [ "$#" -lt 1 ]; then
  echo "Usage: ./scripts/restore.sh <db-backup.dump> [uploads-backup.tar.gz]"
  exit 1
fi

CMS_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$CMS_ROOT"

DB_BACKUP="$1"
UPLOADS_BACKUP="${2:-}"

if [ ! -f "$DB_BACKUP" ]; then
  echo "Database backup not found: $DB_BACKUP"
  exit 1
fi

# Stop Directus briefly to avoid active DB connections during restore.
docker compose stop directus

docker compose cp "$DB_BACKUP" database:/tmp/directus.dump
docker compose exec -T database sh -lc 'set -e; dropdb -U "$POSTGRES_USER" --if-exists "$POSTGRES_DB"; createdb -U "$POSTGRES_USER" "$POSTGRES_DB"; pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists /tmp/directus.dump; rm -f /tmp/directus.dump || true'

if [ -n "$UPLOADS_BACKUP" ]; then
  if [ ! -f "$UPLOADS_BACKUP" ]; then
    echo "Uploads backup not found: $UPLOADS_BACKUP"
    exit 1
  fi

  docker compose cp "$UPLOADS_BACKUP" directus:/tmp/uploads.tar.gz
  docker compose exec -T directus sh -lc 'rm -rf /directus/uploads/*; tar xzf /tmp/uploads.tar.gz -C /directus/uploads; rm -f /tmp/uploads.tar.gz || true'
fi

docker compose start directus

echo "Restore completed successfully."
