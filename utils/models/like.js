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
  likes: [{ type: mongoose.Types.ObjectId }],
});

const Like = mongoose.models.likes || mongoose.model('likes', schema);
export default Like;
