const multer = require("multer");

const uploadPhotoProfile = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit (adjust as needed)
  },
}).single("photoProfile");

const uploadPicture = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit (adjust as needed)
  },
}).single("picture");

module.exports = { uploadPhotoProfile, uploadPicture };
