import SwapRequest from '../models/SwapRequest.js';

// Create a swap request
export const createSwap = async (req, res) => {
  const { receiver, offeredSkill, requestedSkill } = req.body;
  const swap = new SwapRequest({
    sender: req.user._id,
    receiver,
    offeredSkill,
    requestedSkill,
  });
  await swap.save();
  res.status(201).json(swap);
};

// Get current user's swap requests
export const getMySwaps = async (req, res) => {
  const swaps = await SwapRequest.find({
    $or: [{ sender: req.user._id }, { receiver: req.user._id }],
  }).populate('sender receiver', 'name');
  res.json(swaps);
};

// Accept or reject a swap
export const updateSwapStatus = async (req, res) => {
  const swap = await SwapRequest.findById(req.params.id);
  if (!swap) return res.status(404).json({ message: 'Swap not found' });
  swap.status = req.body.status;
  await swap.save();
  res.json(swap);
};

// Delete swap request
export const deleteSwap = async (req, res) => {
  await SwapRequest.findByIdAndDelete(req.params.id);
  res.json({ message: 'Swap deleted' });
};
