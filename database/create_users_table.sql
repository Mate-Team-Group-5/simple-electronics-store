CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  favorites INTEGER[],
  cart JSONB[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  phone TEXT
);
