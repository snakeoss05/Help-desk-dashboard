import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
  },
  profilePicture: { type: String },
  otp: {
    type: String,
    required: true,
  },
  isVerified: { type: Boolean },
});

const User = mongoose.model("User", userSchema);

export default User;
