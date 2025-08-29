
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import Destination from './destinationModel.js';

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
    experience_img: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    destination_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Destination,
            key: 'destination_id'
        }
    }
}, {
    tableName: 'experiences',
    timestamps: true,
    createdAt: 'Created_at',
    updatedAt: 'Updated_at',
});

Experience.belongsTo(Destination, { foreignKey: 'destination_id', as: 'destination' });

export default Experience;
