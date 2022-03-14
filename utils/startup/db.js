import mongoose from 'mongoose';

const { MONGODB_URI, SECRET_KEY } = process.env;

if (!MONGODB_URI && !SECRET_KEY)
  throw new Error(
    'Please define the MONGODB_URI and SECRET_KEY environment variable inside .env.local'
  );

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function db() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export async function dbConnect(req, res, next) {
  try {
    await db();
    next();
  } catch (err) {
    return res.status(500).send('Internal Server Error');
  }
}

export default db;
