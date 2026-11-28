const mongoose = require("mongoose");
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function conectarDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado a MongoDB:", mongoose.connection.name);
    } catch (error) {
        console.error("No se pudo conectar a MongoDB:", error.message);
        process.exit(1);
    }
}

module.exports = conectarDB;
