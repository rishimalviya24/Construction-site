const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || "admin123";
  const SECRET = process.env.JWT_SECRET || "construction_secret_2024";

  console.log("Login attempt:", username, "| Expected:", ADMIN_USER);

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username, role: "admin" },
    SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, username });
});

router.get("/verify", require("../middleware/auth"), (req, res) => {
  res.json({ valid: true, user: req.admin });
});

module.exports = router;
