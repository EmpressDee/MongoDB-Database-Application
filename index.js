import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";


const app = express();
const port = 3000;

dotenv.config(); //put before connectDB

connectDB();

app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    
});