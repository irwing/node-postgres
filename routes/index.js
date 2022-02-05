const express = require('express');
const passport = require('passport');

const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const coursesRouter = require('./courses.router');

function routerApi(app) {

  const router = express.Router();

  app.use('/api/v1', router);

  router.use('/auth', authRouter);
  router.use('/courses', coursesRouter);
  router.use(
    '/profile', 
    passport.authenticate('jwt', {session: false}),
    profileRouter
  );
}

module.exports = routerApi;