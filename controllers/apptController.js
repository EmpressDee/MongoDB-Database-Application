import Appointment from "../models/Appointment.js";

export const getAllAppointments = async (req,res) =>{
    try{
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

//get
export const getAppointmentById = async (req,res) =>{
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({error: "Appointment not found"});
        res.status(200).json(appointment)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
    
};

//post
export const createAppointment = async (req, res) => {
  try {
    const newAppointment = await Appointment.create(req.body);
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//patch
 export const updateAppointment = async (req,res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true //need this so validation wont get bypassed. check mongoose ODM
        });
         if (!updated) return res.status(404).json({ error: "Appointment not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
    }
 };

 //delete

 export const deleteAppointment = async (req,res) =>{
    try {
        const deleted = await Appointment.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Appointment not found" });
    res.status(200).json({ message: "Appointment deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }


    };