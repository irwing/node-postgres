const faker = require('faker');

class UserService {

  constructor () {
    this.users = [];
    this.generate ();
  }

  // TODO: *** delete this method when add real database
  generate () {
    for(let index = 1; index < 10; index++){
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
    const newUser = {
      id: faker.datatype.uuid(),
      ...request
    }

    this.users.push(newUser);
    return newUser;
  }

  find () {
    return this.users;
  }

  findOne (id) {
    return this.users.find(item => item.id === id);
  }

  update (id, request) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    const user = this.users[index];
    this.users[index] = {
      id,
      ...user,
      ...request
    };

    return this.users[index];
  }

  delete (id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    this.users.splice(index, 1);

    return { id };
  }
}

module.exports = UserService;
