import mongoose from "mongoose";

export const dbConfig = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to MongoDB");
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        connection.on("error", (err) => {
            console.log("MongoDB connection error", err);
            process.exit();
        });


    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}