// ================================================================
// productRoutes.js
// Rutas de productos de Mueblería Hermanos Jota.
// Sprint 3 - T05: se monta desde server.js en /api/productos.
// ================================================================

const express = require("express");
const router = express.Router();

// Catálogo de productos (array de objetos)
const productos = require("../data/productos.js");

// T07 - GET /api/productos/:id
router.get("/:id", (req, res, next) => {
    const id = Number(req.params.id);
    const producto = productos.find((p) => p.id === id);

    if (!producto) {
        // Se delega el error al middleware centralizado de server.js
        const error = new Error("Producto no encontrado");
        error.status = 404;
        return next(error);
    }

    res.json(producto);
});

module.exports = router;
