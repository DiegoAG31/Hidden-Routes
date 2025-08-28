import express from 'express';
import path from 'path';
import cors from 'cors';
import authRoutes from './routes/auth.js';
// import bookingRoutes from './routes/bookings.js';
import experienceRoutes from './routes/experiences.js';
// import reviewRoutes from './routes/reviews.js';
import sequelize from './database.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
// app.use('/api/bookings', bookingRoutes);
app.use('/api/experiences', experienceRoutes);
// app.use('/api/reviews', reviewRoutes);

app.use(express.static(path.join(process.cwd(), 'app/public')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Chequear conexión aparte
const checkDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

checkDB();

