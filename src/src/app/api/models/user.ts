import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    image: { type: String },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
