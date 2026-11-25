// seedUsuario.js — crea (o actualiza) los usuarios de prueba para probar el login.
// Se corre desde /backend con: node --env-file=.env seedUsuario.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Usuario = require("./models/Usuario");

const usuarios = [
    {
        email: process.env.SEED_USUARIO_EMAIL || "prueba@hermanosjota.test",
        password: process.env.SEED_USUARIO_PASSWORD || "clave123",
        nombre: process.env.SEED_USUARIO_NOMBRE || "Usuario de prueba",
        rol: "cliente"
    },
    {
        email: process.env.SEED_ADMIN_EMAIL || "admin@hermanosjota.test",
        password: process.env.SEED_ADMIN_PASSWORD || "clave123",
        nombre: process.env.SEED_ADMIN_NOMBRE || "Administrador de prueba",
        rol: "admin"
    }
];

async function guardarUsuario({ email, password, nombre, rol }) {
    const passwordHash = await bcrypt.hash(password, 10);

    await Usuario.updateOne(
        { email },
        { $set: { nombre, email, password: passwordHash, rol } },
        { upsert: true, runValidators: true }
    );

    console.log(`✅ ${rol} listo: ${email} / ${password}`);
}

async function seedUsuario() {
    await mongoose.connect(process.env.MONGO_URI);

    console.log(`Base de datos: ${mongoose.connection.name}`);
    for (const usuario of usuarios) {
        await guardarUsuario(usuario);
    }

    await mongoose.disconnect();
}

seedUsuario().catch((error) => {
    console.error("❌ Falló el seed de usuario:", error.message);
    process.exit(1);
});
