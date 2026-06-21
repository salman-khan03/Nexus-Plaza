// API helpers for the events resource.

const BASE = '/api/events'

export const getAllEvents = async () => {
  const response = await fetch(BASE)
  return response.json()
}

// Pass a locationId to fetch only that location's events (?location=<id>).
export const getEventsByLocation = async (locationId) => {
  const response = await fetch(`${BASE}?location=${locationId}`)
  return response.json()
}

export const getEventById = async (id) => {
  const response = await fetch(`${BASE}/${id}`)
  return response.json()
}
