const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(403).send('Forbbiden');
    }
    try {
        req.user = jwt.verify(token, process.env.SECRET);
        next();
    } catch (e) {
        res.status(400).send('Invalid token');
    }

};

module.exports = auth;
