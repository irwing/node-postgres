const express = require('express');

const UserService = require('./../services/users.service');

const router = express.Router();
const service = new UserService();

// get data
router.get('/', (req, res) => {
  const users = service.find();
  res.json(users);
});

// save data
router.post('/', (req, res) => {
  const request = req.body;
  const result = service.create(request);
  res.json(result);
});

module.exports = router;
