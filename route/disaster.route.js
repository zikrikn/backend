const {
  AddDisaster,
  GetListDisaster,
  AddPeopleGone,
  UpdatePeopleGone,
} = require("../controller/disaster.controller");

const router = require("express").Router();

router.post("", AddDisaster);
router.get("", GetListDisaster);
router.put("/:id", GetListDisaster);
router.post("/:disasterId/people_gone", AddPeopleGone);
// router.put("/:disasterId/people_gone/:personId", UpdatePeopleGone);

module.exports = router;
