const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Plant = require('../models/plant');
const logger = require('../utils/logger');

router.get('/', (req, res) => {
    Plant.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            logger.error(err);
            res.end();
        })
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
    const result = validatePlant(req.body);

    if (result.error) {
        let errorMessages = [];
        result.error.details.forEach(el => errorMessages.push(el.message));
        return res.status(400).send(errorMessages);
    }

    const plant = new Plant({
        name: req.body.name,
        species: req.body.species,
        strain: req.body.strain,
        strain_type: req.body.strain_type,
        seed_bank: req.body.seed_bank,
        date_created: new Date(),
        log_entries: req.body.log_entries,
        environment: req.body.environment,
        user: req.body.user,
        mother: req.body.mother,
        clone: req.body.clone
    });

    Plant.create(plant)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            logger.error(err);
            res.status(500).send(err.message);
        })
});

router.put('/:id', (req, res) => {
    const update = validatePlant(req.body);
    if (update.error) {
        let errorMessages = [];
        update.error.details.forEach(el => errorMessages.push(el.message));
        return res.status(400).send(errorMessages);
    }
    Plant.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(plant => {
            res.send(plant);
        })
        .catch(err => {
            logger.error(err);
            res.status(500).send(err.message);
        })
});

router.delete('/:id', (req, res) => {
    Plant.findByIdAndDelete(req.params.id)
        .then(plant => {
            res.send(plant);
        })
        .catch(err => {
            logger.error(err);
            res.status(500).send(err.message);
        })
});

// TODO finish validations and move to different module. Need to validate environment and user as required, among others
const validatePlant = (reqBody) => {
    const schema = {
        name: Joi.string().min(3).required(),
        strain_type: Joi.any().valid('Feminized', 'Autoflowering', 'None').required(),
        species: Joi.any().valid('Indica', 'Sativa', 'Hybrid').required()
    };
    return Joi.validate(reqBody, schema,{ abortEarly: false });
};

module.exports = router;
