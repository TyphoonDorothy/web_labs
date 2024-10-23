const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 1337;

app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: 'darka1701', // replace with your MySQL password
  database: 'lab5_db' // replace with your database name
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
  console.log(`Received request to delete plane with ID: ${planeId}`); // Add this line

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