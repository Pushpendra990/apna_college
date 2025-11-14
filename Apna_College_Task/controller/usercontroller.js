import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
import User from "../model/usermodel.js";
dotenv.config();


function signAccessToken(user) {
  const payload = { id: user._id.toString(), role: user.role };
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN});
}

// Register
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  const { name, email, password,role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });
    const SALT_ROUNDS = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ name, email, password: hashed ,role});
    await user.save();

    return res.status(201).json({ message: "User created", user: { id: user._id, name: user.name, email: user.email,role:user.role} });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    console.log("user -==",user);
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = signAccessToken(user);
    return res.json({
      accessToken,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.json({ users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

