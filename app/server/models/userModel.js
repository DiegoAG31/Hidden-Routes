import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

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
  user_img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verification_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2 // Not verified por defecto
  },
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'Created_at',
  updatedAt: 'Updated_at',
});

export default User;
