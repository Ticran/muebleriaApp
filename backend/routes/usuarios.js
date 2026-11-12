const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Usuario = require("../models/Usuario");
const { verificarToken } = require("../middleware/auth");

// POST /api/usuarios/registro
router.post("/registro", async (req, res) => {
    const { nombre, email, password } = req.body;

    if (
        !nombre ||
        !email ||
        !password ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const passwordHash = await bcrypt.hash(password, 10); //hash de la contraseña

    const nuevoUsuario = await Usuario.create({
        nombre,
        email,
        password: passwordHash
    });

    res.status(201).json({
        _id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
    });
});

// POST /api/usuarios/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({ error: "Email y contraseña obligatorios" });
    }

    const usuario = await Usuario.findOne({ email: email.trim().toLowerCase() });
    if (!usuario) {
        return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) {
        return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });

    res.json({
        token,
        usuario: {
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        }
    });
});

// GET /api/usuarios/perfil
router.get("/perfil", verificarToken, async (req, res) => {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
    });
});

module.exports = router;
