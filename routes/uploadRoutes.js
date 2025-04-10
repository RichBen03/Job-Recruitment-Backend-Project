// File: routes/uploadRoutes.js (New)
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../utils/cloudinary");
const AppError = require("../utils/appError");

router.post("/resume", auth(), upload.single("resume"), (req, res) => {
  if (!req.file) return next(new AppError("Please upload a file", 400));
  res.json({ url: req.file.path });
});

module.exports = router;