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

app.get('/api/products', async (req, res) => {
  try {
    if (!process.env.DB_URL) {
      const filePath = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        'public',
        'api',
        'products.json',
      );

      const fileData = await fs.readFile(filePath, 'utf-8');

      const products = JSON.parse(fileData);
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
    const filePath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      'public',
      'api',
      'phones.json',
    );

    console.log('Resolved file path:', filePath);
    const fileData = await fs.readFile(filePath, 'utf-8');

    const phones = JSON.parse(fileData);
    res.json(phones);
  } catch (error) {
    console.error('Error reading phones.json:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error: Could not load phones' });
  }
});

app.get('/api/tablets', async (req, res) => {
  try {
    const filePath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      'public',
      'api',
      'tablets.json',
    );

    console.log('Resolved file path:', filePath);
    const fileData = await fs.readFile(filePath, 'utf-8');

    const tablets = JSON.parse(fileData);
    res.json(tablets);
  } catch (error) {
    console.error('Error reading tablets.json:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error: Could not load tablets' });
  }
});

app.get('/api/accessories', async (req, res) => {
  try {
    const filePath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      'public',
      'api',
      'accessories.json',
    );

    console.log('Resolved file path:', filePath);
    const fileData = await fs.readFile(filePath, 'utf-8');

    const accessories = JSON.parse(fileData);
    res.json(accessories);
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
