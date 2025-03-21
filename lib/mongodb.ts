import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// ✅ Specify type for cached variable
const cached: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null } = 
  (global as unknown as { mongoose?: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null } })?.mongoose || { conn: null, promise: null };

export async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "JewelryDB",
      bufferCommands: false,
    }).then((mongooseInstance) => {
      return mongooseInstance.connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
