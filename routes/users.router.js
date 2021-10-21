const express = require('express');

const UserService = require('./../services/users.service');

const router = express.Router();
const service = new UserService();

// get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// find a user
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// create a user
router.post('/', async (req, res, next) => {
  try {
    const request = req.body;
    const result = await service.create(request);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// update a user
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const request = req.body;
    const result = await service.update(id, request);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

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
