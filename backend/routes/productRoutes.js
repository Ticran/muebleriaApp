// ================================================================
// productRoutes.js
// Rutas de productos de Mueblería Hermanos Jota.
// Sprint 5 - T04: migradas a Mongoose (GET / y GET /:id).
// ================================================================

const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Categoria = require("../models/Categoria");
const { verificarToken, soloAdmin } = require("../middleware/auth");

// GET /api/productos
router.get("/", async (req, res) => {
    const filtro = req.query.categoria ? { categoria: req.query.categoria } : {};
    const productos = await Product.find(filtro).populate("categoria", "nombre");
    // Se mantiene compatibilidad con el frontend (id/imagen) sin perder
    // los campos nativos de Mongo (_id/imagenUrl).
    res.json(
        productos.map((p) => ({
            ...p.toObject(),
            id: p._id,
            imagen: p.imagenUrl
        }))
    );
});

// GET /api/productos/:id
router.get("/:id", async (req, res) => {
    const producto = await Product.findById(req.params.id).populate("categoria", "nombre");

    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({
        ...producto.toObject(),
        id: producto._id,
        imagen: producto.imagenUrl
    });
});

// POST /api/productos
router.post("/", verificarToken, soloAdmin, async (req, res) => {
    if (req.body.categoria) {
        const existeCategoria = await Categoria.findById(req.body.categoria);
        if (!existeCategoria) {
            return res.status(400).json({ error: "La categoría no existe" });
        }
    }

    const nuevoProducto = await Product.create(req.body);
    res.status(201).json(nuevoProducto);
});

// PUT /api/productos/:id
router.put("/:id", verificarToken, soloAdmin, async (req, res) => {
    if (req.body.categoria) {
        const existeCategoria = await Categoria.findById(req.body.categoria);
        if (!existeCategoria) {
            return res.status(400).json({ error: "La categoría no existe" });
        }
    }

    const productoActualizado = await Product.findByIdAndUpdate(req.params.id, req.body, {
        returnDocument: "after",
        runValidators: true
    });

    if (!productoActualizado) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(productoActualizado);
});

// DELETE /api/productos/:id
router.delete("/:id", verificarToken, soloAdmin, async (req, res) => {
    const productoEliminado = await Product.findByIdAndDelete(req.params.id);

    if (!productoEliminado) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(productoEliminado);
});

module.exports = router;
