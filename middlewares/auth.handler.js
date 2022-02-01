const boom = require('@hapi/boom');

const { config } = require('./../config/config');

function checkApiKey (req, res, next) {
  const { api } = req.headers;
  console.log(api);
  if (!api || api != config.apiKey) {
    next(boom.unauthorized());
  }
  next();
}

module.exports = { checkApiKey };