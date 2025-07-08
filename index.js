import express from "express"
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

const app = express()
const PORT = environments.port;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.get("/products", async (req, res) => {

    try {
        let sql = "SELECT * FROM products";

        let [rows] = await connection.query(sql);

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });
    } catch (error) {
        console.error("Algo salio mal", error);

        res.status(500).json({
            error: "Error interno del servidor al obtener productos"
        })
    }
});

app.post("/products", async (req, res) => {
    
})

app.listen(3000, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})