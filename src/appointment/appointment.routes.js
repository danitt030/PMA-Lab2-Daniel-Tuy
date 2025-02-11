import { Router } from "express";
import { saveAppointment, getAppointments, updateAppointments } from "./appointment.controller.js";
import { createAppointmentValidator, updateAppointmentsValidator, getAppointmentsValidator} from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.get("/getAppointments", getAppointments, getAppointmentsValidator)

router.patch("/updateAppointment/:eid", updateAppointmentsValidator, updateAppointments)

export default router;