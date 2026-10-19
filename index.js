import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './server/db.js';
import readJSONFile from './server/readjson.js';
import authMiddleware from './server/auth.js';

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

app.get('/api/user', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await pool.query(
      'SELECT id, email, phone, favorites, cart FROM users WHERE id = $1',
      [userId],
    );

    if (userData.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userData.rows[0];

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error fetching user data' });
  }
});

app.put('/api/user', authMiddleware, async (req, res) => {
  try {
    const { email, phone, favorites, cart } = req.body;
    const userId = req.user.id;

    const userData = await pool.query(
      'SELECT id, email, password, phone, favorites, cart FROM users WHERE id = $1',
      [userId],
    );

    if (userData.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const currentUser = userData.rows[0];

    if (email && email !== currentUser.email) {
      const emailCheck = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email],
      );
      if (emailCheck.rows.length > 0) {
        return res.status(409).json({ error: 'Email already in use' });
      }
    }

    const updatedEmail = email || currentUser.email;
    const updatedPhone = phone || currentUser.phone;
    const updatedFavorites = favorites || currentUser.favorites;
    const updatedCart = cart || currentUser.cart;
    let updatedPassword = currentUser.password;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updatedPassword = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await pool.query(
      'UPDATE users SET email = $1, password = $2, phone = $3, favorites = $4, cart = $5 WHERE id = $6 RETURNING id, email, phone, favorites, cart',
      [
        updatedEmail,
        updatedPassword,
        updatedPhone,
        updatedFavorites,
        updatedCart,
        userId,
      ],
    );

    res.json({
      message: 'User data updated successfully',
      user: {
        id: updatedUser.rows[0].id,
        email: updatedUser.rows[0].email,
        phone: updatedUser.rows[0].phone,
        favorites: updatedUser.rows[0].favorites,
        cart: updatedUser.rows[0].cart,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error updating user data' });
  }
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

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not configured');
      return res
        .status(500)
        .json({ error: 'Authentication is not configured' });
    }

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        favorites: user.favorites,
        cart: user.cart,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.get('/api/products', async (req, res) => {
  const { limit, offset } = req.query;

  if (!limit && !offset) {
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
  } else {
    try {
      if (!process.env.DB_URL) {
        const products = await readJSONFile('products.json');
        res.json(products);
      } else {
        const result = await pool.query(
          'SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2',
          [limit, offset],
        );

        res.status(200).json(result.rows);
      }
    } catch (error) {
      console.error('Error reading products.json:', error);
      res
        .status(500)
        .json({ error: 'Internal Server Error: Could not load products' });
    }
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

app.get('/api/phones/count', async (req, res) => {
  try {
    if (!process.env.DB_URL) {
      const phones = await readJSONFile('phones.json');
      res.json(phones.length);
    } else {
      const result = await pool.query('SELECT COUNT(*) AS total FROM phones');

      res.status(200).json(result.rows[0].total);
    }
  } catch (error) {
    console.error('Error reading phones.json:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error: Could not load phones' });
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
app.get('/api/tablets/count', async (req, res) => {
  try {
    if (!process.env.DB_URL) {
      const phones = await readJSONFile('phones.json');
      res.json(phones.length);
    } else {
      const result = await pool.query('SELECT COUNT(*) AS total FROM tablets');

      res.status(200).json(result.rows[0].total);
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
app.get('/api/accessories/count', async (req, res) => {
  try {
    if (!process.env.DB_URL) {
      const phones = await readJSONFile('phones.json');
      res.json(phones.length);
    } else {
      const result = await pool.query(
        'SELECT COUNT(*) AS total FROM accessories',
      );

      res.status(200).json(result.rows[0].total);
    }
  } catch (error) {
    console.error('Error reading phones.json:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error: Could not load phones' });
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
