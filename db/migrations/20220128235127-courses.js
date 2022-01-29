'use strict';

const { CourseSchema, COURSE_TABLE } = require('./../models/course.model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(COURSE_TABLE, CourseSchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(COURSE_TABLE);
  }
};
