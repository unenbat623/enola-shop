import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGO_URI in .env');
}

// Global cache - serverless instance-уудын хооронд хуваалцана
declare global {
  var _mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const cached = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cached;

export const connectDB = async () => {
  // Холбогдсон байвал шууд буцаана
  if (cached.conn) return cached.conn;

  // Promise үүсгэгдсэн байвал түүнийг хүлээнэ (давхар холболтоос сэргийлнэ)
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connected.');
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Дараагийн хүсэлтэд дахин оролдох
    console.error('MongoDB connection error:', error);
    throw error;
  }
};