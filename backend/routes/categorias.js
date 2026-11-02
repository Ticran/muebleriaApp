const express = require("express");
const router = express.Router();
const Categoria = require("../models/Categoria");

// GET /api/categorias
router.get("/", async (req, res) => {
    const categorias = await Categoria.find().sort({ nombre: 1 });
    res.json(categorias);
});

// POST /api/categorias
router.post("/", async (req, res) => {
    const nuevaCategoria = await Categoria.create(req.body);
    res.status(201).json(nuevaCategoria);
});

module.exports = router;
