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
const courseId = Joi.string().uuid();

const getSkillSchema = Joi.object({
  id: id.required()
});

const createSkillSchema = Joi.object({
  name: name.required(),
  courseId: courseId.required()
});

const updateSkillSchema = Joi.object({
  name: name,
  courseId: courseId
});

module.exports = { getSkillSchema, createSkillSchema, updateSkillSchema };
