import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { UserResponseMessages } from "@/utils/constans";

async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) return;
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (err) {
    return NextResponse.json(UserResponseMessages.CONNECT_DB)
  }
}

export default connectDB;
