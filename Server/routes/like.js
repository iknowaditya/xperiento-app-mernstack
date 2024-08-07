const express = require("express");
const {
  handleLike,
  handleDislike,
  handleSave,
} = require("../Controllers/like");
const router = express.Router();

router.post("/like", handleLike);
router.post("/dislike", handleDislike);
router.post("/save", handleSave);

module.exports = router;
