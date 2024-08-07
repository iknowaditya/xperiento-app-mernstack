const User = require("../models/user"); // Import your User model

async function verifyUser(req, res, next) {
  try {
    const { mobileNumber } = req.method === "GET" ? req.query : req.body;
    // Check user existence
    let exist = await User.findOne({ mobileNumber });
    if (!exist) return res.status(404).send({ message: "User not found" });
    next();
  } catch (err) {
    console.error("Error verifying user:", err);
    return res.status(500).send({ message: "Authentication failed" });
  }
}

module.exports = verifyUser;
