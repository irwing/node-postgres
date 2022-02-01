const Joi = require('joi');

const search = Joi.string().min(1).max(300);
const limit = Joi.number().integer().min(1);
const page = Joi.number().integer().min(1);

const paginationSchema = Joi.object({
  search,
  limit,
  page
});

module.exports = { paginationSchema };