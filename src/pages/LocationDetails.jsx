import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getLocationById } from '../services/LocationsAPI'
import { getEventsByLocation } from '../services/EventsAPI'
import EventCard from '../components/EventCard'
import './LocationDetails.css'

const LocationDetails = () => {
  const { id } = useParams()
  const [location, setLocation] = useState(null)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const [loc, evts] = await Promise.all([
        getLocationById(id),
        getEventsByLocation(id),
      ])
      setLocation(loc)
      setEvents(evts)
    }
    fetchData()
  }, [id])

  if (!location) {
    return <p className="loading">Loading location…</p>
  }

  const accent = location.accent || '#4dd2ff'
  const now = Date.now()
  const upcoming = events.filter((e) => new Date(e.event_date).getTime() >= now)
  const past = events.filter((e) => new Date(e.event_date).getTime() < now)

  return (
    <div className="location-details" style={{ '--accent': accent }}>
      <Link to="/" className="back-link">← Back to the Plaza</Link>

      <header className="location-hero">
        <span className="location-hero__emoji">{location.emoji}</span>
        <div>
          <h1 className="location-hero__name">{location.name}</h1>
          <p className="location-hero__tagline">{location.tagline}</p>
        </div>
      </header>

      <p className="location-hero__desc">{location.description}</p>

      <section>
        <h2 className="section-heading">Upcoming Events ({upcoming.length})</h2>
        {upcoming.length === 0 ? (
          <p className="empty">No upcoming events here yet.</p>
        ) : (
          <div className="event-list">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section>
          <h2 className="section-heading">Past Events ({past.length})</h2>
          <div className="event-list">
            {past.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default LocationDetails
