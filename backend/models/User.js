import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  photo: String,
  skillsOffered: [String],
  skillsWanted: [String],
  availability: String,
  isPublic: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
