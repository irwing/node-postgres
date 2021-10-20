const usersRouter = require('./users.router');

function routerApi(app) {
  app.use('/users', usersRouter);
}

module.exports = routerApi;
