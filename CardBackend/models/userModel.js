import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  // If you don't need password, keep it optional or remove it
  password: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model("User", userSchema);
