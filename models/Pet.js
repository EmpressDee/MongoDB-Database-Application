import mongoose from "mongoose";

const petSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    species: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Client"
    }



}, {timeStamps: true});

const Pet = mongoose.model("Pet", petSchema);
export default Pet;