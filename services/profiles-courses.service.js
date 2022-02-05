const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProfileCourseService {

  constructor () {}

  async validateIfExist (superKey) {

    console.log(superKey);

    const data = await models.ProfileCourse.findOne({
      where: superKey
    });
  
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

  async findOne (superKey) {
    const data = await this.validateIfExist(superKey);
    return data;
  }

  async create (request) {

    const id = faker.datatype.uuid();

    const newProfileCourse = await models.ProfileCourse.create({ id, ...request });

    return newProfileCourse;
  }

  async delete (superKey) {
    const data = await this.validateIfExist(superKey);
    await data.destroy();
    return { courseId: superKey.courseId };
  }
}

module.exports = ProfileCourseService;