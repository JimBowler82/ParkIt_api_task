const db = require("../database/database");

/**
 * Query to get all users (GET)
 */
const getAllUsers = () => {
  const query = "SELECT * FROM users";
  const params = [];

  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
};

/**
 * Query to get user by id (GET)
 */
const getUserById = (id) => {
  const query = "SELECT * FROM users where id = ?";
  const params = [id];

  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        return reject(err);
      }

      return resolve(row);
    });
  });
};

/**
 * Add new user (POST)
 */
const addNewUser = (user) => {
  const query =
    "INSERT INTO users (email, givenName, familyName, created) VALUES (?,?,?,?)";
  const params = [user.email, user.givenName, user.familyName, "now"];

  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        return reject(err);
      }
      console.log();
      return resolve(this.lastID);
    });
  });
};

/**
 * Update user by id
 */
const updateUserById = (id = null, data = null) => {
  console.log(data);
  const query = `UPDATE users set
                    email = COALESCE(?,email),
                    givenName = COALESCE(?,givenName),
                    familyName = COALESCE(?,familyName),
                    created = COALESCE(?,created)
                    WHERE id = ?`;
  const params = [
    data.email,
    data.givenName,
    data.familyName,
    data.created,
    id,
  ];

  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        return reject(err);
      }
      return resolve(this.changes);
    });
  });
};

/**
 * Delete user by id
 */
const deleteUserById = (id = null) => {
  const query = `DELETE FROM users WHERE id = ?`;
  const params = [id];

  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        return reject(err);
      }
      return resolve(this.changes);
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUserById,
};
