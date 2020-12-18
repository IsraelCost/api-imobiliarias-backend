module.exports.notFound = (req, res, next) => {
    const error = new Error('Not Found :(');
    error.status = 404;
    next(error);
};

module.exports.catchAll = (err, req, res, next) => {
    return res.status(err.status || 500).json({ error: err.message });
};