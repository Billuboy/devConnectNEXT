import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

async function db() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoosePromise) => mongoosePromise);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export async function dbConnect(req, res, next) {
  try {
    await db();
    return next();
  } catch (err) {
    return res.status(500).send('Error connecting with database');
  }
}

export default db;
