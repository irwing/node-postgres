const Joi = require('joi');

const id = Joi.string().uuid();
const email = Joi.string().email();
const password = Joi.string().min(8);
const photo = Joi.string().uri();

const getUserSchema = Joi.object({
  id: id.required()
});

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  photo: photo
});

const updateUserSchema = Joi.object({
  email: email,
  photo: photo
});

module.exports = { getUserSchema, createUserSchema, updateUserSchema };
