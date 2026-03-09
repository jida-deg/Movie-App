import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"]
  },

  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    minlength: [6, "Password must be at least 6 characters"]
  },

  // Google login support
  googleId: {
    type: String
  },

  // Email verification
  isVerified: {
    type: Boolean,
    default: false
  },

  verificationToken: {
    type: String
  },

  // Password reset via token
  resetPasswordToken: {
    type: String
  },

  resetPasswordExpires: {
    type: Date
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


// Hash password before saving
userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});


// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {

  if (!this.password) return false;

  return bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model("User", userSchema);

export default User;