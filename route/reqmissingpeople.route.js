const router = require("express").Router();
const {
  createMissingPeople,
  getMissingPeople,
  getMissingPeopleById,
  deleteMissingPeople,
  addMissingPeopleFromDisaster,
  updatePeopleGoneInDisaster,
} = require("../controller/reqmissingpeople.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { body, validationResult } = require("express-validator");
const reqMissingPeopleModel = require("../model/reqmissingpeople.model");

// Custom middleware to validate the request body against the schema
const validateRequestBody = (req, res, next) => {
  const schemaFields = Object.keys(reqMissingPeopleModel.schema.paths);
  const requestFields = Object.keys(req.body);

  // Check if any request fields are not in the schema
  const invalidFields = requestFields.filter(
    (field) => !schemaFields.includes(field)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      status: false,
      message: `Invalid fields: ${invalidFields.join(", ")}`,
    });
  }

  next();
};

const validateCreateMissingPeople = [
  validateRequestBody,
  body("name").notEmpty().withMessage("Name is required"),
  body("bencana_id").notEmpty().withMessage("Bencana ID is required"),
  body("missing_people_id")
    .notEmpty()
    .withMessage("Missing People ID is required"),
  body("status").isBoolean().withMessage("Status must be a boolean"),
];

const validateUpdatePeopleGone = [
  validateRequestBody,
  body("reqMissingPeopleId")
    .notEmpty()
    .withMessage("reqMissingPeopleId is required"),
];

// Custom middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ status: false, message: errorMessages[0] });
  }
  next();
};

router.post(
  "",
  verifyToken,
  validateCreateMissingPeople,
  handleValidationErrors,
  createMissingPeople
);
router.get("", verifyToken, getMissingPeople);
router.get("/:id", verifyToken, getMissingPeopleById);
router.delete("/:id", verifyToken, deleteMissingPeople);
router.post("/add-from-disaster", verifyToken, addMissingPeopleFromDisaster);
router.post(
  "/update-people-gone",
  verifyToken,
  validateUpdatePeopleGone,
  updatePeopleGoneInDisaster
);

module.exports = router;
