const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres');

class UserService {

  constructor () {
    this.users = [];
    this.generate ();
    this.db = pool;
    this.db.on('error', (error) => console.log(error));
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
      throw boom.notFound('User not found');
    }

    return index;
  }

  async validateIfNotExist (email) {
    const index = this.users.findIndex(item => item.email === email);
    if (index !== -1) {
      throw boom.badRequest('User exists');
    }

    return index;
  }

  async find () {
    const sql = `SELECT * FROM public.users`;
    const query = await this.db.query(sql);
    return query.rows;
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
