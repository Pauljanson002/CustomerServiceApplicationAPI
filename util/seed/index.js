const models = require('../../models');
const seedUsers= require('./users');
const db = require('../../db');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const seed = async ()=>{
  console.log("Seeding data...");
  db.connect(DB_HOST);
  const users = await models.User.create(await seedUsers());
  console.log('Data successfully seeded');
  process.exit(0);
};
seed().then(r => console.log("Completed"))