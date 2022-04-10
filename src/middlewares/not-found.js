const notFound = (req, res, next) => {
    res.status(404).send({
        error: -2,
        description: `ruta '${req.originalUrl}' método ${req.method} no implentada`
    });
};

export default notFound;