import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  swap: { type: mongoose.Schema.Types.ObjectId, ref: 'SwapRequest' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String
}, { timestamps: true });

export default mongoose.model('Feedback', feedbackSchema);
