# CMS Workflow (Directus + PostgreSQL + Redis)

This setup separates source-controlled configuration from runtime data.

## Goals covered

- Schema is version-controlled in schema/snapshot.yaml.
- Database runtime files are not committed to Git.
- Teammates can apply schema with one command after clone.
- Uploads and extensions remain persistent.
- Full content backup and restore workflow is included.

## Runtime persistence

- PostgreSQL data: Docker named volume directus_database
- Redis data: Docker named volume directus_cache
- Directus uploads: Docker named volume directus_uploads
- Directus extensions source: bind mount ./extensions

## First-time setup

1. From the cms directory, copy .env.example to .env.
2. Edit .env values and set a strong SECRET.
3. Start services:

```bash
docker compose up -d
```

## Directus admin bootstrap behavior

ADMIN_EMAIL and ADMIN_PASSWORD are only used when Directus initializes an empty database.

- Empty database volume: initial admin user is created from these values.
- Existing database volume: these values are ignored.

Changing ADMIN_EMAIL or ADMIN_PASSWORD later does not change existing users.

## Version-controlled schema

Schema file in Git:

- schema/snapshot.yaml

### Export schema snapshot

Run this after any schema change in Directus (collections, fields, relations, roles, permissions):

```bash
npm run schema:export
```

### Apply schema snapshot

For a teammate after cloning and starting containers:

```bash
npm run schema:apply
```

Optional dry run:

```bash
npm run schema:apply:dry
```

## Full content backup and restore (data migration)

This handles real content, users, roles, permissions, and uploads.

### Backup content

npm workflow:

```bash
npm run content:backup
```

Optional output folder:

```bash
npm run content:backup -- backups
```

Shell alternatives:

```bash
./scripts/backup.sh
```

```powershell
./scripts/backup.ps1
```

Artifacts generated:

- backups/directus-db-YYYYMMDD-HHMMSS.dump
- backups/directus-uploads-YYYYMMDD-HHMMSS.tar.gz

### Restore content

npm workflow:

```bash
npm run content:restore -- backups/directus-db-YYYYMMDD-HHMMSS.dump backups/directus-uploads-YYYYMMDD-HHMMSS.tar.gz
```

Shell alternatives:

```bash
./scripts/restore.sh backups/directus-db-YYYYMMDD-HHMMSS.dump backups/directus-uploads-YYYYMMDD-HHMMSS.tar.gz
```

```powershell
./scripts/restore.ps1 -DatabaseBackup backups/directus-db-YYYYMMDD-HHMMSS.dump -UploadsBackup backups/directus-uploads-YYYYMMDD-HHMMSS.tar.gz
```

Restore sequence:

1. Stop Directus service.
2. Restore PostgreSQL dump.
3. Restore uploads archive (if provided).
4. Start Directus service.

## Team workflow summary

1. Developer A updates schema in Directus UI.
2. Developer A runs npm run schema:export.
3. Developer A commits schema/snapshot.yaml.
4. Developer B pulls changes, runs docker compose up -d, then npm run schema:apply.

## Git ignore checks

Ignored runtime/local files:

- cms/database/
- cms/uploads/
- cms/.env
- cms/backups/

Not ignored (intentionally source-controlled):

- cms/extensions/
- cms/schema/snapshot.yaml
