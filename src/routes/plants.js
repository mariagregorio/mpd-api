const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');
const logger = require('../utils/logger');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    Plant.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            logger.error(err);
            res.end();
        })
});

router.get('/:id', auth, (req, res) => {
    Plant.findOne({ _id: req.params.id})
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send('Plant not found');
            }
        })
        .catch(err => {
            logger.error(err);
            res.status(500).send(err.message);
        });
});

router.post('/', auth, async (req, res) => {
    const plant = new Plant({
        name: req.body.name,
        species: req.body.species,
        strain: req.body.strain,
        strain_type: req.body.strain_type,
        seed_bank: req.body.seed_bank,
        date_created: new Date(),
        log_entries: req.body.log_entries,
        environment: req.body.environment,
        user: req.user._id, // authenticated user, set on the auth middleware
        mother: req.body.mother,
        clone: req.body.clone
    });

    Plant.create(plant)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            logger.error(err.message);
            res.status(500).send(err.message);
        })
});

router.put('/:id', auth, (req, res) => {
    // TODO if I change a plant's environment, make sure to update the plants list in the environment it comes from
    Plant.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(plant => {
            res.send(plant);
        })
        .catch(err => {
            logger.error(err);
            res.status(500).send(err.message);
        })
});

router.delete('/:id', auth, (req, res) => {
    Plant.findByIdAndDelete(req.params.id)
        .then(plant => {
            res.send(plant);
        })
        .catch(err => {
            logger.error(err);
            res.status(500).send(err.message);
        })
});

module.exports = router;
