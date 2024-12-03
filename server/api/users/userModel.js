const mongoose = require("mongoose");

const userSchema = new mongoose.scheema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
