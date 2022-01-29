const { Model, DataTypes, Sequelize } = require('sequelize');

const { COURSE_TABLE } = require('./course.model')

const SKILL_TABLE = 'skills';

const SkillSchema = {
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
  courseId: {
    field: 'course_id',
    allowNull: false,
    type: DataTypes.UUID,
    unique: true,
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


class Skill extends Model {

  static associate(models) {
    this.belongsTo(models.Course, {as: 'course'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SKILL_TABLE,
      modelName: 'Skill',
      timestamps: false
    }
  }
}

module.exports = { SKILL_TABLE, SkillSchema, Skill }