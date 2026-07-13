import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
 
}, { timestamps: true });

const Client = mongoose.model("Cliens", clientSchema);

export default Client;