const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const {
  notFoundMiddleware,
  errorHandlerMiddleware,
} = require('./middlewares/errorHandler');

// Create a new Express app
const app = express();
app.use(express.static('public'));

// Accept cross-origin requests from the frontend app
app.use(
  cors({
    origin: ['http://localhost:3000', 'localhost:3000'],
  })
);

// Unsecure route -- returns one invite by hash
const bodyParser = require('body-parser');

// Parse bodies
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Health check route
const ping = (req, res) => {
  res.send({
    msg: 'OK',
  });
};
app.get('/ping', ping);

app.use('/', routes);

// Add middlewares to process error handling
app.use(notFoundMiddleware); /* route is not found */
app.use(errorHandlerMiddleware); /* async error handler */

// Start the app
app.listen(process.env.PORT || 3001, () =>
  console.log('API listening on 3001')
);

module.exports = app;
