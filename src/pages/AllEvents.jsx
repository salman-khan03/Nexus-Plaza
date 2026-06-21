import { useState, useEffect } from 'react'
import { getAllEvents } from '../services/EventsAPI'
import { getAllLocations } from '../services/LocationsAPI'
import EventCard from '../components/EventCard'
import './AllEvents.css'

const AllEvents = () => {
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const [locationFilter, setLocationFilter] = useState('') // location id as string
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const [evts, locs] = await Promise.all([getAllEvents(), getAllLocations()])
      setEvents(evts)
      setLocations(locs)
    }
    fetchData()
  }, [])

  const visible = events.filter((event) => {
    const matchesLocation =
      !locationFilter || String(event.location_id) === locationFilter
    const matchesSearch =
      !search || event.title.toLowerCase().includes(search.toLowerCase())
    return matchesLocation && matchesSearch
  })

  return (
    <div className="all-events">
      <header className="all-events__head">
        <h1>All Events</h1>
        <p>Everything happening across the plaza, soonest first.</p>
      </header>

      <div className="controls">
        <input
          type="text"
          className="controls__search"
          placeholder="Search events…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="controls__select"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All locations</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.emoji} {loc.name}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="empty">No events match your filters.</p>
      ) : (
        <div className="event-list">
          {visible.map((event) => (
            <EventCard key={event.id} event={event} showLocation />
          ))}
        </div>
      )}
    </div>
  )
}

export default AllEvents
