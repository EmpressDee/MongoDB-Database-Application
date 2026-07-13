import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err.message); //adding so i can see what the actual error is
    }
};

export default connectDB;