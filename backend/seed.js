// seed.js — carga el array de productos.js en MongoDB. Se corre con: npm run seed
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Categoria = require("./models/Categoria");
const productos = require("./data/productos");

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);

    await Categoria.deleteMany({});
    await Product.deleteMany({});

    const categoriasCreadas = await Categoria.insertMany([
        { nombre: "Sillas" },
        { nombre: "Mesas" },
        { nombre: "Sillones" },
        { nombre: "Guardado" }
    ]);

    const catPorNombre = Object.fromEntries(categoriasCreadas.map((c) => [c.nombre, c._id]));

    const obtenerCategoria = (nombre) => {
        if (nombre.includes("Silla")) return catPorNombre["Sillas"];
        if (nombre.includes("Sillón")) return catPorNombre["Sillones"];
        if (nombre.includes("Biblioteca")) return catPorNombre["Guardado"];
        return catPorNombre["Mesas"];
    };

    // El array usa "imagen" e "id"; el modelo usa "imagenUrl" y Mongo pone su propio _id.
    const documentos = productos.map(({ id, imagen, ...resto }) => ({
        ...resto,
        imagenUrl: imagen,
        categoria: obtenerCategoria(resto.nombre)
    }));

    const creados = await Product.insertMany(documentos);
    console.log(
        `🌱 ${categoriasCreadas.length} categorías y ${creados.length} productos cargados en ${mongoose.connection.name}`
    );

    await mongoose.disconnect();
}

seed().catch((error) => {
    console.error("❌ Falló el seed:", error.message);
    process.exit(1);
});
