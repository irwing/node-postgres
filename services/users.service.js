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

  async find (req) {

    const optionsProfile = {
      model: models.Profile,
      as: 'profile',
      attributes: ['firstName', 'lastName', 'photo'],
      required: true,
      where: {}
    };
    
    const options = {
      attributes: ['id', 'email'],
      include: [optionsProfile],
      where: {}
    };

    // apply search
    if (req.pagination.search != null) {
      options.where.email = req.pagination.search;
    }
    
    // apply pagination
    if (req.pagination.offset && req.pagination.limit) {
      options.limit = req.pagination.limit;
      options.offset = req.pagination.offset;
    }
    console.log(options);

    const data = await models.User.findAll(options);

    return data;
  }

  async findOne (id) {
    await this.validateIfExist(id);

    const data = await models.User.findByPk(id, {
      include: ['profile']
    });

    return data;
  }

  async create (request) {

    const data = {
      id: faker.datatype.uuid(),
      ...request
    }
    const newUser = await models.User.create(data);

    return newUser;
  }

  async update (id, request) {

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
