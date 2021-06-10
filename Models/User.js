const db = require("../database/database");

/**
 * Query to get all users (GET)
 */
const getAllUsers = () => {
  console.log(db);
  const query = "SELECT * FROM users";
  const params = [];

  db.all(query, params, (err, rows) => {
    console.log({ rows, err });
    if (err) {
      return {
        error: true,
        data: err.message,
      };
    }
    return {
      error: false,
      data: rows,
    };
  });
};

/**
 * Query to get user by id (GET)
 */
const getUserById = (id) => {
  const query = "SELECT * FROM users where id = ?";
  const params = [id];

  db.get(query, params, (err, rows) => {
    if (err) {
      return {
        error: true,
        data: err.message,
      };
    }
    return {
      error: false,
      data: rows,
    };
  });
};

/**
 * Add new user (POST)
 */
const addNewUser = (user = null) => {
  if (!user) {
    return {
      error: true,
      data: "no user data",
    };
  }

  const query =
    "INSERT INTO users (email, givenName, familyName, created) VALUES ????";
  const params = [user.email, user.givenName, user.familyName, "now"];

  db.run(query, params, (err, result) => {
    if (err) {
      return {
        error: true,
        data: err.message,
      };
    }
    return {
      error: false,
      data: result,
    };
  });
};

/**
 * Update user by id
 */
const updateUserById = (id = null, data = null) => {
  if (!id || !data) {
    return {
      error: true,
      data: "no user data",
    };
  }

  const query = `UPDATE users 
                    email = COALESCE(?,email),
                    givenName = COALESCE(?,givenName),
                    familyName = COALESCE(?,familyName),
                    created = COALESCE(?,created)
                    WHERE id = ?`;
  const params = [data.email, data.givenName, data.familyName, data.created];

  db.run(query, params, (err, result) => {
    if (err) {
      return {
        error: true,
        data: err.message,
      };
    }
    return {
      success: true,
      data: result,
    };
  });
};

/**
 * Delete user by id
 */
const deleteUserById = (id = null) => {
  if (!id) {
    return {
      error: true,
      data: "no user data",
    };
  }

  const query = `DELETE FROM users WHERE id = ?`;
  const params = [id];

  db.run(query, params, (err, result) => {
    if (err) {
      return {
        error: true,
        data: err.message,
      };
    }

    return {
      success: true,
      data: result,
    };
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUserById,
};
