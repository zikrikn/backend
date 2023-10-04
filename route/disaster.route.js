const {
  AddDisaster,
  GetListDisaster,
} = require("../controller/disaster.controller");

const router = require("express").Router();

router.post("/disaster", AddDisaster);
router.get("/disaster", GetListDisaster);

module.exports = router;
