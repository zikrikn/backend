const userService = require("../service/user.service");
const logger = require('../logger/api.logger');

module.exports.Signup = async (req, res) => {
  try {
    logger.info("Signup::", req.body);
    const userData = req.body;
    const { token, user } = await userService.signupUser(userData);
    res.cookie("token", token, { withCredentials: true, httpOnly: false });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info("Login as ::", email);
    const token = await userService.loginUser(email, password);
    res.cookie("token", token, { withCredentials: true, httpOnly: false });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, user: email });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};

module.exports.Logout = async (req, res) => {
  try {
    logger.info("Logout::", req.user.full_name);
    res.clearCookie("token", { withCredentials: true });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};

module.exports.Profile = async (req, res) => {
  try {
    logger.info("Profile::", req.user.full_name);
    const userId = req.user._id;
    const user = await userService.getProfile(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};

module.exports.UpdateProfile = async (req, res) => {
  try {
    logger.info("UpdateProfile::", req.user.full_name);
    const { _id, email } = req.user;
    const { full_name, phone_number } = req.body;
    const updateFields = { full_name, phone_number, email };
    const updatedUser = await userService.updateProfile(
      _id,
      updateFields,
      req.file
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};
