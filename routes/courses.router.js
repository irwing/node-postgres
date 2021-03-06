const express = require('express');
const passport = require('passport');

const CourseService = require('./../services/courses.service');
const { checkRoles } = require('./../middlewares/auth.handler');
const validatorHandler = require('./../middlewares/validator.handler');
const { getCourseSchema, createCourseSchema, updateCourseSchema } = require('./../schemas/course.schema');

const router = express.Router();
const service = new CourseService();

// get all course
router.get('/', 
  async (req, res, next) => {
    try {
      const courses = await service.find();
      res.json(courses);
    } catch (error) {
    next(error);
    }
  }
);

// find a course
router.get('/:id',
  validatorHandler(getCourseSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const course = await service.findOne(id);
      res.json(course);
    } catch (error) {
      next(error);
    }
  }
);

// create a course
router.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createCourseSchema, 'body'),
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

// update a course
router.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCourseSchema, 'params'),
  validatorHandler(updateCourseSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const request = req.body;
      const result = await service.update(id, request);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// delete a course
router.delete('/:id', 
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
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