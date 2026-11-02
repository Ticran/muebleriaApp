// models/Categoria.js
const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            unique: true,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Categoria", categoriaSchema);
