
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Create storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "job-platform/resumes",
    allowed_formats: ["pdf", "doc", "docx"],
    resource_type: "raw"
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

module.exports = upload;