const faker = require('faker');

class UserService {

  constructor () {
    this.users = [];
    this.generate ();
  }

  // TODO: *** delete this method when add real database
  // generate faker data
  generate () {
    for(let index = 0; index < 10; index++){
      let user = {
        email: faker.internet.email().toLowerCase(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        photo: faker.image.avatar()
      };

      this.users.push(user);
    }
  }

  create (request) {
    request.id = Math.floor(Math.random() * (9999999 - 1)) + 1;
    return request;
  }

  find () {
    return this.users;
  }

  findone () {

  }

  update () {

  }

  delete () {

  }
}

module.exports = UserService;
