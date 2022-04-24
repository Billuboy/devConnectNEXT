import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'posts',
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  },
  comment: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.models.comments || mongoose.model('comments', schema);
export default Comment;
