import { Schema, model, models } from 'mongoose';

// Create a new schema with only 'email' and 'password'
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },  // Make 'email' unique
    password: { type: String, required: true }  // Password field
  },
  { collection: 'new_users' } // Specify the new collection name
);

// Check if the model already exists to prevent redefinition
export const User = models.User || model('User', userSchema);
