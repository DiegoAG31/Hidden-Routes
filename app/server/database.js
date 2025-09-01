import mysql from 'mysql2/promise';

const testConnection = async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
    console.log("✅ Conexión exitosa a MySQL");
    await conn.end();
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
  }
};

testConnection();