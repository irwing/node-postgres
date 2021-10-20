const express = require('express');

const UserService = require('./../services/users.service');

const router = express.Router();
const service = new UserService();

// get all users
router.get('/', (req, res) => {
  const users = service.find();
  res.json(users);
});

// find a user
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);
  console.log(1, user);
  res.json(user);
});

// create a user
router.post('/', (req, res) => {
  const request = req.body;
  const result = service.create(request);
  res.json(result);
});

// update a user
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const request = req.body;
  const result = service.update(id, request);
  res.json(result);
});

// delete a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const result = service.delete(id);
  res.json(result);
});


module.exports = router;
