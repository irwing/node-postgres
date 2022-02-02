const boom = require('@hapi/boom');

const { config } = require('./../config/config');

function checkApiKey (req, res, next) {
  const { api } = req.headers;
  if (!api || api != config.apiKey) {
    next(boom.unauthorized());
  }
  next();
}

// TODO: change to roles
function checkEmails(...emails) {
  return (req, res, next) => {
    console.log(req);
    const user = req.user;
    console.log(user.email);
    console.log(emails);
    if (emails.includes(user.email)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}

module.exports = { checkApiKey, checkEmails };