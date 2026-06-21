import pg from 'pg'
import './dotenv.js'

const { Pool } = pg

let pool

// Build a connection config from the individual PG* env vars (the format the
// lab's Render setup uses). If none are present, fall back to an in-memory
// pg-mem database so the app runs end-to-end without any setup.
const hasPgConfig = process.env.PGHOST || process.env.DATABASE_URL

if (hasPgConfig) {
  if (process.env.DATABASE_URL) {
    const isLocal = /@(localhost|127\.0\.0\.1)[:/]/.test(process.env.DATABASE_URL)
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: isLocal ? false : { rejectUnauthorized: false },
    })
  } else {
    pool = new Pool({
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      database: process.env.PGDATABASE,
      ssl: { rejectUnauthorized: false },
    })
  }
} else {
  // Local dev fallback: spin up an in-memory Postgres (pg-mem) seeded from
  // config/seed.sql. Never used when real DB credentials are present.
  console.warn('⚠️  No DB credentials set — using in-memory pg-mem database (dev only).')
  const { newDb } = await import('pg-mem')
  const fs = await import('node:fs')
  const path = await import('node:path')
  const { fileURLToPath } = await import('node:url')

  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const seedSql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8')

  const db = newDb()
  db.public.none(seedSql)

  const adapter = db.adapters.createPg()
  pool = new adapter.Pool()
}

export { pool }
