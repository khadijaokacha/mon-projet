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

db.connect(function (err) {
  if (err) {
    console.error('MySQL connection error:', err.message);
    return;
  }

  console.log('MySQL connected successfully!');
});


// =========================
// TEST BACKEND
// =========================

app.get('/', function (req, res) {
  res.json({
    success: true,
    message: 'Backend is working!'
  });
});


// =========================
// ADD DECLARATION
// =========================

app.post('/declarations', function (req, res) {

  console.log('Declaration received:');
  console.log(req.body);

  const area = req.body.area;
  const department = req.body.department;
  const description = req.body.description;
  const equipment = req.body.equipment;
  const reason = req.body.reason;

  // Date automatique si le formulaire ne l'envoie pas
  const date = req.body.date || new Date().toISOString().slice(0, 10);

  const start = req.body.start;
  const end = req.body.end;
  const targetHours = req.body.targetHours;

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
      department,
      description,
      equipment,
      reason,
      date,
      start,
      end,
      targetHours
    ],

    function (err, result) {

      if (err) {

        console.error('Database error:', err.message);

        return res.status(500).json({
          success: false,
          message: 'Database error',
          error: err.message
        });
      }

      console.log(
        'Declaration saved successfully! ID:',
        result.insertId
      );

      res.json({
        success: true,
        message: 'Declaration saved successfully!',
        id: result.insertId,
        data: req.body
      });
    }
  );

});


// =========================
// GET ALL DECLARATIONS
// =========================

app.get('/declarations', function (req, res) {

  const sql = `
    SELECT
      id,
      area,
      departement AS department,
      description,
      equipement AS equipment,
      reason,
      date,
      start,
      end,
      \`target Hours\` AS targetHours
    FROM declarations
    ORDER BY id DESC
  `;

  db.query(
    sql,

    function (err, results) {

      if (err) {

        console.error(
          'Database error:',
          err.message
        );

        return res.status(500).json({
          success: false,
          message: 'Database error',
          error: err.message
        });
      }

      res.json({
        success: true,
        data: results
      });
    }
  );

});


// =========================
// START SERVER
// =========================

const PORT = 3000;

app.listen(
  PORT,
  function () {
    console.log(
      'Backend running on http://localhost:3000'
    );
  }
);