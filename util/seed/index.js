const models = require('../../models');
const seedUsers= require('./users');
const db = require('../../db');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const seed = async ()=>{
  console.log("Seeding data...");
  db.connect(DB_HOST);
  // const users = await models.User.create(await seedUsers())
  for(let i = 0 ;i<10;i++) {
    const province = "Western"
    const city = "Colombo"
    const town = "Dehiwala"
    const category = "Electrical"
    const skills = ["wiring", "tripping"]
    const foundUser = {
      _id: "611e097e190e6851282a63cc"

    }
    const description = "Please fix the line " + i
    const lowerLimit = 200;
    const upperLimit = 500;
    await models.JobPosting.create({
      location: {
        province, city, town
      },
      category,
      skills,
      postedBy: foundUser._id,
      description,
      budgetRange: {
        lowerLimit,
        upperLimit
      }
    })
  }
    console.log('Data successfully seeded');
  process.exit(0);
};
seed().then(r => console.log("Completed"))