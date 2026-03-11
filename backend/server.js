require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const DEFAULT_FRONTEND_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:4173",
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

    const normalizedOrigin = origin.replace(/\/+$/, "");
    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

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

app.get("/", (req, res) => {
  res.json({
    message: "Construction Site API",
    allowedOrigins,
  });
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
