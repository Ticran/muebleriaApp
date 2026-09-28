const express = require("express");
const app = express();
const PORT = 3000;

// Rutas de la API
const productRoutes = require("./routes/productRoutes");

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("<h1>¡Servidor de Mueblería Hermanos Jota funcionando!</h1>");
});

// T05 - Montaje del router de productos en /api/productos
app.use("/api/productos", productRoutes);

// T09 - Middleware centralizado de manejo de errores (404 / 500)
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const mensaje = err.message || "Error interno del servidor";
    res.status(status).json({ error: { mensaje, status } });
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
