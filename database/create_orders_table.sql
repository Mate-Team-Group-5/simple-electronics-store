CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  details JSONB,
  cart JSONB[]
);
