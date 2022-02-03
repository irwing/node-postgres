const Joi = require('joi');

const id = Joi.string().uuid();
const profileId = Joi.string().uuid();
const courseId = Joi.string().uuid();

const createProfileCourseSchema = Joi.object({
  courseId: courseId.required()
});

module.exports = { createProfileCourseSchema };
