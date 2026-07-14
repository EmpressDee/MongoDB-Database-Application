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

//patch
 export const updateClient = async (req,res) => {
    try {
        const updated = await Client.findByIdAndUpdate(req.params.id. req.body, {
            new: true,
            runValidators: true //need this so validation wont get bypassed. check mongoose ODM
        });
         if (!updated) return res.status(404).json({ error: "Client not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
    }
 };

 //delete

 export const deleteClient = async (req,res) =>{
    try {
        const deleted = await Client.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Client not found" });
    res.status(200).json({ message: "Client deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }


    };
 