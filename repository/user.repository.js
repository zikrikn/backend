const User = require("../model/user.model");

async function createUser(user) {
  return await User.create(user);
}

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

async function getUserProfile(userId) {
  return await User.findById(userId).select("-password");
}

async function updateUser(userId, updateFields) {
  return await User.findByIdAndUpdate(userId, updateFields, { new: true });
}

module.exports = {
  createUser,
  findUserByEmail,
  getUserProfile,
  updateUser,
};
