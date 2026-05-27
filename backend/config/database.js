const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", function (error) {
  if (error) {
    console.log("Database connection error:", error.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    type TEXT NOT NULL,
    date TEXT NOT NULL
  )`,
);

module.exports = db;
