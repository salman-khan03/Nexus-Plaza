# Nexus Plaza — Virtual Community Space

Submitted by: **(your name here)**

**Nexus Plaza** is a virtual community space where visitors explore the
plaza by picking one of several themed locations ("grids") and seeing the
events happening at each. Concerts, hackathons, wellness circles, gaming
tournaments, and festivals all live in their own corner of the grid.

Time spent: **(your hours here)** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database** (with an in-memory
      `pg-mem` fallback for local dev when no credentials are set)
- [x] **The web app is connected to a Render PostgreSQL database** (configure
      `server/.env` with your Render connection values)
- [x] **The database contains an appropriately structured `events` table**
      (plus a related `locations` table joined by foreign key)
- [x] **Front page of web app is functional and appropriately styled**
- [x] **The web app displays a title** ("Nexus Plaza")
- [x] **Website includes a visual interface that allows users to select a
      location** (clickable location cards in a grid — not a list of links)
- [x] **Each location has a corresponding page**
- [x] **Each location has a detail page with its own unique URL**
      (`/locations/:id`)
- [x] **Clicking on a location navigates to its detail page and displays a list
      of all events from the `events` table associated with that location**

## Stretch Features

The following **stretch** features are implemented:

- [x] The app includes an additional Events page
- [x] An additional page shows all possible events (`/events`)
- [x] Users can sort or filter events by location (location dropdown + search)
- [x] Each event includes a countdown to when the event will occur
- [x] Events display a live countdown showing the time remaining
- [x] Events appear with different formatting when the event has passed
      (dimmed, struck-through title, "Event has passed" label)

## Video Walkthrough

Here's a walkthrough of implemented features:

<!-- Replace this with your own GIF, e.g. recorded with Kap, LICEcap, or ScreenToGif -->

`(insert your GIF walkthrough here)`

## Project Structure

```
virtual-community/
├── server/                 # Express API
│   ├── config/
│   │   ├── database.js      # PG pool (real DB or pg-mem fallback)
│   │   ├── dotenv.js
│   │   ├── reset.js         # `npm run seed` — loads seed.sql
│   │   └── seed.sql         # locations + events schema and data
│   ├── controllers/
│   │   ├── events.js
│   │   └── locations.js
│   ├── routes/
│   │   ├── events.js        # /api/events, /api/events/:eventId
│   │   └── locations.js     # /api/locations, /api/locations/:locationId
│   └── server.js
└── client/                 # React + Vite frontend
    └── src/
        ├── services/        # EventsAPI.jsx, LocationsAPI.jsx
        ├── components/      # LocationCard, EventCard, Countdown
        ├── pages/           # Home, LocationDetails, AllEvents, PageNotFound
        └── App.jsx
```

## Getting Started

### Server

```bash
cd server
npm install
# Optional: copy .env.example to .env and add your Render PostgreSQL values.
# If you add real credentials, seed the database first:
#   npm run seed
npm run dev        # http://localhost:3001
```

> Without DB credentials the server uses an in-memory `pg-mem` database seeded
> from `config/seed.sql`, so it runs end-to-end with zero setup.

### Client

```bash
cd client
npm install
npm run dev        # http://localhost:5173 (proxies /api to :3001)
```

## API Endpoints

| Method | Path                          | Description                          |
| ------ | ----------------------------- | ------------------------------------ |
| GET    | `/api/locations`              | All locations                        |
| GET    | `/api/locations/:locationId`  | A single location                    |
| GET    | `/api/events`                 | All events (`?location=:id` to filter) |
| GET    | `/api/events/:eventId`        | A single event                       |

## License

    Copyright (c) 2026

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
