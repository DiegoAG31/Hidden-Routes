const { DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Role = sequelize.define('Role', {
    Role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Role_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    tableName: 'Roles',
    timestamps: true,
    createdAt: 'Created_at',
    updatedAt: 'Updated_at',
});

module.exports = Role;
