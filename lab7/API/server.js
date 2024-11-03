const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 1337;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'darka1701',
    database: 'lab5_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.get('/planes', (req, res) => {
    connection.query('SELECT * FROM planes', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/planes/:id', (req, res) => {
    const planeId = req.params.id;

    const query = 'SELECT * FROM planes WHERE id = ?';
    connection.query(query, [planeId], (err, results) => {
        if (err) {
            console.error('Error fetching plane:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return res.status(404).send('Plane not found');
        }

        res.json(results[0]);
    });
});

app.post('/planes', (req, res) => {
    const { name, volume, passengers } = req.body;
    const newPlane = { name, volume, passengers };

    const query = 'INSERT INTO planes (name, volume, passengers) VALUES (?, ?, ?)';
    connection.query(query, [name, volume, passengers], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error', error: err.sqlMessage });
        }
        res.status(201).send({ message: 'Plane added successfully!', plane: newPlane });
    });
});

app.delete('/planes/:id', (req, res) => {
    const planeId = req.params.id;
    console.log(`Received request to delete plane with ID: ${planeId}`);

    const deleteQuery = 'DELETE FROM planes WHERE id = ?';
    connection.query(deleteQuery, [planeId], (err, result) => {
        if (err) {
            console.error('Error deleting plane:', err);
            return res.status(500).send('Error deleting plane');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Plane not found');
        }

        res.status(200).send(`Plane with ID ${planeId} deleted successfully`);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

app.patch('/planes/:id', (req, res) => {
  const planeId = req.params.id;
  const { name, volume, passengers } = req.body;


  const updateValues = {};
  if (name) updateValues.name = name;
  if (volume) updateValues.volume = volume;
  if (passengers) updateValues.passengers = passengers;

  const query = 'UPDATE planes SET ? WHERE id = ?';
  
  connection.query(query, [updateValues, planeId], (err, result) => {
      if (err) {
          console.error('Error updating plane:', err);
          return res.status(500).send('Internal Server Error');
      }

      if (result.affectedRows === 0) {
          return res.status(404).send('Plane not found');
      }

      res.status(200).send(`Plane with ID ${planeId} updated successfully`);
  });
});