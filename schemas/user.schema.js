const Joi = require('joi');

const id = Joi.string().uuid();
const email = Joi.string().email();
const password = Joi.string().min(8);

const getUserSchema = Joi.object({
  id: id.required()
});

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  email: email
});

module.exports = { getUserSchema, createUserSchema, updateUserSchema };
