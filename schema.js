const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type ServiceRequestorUser {
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

    registerServiceRequestor(
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

    loginServiceRequestor(
      username: String!
      password: String!
    ): ServiceRequestorUser!

    deleteServiceRequestor(user_id: ID!): String!
  }
`;
