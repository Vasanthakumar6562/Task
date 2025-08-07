const express = require("express");
const { protect, roleMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/admin-data", protect, roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Admin access granted", user: req.user });
});

router.get("/user-data", protect, roleMiddleware("user"), (req, res) => {
  res.json({ message: "User access granted", user: req.user });
});

module.exports = router;
