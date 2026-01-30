const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use a single uploads directory (matches app.js static mapping)
    const uploadDir = path.join(__dirname, "..", "public", "images"); // ✅ Correct path
    // Ensure directory exists (multer won't create nested folders for us)
    try {
      fs.mkdirSync(uploadDir, { recursive: true });
    } catch (err) {
      // ignore EEXIST and rethrow other errors
      if (err.code !== 'EEXIST') return cb(err);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const upload = multer({
  storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

module.exports = upload;
