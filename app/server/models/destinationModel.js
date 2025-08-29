import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Destination = sequelize.define('Destination', {
    destination_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    city_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
}, {
    tableName: 'destinations',
    timestamps: false
});

export default Destination;
