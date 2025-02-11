import { Router } from "express";
import { saveAppointment, getAppointments, updateAppointments } from "./appointment.controller.js";
import { createAppointmentValidator, updateAppointmentsValidator  } from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.get("/getAppointments", getAppointments)

router.patch("/updateAppointment/:eid", updateAppointmentsValidator, updateAppointments)

export default router;