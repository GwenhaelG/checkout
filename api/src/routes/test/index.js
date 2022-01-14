// Import modules
const tests = require('express').Router();

// GET
tests.get('/', async (req, res) => {
  res.status(200).json({ message: 'test1!' });
});

module.exports = tests;
