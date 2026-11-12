const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = payload;
        next();
    } catch {
        return res.status(401).json({ error: "Token inválido o vencido" });
    }
}

function soloAdmin(req, res, next) {
    if (req.usuario && req.usuario.rol === "admin") {
        return next();
    }
    return res.status(403).json({ error: "Acceso denegado: se requiere rol admin" });
}

module.exports = { verificarToken, soloAdmin };
