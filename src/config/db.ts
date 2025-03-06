import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
// const MONGO_URI = "mongodb+srv://pingoo:AwRlQKJJxwTYnP4l@cluster0.tzceu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // MongoDB URI
const MONGO_URI = "mongodb://127.0.0.1:27017/engageXpart"; // MongoDB URI
const connectDB = async () => {
    try {


        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("DB Connection Failed:", error);
        process.exit(1);
    }
};

export default connectDB;
