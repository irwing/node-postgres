const { Model, DataTypes, Sequelize } = require('sequelize');

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
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
};


class Profile extends Model {

  static associate() {
    // associate
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

