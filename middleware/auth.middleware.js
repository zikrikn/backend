const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
require("dotenv").config();

module.exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ status: false, message: "Authentication failed." });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ status: false, message: "User not found." });
    }
    
    // Attach the user object to the request for later use if needed
    req.user = user;
    
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid token." });
  }
};