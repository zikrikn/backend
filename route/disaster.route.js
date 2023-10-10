const {
  AddDisaster,
  GetListDisaster,
  AddPeopleGone,
  // UpdatePeopleGone,
  DeletePeopleGone
} = require("../controller/disaster.controller");

const router = require("express").Router();
const { uploadPicture } = require("../middleware/upload.middleware");
const {
  validateInputDisaster,
} = require("../middleware/validate.disaster.middleware");

router.post("", uploadPicture, validateInputDisaster, AddDisaster);
router.get("", GetListDisaster);
router.post("/:disasterId/people_gone", AddPeopleGone);
// router.put("/:disasterId/people_gone/:personId", UpdatePeopleGone);
// Delete People Gone
router.delete("/:disasterId/people_gone/:id", DeletePeopleGone);

module.exports = router;
