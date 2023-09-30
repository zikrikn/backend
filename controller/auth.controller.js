const userService = require("../service/user.service");

module.exports.Signup = async (req, res, next) => {
  try {
    const userData = req.body;
    const { token, user } = await userService.signupUser(userData);
    res.cookie("token", token, { withCredentials: true, httpOnly: false });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.cookie("token", token, { withCredentials: true, httpOnly: false });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};

module.exports.Logout = async (req, res, next) => {
  try {
    res.clearCookie("token", { withCredentials: true });
    res.status(200).json({ message: "User logged out successfully" });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};


module.exports.Profile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await userService.getProfile(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};


module.exports.UpdateProfile = async (req, res, next) => {
  try {
    const { _id, email } = req.user;
    const { fullName, phoneNumber } = req.body;
    const updateFields = { fullName, phoneNumber, email};
    const updatedUser = await userService.updateProfile(
      _id,
      updateFields,
      req.file
    );
    res.status(200).json({ user: updatedUser });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};
