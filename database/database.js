const sqlite3 = require("sqlite3").verbose();

/**
 * Create sqlite database
 * Options:
 *  :memory:,
 *  file - requires path.
 */
let db = new sqlite3.Database("./database/data.db", (err) => {
  if (err) {
    // Connection failed
    return console.error(err.message);
  }

  console.log("Connected to sqlite database!");
  createUsersTable();
});

const createUsersTable = () => {
  const query = `CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email text,
                givenName TEXT,
                familyName TEXT,
                created TEXT
              )`;

  db.run(query, (err) => {
    if (err) {
      // Table already exists
      return;
    }

    // Insert default row
    const query = `INSERT INTO users (email, givenName, familyName, created)
                  VALUES (?,?,?,?)`;

    db.run(query, ["email@email.com", "Joe", "Bloggs", "10/06/21 21:40"]);
  });
};

module.exports = db;
