'use strict';

const { ProfileSchema, PROFILE_TABLE } = require('./../models/profile.model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PROFILE_TABLE, ProfileSchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(PROFILE_TABLE);
  }
};
