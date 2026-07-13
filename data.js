import mongoose from "mongoose";
import dotenv from "dotenv";
import Client from "./models/Client.js";
import Pet from "./models/Pet.js";
import Appointment from "./models/Appointment.js";

dotenv.config();

const dataDB = async () => {

    try {
        
    }
}

// clear exisiting data
await Client.deleteMany({});
await Pet.deleteMany({});
await Appointment.deleteMany({});