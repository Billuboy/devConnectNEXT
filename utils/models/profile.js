import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
  },
  handle: {
    type: String,
    required: true,
  },
  company: String,
  website: String,
  location: String,
  status: {
    type: String,
    required: true,
  },
  skills: [String],
  bio: String,
  githubusername: String,
  social: {
    facebook: String,
    instagram: String,
    linkedin: String,
    twitter: String,
    youtube: String,
  },
});

const Profile = mongoose.models.profiles || mongoose.model('profiles', Schema);
export default Profile;
