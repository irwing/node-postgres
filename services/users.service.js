const faker = require('faker');

class UserService {

  constructor () {
    this.users = [];
    this.generate ();
  }

  // TODO: *** delete this method when add real database
  generate () {
    for(let index = 0; index < 10; index++){
      let user = {
        id: faker.datatype.uuid(),
        email: faker.internet.email().toLowerCase(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        photo: faker.image.avatar()
      };

      this.users.push(user);
    }
  }

  create (request) {
    request.id = faker.datatype.uuid();
    this.users.push(request);
    return request;
  }

  find (id) {
    return this.users;
  }

  findOne (id) {
    return this.users.find(item => item.id === id);
  }

  update () {

  }

  delete () {

  }
}

module.exports = UserService;
