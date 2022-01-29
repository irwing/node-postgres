'use strict';

const { SkillSchema, SKILL_TABLE } = require('./../models/skill.model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(SKILL_TABLE, SkillSchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(SKILL_TABLE);
  }
};
