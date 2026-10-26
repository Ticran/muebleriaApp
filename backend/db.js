const mongoose = require("mongoose");

async function conectarDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(":white_check_mark: Conectado a MongoDB:", mongoose.connection.name);
    } catch (error) {
        console.error(":x: No se pudo conectar a MongoDB:", error.message);
        process.exit(1);
    }
}

module.exports = conectarDB;
