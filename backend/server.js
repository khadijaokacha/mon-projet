const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mon_projet",
});

db.connect((err) => {
  if (err) {
    console.error("Erreur MySQL :", err.message);
    return;
  }

  console.log("MySQL connected successfully!");
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend de l'application fonctionne correctement 🚀",
  });
});


app.get("/declarations", (req, res) => {
  const sql = `
    SELECT
      id,
      area,
      departement,
      equipment,
      description,
      reason,
      start,
      end,
      targetHours
    FROM declarations
    ORDER BY id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur MySQL :", err);

      return res.status(500).json({
        success: false,
        message: "Erreur lors de la récupération des déclarations.",
      });
    }

    res.json({
      success: true,
      declarations: results,
    });
  });
});


app.post("/declarations", (req, res) => {
  console.log("================================");
  console.log("Nouvelle déclaration reçue :");
  console.log(req.body);
  console.log("================================");

  const {
    area,
    department,
    equipment,
    description,
    reason,
    start,
    end,
    targetHours,
  } = req.body;

  if (
    !area ||
    !department ||
    !equipment ||
    !description ||
    !reason ||
    !start ||
    !end ||
    targetHours === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Tous les champs sont obligatoires.",
    });
  }

  const sql = `
    INSERT INTO declarations
    (
      area,
      departement,
      description,
      equipment,
      reason,
      start,
      end,
      targetHours
    )
    VALUES (NOW(),?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    area,
    department,
    description,
    equipment,
    reason,
    start,
    end,
    targetHours,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur MySQL :", err);

      return res.status(500).json({
        success: false,
        message: "Erreur lors de l'enregistrement.",
        error: err.message,
      });
    }

    console.log(
      "Déclaration enregistrée. ID :",
      result.insertId
    );

    res.status(201).json({
      success: true,
      message: "Déclaration enregistrée avec succès.",
      id: result.insertId,
    });
  });
});

app.listen(PORT, () => {
  console.log(
    `Backend running on http://localhost:${PORT}`
  );
});