const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    nic:String,
    contactNum:String,
    profession:String,
    address:String,
    province:String,
    city:String,
    town:String,
    bio:String,
    service_providing_status:Boolean
    roles:[String]  
  }

  type ServiceRequesterUser {
    id: ID!
    token: String!
    createdAt: String!
    username: String!
    email: String!
  }
  
  type Query {
    users: [User!]!
    me:User!  
  }
  type Mutation {
    signUp(username: String!, email: String!, password: String!): String!
    signIn(email:String!,password:String!):String! 

    makeMeServiceProvider(nic:String!,profession:String!,province:String!, city:String!,town:String!,bio:String):User!
    registerServiceRequester(
 
      contactNum: String!
      address: String!
      city: String!
      postalCode: String!
    ): User!

  }
`;
