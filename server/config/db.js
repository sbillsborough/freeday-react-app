import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
