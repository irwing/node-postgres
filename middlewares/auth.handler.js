const boom = require('@hapi/boom');

const { config } = require('./../config/config');

function checkApiKey (req, res, next) {
  const { api } = req.headers;
  if (!api || api != config.apiKey) {
    next(boom.unauthorized());
  }
  next();
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.rolId)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}

module.exports = { checkApiKey, checkRoles };