import dotenv from "dotenv";
dotenv.config();

import sql from 'mssql';

const config = {
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  server: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DATABASE,
  options: {
    encrypt: process.env.AZURE_SQL_ENCRYPT === 'true',
    trustServerCertificate: process.env.AZURE_SQL_TRUST_SERVER_CERT === 'true',
  },
};

export const conectarDb = async () => {
  try {
    const pool = await sql.connect(config);
    console.log('Conectado a Azure SQL Database');
    return pool;
  } catch (error) {
    console.error('Error al conectar a Azure SQL Database:', error);
    throw error;
  }
};

export { sql };