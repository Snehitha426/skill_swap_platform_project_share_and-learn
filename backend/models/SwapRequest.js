import mongoose from 'mongoose';

const swapRequestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  offeredSkill: String,
  requestedSkill: String,
  status: { type: String, default: 'pending' } // pending, accepted, rejected
}, { timestamps: true });

export default mongoose.model('SwapRequest', swapRequestSchema);
