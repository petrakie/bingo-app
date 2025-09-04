const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");


router.post("/signup", async (req, res) => {
  try {
    const username = String(req.body.username || "").toLowerCase().trim();
    const password = String(req.body.password || "").trim();

    if (!username || !password) {
      return res.status(400).json({ msg: "Username and password are required" });
    }

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ msg: "User already exists" });


    const user = new User({ username, password });
    await user.save();

    return res.status(201).json({ msg: "User created" });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const username = String(req.body.username || "").toLowerCase().trim();
    const password = String(req.body.password || "").trim();

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const ok = await user.comparePasswords(password);
    if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
