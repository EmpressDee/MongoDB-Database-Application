import Client from "../models/Client.js";

export const getAllClients = async (req,res) =>{
    try{
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

//get
export const getClientById = async (req,res) =>{
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({error: "Client not found"});
        res.status(200).json(client);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
    
};

//post
export const createClient = async (req, res) => {
  try {
    const newClient = await Client.create(req.body);
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};