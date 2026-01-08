const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

// Signup Controller
module.exports.Signup = async (req, res) => {
  console.log("=== SIGNUP REQUEST ===");
  console.log("Body:", req.body);
  
  try {
    const { email, password, username } = req.body;

    // Check if all fields are provided
    if (!email || !password || !username) {
      console.log("Missing fields - email:", email, "password:", !!password, "username:", username);
      return res.json({ message: "All fields are required", success: false });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.json({
        message: "User already exists with this email",
        success: false,
      });
    }

    console.log("Creating user with email:", email);
    
    // Create new user (password will be hashed by the pre-save middleware)
    const user = await User.create({
      email: email.toLowerCase(),
      password,
      username,
    });
    console.log("✓ User created successfully:", user._id);

    // Generate JWT token
    const token = createSecretToken(user._id);
    console.log("✓ Token generated");

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    console.log("✓ Cookie set");

    // Return success response
    console.log("✓ Sending success response");
    return res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("❌ === SIGNUP ERROR ===");
    console.error("Error:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return res.status(500).json({
      message: error.message || "An error occurred during signup",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Login Controller
module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.json({
        message: "All fields are required",
        success: false,
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) {
      return res.json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Compare passwords using bcrypt
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Generate JWT token
    const token = createSecretToken(user._id);

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    // Return success response
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "An error occurred during login",
      success: false,
      error: error.message,
    });
  }
};
