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
});

module.exports = db;
