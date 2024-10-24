import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Could not connect to the database:", error.message);
  }
};

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to application termination");
  process.exit(0);
});

export default connectDB;
