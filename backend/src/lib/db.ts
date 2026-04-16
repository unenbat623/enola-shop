import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define MONGO_URI in .env')
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,  // ← 5 секундэд timeout
      socketTimeoutMS: 8000,           // ← 8 секундэд socket timeout
      connectTimeoutMS: 8000,          // ← 8 секундэд connection timeout
    });
    isConnected = db.connections[0].readyState === 1;
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    isConnected = false;              // ← failed бол reset хий
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};