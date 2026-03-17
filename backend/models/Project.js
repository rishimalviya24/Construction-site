const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      trim: true,
      default: "",
    },
    mainImage: {
<<<<<<< HEAD
      type: String, // filename/path stored in uploads/
      default: null,
    },
    images: {
      type: [String], // array of filenames
=======
      type: String,
      default: null,
    },
    images: {
      type: [String],
>>>>>>> a37d912 (final image fix done)
      default: [],
    },
    published: {
      type: Boolean,
      default: true,
    },
<<<<<<< HEAD
=======
    youtubeUrl: {
      type: String,
      trim: true,
      default: "",
    },
>>>>>>> a37d912 (final image fix done)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
