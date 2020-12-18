const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const error = new Error();

    if (!authHeader) {
        error.message = 'No token provided';
        return res.status(401).send({ error: error.message });
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        error.message = 'Token error';
        return res.status(401).send({ error: error.message });
    }

    const [ scheme, token ] = parts;

    if (!/Bearer$/i.test(scheme)) {
        error.message = 'Token malformatted';
        return res.status(401).send({ error: error.message });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            error.message = 'Token invalid';
            return res.status(401).send({ error: error.message });
        }

        req.administratorId = decoded.id;
        return next();
    });
};