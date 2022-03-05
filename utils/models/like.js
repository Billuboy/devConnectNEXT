import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'posts',
  },
  likes: [
    {
      author: {
        type: mongoose.Types.ObjectId,
      },
    },
  ],
});

const Like = mongoose.models.likes || mongoose.model('likes', schema);
export default Like;
