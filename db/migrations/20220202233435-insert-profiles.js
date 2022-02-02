
let idAdmin = "4ac94e13-f7f2-4a6f-9cd0-d0de41161d51";
let idTeacher = "4ac94e13-f7f2-4a6f-9cd0-d0de41161d52";
let idStudent = "4ac94e13-f7f2-4a6f-9cd0-d0de41161d53";

const profiles = [
  {
    id: idAdmin,
    first_name: "Khalisser",
    last_name: ".",
    photo: "https://avatars.githubusercontent.com/u/499907?v=4",
    create_at: new Date(),
    user_id: idAdmin,
    rol_id: "admin"
  },
  {
    id: idTeacher,
    first_name: "Naranjo",
    last_name: ".",
    photo: "https://avatars.githubusercontent.com/u/499907?v=4",
    create_at: new Date(),
    user_id: idTeacher,
    rol_id: "teacher"
  },
  {
    id: idStudent,
    first_name: "Irwing",
    last_name: ".",
    photo: "https://avatars.githubusercontent.com/u/499907?v=4",
    create_at: new Date(),
    user_id: idStudent,
    rol_id: "student"
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('profiles', profiles, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('profiles', null, {});
  }
};