const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
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
  }
  type Mutation {
    signUp(username: String!, email: String!, password: String!): ID!
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
