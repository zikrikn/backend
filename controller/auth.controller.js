const User = require("../model/user.model");
const { createSecretToken } = require("../util/token.util");
const bcrypt = require("bcryptjs");
const uploadImageProfile = require("../util/gcs.util.js");

module.exports.Signup = async (req, res, next) => {
  try {
    const {
      email,
      password,
      fullName,
      role,
      phoneNumber,
      photoProfile,
      createdAt,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({
      email,
      password,
      fullName,
      role,
      phoneNumber,
      photoProfile,
      createdAt,
    });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Logout = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "User logged out successfully" });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.UpdateProfile = async (req, res, next) => {
  try {
    const { fullName, phoneNumber } = req.body;
    const updateFields = {
      fullName,
      phoneNumber,
    };

    // Check if a file is uploaded for the photo profile
    if (req.file) {
      const { email } = req.user; 
      const sanitizedEmail = email.replace(/[@.]/g, "_");
      const imageUrl = await uploadImageProfile(req.file, sanitizedEmail);
      updateFields.photoProfile = imageUrl;
    }

    const user = await User.findByIdAndUpdate(req.user._id, updateFields, {
      new: true,
    });
    res.status(200).json({ user });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};
