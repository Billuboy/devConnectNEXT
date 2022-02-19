import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  profile: {
    type: mongoose.Types.ObjectId,
    ref: 'profiles',
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: Date,
      current: {
        type: Boolean,
        default: false,
      },
      description: String,
    },
  ],
});

const Experience =
  mongoose.models.experiences || mongoose.model('experiences', schema);
export default Experience;
