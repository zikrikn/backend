require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id, full_name, email) => {
  return jwt.sign({ id, full_name, email }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
