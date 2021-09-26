const models = require("../../models")
const db = require("../../db")
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;

const seed_collections = async ()=>{
  console.log("Seeding services")
  const services = [
    {
      "_id": {
        "$oid": "614c769f8002d724c8235f07"
      },
      "service_name": "Plumbing",
      "description": "Repair a Leak\nStock Shower Door Installation\nShower RepairDishwasher Repair\nToilet Installation\nFaucet Installation\nWater Softener & Purification Installation\nSink Installation",
      "user_type": "Plumber",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQLeVJECt2XtWejc33mXTwy4e759p1jFb3Tw&usqp=CAU"
    }
    ,
    {
      "_id": {
        "$oid": "614c76d28002d724c8235f08"
      },
      "service_name": "Electrical",
      "description": "Outlet Installation\nElectrical Wiring Upgrade\nLight Fixture Installation\nElectrical Wiring Installation",
      "user_type": "Electrician",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOZsPhJyIQZGTq2P1szKSKv_p96muwm5wPrg&usqp=CAU"
    },
    {
      "_id": {
        "$oid": "614c78658002d724c8235f0a"
      },
      "service_name": "Handiwork",
      "description": "Gutter Repair\nWindow Mounted AC Installation\nGas Range Repair\nGlass Replacement\nWasher/Dryer Pedestal Installation\nOutdoor Furniture Assembly\nBarbeque Assembly\nSafe Installation\nRefrigerator Installation",
      "user_type": "Handyman",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeGZcy5NzJkN1ZSnPYfnmb474CZPoonbZ6IA&usqp=CAU"
    },
    {
      "_id": {
        "$oid": "614c78778002d724c8235f0b"
      },
      "service_name": "Painting",
      "description": "Exterior Painting\nGarage Floor Painting\nDeck Painting/Staining\nWallpaper Removal",
      "user_type": "Painter",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_S6TPAD0I0YD5cHBR9qd2wpTAUDGCbM7VSqiv49XqOZ195VwPqcc5sGBVK5h0CoaugN8&usqp=CAU"
    }
  ]
  for(let i =1 ;i<services.length;i++){
    await models.Service.create(services[i])
  }
  console.log("Data sucessfully seeded")
  process.exit(0);
}

seed_collections().then(r=>console.log("Completed"))