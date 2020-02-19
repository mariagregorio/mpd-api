const mongoConfig = require('./db_config');
const mongoose = require('mongoose');
const logger = require('../src/utils/logger');

module.exports = () => {
    mongoose.connect(mongoConfig.uri, mongoConfig.dbOptions);

    mongoose.connection.on('connected', function(){
        logger.info('Mongoose connected');
    });

    mongoose.connection.on('error', err => {
        logger.error(`Mongoose error ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
        logger.info('Mongoose disconnected');
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            logger.info('Mongoose disconnected due to application termination');
            process.exit(0);
        });
    });
};
