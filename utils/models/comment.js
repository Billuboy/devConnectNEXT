import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'posts',
  },
  count: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Comment = mongoose.models.comments || mongoose.model('comments', schema);
export default Comment;
