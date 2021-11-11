const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UserService {

  constructor () {}

  async validateIfExist (id) {
    const data = await models.User.findByPk(id);
    if (data === null) {
      throw boom.notFound('User not found');
    }

    return data;
  }

  async validateIfNotExist (email, id = null) {
    const data = await models.User.findOne({ where: { email: email } });

    if (data !== null) {
      throw boom.badRequest('The email is used');
    }
  }

  async find () {
    const data = await models.User.findAll();

    return data;
  }

  async findOne (id) {
    await this.validateIfExist(id);

    const data = await models.User.findByPk(id);

    return data;
  }

  async create (request) {
    const email = request.email;
    // await this.validateIfNotExist(email, null);

    const data = {
      id: faker.datatype.uuid(),
      ...request
    }
    const newUser = await models.User.create(data);

    return newUser;
  }

  async update (id, request) {

    // validate unique email
    const email = request.email;
    // await this.validateIfNotExist(email, id);

    const user = await this.findOne(id);
    const response = await user.update(request);

    return response;
  }

  async delete (id) {

    let user = await this.findOne(id);
    await user.destroy();

    return { id };
  }
}

module.exports = UserService;
