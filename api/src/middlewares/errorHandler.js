const {
  GeneralError,
  BadRequest,
  NotFound,
  NotAuthorised,
} = require('../utils/errors');

const notFoundMiddleware = (req, res, next) => {
  try {
    throw new NotFound('This route does not exist');
  } catch (err) {
    next(err);
  }
};

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof BadRequest) {
    return res.status(err.getCode()).json({
      status: 'bad request',
      message: err.message,
    });
  }

  if (err instanceof NotFound) {
    return res.status(err.getCode()).json({
      status: 'not found',
      message: err.message,
    });
  }

  if (err instanceof NotAuthorised) {
    return res.status(err.getCode()).json({
      status: 'not authorised',
      message: err.message,
    });
  }

  if (err instanceof GeneralError) {
    console.error(err);
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err.name === 'UnauthorizedError') {
    console.error(err);
    return res.status(401).json({
      status: 'not authorised',
      message: err.message,
    });
  }

  //console.error(err);
  return res.status(500).json({
    status: 'error',
    message: err.message,
  });
};

module.exports = { notFoundMiddleware, errorHandlerMiddleware };
