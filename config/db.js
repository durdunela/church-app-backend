import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("database connected");
  } catch (e) {
    console.log(e);
  }
}
