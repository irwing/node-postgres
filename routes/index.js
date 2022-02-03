const express = require('express');
const passport = require('passport');
const { checkRoles } = require('./../middlewares/auth.handler');

const usersRouter = require('./users.router');
const profilesRouter = require('./profiles.router');
const profileRouter = require('./profile.router');
const coursesRouter = require('./courses.router');
const skillsRouter = require('./skills.router');
const profilesCoursesRouter = require('./profiles-courses.router');
const authRouter = require('./auth.router');

function routerApi(app) {

  const router = express.Router();

  app.use('/api/v1', router);
  
  router.use(
    '/users', 
    passport.authenticate('jwt', {session: false}),
    checkRoles('admin'),
    usersRouter
  );
  
  router.use(
    '/profiles', 
    passport.authenticate('jwt', {session: false}),
    profilesRouter
  );

  router.use(
    '/profile', 
    passport.authenticate('jwt', {session: false}),
    profileRouter
  );
  
  router.use('/courses', coursesRouter);

  router.use('/skills', skillsRouter);

  router.use(
    '/profiles_courses', 
    passport.authenticate('jwt', { session: false }),
    checkRoles('student'),
    profilesCoursesRouter
  );

  router.use('/auth', authRouter);
}

module.exports = routerApi;
