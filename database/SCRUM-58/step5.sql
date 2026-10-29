-- 1. Create a sequence if it doesn't already exist
CREATE SEQUENCE IF NOT EXISTS products_full_id_seq;

-- 2. Sync the sequence to start right after the highest existing ID in the table
SELECT setval('products_full_id_seq', (SELECT MAX(id) FROM products_full));

-- 3. Set the default value of the existing 'id' column to use this sequence for future rows
ALTER TABLE products_full ALTER COLUMN id SET DEFAULT nextval('products_full_id_seq');

-- 4. Bind the sequence to the column so PostgreSQL manages them together
ALTER SEQUENCE products_full_id_seq OWNED BY products_full.id;