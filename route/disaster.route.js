const {
  AddDisaster,
  GetListDisaster,
  AddPeopleGone,
  DeleteDisaster,
  // UpdatePeopleGone,
} = require("../controller/disaster.controller");

const router = require("express").Router();
const { uploadPicture } = require("../middleware/upload.middleware");
const {
  validateInputDisaster,
} = require("../middleware/validate.disaster.middleware");

router.post("", uploadPicture, validateInputDisaster, AddDisaster);
router.get("", GetListDisaster);
router.delete("/:disasterId", DeleteDisaster);
router.post("/:disasterId/people_gone", AddPeopleGone);
// router.put("/:disasterId/people_gone/:personId", UpdatePeopleGone);
module.exports = router;
