const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mon_projet'
});

db.connect((err) => {
  if (err) {
    console.error('MYSQL ERROR:', err);
    return;
  }

  console.log('MySQL connected successfully!');
});

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.get('/declarations', (req, res) => {
  const sql =
    'SELECT * FROM declarations ORDER BY id DESC';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('SELECT ERROR:', err);

      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    res.json({
      success: true,
      data: results
    });
  });
});

app.post('/declarations', (req, res) => {
  console.log(
    'DECLARATION RECEIVED:',
    req.body
  );

  const {
    area,
    departement,
    description,
    equipement,
    reason,
    date,
    start,
    end,
    targetHours
  } = req.body;

  const sql = `
    INSERT INTO declarations
    (
      area,
      departement,
      description,
      equipement,
      reason,
      date,
      start,
      end,
      \`target Hours\`
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      area,
      departement,
      description,
      equipement,
      reason,
      date,
      start,
      end,
      targetHours
    ],
    (err, result) => {
      if (err) {
        console.error(
          'INSERT ERROR:',
          err
        );

        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      console.log(
        'DECLARATION SAVED:',
        result.insertId
      );

      res.json({
        success: true,
        id: result.insertId
      });
    }
  );
});

app.listen(3000, '0.0.0.0', () => {
  console.log(
    'Backend running on http://localhost:3000'
  );
});