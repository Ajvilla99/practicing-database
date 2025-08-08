import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { pool } from "../database/db.js";
import format from "pg-format";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function seed_books() {
  const filePath = path.resolve(__dirname, "../database/files-seed/books.csv");
  const books = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(
        csv()
      )
      .on("data", (row) => {        
        books.push([row.isbn, row.title, row.publication_year, row.author]);
      })
      .on("end", async () => {
        try {
          const sql = format(
            "INSERT INTO books (isbn, title, publication_year, author) VALUES %L",
            books
          );
          const result = await pool.query(sql);

          console.log(`✅ ${result.rowCount} books were inserted.`);
          resolve();
        } catch (error) {
          console.error("❌ Error when inserting books:", error.message);
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
