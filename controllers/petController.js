import Pet from "../models/Pet.js";

export const getAllPets = async (req,res) =>{
    try{
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

//get
export const getPetById = async (req,res) =>{
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({error: "Pet not found"});
        res.status(200).json(pet;
    } catch (err) {
        res.status(500).json({error: err.message})
    }
    
};

//post
export const createPet = async (req, res) => {
  try {
    const newPet = await Pet.create(req.body);
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//patch
 export const updatePet = async (req,res) => {
    try {
        const updated = await Pet.findByIdAndUpdate(req.params.id. req.body, {
            new: true,
            runValidators: true //need this so validation wont get bypassed. check mongoose ODM
        });
         if (!updated) return res.status(404).json({ error: "Pet not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
    }
 };

 //delete

 export const deletePet = async (req,res) =>{
    try {
        const deleted = await Pet.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Pet not found" });
    res.status(200).json({ message: "Pet deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }


    };