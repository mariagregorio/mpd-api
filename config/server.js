const express = require('express');
const server = express();
const plants = require('../src/routes/plants');
const users = require('../src/routes/users');

server.use(express.json());

server.use('/api/plants', plants);
server.use('/api/users', users);

export default server;
