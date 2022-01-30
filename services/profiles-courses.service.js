const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProfileCourseService {

  constructor () {}

  async validateIfExist (id) {
    const data = await models.ProfileCourse.findByPk(id);
    if (data === null) {
      throw boom.notFound('Profile Course not found');
    }

    return data;
  }

  async find () {
    const data = await models.ProfileCourse.findAll({
      include: ['profile', 'course']
    });

    return data;
  }

  async findOne (id) {
    await this.validateIfExist(id);

    const data = await models.ProfileCourse.findByPk(id, {
      include: ['courses']
    });

    return data;
  }

  async create (request) {

    const id = faker.datatype.uuid();

    const newProfileCourse = await models.ProfileCourse.create({ id, ...request });

    return newProfileCourse;
  }

  async delete (id) {

    let userProfileCourse = await this.findOne(id);
    await userProfileCourse.destroy();

    return { id };
  }
}

module.exports = ProfileCourseService;
