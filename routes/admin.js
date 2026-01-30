const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const adminAuth = require("../middleware/adminAuth");
console.log("Admin routes loaded")
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  // warn but don't crash the server; signing will be guarded below
  console.warn("Warning: JWT_SECRET is not set. Token generation will fail until you set this environment variable.");
}
router.post("/login", (req, res) => {
    console.log("POST /api/admin/login hit"); // 🔥 log request hit
  console.log("Request body:", req.body); 
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "username and password are required" });
  }

  // TEMP: hardcoded admin (later DB)
  if (username === "admin" && password === "admin123") {
    try {
      const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
      return res.json({ success: true, token });
    } catch (err) {
      console.error('JWT sign error:', err);
      return res.status(500).json({ success: false, message: 'Token generation failed' });
    }
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
});
// protected route
router.get("/dashboard", adminAuth, (req, res) => {
  res.json({ message: "Welcome Admin" });
});
module.exports = router;
