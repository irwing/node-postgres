const faker = require('faker');
const boom = require('@hapi/boom');

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
    console.log(index);
    if (index === -1) {
      throw boom.notFound('User not found');
    }

    return index;
  }

  async validateIfNotExist (email) {
    const index = this.users.findIndex(item => item.email === email);
    if (index !== -1) {
      throw new Error('User exists');
    }

    return index;
  }

  async find () {
    return new Promise((resolve, reject, next) => {
      setTimeout(() => {
        resolve(this.users);
      }, 1000);
    })
    .then((result) => result)
    .catch(() =>  {
      throw new Error('Users not found');
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
    let index = await this.validateIfExist(id);

    const user = this.users[index];
    this.users[index] = {
      id,
      ...user,
      ...request
    };

    return this.users[index];
  }

  async delete (id) {
    let index = await this.validateIfExist(id);

    this.users.splice(index, 1);

    return { id };
  }
}

module.exports = UserService;
