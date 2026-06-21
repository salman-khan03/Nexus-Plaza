import { useState, useEffect } from 'react'

// Live countdown to a future date. Ticks once per second. When the target is
// in the past it reports { passed: true } so callers can restyle the event.
const getRemaining = (target) => {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return { passed: true }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { passed: false, days, hours, minutes, seconds }
}

const Countdown = ({ date }) => {
  const [remaining, setRemaining] = useState(() => getRemaining(date))

  useEffect(() => {
    setRemaining(getRemaining(date))
    const timer = setInterval(() => setRemaining(getRemaining(date)), 1000)
    return () => clearInterval(timer)
  }, [date])

  if (remaining.passed) {
    return <span className="countdown countdown--passed">Event has passed</span>
  }

  const { days, hours, minutes, seconds } = remaining
  return (
    <span className="countdown">
      <span className="countdown-unit">{days}<small>d</small></span>
      <span className="countdown-unit">{hours}<small>h</small></span>
      <span className="countdown-unit">{minutes}<small>m</small></span>
      <span className="countdown-unit">{seconds}<small>s</small></span>
    </span>
  )
}

export default Countdown
