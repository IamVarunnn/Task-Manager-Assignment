const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser, getProfile } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

module.exports = router;