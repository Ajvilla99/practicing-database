// carga de variables
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Libraries
import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432, // puerto por defecto
});

const prueba = async() => {
  pool
    .connect()
    .then((client) => {
      console.log("✅ Conexión exitosa a PostgreSQL");
      client.release(); // Muy importante liberar la conexión
    })
    .catch((err) => {
      console.error("❌ Error al conectar a PostgreSQL:", err.message);
    });
}

prueba()