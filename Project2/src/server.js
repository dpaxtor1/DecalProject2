const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Create the tokens table if it doesn't exist
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tokens (
        id SERIAL PRIMARY KEY,
        token TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized and tokens table created');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

// Call the initialization function
initializeDatabase();

// Routes
app.post('/api/save-token', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }
    await pool.query('INSERT INTO tokens (token) VALUES ($1)', [token]);
    res.status(201).json({ message: 'Token saved successfully!' });
  } catch (error) {
    console.error('Error saving token:', error);
    res.status(500).json({ error: 'Error saving token' });
  }
});

app.get('/api/get-tokens', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tokens ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    res.status(500).json({ error: 'Error fetching tokens' });
  }
});

// Listen on PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
