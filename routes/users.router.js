const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {

  const users = [];

  // generate faker data
  for(let index = 0; index < 100; index++){

    // faker is used to create random simulation values
    user = {
      email: faker.internet.email().toLowerCase(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      photo: faker.image.avatar()
    };

    users.push(user);
  }

  res.json(users);
});

module.exports = router;
