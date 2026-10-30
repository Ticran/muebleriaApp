// seed.js — carga el array de productos.js en MongoDB. Se corre con: npm run seed
const mongoose = require("mongoose");
const Product = require("./models/Product");
const productos = require("./data/productos");

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);

    // El array usa "imagen" e "id"; el modelo usa "imagenUrl" y Mongo pone su propio _id.
    const documentos = productos.map(({ id, imagen, ...resto }) => ({
        ...resto,
        imagenUrl: imagen
    }));

    await Product.deleteMany({});
    const creados = await Product.insertMany(documentos);
    console.log(`🌱 ${creados.length} productos cargados en ${mongoose.connection.name}`);

    await mongoose.disconnect();
}

seed().catch((error) => {
    console.error(":x: Falló el seed:", error.message);
    process.exit(1);
});
