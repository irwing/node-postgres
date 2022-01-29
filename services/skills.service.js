const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class SkillService {

  constructor () {}

  async validateIfExist (id) {
    const data = await models.Skill.findByPk(id);
    if (data === null) {
      throw boom.notFound('Skill not found');
    }

    return data;
  }

  async find () {
    const data = await models.Skill.findAll({
      include: ['course']
    });

    return data;
  }

  async findOne (id) {
    await this.validateIfExist(id);

    const data = await models.Skill.findByPk(id, {
      include: ['course']
    });

    return data;
  }

  async create (request) {

    const id = faker.datatype.uuid();

    const { ... skill } = request;
    const dataSkill = { id, ...skill };

    const data = { ...dataSkill };

    const newSkill = await models.Skill.create(data, {
      include: ['course']
    });

    return newSkill;
  }

  async update (id, request) {

    const skill = await this.findOne(id);
    const response = await skill.update(request);

    return response;
  }

  async delete (id) {

    let skill = await this.findOne(id);
    await skill.destroy();

    return { id };
  }
}

module.exports = SkillService;
