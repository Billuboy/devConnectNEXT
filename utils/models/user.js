import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  displayName: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  new: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.models.users || mongoose.model('users', Schema);
export default User;
