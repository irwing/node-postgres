'use strict';

const faker = require('faker');
const users = [...Array(100)].map((user) => (
  {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: 'qwerty123',
    create_at: new Date()
  }
))

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};