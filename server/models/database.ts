import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { log } from '../vite';

dotenv.config();

// For this implementation, we'll use the in-memory storage
// but we're keeping the MongoDB infrastructure in place for future use
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/afeez_portfolio';

export const connectDatabase = async () => {
  try {
    // Only attempt to connect if we have a valid MongoDB URI that's not the default
    if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('username:password')) {
      await mongoose.connect(MONGODB_URI);
      log('MongoDB connected successfully', 'mongodb');
    } else {
      log('Using in-memory storage', 'mongodb');
    }
  } catch (error) {
    log(`MongoDB connection error: ${error}`, 'mongodb');
    log('Continuing with in-memory storage...', 'mongodb');
  }
};

mongoose.connection.on('disconnected', () => {
  log('MongoDB disconnected', 'mongodb');
});

mongoose.connection.on('error', (err) => {
  log(`MongoDB error: ${err}`, 'mongodb');
});