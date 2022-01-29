const { User, UserSchema } = require('./user.model');
const { Profile, ProfileSchema } = require('./profile.model');
const { Course, CourseSchema } = require('./course.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Profile.init(ProfileSchema, Profile.config(sequelize));
  Course.init(CourseSchema, Course.config(sequelize));

  User.associate(sequelize.models);
  Profile.associate(sequelize.models);
}

module.exports = setupModels;
