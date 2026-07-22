#!/usr/bin/env sh
set -eu

CMS_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$CMS_ROOT"

OUT_DIR="${1:-backups}"
mkdir -p "$OUT_DIR"

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
DB_BACKUP="$OUT_DIR/directus-db-$TIMESTAMP.dump"
UPLOADS_BACKUP="$OUT_DIR/directus-uploads-$TIMESTAMP.tar.gz"

# Export PostgreSQL in custom format (compatible with pg_restore).
docker compose exec -T database sh -lc 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > "$DB_BACKUP"

# Export Directus uploads so file assets can be restored on another machine.
docker compose exec -T directus sh -lc 'tar czf - -C /directus/uploads .' > "$UPLOADS_BACKUP"

echo "Database backup created: $DB_BACKUP"
echo "Uploads backup created:  $UPLOADS_BACKUP"
