const express = require('express');
const router = express.Router();
const User = require('../models/user');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send('User not registered');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) {
        return res.status(400).send('Invalid password');
    }

    jwt.sign({_id: user._id, name: user.name, email: user.email, avatar: user.avatar}, process.env.SECRET, {expiresIn:'1h'}, (err, token) => {
        if (err) {
            logger.error(err);
            res.status(400).send(err);
        }
        if (token) {
            res.header('x-auth-token', token).send('user authenticated');
        }
    });
});

module.exports = router;
