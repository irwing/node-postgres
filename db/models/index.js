const { User, UserSchema } = require('./user.model');
const { Profile, ProfileSchema } = require('./profile.model');
const { Course, CourseSchema } = require('./course.model');
const { Skill, SkillSchema } = require('./skill.model');
const { ProfileCourse, ProfileCourseSchema } = require('./profile-course.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Profile.init(ProfileSchema, Profile.config(sequelize));
  Course.init(CourseSchema, Course.config(sequelize));
  Skill.init(SkillSchema, Skill.config(sequelize));
  ProfileCourse.init(ProfileCourseSchema, ProfileCourse.config(sequelize));

  User.associate(sequelize.models);
  Profile.associate(sequelize.models);
  Course.associate(sequelize.models);
  Skill.associate(sequelize.models);
  ProfileCourse.associate(sequelize.models);
}

module.exports = setupModels;
