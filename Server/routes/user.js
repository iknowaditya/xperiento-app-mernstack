const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateUserById,
  handleLoginUserById,
  handleUserProfileById,
  handleLogoutUserById,
  verifyUser,
  protect,
} = require("../Controllers/user");

const cors = require("cors");
const router = express.Router();

// Middleware - plugin..
router.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

router.get("/", handleGetAllUsers);
router.post("/register", handleCreateUserById);
router.post("/login", verifyUser, handleLoginUserById);
router.post("/logout", protect, handleLogoutUserById);
router.get("/profile", protect, handleUserProfileById);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
