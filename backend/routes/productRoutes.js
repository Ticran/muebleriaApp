// ================================================================
// productRoutes.js
// Rutas de productos de Mueblería Hermanos Jota.
// Sprint 5 - T04: migradas a Mongoose (GET / y GET /:id).
// ================================================================

const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// GET /api/productos
router.get("/", async (req, res, next) => {
    try {
        const productos = await Product.find();
        // Se mantiene compatibilidad con el frontend (id/imagen) sin perder
        // los campos nativos de Mongo (_id/imagenUrl).
        res.json(
            productos.map((p) => ({
                ...p.toObject(),
                id: p._id,
                imagen: p.imagenUrl
            }))
        );
    } catch (err) {
        next(err);
    }
});

// GET /api/productos/:id
router.get("/:id", async (req, res, next) => {
    try {
        const producto = await Product.findById(req.params.id);

        if (!producto) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            return next(error);
        }

        res.json({
            ...producto.toObject(),
            id: producto._id,
            imagen: producto.imagenUrl
        });
    } catch (err) {
        // id inválido (CastError) -> 404 para mantener el contrato
        if (err.name === "CastError") {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            return next(error);
        }
        next(err);
    }
});

// POST /api/productos
router.post("/", async (req, res, next) => {
    try {
        const nuevoProducto = await Product.create(req.body);
        res.status(201).json(nuevoProducto);
    } catch (err) {
        next(err);
    }
});

// PUT /api/productos/:id
router.put("/:id", async (req, res, next) => {
    try {
        const productoActualizado = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!productoActualizado) {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            return next(error);
        }

        res.json(productoActualizado);
    } catch (err) {
        if (err.name === "CastError") {
            const error = new Error("Producto no encontrado");
            error.status = 404;
            return next(error);
        }
        next(err);
    }
});

module.exports = router;
