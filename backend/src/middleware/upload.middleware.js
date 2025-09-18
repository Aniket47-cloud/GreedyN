const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../config/cloudinary"); // make sure you have cloudinary config set up

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // allowed formats
    transformation: [{ width: 300, height: 300, crop: "fill" }], // optional resize
  },
});

// Multer instance
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
