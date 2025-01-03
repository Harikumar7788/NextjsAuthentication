import mongoose from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null };


export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000,  
      socketTimeoutMS: 60000,           
    };
    console.log("Attempting to connect to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI, options).then((m) => m);
    console.log("Connected to MongoDB");
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
