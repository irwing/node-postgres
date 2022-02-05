const express = require('express');
const boom = require('@hapi/boom');

const ProfileService = require('./../services/profiles.service');
const CourseService = require('./../services/courses.service');
const ProfileCourseService = require('./../services/profiles-courses.service');
const validatorSchema = require('./../middlewares/validator.handler');
const { createProfileCourseSchema } = require('./../schemas/profile-course.schema');

const router = express.Router();
const service = new ProfileService();
const serviceCourse = new CourseService();
const serviceProfileCourse = new ProfileCourseService();

// get profile connected
router.get('/',
  async (req, res, next) => {
    try {
      const id = req.user.userId;
      const profile = await service.findOne(id);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }
);

// add course to profile
router.post('/courses',
  validatorSchema(createProfileCourseSchema),
  async (req, res, next) => {
    try {
      const data = {
        profileId: req.user.userId,
        courseId: req.body.courseId
      };

      // validate if the course is already in the profile
      const profile = await service.findOne(data.profileId);
      const myCourses = profile.courses;
      const courseExist = myCourses.find(course => course.id === data.courseId);
      if (courseExist) {
        throw boom.badRequest('Course already in the profile');
      }

      // validate if the course exist
      const course = await serviceCourse.findOne(data.courseId);
      if (!course) {
        throw boom.badRequest('Course not found');
      }

      await serviceProfileCourse.create(data);
      res.json({ courseId: data.courseId });
    } catch (error) {
      next(error);
    }
  }
);

// delete course from profile
router.delete('/courses/:id',
  async (req, res, next) => {
    try {
      const superKey = {
        profileId: req.user.userId,
        courseId: req.params.id
      };

      const result = await serviceProfileCourse.delete(superKey);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;