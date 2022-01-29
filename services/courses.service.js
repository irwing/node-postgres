const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CourseService {

  constructor () {}

  async validateIfExist (id) {
    const data = await models.Course.findByPk(id);
    if (data === null) {
      throw boom.notFound('Course not found');
    }

    return data;
  }

  async find () {
    const data = await models.Course.findAll({
      include: ['skills']
    });

    return data;
  }

  async findOne (id) {
    await this.validateIfExist(id);

    const data = await models.Course.findByPk(id, {
      include: ['skills']
    });

    return data;
  }

  async create (request) {

    const id = faker.datatype.uuid();

    const { ... course } = request;
    const dataCourse = { id, ...course };

    const data = { ...dataCourse };

    const newCourse = await models.Course.create(data);

    return newCourse;
  }

  async update (id, request) {

    const course = await this.findOne(id);
    const response = await course.update(request);

    return response;
  }

  async delete (id) {

    let course = await this.findOne(id);
    await course.destroy();

    return { id };
  }
}

module.exports = CourseService;
