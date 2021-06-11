const router = require("express").Router();
const validateRequest = require("../middleware/validate-body");
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
  try {
    const result = await getAllUsers();
    return res.json({
      success: true,
      payload: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      payload: err.message,
    });
  }
});

/**
 * GET user by id
 */
router.get("/:id", async (req, res) => {
  try {
    const result = await getUserById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        payload: "404 Not Found",
      });
    }

    return res.json({
      success: true,
      payload: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      payload: err.message,
    });
  }
});

/**
 * POST add new user
 */
router.post("/", validateRequest, async (req, res) => {
  try {
    const result = await addNewUser(req.body);
    return res.json({
      success: true,
      payload: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      payload: err.message,
    });
  }
});

/**
 * PATCH update user by id
 */
router.patch("/:id", validateRequest, async (req, res) => {
  try {
    const result = await updateUserById(req.params.id, req.body);
    return res.json({
      success: true,
      payload: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      payload: err.message,
    });
  }
});

/**
 * DELETE user by id
 */
router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteUserById(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        payload: `No user deleted for id ${req.params.id}`,
      });
    }
    return res.json({
      success: true,
      payload: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      payload: data,
    });
  }
});

module.exports = router;
