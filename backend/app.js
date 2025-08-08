import express from "express";
import cors from "cors";
import { pool } from "./server/database/db.js";
import { seed_users } from "./server/seed/seed_users.js";
import { seed_books } from "./server/seed/seed_books.js";
import { seed_loans } from "./server/seed/seed_loans.js";


const app = express();

app.use(express.json());
app.use(cors());

// ENDPOINTS
// GET
app.get("/prestamos", async (request, response) => {
//   response.send("Get PRESTAMOS ✅");
  try {
    const data = await pool.query("SELECT * FROM loans;");
    response.status(200).json({ data: data.rows });

  } catch (error) {
    console.error("Error al obtener data:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

app.get("/prestamos/:id", async (request, response) => {
  const { id } = request.body;
  try {
    const data = await pool.query("SELECT * FROM loans WHERE id_loan = $1;", [id]);
    response.status(200).json({ data: data.rows });

  } catch (error) {
    console.error("Error al obtener data:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// POST
app.post("/upload-authors", async (request, response) => {

  console.log(request.body);
  

  try {
    response.send("POST PRESTAMOS ✅");
  } catch (error) {
    console.error("Error al obtener data:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

app.post("/prestamos", async (request, response) => {
  try {
    response.send("POST PRESTAMOS ✅");
  } catch (error) {
    console.error("Error al obtener data:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// PUT / PATCH
app.patch("/prestamos/:id", async (request, response) => {
  const { id } = request.body;
  response.send("PATCH PRESTAMOS ✅");
});

// DELETE
app.delete("/prestamos/:id", async (request, response) => {
  const { id } = request.body;
  response.send("DELETE PRESTAMOS ✅");
});

// SPECIAL ENDPOINTS
app.get("", async (request, response) => {});
app.get("", async (request, response) => {});

app.listen("3000", async () => {
    await seed_users();
    await seed_books();
    await seed_loans();
  pool
    .connect()
    .then((client) => {
      console.log("✅ Conexión exitosa a PostgreSQL");
      client.release(); // Muy importante liberar la conexión
    })
    .catch((err) => {
      console.error("❌ Error al conectar a PostgreSQL:", err.message);
    });

  console.log("✅ Server corriendo en el puerto 3000");
});
