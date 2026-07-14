import express from "express";
import { getAllClients, getClientById, createClient } from "../controllers/clientController.js";

const router = express.Router();

router.get("/", getAllClients);
router.get("/:id", getClientById);
router.post("/", createClient);
router.patch("/Client/:id", updateClient);
router.delete("/", deleteClient);

export default router;