// const faker = require('faker');
// const users = [...Array(100)].map((user) => (
//   {
//     id: faker.datatype.uuid(),
//     email: faker.internet.email(),
//     password: 'qwerty123',
//     create_at: new Date()
//   }
// ))

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('users', users, {});
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete('users', null, {});
//   }
// };

const bcrypt = require('bcrypt');

let idAdmin = "4ac94e13-f7f2-4a6f-9cd0-d0de41161d51";
let idTeacher = "4ac94e13-f7f2-4a6f-9cd0-d0de41161d52";
let idStudent = "4ac94e13-f7f2-4a6f-9cd0-d0de41161d53";

const users = [
  {
    id: idAdmin,
    email: 'khalisser@gmail.com',
    password: bcrypt.hashSync('qwerty123', 10),
    create_at: new Date()
  },
  {
    id: idTeacher,
    email: 'naranjo@gmail.com',
    password: bcrypt.hashSync('qwerty123', 10),
    create_at: new Date()
  },
  {
    id: idStudent,
    email: 'irwing@gmail.com',
    password: bcrypt.hashSync('qwerty123', 10),
    create_at: new Date()
  }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};