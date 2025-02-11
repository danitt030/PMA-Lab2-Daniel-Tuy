import Pet from "../pet/pet.model.js";
import Appointment from "../appointment/appointment.model.js";
import { parse } from "date-fns";

export const saveAppointment = async (req, res) => {
  try {
    const data = req.body;

    const isoDate = new Date(data.date);

    if (isNaN(isoDate.getTime())) {
      return res.status(400).json({
        success: false,
        msg: "Fecha inválida",
      });
    }

    const pet = await Pet.findOne({ _id: data.pet });
    if (!pet) {
      return res.status(404).json({ 
        success: false, 
        msg: "No se encontró la mascota" 
      });
    }

    const existAppointment = await Appointment.findOne({
      pet: data.pet,
      user: data.user,
      date: {
        $gte: new Date(isoDate).setHours(0, 0, 0, 0),
        $lt: new Date(isoDate).setHours(23, 59, 59, 999),
      },
    });

    if (existAppointment) {
      return res.status(400).json({
        success: false,
        msg: "El usuario y la mascota ya tienen una cita para este día",
      });
    }

    const appointment = new Appointment({ ...data, date: isoDate });
    await appointment.save();

    return res.status(200).json({
      success: true,
      msg: `Cita creada exitosamente en fecha ${data.date}`,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false, 
      msg: "Error al crear la cita", 
      error 
    }); 
  }
};

export const getAppointments = async (req, res) => {
  try {
    const {idAppoinments} = req.params
    const { limite = 5, desde = 0 } = req.query;
    const query = await Appointment.findByIdAndUpdate({user: idAppoinments, status: "CREATED"});

    const [total, appointments] = await Promise.all([
      Appointment.countDocuments(query),
      Appointment.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    return res.status(200).json({
      success: true,
      total,
      appointments
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener las citas",
      error: err.message
    })
  }
}

export const updateAppointments = async (req, res) => {
        try{
          const { eid } = req.params
          const datos = req.body
          const appointment = await Appointment.findByIdAndUpdate(eid, datos, {new: true});


            return res.status(200).json({
                success: true,
                message: "La cita ha sido actualizada",
                appointment
            })

        }catch(err){
            return res.status(500).json({
                success: false,
                message: "Error al actualizar la cita",
                error: err.message
            })
        }
}

export const cancelAppointments = async (req, res) => { 
    try{
        const { eid } = req.params
        const appointment = await Appointment.findByIdAndUpdate(eid, {status: "CANCELLED"}, {new: true});

        return res.status(200).json({
            success: true,
            message: "Cita cancelada exitosamente",
            appointment
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al cancelar la cita",
            error: err.message
        })
    }
}

