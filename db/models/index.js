const { User, UserSchema } = require('./user.model');
const { Profile, ProfileSchema } = require('./profile.model');
const { Course, CourseSchema } = require('./course.model');
const { Skill, SkillSchema } = require('./skill.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Profile.init(ProfileSchema, Profile.config(sequelize));
  Course.init(CourseSchema, Course.config(sequelize));
  Skill.init(SkillSchema, Skill.config(sequelize));

  User.associate(sequelize.models);
  Profile.associate(sequelize.models);
  Skill.associate(sequelize.models);
}

module.exports = setupModels;
