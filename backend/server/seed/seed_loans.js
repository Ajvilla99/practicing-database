import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { pool } from "../database/db.js";
import format from "pg-format";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seed_loans() {
  const filePath = path.resolve(__dirname, "../database/files-seed/loans.csv");
  const loans = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        loans.push([row.id_loan, row.id_user, row.isbn, row.loan_date, row.return_date, row.loan_state]);
      })
      .on("end", async () => {
        try {
          const sql = format(
            "INSERT INTO loans(id_loan, id_user, isbn, loan_date, return_date, loan_state) VALUES %L",
            loans
          );
          const result = await pool.query(sql);

          console.log(`✅ Se insertaron ${result.rowCount} loans.`);
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
