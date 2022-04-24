import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  images: [{ type: mongoose.Schema.Types.String }],
});

const Post = mongoose.models.posts || mongoose.model('posts', Schema);
export default Post;
