const express = require("express");
const app = express();
const PORT = 3000;

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("<h1>¡Servidor de Mueblería Hermanos Jota funcionando!</h1>");
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
