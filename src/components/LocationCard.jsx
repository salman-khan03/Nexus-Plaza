import { useNavigate } from 'react-router-dom'
import './LocationCard.css'

// A clickable tile in the plaza grid. Navigates to the location's detail page.
const LocationCard = ({ location }) => {
  const navigate = useNavigate()
  const accent = location.accent || '#4dd2ff'

  return (
    <button
      className="location-card"
      style={{ '--accent': accent }}
      onClick={() => navigate(`/locations/${location.id}`)}
    >
      <span className="location-card__emoji">{location.emoji}</span>
      <h3 className="location-card__name">{location.name}</h3>
      <p className="location-card__tagline">{location.tagline}</p>
      <span className="location-card__enter">Enter →</span>
    </button>
  )
}

export default LocationCard
