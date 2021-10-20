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

  async validateIfExist (id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
  }

  async validateIfNotExist (email) {
    const index = this.users.findIndex(item => item.email === email);
    if (index !== -1) {
      throw new Error('User exists');
      console.log(1);
      return false;
    }
  }

  async find () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users);
      }, 5000)
    });
  }

  async findOne (id) {
    await this.validateIfExist(id);

    return this.users.find(item => item.id === id);
  }

  async create (request) {

    const email = request.email;

    await this.validateIfNotExist(email);

    const newUser = {
      id: faker.datatype.uuid(),
      ...request
    }

    this.users.push(newUser);
    return newUser;
  }

  async update (id, request) {
    await this.validateIfExist(id);

    const user = this.users[index];
    this.users[index] = {
      id,
      ...user,
      ...request
    };

    return this.users[index];
  }

  async delete (id) {
    await this.validateIfExist(id);

    this.users.splice(index, 1);

    return { id };
  }
}

module.exports = UserService;
