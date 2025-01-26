const notFound = (err, req, res, next) => {
    const error = new Error("NOT FOUND ERROR :: "+ req.originalUrl);
    res.status(404);
    next(error)
}


module.exports = notFound;