import Countdown from './Countdown'
import './EventCard.css'

const formatDate = (date) =>
  new Date(date).toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

// Square image-style tile (à la the exemplar): the front shows the
// location's themed art; hovering slides in an overlay with the full details
// and a live countdown. Passed events show a red "event has passed" bar.
const EventCard = ({ event, showLocation = false }) => {
  const isPast = new Date(event.event_date).getTime() < Date.now()
  const accent = event.location_accent || '#4dd2ff'

  return (
    <article className="event-information" style={{ '--primary': accent }}>
      <div className="event-information__art">
        <span className="event-information__emoji">{event.location_emoji}</span>
        <span className="event-information__category">{event.category}</span>
        <h3 className="event-information__title-front">{event.title}</h3>
      </div>

      <div className="event-information-overlay">
        <div className="text">
          <h3>{event.title}</h3>
          {showLocation && (
            <p className="text__location">
              {event.location_emoji} {event.location_name}
            </p>
          )}
          <p><i className="fa-regular fa-calendar"></i>{formatDate(event.event_date)}</p>
          {event.host && <p><i className="fa-regular fa-user"></i>{event.host}</p>}
          {event.description && (
            <p className="text__desc">{event.description}</p>
          )}

          {isPast ? (
            <div className="negative-time-remaining">Event has passed</div>
          ) : (
            <div className="text__countdown">
              <Countdown date={event.event_date} />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default EventCard
