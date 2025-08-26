const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const bookingRoutes = require('./routes/booking.js');
const experienceRoutes = require('./routes/experience.js');
const reviewRoutes = require('./routes/review.js');
const sequelize = require('./database.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});