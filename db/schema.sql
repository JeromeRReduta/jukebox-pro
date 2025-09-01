DROP TABLE IF EXISTS playlists_tracks;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS tracks;
DROP TABLE IF EXISTS "user"; -- https://stackoverflow.com/questions/17266784/syntax-error-at-or-near-user-when-adding-postgres-constraint

CREATE TABLE "user" (
    id serial PRIMARY KEY,
    username text UNIQUE NOT NULL,
    password text NOT NULL
);

CREATE TABLE tracks (
  id serial PRIMARY KEY,
  name text NOT NULL,
  duration_ms integer NOT NULL
 );

CREATE TABLE playlists (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  user_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE playlists_tracks (
  id serial PRIMARY KEY,
  playlist_id integer NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  track_id integer NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  UNIQUE (playlist_id, track_id)
);


