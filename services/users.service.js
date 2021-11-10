const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UserService {

  constructor () {}

  async validateIfExist (id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }

    return index;
  }

  async validateIfNotExist (email) {
    const index = this.users.findIndex(item => item.email === email);
    if (index !== -1) {
      throw boom.badRequest('User exists');
    }

    return index;
  }

  async find () {
    const data = await models.User.findAll();
    return data;
  }

  async findOne (id) {
    await this.validateIfExist(id);

    return this.users.find(item => item.id === id);
  }

  async create (request) {

    const email = request.email;

    await this.validateIfNotExist(email);

    const newUser = {
      id: faker.datatype.uuid(),
      ...request
    }

    this.users.push(newUser);
    return newUser;
  }

  async update (id, request) {
    let index = await this.validateIfExist(id);

    const user = this.users[index];
    this.users[index] = {
      id,
      ...user,
      ...request
    };

    return this.users[index];
  }

  async delete (id) {
    let index = await this.validateIfExist(id);

    this.users.splice(index, 1);

    return { id };
  }
}

module.exports = UserService;
