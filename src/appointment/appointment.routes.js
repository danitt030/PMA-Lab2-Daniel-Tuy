import { Router } from "express";
import { saveAppointment, getAppointments, updateAppointments, cancelAppointments } from "./appointment.controller.js";
import { createAppointmentValidator, updateAppointmentsValidator, getAppointmentsValidator, cancelAppoinmentsValidator} from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.get("/getAppointments", getAppointments, getAppointmentsValidator)

router.patch("/updateAppointment/:eid", updateAppointmentsValidator, updateAppointments)

router.patch("/cancelAppointment/:eid", cancelAppoinmentsValidator, cancelAppointments)

export default router;