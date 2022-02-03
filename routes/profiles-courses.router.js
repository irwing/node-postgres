const express = require('express');
const passport = require('passport');

const ProfileCourseService = require('./../services/profiles-courses.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProfileCourseSchema } = require('./../schemas/profile-course.schema');

const router = express.Router();
const service = new ProfileCourseService();

// get all profile course
router.get('/', async (req, res, next) => {
  try {
    const profilesCourses = await service.find();
    res.json(profilesCourses);
  } catch (error) {
    next(error);
  }
});

// create a profile course
router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createProfileCourseSchema, 'body'),
  async (req, res, next) => {
    try {
      const request = req.body;
      const result = await service.create(request);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// delete a profile course
router.delete('/:id', 
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await service.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;