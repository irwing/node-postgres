const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi
  .string()
  .min(2)
  .max(50)
  .regex(/^\w+(?:\s+\w+)*$/)
  .messages({
    "string.pattern.base": "Name accepts alphabetic characters, numbers and spaces"
  });
const description = Joi
  .string()
  .min(10)
  .max(200)
  .regex(/^\w+(?:\s+\w+)*$/)
  .messages({
    "string.pattern.base": "Description accepts alphabetic characters, numbers and spaces"
  });

const getCourseSchema = Joi.object({
  id: id.required()
});

const createCourseSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  skills: Joi.array().items()
});

const updateCourseSchema = Joi.object({
  name: name,
  description: description,
  skills: Joi.array().items()
});

module.exports = { getCourseSchema, createCourseSchema, updateCourseSchema };
