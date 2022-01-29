const { Model, DataTypes, Sequelize } = require('sequelize');

const { PROFILE_TABLE } = require('./profile.model')

const COURSE_TABLE = 'courses';

const CourseSchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true
  },
  name: {
    field: 'name',
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    field: 'description',
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
};


class Course extends Model {

  static config(sequelize) {
    return {
      sequelize,
      tableName: COURSE_TABLE,
      modelName: 'Course',
      timestamps: false
    }
  }
}

module.exports = { COURSE_TABLE, CourseSchema, Course }

