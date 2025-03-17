import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("User", userSchema);
