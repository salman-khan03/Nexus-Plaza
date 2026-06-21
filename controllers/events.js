import { pool } from '../config/database.js'

// GET /api/events
// Optional query param ?location=<id> filters events to one location.
// Each row is joined to its location so the frontend can show location name.
const getEvents = async (req, res) => {
  try {
    const { location } = req.query

    const values = []
    let whereClause = ''
    if (location) {
      values.push(location)
      whereClause = `WHERE e.location_id = $${values.length}`
    }

    const selectQuery = `
      SELECT e.id, e.title, e.description, e.host, e.category, e.event_date,
             e.location_id, l.name AS location_name, l.emoji AS location_emoji,
             l.accent AS location_accent
      FROM events e
      JOIN locations l ON l.id = e.location_id
      ${whereClause}
      ORDER BY e.event_date ASC
    `
    const results = await pool.query(selectQuery, values)
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

// GET /api/events/:eventId
const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params
    const selectQuery = `
      SELECT e.*, l.name AS location_name, l.emoji AS location_emoji,
             l.accent AS location_accent
      FROM events e
      JOIN locations l ON l.id = e.location_id
      WHERE e.id = $1
    `
    const results = await pool.query(selectQuery, [eventId])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default { getEvents, getEventById }
