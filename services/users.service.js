const faker = require('faker');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
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

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  }

  async create (request) {

    const data = {
      id: faker.datatype.uuid(),
      ...request
    }

    // hashin password
    data.password = await bcrypt.hashSync(data.password, 10);

    const newUser = await models.User.create(data);

    // not response with password
    delete newUser.dataValues.password;

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
