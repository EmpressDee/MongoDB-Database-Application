import express from "express";
import connectDB from "./database/connection";

const app = express();
const port = 3000;


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    connectDB();
})