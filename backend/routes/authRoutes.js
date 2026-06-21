const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const handleUpload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

// handleUpload("image") handles all multer errors and sends JSON responses.
// If it calls next(), req.file is guaranteed to exist.
router.post("/upload-image", handleUpload("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Convert buffer to base64 data URI for storage in MongoDB
  const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
  res.status(200).json({ imageUrl: base64Image });
});

module.exports = router;
