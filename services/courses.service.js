const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { array } = require('joi');

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
      attributes: ['id', 'name', 'description'],
      include: [{ model: models.Skill, as: 'skills', attributes: ['id', 'name'] }]
    });

    return data;
  }

  async findOne (id) {
    await this.validateIfExist(id);

    const data = await models.Course.findByPk(id, {
      attributes: ['id', 'name', 'description'],
      include: [{ model: models.Skill, as: 'skills', attributes: ['id', 'name'] }]
    });

    return data;
  }

  async create (request) {

    const id = faker.datatype.uuid();

    const { skills, ... course } = request;
    
    const dataCourse = { id, ...course };

    const data = { ...dataCourse };

    const newCourse = await models.Course.create(data);

    if (skills.length > 0) {
      for (let index = 0; index < skills.length; index++) {
        const skill = skills[index];
        await models.Skill.create({
          id: faker.datatype.uuid(),
          name: skill.name,
          courseId: newCourse.id
        });
      }
    }

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
