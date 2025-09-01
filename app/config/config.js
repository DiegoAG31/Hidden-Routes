import dotenv from 'dotenv';
dotenv.config({ quiet: true });

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  production: {
    use_env_variable: 'DATABASE_URL',  // Railway te da la URL de conexión
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};