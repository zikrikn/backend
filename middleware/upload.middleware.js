const multer = require("multer");

const uploadPhotoProfile = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // 5MB file size limit (adjust as needed)
  },
}).single("photo_profile");

const uploadPicture = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // 5MB file size limit (adjust as needed)
  },
}).single("picture");

module.exports = { uploadPhotoProfile, uploadPicture };
