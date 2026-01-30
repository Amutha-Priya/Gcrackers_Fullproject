const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const adminAuth = require("../middleware/adminAuth");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // TEMP: hardcoded admin (later DB)
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ success: true, token });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
});
// protected route
router.get("/dashboard", adminAuth, (req, res) => {
  res.json({ message: "Welcome Admin" });
});
module.exports = router;
