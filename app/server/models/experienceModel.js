import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Experience = sequelize.define('Experience', {
    Experience_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Experience_title: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    Experience_description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    Capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Experiences',
    timestamps: true,
    createdAt: 'Created_at',
    updatedAt: 'Updated_at',
});

export default Experience;
