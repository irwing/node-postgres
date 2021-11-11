const { User, UserSchema } = require('./user.model');
const { Profile, ProfileSchema } = require('./profile.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Profile.init(ProfileSchema, Profile.config(sequelize));
}

module.exports = setupModels;
