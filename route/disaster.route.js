const {
  AddDisaster,
  GetListDisaster,
  AddPeopleGone,
  UpdatePeopleGone,
} = require("../controller/disaster.controller");

const router = require("express").Router();
const { uploadPicture } = require("../middleware/upload.middleware");
const {
  validateInputDisaster,
} = require("../middleware/validate.disaster.middleware");

router.post("", AddDisaster);
router.get("", GetListDisaster);
router.put("/:id", GetListDisaster);
router.post("/:disasterId/people_gone", AddPeopleGone);
// router.put("/:disasterId/people_gone/:personId", UpdatePeopleGone);
router.post("/disaster", uploadPicture, validateInputDisaster, AddDisaster);
router.get("/disaster", GetListDisaster);

module.exports = router;
