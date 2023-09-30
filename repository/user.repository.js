const User = require("../model/user.model");
const logger = require("../logger/api.logger");

async function createUser(user) {
  let data = {};
  try {
    data = await User.create(user);
  } catch (error) {
    logger.error("Error::", error);
  }
  return data;
}

async function findUserByEmail(email) {
  let data = {};
  try {
    data = await User.findOne({ email });
  } catch (error) {
    logger.error("Error::", error);
  }
  return data;
}

async function getUserProfile(userId) {
  let data = {};
  try {
    data = await User.findById(userId).select("-password");
  } catch (error) {
    logger.error("Error::", error);
  }
  return data;
}

async function updateUser(userId, updateFields) {
  let data = {};
  try {
    data = await User.findByIdAndUpdate(userId, updateFields, { new: true });
  } catch (error) {
    logger.error("Error::", error);
  }
  return data;
}

module.exports = {
  createUser,
  findUserByEmail,
  getUserProfile,
  updateUser,
};
