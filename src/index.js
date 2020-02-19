require('dotenv').config();
import server from '../config/server';
const dbConnect = require('../config/database');
const logger = require('./utils/logger');

server.listen(process.env.PORT, () => logger.info(`listening on port ${process.env.PORT}`));
dbConnect();
