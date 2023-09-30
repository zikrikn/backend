const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/token.util");
const userRepository = require("../repository/user.repository");
const uploadImageProfile = require("../util/gcs.util.js");

async function signupUser(userData) {
  const {
    email,
    password,
    fullName,
    role,
    phoneNumber,
    photoProfile,
    createdAt,
  } = userData;
  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exist");
  }

  const user = await userRepository.createUser({
    email,
    password,
    fullName,
    role,
    phoneNumber,
    photoProfile,
    createdAt,
  });

  const token = createSecretToken(user._id);
  return { token, user };
}

async function loginUser(email, password) {
  const user = await userRepository.findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Incorrect password or email");
  }

  const token = createSecretToken(user._id);
  return token;
}

async function getProfile(userId) {
  return await userRepository.getUserProfile(userId);
}

async function updateProfile(userId, updateFields, file) {
  if (file) {
    const { email } = updateFields;
    const sanitizedEmail = email.replace(/[@.]/g, "_");
    const imageUrl = await uploadImageProfile(file, sanitizedEmail);
    updateFields.photoProfile = imageUrl;
  }

  return userRepository.updateUser(userId, updateFields);
}

module.exports = {
  getProfile,
  signupUser,
  loginUser,
  updateProfile,
};
