const { Signup, Login } = require("../controllers/AuthController");
const { userVerification } = require("../middleware/AuthMiddleware");
const router = require("express").Router();

// POST /signup - Register a new user
router.post("/signup", Signup);

// POST /login - Login an existing user
router.post("/login", Login);

// POST / - Verify user token and get user info
router.post("/", userVerification);

module.exports = router;
