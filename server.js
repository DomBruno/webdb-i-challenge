// Import Modules
const express = require('express');
const helmet = require('helmet');

// Import Data Source
const db = require('./data/dbConfig.js');

// Create Server Object
const server = express();

// Import Router
const acccountsRouter = require('./routers/accountsRouter');


// Register Global Middleware
server.use(helmet());
server.use(express.json());

// Bind to Root URL
server.use('/api/accounts', accountsRouter);

// Call handler for root "/"
server.get('/', (req, res) => {
    res
    .status(418)
    .send("I'm a teapot!");
});

module.exports = server;