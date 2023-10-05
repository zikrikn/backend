const router = require("express").Router();
const { createMissingPeople, getMissingPeople, getMissingPeopleById, deleteMissingPeople, addMissingPeopleFromDisaster, updatePeopleGoneInDisaster } = require("../controller/reqmissingpeople.controller");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("", verifyToken, createMissingPeople); // This depends on the role, if the role is admin, then it can create missing people but if just only user, it can't but request it to admin. So in this endpoint use two model, missing people and user model
router.get("", verifyToken, getMissingPeople);
router.get("/:id", verifyToken, getMissingPeopleById);
router.delete("/:id", verifyToken, deleteMissingPeople);
router.post("/add-from-disaster", verifyToken, addMissingPeopleFromDisaster);
router.post("/update-people-gone", verifyToken, updatePeopleGoneInDisaster);

module.exports = router;
