import dotenv from "dotenv";
import mongoose from "mongoose";

// Here we use connectDB to connect our nodeJS with the DB => this function is called in the server.js imediatly after the server has been started

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
