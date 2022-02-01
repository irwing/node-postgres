const express = require('express');

const UserService = require('./../services/users.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { paginationSchema } = require('./../schemas/pagination.schema');
const { getUserSchema, createUserSchema, updateUserSchema, queryUserSchema } = require('./../schemas/user.schema');

const router = express.Router();
const service = new UserService();

function getDataPagination (data) {
  const search = data.search;
  const limit = parseInt(data.limit) || 10;
  const offset = parseInt(data.page) - 1 || 0;

  return { search, limit, offset };
}

// get all users
router.get('/', 
  validatorHandler(paginationSchema, 'query'),
  async (req, res, next) => {
    try {
      const users = await service.find({ 
        pagination: getDataPagination(req.query)
      });
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
