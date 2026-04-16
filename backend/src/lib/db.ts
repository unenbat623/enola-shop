import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define MONGO_URI in .env')
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const opts = {
      bufferCommands: false,
    };

    const db = await mongoose.connect(MONGODB_URI, opts);
    isConnected = db.connections[0].readyState === 1;
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // In serverless, we don't want to exit the process, 
    // we want to throw so the request fails but the process can be reused.
    throw error;
  }
};
