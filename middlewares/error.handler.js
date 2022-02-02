function logErrors (err, req, res, next) {
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function secuelizeErrorHandler(err, req, res, next) {
  if (err && typeof err.errors !== 'undefined') {
    res.status(409).json({
      'statusCode': 409,
      'error': err.errors[0].type,
      'message': err.errors[0].message
    });
  }
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { logErrors, errorHandler, secuelizeErrorHandler, boomErrorHandler }
