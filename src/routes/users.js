const express = require('express');
const router = express.Router();
const User = require('../models/user');
const logger = require('../utils/logger');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.get('/current', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
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

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        password: hashedPass,
        email: req.body.email,
        avatar: req.body.avatar,
        date_created: new Date()
    });

    User.create(user)
        .then(data => {
            res.send(_.pick(data, ['_id', 'name', 'email', 'avatar']));
        })
        .catch(err => {
            logger.error(err);
            res.status(500).send(err.message);
        })
});

module.exports = router;
