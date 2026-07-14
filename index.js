import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import clientRoutes from "./routes/clientRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import apptRoutes from "./routes/apptRoutes.js";




const app = express();
const port = 3000;

dotenv.config(); //put before connectDB

connectDB();

app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/pets", petRoutes);
app.use("/appointments", apptRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    
});