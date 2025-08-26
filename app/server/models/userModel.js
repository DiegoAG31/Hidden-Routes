const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const User = sequelize.define('User', {
    User_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    User_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'Users',
    timestamps: true,
    createdAt: 'Created_at',
    updatedAt: 'Updated_at',
});

module.exports = User;
