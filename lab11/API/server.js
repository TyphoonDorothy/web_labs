require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 1337;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'darka1701',
  database: process.env.DB_NAME || 'lab9_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

const queryDatabase = (query, params = []) =>
  new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });

app.get('/items', async (req, res) => {
  try {
    const { category, priceOrder } = req.query;

    let query = 'SELECT * FROM items';
    const params = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }

    if (priceOrder) {
      query += category ? ' ORDER BY price ' : ' ORDER BY price ';
      query += priceOrder === 'ascending' ? 'ASC' : 'DESC';
    }

    const items = await queryDatabase(query, params);
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const items = await queryDatabase('SELECT * FROM items WHERE id = ?', [id]);

    if (items.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(items[0]);
  } catch (err) {
    console.error('Error fetching item:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/items', async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;
    if (!name || !description || !price || !category || !imageUrl) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO items (name, description, price, category, imageUrl) VALUES (?, ?, ?, ?, ?)';
    await queryDatabase(query, [name, description, price, category, imageUrl]);

    res.status(201).json({ message: 'Item added successfully!' });
  } catch (err) {
    console.error('Error adding item:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await queryDatabase('DELETE FROM items WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: `Item with ID ${id} deleted successfully` });
  } catch (err) {
    console.error('Error deleting item:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, imageUrl } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (price) updateFields.price = price;
    if (category) updateFields.category = category;
    if (imageUrl) updateFields.imageUrl = imageUrl;

    const query = 'UPDATE items SET ? WHERE id = ?';
    const result = await queryDatabase(query, [updateFields, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: `Item with ID ${id} updated successfully` });
  } catch (err) {
    console.error('Error updating item:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
