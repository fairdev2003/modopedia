const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    author_name: {
      type: String,
      required: true,
    },
    author_pfp: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Author", AuthorSchema);
