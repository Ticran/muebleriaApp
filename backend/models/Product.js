// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: [true, "El nombre es obligatorio"], trim: true },
        descripcion: { type: String, trim: true },
        precio: {
            type: Number,
            required: [true, "El precio es obligatorio"],
            min: [0, "El precio no puede ser negativo"]
        },
        stock: { type: Number, default: 0, min: [0, "El stock no puede ser negativo"] },
        imagenUrl: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
