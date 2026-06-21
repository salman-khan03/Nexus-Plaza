import { useState, useEffect } from 'react'
import { getAllLocations } from '../services/LocationsAPI'
import LocationCard from '../components/LocationCard'
import './Home.css'

const Home = () => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getAllLocations()
      setLocations(data)
    }
    fetchLocations()
  }, [])

  return (
    <div className="home">
      <section className="hero">
        <p className="hero__eyebrow">A VIRTUAL COMMUNITY SPACE</p>
        <h1 className="hero__title">Welcome to the Plaza</h1>
        <p className="hero__subtitle">
          Pick a corner of the grid and see what's happening. Every location
          hosts its own events — concerts, hackathons, markets, and more.
        </p>
      </section>

      <section className="grid-section">
        <h2 className="section-heading">Explore the Grid</h2>
        <div className="location-grid">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
