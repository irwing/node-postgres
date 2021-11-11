const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProfileService {

  constructor () {}

  async validateIfExist (id) {
    const data = await models.Profile.findByPk(id);
    if (data === null) {
      throw boom.notFound('Profile not found');
    }

    return data;
  }

  async find () {
    const data = await models.Profile.findAll();

    return data;
  }

  async findOne (id) {
    await this.validateIfExist(id);

    const data = await models.Profile.findByPk(id);

    return data;
  }

  async create (request) {

    const data = {
      id: faker.datatype.uuid(),
      ...request
    }
    const newProfile = await models.Profile.create(data);

    return newProfile;
  }

  async update (id, request) {

    const profile = await this.findOne(id);
    const response = await profile.update(request);

    return response;
  }

  async delete (id) {

    let profile = await this.findOne(id);
    await profile.destroy();

    return { id };
  }
}

module.exports = ProfileService;
