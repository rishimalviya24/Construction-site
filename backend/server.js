require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
<<<<<<< HEAD
const DEFAULT_FRONTEND_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:4173",
=======
// ✅ FIX: Added all common Vite ports (5173, 5174, 5175, 5176, 5177, 5178, 5179)
// Vite auto-increments the port if 5173 is already in use
const DEFAULT_FRONTEND_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:5178",
  "http://localhost:5179",
  "http://localhost:4173",
  "http://localhost:4174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
>>>>>>> a37d912 (final image fix done)
];

const allowedOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URLS || "").split(","),
  ...DEFAULT_FRONTEND_ORIGINS,
]
  .map((origin) => origin && origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

if (!MONGODB_URI) {
  console.error("MONGODB_URI not set. Add it in your backend .env or hosting environment.");
  process.exit(1);
}

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
<<<<<<< HEAD

=======
>>>>>>> a37d912 (final image fix done)
    const normalizedOrigin = origin.replace(/\/+$/, "");
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }
<<<<<<< HEAD

=======
>>>>>>> a37d912 (final image fix done)
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
<<<<<<< HEAD

app.options("*", cors(corsOptions));

=======
app.options("*", cors(corsOptions));
>>>>>>> a37d912 (final image fix done)
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB:", err.message);
    process.exit(1);
  });

app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
<<<<<<< HEAD
=======
app.use("/api/booking", require("./routes/booking"));
app.use("/api/contact", require("./routes/contact")); // ✅ NEW: Contact form route
>>>>>>> a37d912 (final image fix done)

app.get("/", (req, res) => {
  res.json({
    message: "Construction Site API",
    allowedOrigins,
  });
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
