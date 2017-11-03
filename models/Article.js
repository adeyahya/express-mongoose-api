const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const articleSchema = Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  slug: { type: String, unique: true, index: true },
  data: [Schema.Types.Mixed]
});

module.exports = mongoose.model("Article", articleSchema);
