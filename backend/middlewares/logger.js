const logger = (req, res, next) => {
    const hora = new Date().toLocaleString();

    console.log(`${hora} - ${req.method} ${req.url}`);

    next();
};

module.exports = logger;