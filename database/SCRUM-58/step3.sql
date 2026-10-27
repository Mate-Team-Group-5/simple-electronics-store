CREATE TABLE IF NOT EXISTS products_full (
  -- Original columns from products (unchanged)
  id INTEGER PRIMARY KEY,
  category TEXT NOT NULL,
  "itemId" TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  "fullPrice" INTEGER NOT NULL,
  price INTEGER NOT NULL,
  screen TEXT NOT NULL,
  capacity TEXT NOT NULL,
  color TEXT NOT NULL,
  ram TEXT NOT NULL,
  year SMALLINT NOT NULL,
  image TEXT NOT NULL,
  
  -- Appended columns from products_info
  "namespaceId" TEXT,
  "capacityAvailable" JSONB,
  "colorsAvailable" JSONB,
  images JSONB,
  description JSONB,
  resolution TEXT,
  processor TEXT,
  camera TEXT,
  zoom TEXT,
  cell JSONB
);