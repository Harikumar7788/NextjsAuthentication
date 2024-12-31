import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true }, // Unique field for email
  password: { type: String, required: true },           // Password field
});

// Remove any existing index related to username if it exists
export  const User = models.User || model("User", userSchema);