const routes = require('express').Router();
const fetch = require('node-fetch');

// Base route - checking that user is connected to API
routes.get('/', async (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

// Test routes
const tests = require('./test');
routes.use('/test', tests);

module.exports = routes;
