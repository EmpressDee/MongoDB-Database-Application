import mongoose from "mongoose";
import dotenv from "dotenv";
import Client from "./models/Client.js";
import Pet from "./models/Pet.js";
import Appointment from "./models/Appointment.js";

dotenv.config();

const dataDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI);

        // clear exisiting data
await Client.deleteMany({});
await Pet.deleteMany({});
await Appointment.deleteMany({});

// create client data

const clients = await Client.insertMany([
    { name: "Mary Smith", email: "msmith@gmail.com", phone: "718-555-0101"},
    { name: "Annabelle Johnson", email: "anna_johnson@yahoo.com", phone: "917-555-0202"},
    { name: "Jim Halpert", email: "itsjim@aol.com", phone: "718-235-3470"},
    { name: "John Wick", email: "wick_john@gmail.com", phone: "347-235-4560"},
    { name: "Harry Potter", email: "theboywholived@gmail.com", phone: "917-445-0727"}

]);
console.log(`${clients.length} clients data imported`);

// create pet data references clients[i]._id
const pets = await Pet.insertMany([
    { name: "Bluey", species: "cat", breed: "Ragdoll", owner: clients[1]._id },
    { name: "Coco Chanel", species: "dog", breed: "Bichon Frise", owner: clients[0]._id },
    { name: "Reptar", species: "reptile", breed: "Iguana", owner: clients[4]._id },
    { name: "Mr Darcy", species: "cat", breed: "Bengal", owner: clients[4]._id },
    { name: "Luna", species: "dog", breed: "Daschund", owner: clients[2]._id },
    { name: "Appa", species: "reptile", breed: "Leopard Gecko", owner: clients[3]._id },
    { name: "Cotton", species: "cat", breed: "Persian", owner: clients[0]._id },
    { name: "Biscuit", species: "dog", breed: "Poodle", owner: clients[2]._id },
]);

console.log(`${pets.length} pet data imported`)

//appt data references pet[i]._id
 const appointments = await Appointment.insertMany([
      { date: new Date("2026-07-20"), reason: "Annual checkup", pet: pets[0]._id, status: "scheduled" },
      { date: new Date("2026-07-21"), reason: "Vaccination", pet: pets[1]._id, status: "confirmed" },
      { date: new Date("2026-07-22"), reason: "Nail trim", pet: pets[2]._id, status: "scheduled" },
      { date: new Date("2026-07-23"), reason: "Skin issue follow-up", pet: pets[3]._id, status: "cancelled" },
      { date: new Date("2026-07-24"), reason: "Spay/neuter consult", pet: pets[4]._id, status: "scheduled" },
      { date: new Date("2026-07-25"), reason: "Bloodwork", pet: pets[5]._id, status: "confirmed" },
      { date: new Date("2026-07-26"), reason: "Shedding check", pet: pets[6]._id, status: "scheduled" },
      { date: new Date("2026-07-27"), reason: "Ear infection", pet: pets[7]._id, status: "scheduled" }
    ]);
    console.log(`${appointments.length} appointment data imported`);

        
    }catch (err) {
        console.error("Data import error:", err.message)
    }
}

