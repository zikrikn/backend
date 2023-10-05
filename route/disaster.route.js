const {
  AddDisaster,
  GetListDisaster,
} = require("../controller/disaster.controller");

const router = require("express").Router();
const { uploadPicture } = require("../middleware/upload.middleware");
const {
  validateInputDisaster,
} = require("../middleware/validate.disaster.middleware");

router.post("/disaster", uploadPicture, validateInputDisaster, AddDisaster);
router.get("/disaster", GetListDisaster);

module.exports = router;
