import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Simple health-check / root route
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Backend is running on Render!' });
});

async function readJSONFile(filename) {
  const filePath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'public',
    'api',
    filename,
  );
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

app.get('/api/products', async (req, res) => {
  try {
    if (!process.env.DB_URL) {
      const products = await readJSONFile('products.json');
      res.json(products);
    } else {
      const result = await pool.query('SELECT * FROM products');

      res.status(200).json(result.rows);
    }
  } catch (error) {
    console.error('Error reading products.json:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error: Could not load products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM products WHERE id= $1', [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/phones', async (req, res) => {
  try {
    if (!process.env.DB_URL) {
      const phones = await readJSONFile('phones.json');
      res.json(phones);
    } else {
      const result = await pool.query('SELECT * FROM phones');

      res.status(200).json(result.rows);
    }
  } catch (error) {
    console.error('Error reading phones.json:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error: Could not load phones' });
  }
});

app.get('/api/tablets', async (req, res) => {
  try {
    if (!process.env.DB_URL) {
      const tablets = await readJSONFile('tablets.json');
      res.json(tablets);
    } else {
      const result = await pool.query('SELECT * FROM tablets');

      res.status(200).json(result.rows);
    }
  } catch (error) {
    console.error('Error reading tablets.json:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error: Could not load tablets' });
  }
});

app.get('/api/accessories', async (req, res) => {
  try {
    if (!process.env.DB_URL) {
      const accessories = await readJSONFile('accessories.json');
      res.json(accessories);
    } else {
      const result = await pool.query('SELECT * FROM accessories');

      res.status(200).json(result.rows);
    }
  } catch (error) {
    console.error('Error reading accessories.json:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error: Could not load accessories' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
