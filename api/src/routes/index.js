const routes = require('express').Router();
const fetch = require('node-fetch');

// Base route - checking that user is connected to API
routes.get('/', async (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

// Test routes
const products = require('./products');
routes.use('/product', products);

module.exports = routes;
