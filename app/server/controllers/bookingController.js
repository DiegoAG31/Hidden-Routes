import Joi from 'joi';
import sequelize from '../database.js';

const createSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  experience_id: Joi.number().integer().required(),
  places: Joi.number().integer().min(1).required(),
  booking_status_name: Joi.string().valid('pending','confirmed','cancelled','rejected').optional()
});

// ===== CREATE =====
export async function createBooking(req, res) {
  console.log('=== INICIO createBooking SIMPLE ===');
  console.log('Datos recibidos:', req.body);
  console.log('Tipo de datos:', typeof req.body);
  console.log('Keys del body:', Object.keys(req.body));
  
  const { error, value } = createSchema.validate(req.body);
  if (error) {
    console.log('Error de validación Joi:', error.details);
    return res.status(400).json({ message: error.message });
  }

  console.log('Datos validados:', value);

  try {
    const statusName = value.booking_status_name || 'pending';
    
    // Primero, insertar el estado si no existe
    await sequelize.query(`
      INSERT IGNORE INTO booking_status (booking_status_name) 
      VALUES ('pending'), ('confirmed'), ('cancelled'), ('rejected')
    `);
    
    // Obtener el ID del estado
    const [statusResult] = await sequelize.query(`
      SELECT booking_status_id FROM booking_status WHERE booking_status_name = ?
    `, {
      replacements: [statusName],
      type: sequelize.QueryTypes.SELECT
    });
    
    const statusId = statusResult[0]?.booking_status_id || 1;
    console.log('Status ID encontrado:', statusId);

    const [result] = await sequelize.query(`
      INSERT INTO bookings (user_id, experience_id, places, booking_status_id)
      VALUES (?, ?, ?, ?)
    `, {
      replacements: [value.user_id, value.experience_id, value.places, statusId],
      type: sequelize.QueryTypes.INSERT
    });

    console.log('Reserva creada con ID:', result);

    res.status(201).json({
      booking_id: result,
      user_id: value.user_id,
      experience_id: value.experience_id,
      places: value.places,
      status: statusName,
      message: 'Reserva creada exitosamente'
    });
  } catch (err) {
    console.error('Error en createBooking:', err);
    res.status(400).json({ message: err.message });
  }
}
