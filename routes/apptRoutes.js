import express from "express";
import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment } from "../controllers/apptController.js";

const router = express.Router();

router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.patch("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
