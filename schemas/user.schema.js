const Joi = require('joi');

const id = Joi.string().uuid();
const email = Joi.string().email();
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

const getUserSchema = Joi.object({
  id: id.required()
});

const createUserSchema = Joi.object({
  email: email.required(),
  firstName: firstName.required(),
  lastName: lastName.required(),
  photo: photo
});

const updateUserSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  photo: photo
});

module.exports = { getUserSchema, createUserSchema, updateUserSchema };
