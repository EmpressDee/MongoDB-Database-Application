import mongoose from "mongoose";

const apptSchema = new mongoose.Schema({

    status: {
        type: String,
        enum: ["scheduled", "confirmed", "cancelled"],
        default: "scheduled"
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Pet"
    },
    date: {
        type: Date,
        required: true
    },
    reason: {
         type: String,
         required: true,
         trim: true
    }



}, {timestamps: true});

apptSchema.index({date: 1 });

const Appointment = mongoose.model("Appointment", apptSchema);

export default Appointment;