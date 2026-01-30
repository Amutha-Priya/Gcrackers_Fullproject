const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(401).json({ message: "Admin access only" });
    }

    req.admin = decoded; // 👈 useful later
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminAuth;
