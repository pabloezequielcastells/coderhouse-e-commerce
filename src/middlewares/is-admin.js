let admin = true;

const isAdmin = (req, res, next) => {
    if (!admin) {
        res.status(403).send({
            error: -1,
            description: `ruta '${req.originalUrl}' método ${req.method} no autorizada`
        });
    }
    next();
}


export default isAdmin;