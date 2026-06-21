-- Nexus Plaza schema + seed data
-- A virtual community space organized into themed locations ("grids").
-- Each event belongs to exactly one location.

DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  tagline     VARCHAR(255),
  description TEXT,
  emoji       VARCHAR(16),
  accent      VARCHAR(16)
);

CREATE TABLE events (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  host        VARCHAR(255),
  category    VARCHAR(64),
  event_date  TIMESTAMPTZ NOT NULL,
  location_id INTEGER NOT NULL REFERENCES locations(id)
);

INSERT INTO locations (name, tagline, description, emoji, accent) VALUES
  ('The Amphitheater', 'Live music under the neon dome', 'An open-air stage where the plaza gathers for concerts, DJ sets, and spoken-word nights. The acoustics ripple across the whole grid.', '🎶', '#ff4d8d'),
  ('Maker''s Lab', 'Build, break, and ship together', 'A hands-on workshop space stocked with 3D printers, soldering benches, and whiteboards. Home of hackathons and repair cafés.', '🛠️', '#4dd2ff'),
  ('Greenhouse Commons', 'Grow with your neighbors', 'A glass-roofed garden sanctuary for wellness circles, plant swaps, and quiet morning yoga among the ferns.', '🌿', '#6bd968'),
  ('The Arcade', 'Press start, together', 'Wall-to-wall cabinets and a glowing esports stage. Tournaments, retro nights, and co-op marathons run here.', '🕹️', '#b06bff'),
  ('Town Square', 'Where the whole plaza meets', 'The central gathering ground for markets, town halls, and seasonal festivals. Everything important passes through here.', '🏛️', '#ffb84d');

-- event_date values are spread before and after 2026-06-20 so countdowns and
-- "past event" formatting are both visible out of the box.
INSERT INTO events (title, description, host, category, event_date, location_id) VALUES
  ('Neon Nights Live', 'Synthwave headliner set with a full light show projected on the dome.', 'GridSound Collective', 'Concert', '2026-07-04 20:00:00+00', 1),
  ('Open Mic Under the Stars', 'Five-minute slots for poets, comedians, and acoustic acts. Sign up at the gate.', 'Plaza Arts Guild', 'Spoken Word', '2026-06-27 19:30:00+00', 1),
  ('Sunrise Strings Recital', 'A chamber quartet welcomes the morning. Coffee provided.', 'Amphitheater Friends', 'Recital', '2026-05-18 07:30:00+00', 1),

  ('48-Hour Build Sprint', 'Weekend hackathon — form a team, ship a tiny product, demo on Sunday.', 'Maker''s Lab Crew', 'Hackathon', '2026-08-15 09:00:00+00', 2),
  ('Repair Café', 'Bring something broken; volunteers help you fix it for free.', 'Fixit Volunteers', 'Workshop', '2026-06-28 13:00:00+00', 2),
  ('Intro to Soldering', 'Beginner-friendly bench session. Build a blinking LED badge to take home.', 'Tinker Mentors', 'Workshop', '2026-04-12 15:00:00+00', 2),

  ('Morning Flow Yoga', 'Gentle all-levels yoga among the ferns. Mats available.', 'Greenhouse Wellness', 'Wellness', '2026-06-25 08:00:00+00', 3),
  ('Seed & Cutting Swap', 'Trade seedlings, cuttings, and growing tips with fellow plant folks.', 'Commons Gardeners', 'Community', '2026-07-12 11:00:00+00', 3),
  ('Tea & Mindfulness Circle', 'A quiet guided meditation followed by herbal tea tasting.', 'Stillness Group', 'Wellness', '2026-05-30 18:00:00+00', 3),

  ('Retro Cabinet Marathon', 'All-night co-op run through arcade classics. Snacks and bean bags supplied.', 'Arcade Keepers', 'Gaming', '2026-09-05 21:00:00+00', 4),
  ('Plaza Fighting Tournament', 'Bracketed 1v1 showdown on the esports stage. Trophies for the top three.', 'GridEsports', 'Tournament', '2026-06-22 17:00:00+00', 4),
  ('Speedrun Showcase', 'Watch local runners attempt record times with live commentary.', 'Arcade Keepers', 'Gaming', '2026-03-08 16:00:00+00', 4),

  ('Summer Solstice Festival', 'Food stalls, makers'' market, and a community lantern release at dusk.', 'Plaza Council', 'Festival', '2026-06-21 16:00:00+00', 5),
  ('Plaza Town Hall', 'Open forum on next season''s programming. All residents welcome.', 'Plaza Council', 'Town Hall', '2026-07-09 18:30:00+00', 5),
  ('Winter Makers Market', 'Local vendors, warm drinks, and handmade gifts across the square.', 'Plaza Council', 'Market', '2025-12-14 12:00:00+00', 5);
