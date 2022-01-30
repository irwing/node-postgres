const { Model, DataTypes, Sequelize } = require('sequelize');

const { PROFILE_TABLE } = require('./profile.model')
const { COURSE_TABLE } = require('./course.model')

const PROFILE_COURSE_TABLE = 'profiles_courses';

const ProfileCourseSchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true
  },
  profileId: {
    field: 'profile_id',
    allowNull: false,
    type: DataTypes.UUID,
    unique: false,
    references: {
        model: PROFILE_TABLE,
        key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  courseId: {
    field: 'course_id',
    allowNull: false,
    type: DataTypes.UUID,
    unique: false,
    references: {
      model: COURSE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
};


class ProfileCourse extends Model {

  static associate(models) {
    // 
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROFILE_COURSE_TABLE,
      modelName: 'ProfileCourse',
      timestamps: false
    }
  }
}

module.exports = { PROFILE_COURSE_TABLE, ProfileCourseSchema, ProfileCourse }

