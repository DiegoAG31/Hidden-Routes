const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const BookingStatus = sequelize.define('BookingStatus', {
    Booking_status_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Booking_status_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    tableName: 'Booking_status',
    timestamps: true,
    createdAt: 'Created_at',
    updatedAt: 'Updated_at',
});

module.exports = BookingStatus;
