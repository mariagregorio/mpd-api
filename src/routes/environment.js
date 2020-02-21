const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');
const Environment = require('../models/environment');
const logger = require('../utils/logger');
const auth = require('../middleware/auth');

// TODO fix lots of isues going on here!!
router.post('/', auth, async (req, res) => {
    // TODO do not allow duplicated plant ids
    if (req.body.plants) {
        req.body.plants.forEach((plantId, index) => {
            Plant.findById(plantId)
                .then(result => {
                    if (!result || result.user !== req.user._id) {
                        // check that plant belongs to the user creating this environment
                        logger.warn('Invalid plants list');
                        res.status(400).send('Invalid plants list');
                    }
                })
                .catch(err => {
                    logger.error(err.message);
                    res.status(500).send(err.message);
                })
        })
    }
    const environment = new Environment({
        name: req.body.name,
        date_created: new Date(),
        log_entries: req.body.log_entries,
        plants: req.body.plants,
        user: req.user._id, // authenticated user, set on the auth middleware
        size_height: req.body.size_height,
        size_width: req.body.size_width,
        size_length: req.body.size_length,
        type: req.body.type
    });

    Environment.create(environment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            logger.error(err.message);
            res.status(500).send(err.message);
        })
});

module.exports = router;
