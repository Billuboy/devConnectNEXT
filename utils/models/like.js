import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  likes: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
});

const Like = mongoose.models.likes || mongoose.model('likes', schema);
export default Like;
