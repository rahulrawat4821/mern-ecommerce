import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());

// Connect Database
connectDB();

// Testing Route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});
