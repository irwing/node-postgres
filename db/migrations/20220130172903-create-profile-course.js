'use strict';

const { ProfileCourseSchema, PROFILE_COURSE_TABLE } = require('./../models/profile-course.model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PROFILE_COURSE_TABLE, ProfileCourseSchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(PROFILE_COURSE_TABLE);
  }
};
