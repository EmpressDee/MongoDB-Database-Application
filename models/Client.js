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


clientSchema.index({ email: 1}); //adding schema index 

const Client = mongoose.model("Client", clientSchema);


export default Client;