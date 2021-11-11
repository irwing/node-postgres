const Joi = require('joi');

const id = Joi.string().uuid();
const firstName = Joi
  .string()
  .min(2)
  .max(50)
  .regex(/^\w+(?:\s+\w+)*$/)
  .messages({
    "string.pattern.base": "First Name accepts alphabetic characters, numbers and spaces"
  });
const lastName = Joi
  .string()
  .min(2)
  .max(50)
  .regex(/^\w+(?:\s+\w+)*$/)
  .messages({
    "string.pattern.base": "Last Name accepts alphabetic characters, numbers and spaces"
  });
const photo = Joi.string().uri();

const getProfileSchema = Joi.object({
  id: id.required()
});

const createProfileSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  photo: photo
});

const updateProfileSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  photo: photo
});

module.exports = { getProfileSchema, createProfileSchema, updateProfileSchema };
