const { Signup, Login, Logout, Profile, UpdateProfile } = require("../controller/auth.controller");
const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/welcome", verifyToken, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
router.get("/logout", Logout);
router.get("/profile", verifyToken, Profile);
router.put("/profile", verifyToken, UpdateProfile);

module.exports = router;