const express = require('express');

const UserService = require('./../services/users.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { getUserSchema, createUserSchema, updateUserSchema, queryUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

// get all users
router.get('/', 
  validatorHandler(queryUserSchema, 'query'),
  async (req, res, next) => {
    try {

      let { limit, page } = req.query;
      let optionsPagination = {
        limit: Number(limit) || 10,
        page: Number(page) || 1
      }

      const users = await service.find(optionsPagination);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

// find a user
router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// create a user
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const request = req.body;
      const result = await service.create(request);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// update a user
router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
    try {
      const { id } = req.params;
      const request = req.body;
      const result = await service.update(id, request);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// delete a user
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.delete(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
