import fs from "fs"; 
import path from "path";
import csv from "csv-parser";
import { pool } from "../database/db.js";
import format from "pg-format";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seed_users() {
  const filePath = path.resolve(__dirname, "../database/files-seed/users.csv");
  const users = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        console.log(row);
        users.push([
          row.id_user,
          row.full_name,
          row.identification,
          row.email,
          row.phone,
        ]);
        
        
      })
      .on("end", async () => {
        try {
          const sql = format(
            "INSERT INTO users (id_user, full_name, identification, email, phone) VALUES %L",
            users
          );
          const result = await pool.query(sql);

          console.log(`✅ Se insertaron ${result.rowCount} users.`);
          resolve();
        } catch (error) {
          console.error("❌ Error al insertar usuarios:", error.message);
          reject(error);
        }
      })
      .on("error", (err) => {
        console.error(
          "❌ Error al leer el archivo CSV de usuarios:",
          err.message
        );
        reject(err);
      });
  });
}
