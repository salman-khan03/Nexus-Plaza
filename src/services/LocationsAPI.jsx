// API helpers for the locations resource. All requests go through Vite's
// /api proxy to the Express server.

const BASE = '/api/locations'

export const getAllLocations = async () => {
  const response = await fetch(BASE)
  return response.json()
}

export const getLocationById = async (id) => {
  const response = await fetch(`${BASE}/${id}`)
  return response.json()
}
