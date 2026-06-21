// Seed/reset script: runs config/seed.sql against the configured database.
// Usage: npm run seed   (from the server directory, with .env configured)
import './dotenv.js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from './database.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const seed = async () => {
  if (!process.env.PGHOST && !process.env.DATABASE_URL) {
    console.error('❌ No DB credentials set — create server/.env first.')
    process.exit(1)
  }

  const sql = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8')

  try {
    await pool.query(sql)
    const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM events')
    console.log(`✅ Database seeded — events table now has ${rows[0].count} rows.`)
  } catch (error) {
    console.error('❌ Seed failed:', error.message)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

seed()
