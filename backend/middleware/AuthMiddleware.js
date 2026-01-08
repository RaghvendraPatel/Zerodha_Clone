const User = require("../model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    return res.json({ status: false, message: "No token provided" });
  }

  // Verify token
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false, message: "Token verification failed" });
    } else {
      // Find user by ID from token
      const user = await User.findById(data.id);
      if (user) {
        return res.json({
          status: true,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        });
      } else {
        return res.json({ status: false, message: "User not found" });
      }
    }
  });
};
