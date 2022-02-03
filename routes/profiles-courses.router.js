const express = require('express');
const passport = require('passport');

const ProfileCourseService = require('./../services/profiles-courses.service');
const { checkRoles } = require('./../middlewares/auth.handler');
const validatorHandler = require('../middlewares/validator.handler');
const { createProfileCourseSchema } = require('./../schemas/profile-course.schema');

const router = express.Router();
const service = new ProfileCourseService();

// get all profile course
router.get('/', 
  async (req, res, next) => {
    try {
      const profilesCourses = await service.find(req.user);
      res.json(profilesCourses);
    } catch (error) {
      next(error);
    }
  }
);

// create a profile course
router.post('/',
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