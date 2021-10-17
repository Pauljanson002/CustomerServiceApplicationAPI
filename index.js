// Express for server side scripting
const express = require('express');

// jwt for auth token management
const jwt = require('jsonwebtoken');
// Helmet for http header management and security
const helmet = require('helmet');
// Cross origin resource sharing
const cors = require('cors');
const bodyParser = require('body-parser')
// Environment variable
require('dotenv').config();

// Connecting to database 
const DB_HOST = process.env.DB_HOST
const db = require('./db');
db.connect(DB_HOST);
const models = require('./models')







// Setting up GraphQL server
// Apollo server for graph ql
const {ApolloServer} = require('apollo-server-express');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const getUser = token=>{
  if(token){
    try{
      return jwt.verify(token,process.env.JWT_SECRET);
    }catch (e) {
      console.log(e)
      throw new Error("Session invalid")
    }
  }
}
async function startServer(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:async ({req})=>{
      const token = req.headers.authorization;
      const user = getUser(token);
      return {models,user};
    }
  })
  await server.start();
  server.applyMiddleware({app,path:'/api'});
}
//Express server setup
const port = process.env.PORT || 4000;
const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Todo move this

app.post("/payment/notify",async(req,res)=>{

  if(req.body.status_code === '2'){
    const bid = await models.JobBid.findByIdAndUpdate(req.body.order_id.substr(1),{
      $set:{
        state:"paid"
      }
    })
    const jobPosting = await models.JobPosting.findByIdAndUpdate(bid.jobPosting,{
      $set:{
        state:"completed"
      }
    })
    return res.status(200).json({
      "message":"done",
      "bid_id":bid._id
    })
  }
  return res.status(400).json({
    "message":"Failed"
  })

})

startServer(app).then(()=>{
  app.listen({port},()=>{
    console.log(
      `GraphQL Server is running successfully at port ${port}`
    )
  })
})
