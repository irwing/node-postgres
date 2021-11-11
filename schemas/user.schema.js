const Joi = require('joi');

const id = Joi.string().uuid();
const email = Joi.string().email();
const photo = Joi.string().uri();

const getUserSchema = Joi.object({
  id: id.required()
});

const createUserSchema = Joi.object({
  email: email.required(),
  photo: photo
});

const updateUserSchema = Joi.object({
  email: email,
  photo: photo
});

module.exports = { getUserSchema, createUserSchema, updateUserSchema };
