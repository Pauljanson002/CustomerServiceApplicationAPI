// Express for server side scripting
const express = require('express');
// Apollo server for graph ql
const {ApolloServer} = require('apollo-server-express');
// jwt for auth token management
const jwt = require('jsonwebtoken');
// Helmet for http header management and security
const helmet = require('helmet');
// Cross origin resource sharing
const cors = require('cors');
// Environment variable
require('dotenv').config();

// Connecting to database 
const DB_HOST = process.env.DB_HOST
const db = require('./db');
db.connect(DB_HOST);

// Setting up GraphQL server


//Express server setup
const port = process.env.PORT || 4000;
const app = express();
app.use(helmet());
app.use(cors());

app.listen({port},()=>{
  console.log(
    `Server running successfully at port ${port}`
  )
})
