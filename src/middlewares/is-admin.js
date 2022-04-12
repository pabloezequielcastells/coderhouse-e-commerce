let admin = true;

const isAdmin = (req, res, next) => {
    const isAdmin = req.headers.isadmin;

    if (!admin && !req.headers.isadmin || isAdmin === 'False') {
        res.status(403).send({
            error: -1,
            description: `ruta '${req.originalUrl}' método ${req.method} no autorizada`
        });
    }
    next();
}


export default isAdmin;