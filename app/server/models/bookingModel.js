import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Booking = sequelize.define('Booking', {
    Booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Experience_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Quotes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    booking_status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Bookings',
    timestamps: true,
    createdAt: 'Created_at',
    updatedAt: 'Updated_at',
});

export default Booking;

