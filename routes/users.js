const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  addNewUser,
  updateUserById,
  deleteUserById,
} = require("../Models/User");

/**
 * GET all users
 */
router.get("/", async (req, res) => {
  console.log(await getAllUsers());
  // const { error, data } = getAllUsers();

  // if (error) {
  //   return res.status(400).json({
  //     success: false,
  //     payload: data,
  //   });
  // }
  // return res.json({
  //   success: true,
  //   payload: data,
  // });
});

/**
 * GET user by id
 */
router.get("/:id", (req, res) => {
  const { error, data } = getUserById(req.params.id);

  if (error) {
    return res.status(400).json({
      success: false,
      payload: data,
    });
  }
  return res.json({
    success: true,
    payload: data,
  });
});

/**
 * POST add new user
 */
router.post("/", (req, res) => {
  const { error, data } = addNewUser(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      payload: data,
    });
  }

  return res.json({
    success: true,
    payload: data,
  });
});

/**
 * PATCH update user by id
 */
router.patch("/:id", (req, res) => {
  const { error, data } = updateUserById(req.params.id, req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      payload: data,
    });
  }

  return res.json({
    success: true,
    payload: data,
  });
});

/**
 * DELETE user by id
 */
router.delete("/:id", (req, res) => {
  const { error, data } = deleteUserById(req.params.id);

  if (error) {
    return res.status(400).json({
      success: false,
      payload: data,
    });
  }

  return res.json({
    success: true,
    payload: data,
  });
});

module.exports = router;
