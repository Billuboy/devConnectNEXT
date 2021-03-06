import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const { SECRET_KEY } = process.env;

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

Schema.methods.getToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    SECRET_KEY,
    {
      expiresIn: 3600,
    }
  );
  return token;
};

Schema.methods.getRemToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    SECRET_KEY
  );
  return token;
};

const User = mongoose.models.users || mongoose.model('users', Schema);

module.exports = User;
