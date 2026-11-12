const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "El email es obligatorio"],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "La contraseña es obligatoria"]
        },
        rol: {
            type: String,
            enum: ["cliente", "admin"],
            default: "cliente"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Usuario", usuarioSchema);
