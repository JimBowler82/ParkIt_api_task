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
  const params = [
    user.email,
    user.givenName,
    user.familyName,
    new Date().toUTCString(),
  ];

  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        return reject(err);
      }

      return resolve(this.lastID);
    });
  });
};

/**
 * Update user by id
 */
const updateUserById = (id, data) => {
  const query = `UPDATE users set
                    email = COALESCE(?,email),
                    givenName = COALESCE(?,givenName),
                    familyName = COALESCE(?,familyName),
                    updated = ?
                    WHERE id = ?`;
  const params = [
    data.email,
    data.givenName,
    data.familyName,
    new Date().toUTCString(),
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
const deleteUserById = (id) => {
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
