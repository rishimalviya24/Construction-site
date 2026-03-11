require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not set! Add it in Render → Environment");
  process.exit(1);
}

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// CORS — allow deployed frontend + local dev
app.use(cors({
  origin: function(origin, callback) {
    const allowed = [
      "https://contrction-frontend.onrender.com",
      "http://localhost:5173",
      "http://localhost:4173",
    ];
    if (!origin || allowed.includes(origin)) return callback(null, true);
    return callback(null, true); // allow all during debug — tighten later
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}));

app.options("*", cors()); // handle preflight

app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => { console.error("❌ MongoDB:", err.message); process.exit(1); });

app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));

app.get("/", (req, res) => res.json({ message: "Construction Site API ✅" }));

app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname,"../index.html"))
})

app.listen(PORT, () => console.log("🚀 Server on port " + PORT));
