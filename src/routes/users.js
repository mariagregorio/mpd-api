const express = require('express');
const router = express.Router();
const User = require('../models/user');
const logger = require('../utils/logger');

router.get('/', (req, res) => {
    User.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            logger.error(err);
            res.end();
        })
});

router.post('/', async (req, res) => {
    // TODO add extra validation from Joi
    let userEmail = await User.findOne({email: req.body.email});
    let userName = await User.findOne({name: req.body.name});
    if (userEmail) {
        return res.status(400).send('User email already registered');
    } else if (userName) {
        return res.status(400).send('User name already taken');
    }

    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        avatar: req.body.avatar,
        date_created: new Date()
    });

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            logger.error(err);
            res.status(500).send(err.message);
        })
});

module.exports = router;
