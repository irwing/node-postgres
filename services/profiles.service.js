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
    const data = await models.Profile.findAll({
      include: ['user']
    });

    return data;
  }

  async findOne (id) {
    await this.validateIfExist(id);

    const data = await models.Profile.findByPk(id, {
      include: [
        { 
          model: models.User, 
          as: 'user',
          attributes: ['id', 'email']
        },
        { 
          model: models.Course, 
          as: 'courses',
          through: {attributes: []}
        }
      ]
    });

    return data;
  }

  async create (request) {

    const id = faker.datatype.uuid();

    const { user, ... profile } = request;
    const dataUser = { user: { id, ...user } };
    const dataProfile = { id, ...profile };

    const data = { ...dataProfile, ...dataUser };

    const newProfile = await models.Profile.create(data, {
      include: ['user']
    });

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
