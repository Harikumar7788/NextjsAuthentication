import mongoose from "mongoose";

const connectToDb = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); 
  }
};

export default connectToDb;
