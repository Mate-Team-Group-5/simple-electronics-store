import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './server/db.js';
import readJSONFile from './server/readjson.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Simple health-check / root route
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Backend is running on Render!' });
});

app.post('/api/register', async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    if (!email || !password || !phone) {
      return res
        .status(400)
        .json({ error: 'Email, password, or phone are required' });
    }

    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (email, password, phone) VALUES ($1,$2, $3 ) RETURNING id, email, phone, favorites, cart ',
      [email, hashedPassword, phone],
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const userData = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (userData.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = userData.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ message: 'Login successful', token: token });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
});

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
