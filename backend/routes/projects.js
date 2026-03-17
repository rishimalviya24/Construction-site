const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/auth");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const ok = /jpeg|jpg|png|gif|webp|avif/.test(path.extname(file.originalname).toLowerCase());
  ok ? cb(null, true) : cb(new Error("Images only"));
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
const uploadFields = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "images", maxCount: 20 },
]);

const toUrl = (filename) => (filename ? `/uploads/${filename}` : null);
const deleteFile = (filename) => {
  if (!filename) return;
  const p = path.join(__dirname, "../uploads", filename);
  if (fs.existsSync(p)) fs.unlinkSync(p);
};

// PUBLIC: GET all published projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ published: true }).sort({ createdAt: -1 });
<<<<<<< HEAD
    res.json(projects.map((p) => ({ ...p.toObject(), mainImageUrl: toUrl(p.mainImage), imageUrls: p.images.map(toUrl) })));
=======
    res.json(projects.map((p) => ({
      ...p.toObject(),
      mainImageUrl: toUrl(p.mainImage),
      imageUrls: p.images.map(toUrl),
    })));
>>>>>>> a37d912 (final image fix done)
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ADMIN: GET all projects (including unpublished)
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
<<<<<<< HEAD
    res.json(projects.map((p) => ({ ...p.toObject(), mainImageUrl: toUrl(p.mainImage), imageUrls: p.images.map(toUrl) })));
=======
    res.json(projects.map((p) => ({
      ...p.toObject(),
      mainImageUrl: toUrl(p.mainImage),
      imageUrls: p.images.map(toUrl),
    })));
>>>>>>> a37d912 (final image fix done)
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET single project
router.get("/:id", async (req, res) => {
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json({ ...p.toObject(), mainImageUrl: toUrl(p.mainImage), imageUrls: p.images.map(toUrl) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ADMIN: POST create project
router.post("/", authMiddleware, uploadFields, async (req, res) => {
  try {
<<<<<<< HEAD
    const { title, description, location, category, published } = req.body;
    if (!title || !description) return res.status(400).json({ error: "Title and description required" });
    const mainImage = req.files?.mainImage?.[0]?.filename || null;
    const images = (req.files?.images || []).map((f) => f.filename);
    const project = await Project.create({ title, description, location: location || "", category: category || "", mainImage, images, published: published !== "false" });
    res.status(201).json({ ...project.toObject(), mainImageUrl: toUrl(project.mainImage), imageUrls: project.images.map(toUrl) });
=======
    const { title, description, location, category, published, youtubeUrl } = req.body;
    if (!title || !description) return res.status(400).json({ error: "Title and description required" });
    const mainImage = req.files?.mainImage?.[0]?.filename || null;
    const images = (req.files?.images || []).map((f) => f.filename);
    const project = await Project.create({
      title,
      description,
      location: location || "",
      category: category || "",
      mainImage,
      images,
      published: published !== "false",
      youtubeUrl: youtubeUrl || "",   // ✅ NEW
    });
    res.status(201).json({
      ...project.toObject(),
      mainImageUrl: toUrl(project.mainImage),
      imageUrls: project.images.map(toUrl),
    });
>>>>>>> a37d912 (final image fix done)
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ADMIN: PUT update project
router.put("/:id", authMiddleware, uploadFields, async (req, res) => {
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ error: "Not found" });
<<<<<<< HEAD
    const { title, description, location, category, published, removeMainImage, removeImages } = req.body;
=======
    const { title, description, location, category, published, removeMainImage, removeImages, youtubeUrl } = req.body;
>>>>>>> a37d912 (final image fix done)
    if (title) p.title = title;
    if (description) p.description = description;
    if (location !== undefined) p.location = location;
    if (category !== undefined) p.category = category;
    if (published !== undefined) p.published = published !== "false";
<<<<<<< HEAD
=======
    if (youtubeUrl !== undefined) p.youtubeUrl = youtubeUrl;  // ✅ NEW
>>>>>>> a37d912 (final image fix done)
    if (req.files?.mainImage?.[0]) { deleteFile(p.mainImage); p.mainImage = req.files.mainImage[0].filename; }
    else if (removeMainImage === "true") { deleteFile(p.mainImage); p.mainImage = null; }
    if (removeImages) {
      const toRemove = Array.isArray(removeImages) ? removeImages : [removeImages];
      toRemove.forEach((fn) => { deleteFile(fn); p.images = p.images.filter((img) => img !== fn); });
    }
    if (req.files?.images?.length) p.images = [...p.images, ...req.files.images.map((f) => f.filename)];
    await p.save();
<<<<<<< HEAD
    res.json({ ...p.toObject(), mainImageUrl: toUrl(p.mainImage), imageUrls: p.images.map(toUrl) });
=======
    res.json({
      ...p.toObject(),
      mainImageUrl: toUrl(p.mainImage),
      imageUrls: p.images.map(toUrl),
    });
>>>>>>> a37d912 (final image fix done)
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ADMIN: DELETE project
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ error: "Not found" });
    deleteFile(p.mainImage);
    p.images.forEach(deleteFile);
    await p.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
