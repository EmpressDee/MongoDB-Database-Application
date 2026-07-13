import express from "express";
import connectDB from "./database/connection.js";
import dotenv from "dotenv";

const app = express();
const port = 3000;

dotenv.config(); //put before connectDB

connectDB();

app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    
});