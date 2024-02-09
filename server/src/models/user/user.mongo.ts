import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: [String],
  customerId: { type: String },
});

export const User = mongoose.model('User', userSchema);
