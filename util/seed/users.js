const faker = require('faker');
const bcrypt = require('bcrypt');
const seedUsers = async ()=>{
  console.log('Seeding users....');
  let users = [];
  for(let i = 0;i<10;i++){
    let user = {
      username:faker.internet.userName(),
      password:await bcrypt.hash('root0',10),
      email:faker.internet.email()
    };
    users.push(user);
  }
  return users;
}

module.exports = seedUsers;