const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware para parsear bodies JSON (futuras peticiones POST)
app.use(express.json());

// Middleware de CORS
app.use(cors());

// Middleware de logging
const logger = require("./middlewares/logger.js");

// Rutas de la API
const productRoutes = require("./routes/productRoutes");
app.use(logger);

// Ruta de prueba inicial
app.get("/", (req, res) => {
    res.send("<h1>¡Servidor de Mueblería Hermanos Jota funcionando!</h1>");
});

//Montaje del router de productos en /api/productos
app.use("/api/productos", productRoutes);

// Manejador de rutas no encontradas (404)
app.use((req, res, next) => {
    const error = new Error("Ruta no encontrada");
    error.status = 404;
    next(error);
});

//Middleware centralizado de manejo de errores (404 / 500)
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const mensaje = err.message || "Error interno del servidor";
    res.status(status).json({ error: { mensaje, status } });
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
