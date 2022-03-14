import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  like: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'likes',
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.models.posts || mongoose.model('posts', Schema);
export default Post;
