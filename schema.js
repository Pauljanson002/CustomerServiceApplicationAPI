const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    nic:String,
    profession:String,
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
    addLocation(
      address: String!
      city: String!
      town: String!
      postalCode: String!
    ): ID!

    registerServiceRequester(
      username: String!
      email: String!
      contactNum: String!
      address: String!
      city: String!
      town: String!
      postalCode: String!
      password: String!
      confirmPassword: String!
    ): String!

    loginServiceRequester(
      username: String!
      password: String!
    ): ServiceRequesterUser!

    deleteServiceRequester(user_id: ID!): String!
  }
`;
