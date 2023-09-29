const { Signup, Login } = require("../controller/auth.controller");
const router = require("express").Router();
const { userVerification, verifyToken } = require("../middleware/auth.middleware");

router.post('/signup', Signup)
router.post('/login', Login)
router.post("/welcome", verifyToken, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

module.exports = router