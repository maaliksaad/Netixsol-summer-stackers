// controllers/authController.js
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "Email already exists" });

  const user = await User.create({ name, email, password });

  res.status(201).json({
    msg: "User registered",
    token: generateToken(user._id),
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  res.json({
    msg: "Login success",
    token: generateToken(user._id),
  });
};
