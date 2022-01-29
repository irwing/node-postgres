const express = require('express');

const usersRouter = require('./users.router');
const profilesRouter = require('./profiles.router');
const coursesRouter = require('./courses.router');
const skillsRouter = require('./skills.router');

function routerApi(app) {

  const router = express.Router();

  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/profiles', profilesRouter);
  router.use('/courses', coursesRouter);
  router.use('/skills', skillsRouter);
}

module.exports = routerApi;
