const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model')

const PROFILE_TABLE = 'profiles';

const ProfileSchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true
  },
  firstName: {
    field: 'first_name',
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    field: 'last_name',
    allowNull: false,
    type: DataTypes.STRING
  },
  photo: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.UUID,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  // TODO: I must then create a role table
  rolId: {
    field: 'rol_id',
    allowNull: false,
    type: DataTypes.STRING,
    // unique: true,
    // references: {
    //   model: USER_TABLE,
    //   key: 'id'
    // },
    // onUpdate: 'CASCADE',
    // onDelete: 'CASCADE'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
};


class Profile extends Model {

  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
    this.belongsToMany(models.Course, {
      as: 'courses',
      through: models.ProfileCourse,
      foreignKey: 'profileId',
      otherKey: 'courseId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PROFILE_TABLE,
      modelName: 'Profile',
      timestamps: false
    }
  }
}

module.exports = { PROFILE_TABLE, ProfileSchema, Profile }

