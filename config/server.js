const express = require('express');
const server = express();
const plants = require('../src/routes/plants');
const users = require('../src/routes/users');
const auth = require('../src/routes/auth');
const environment = require('../src/routes/environment');

server.use(express.json());

server.use('/api/plants', plants);
server.use('/api/users', users);
server.use('/api/environment', environment);
server.use('/api/auth', auth);

export default server;
