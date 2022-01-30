const Joi = require('joi');

const id = Joi.string().uuid();
const email = Joi.string().email();
const password = Joi.string().min(8);

const page = Joi.number().integer().min(1);
const limit = Joi.number().integer().min(1);
// const sort: Joi.string().valid('id', 'email'),
// const order: Joi.string().valid('asc', 'desc')

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

const queryUserSchema = Joi.object({
  page,
  limit
});

module.exports = { getUserSchema, createUserSchema, updateUserSchema, queryUserSchema };
