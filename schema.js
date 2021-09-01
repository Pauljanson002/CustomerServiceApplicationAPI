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
  type Location {
      province:String!,
      city:String!,
      town:String!
  }
  type BudgetRange{
      lowerLimit: Float!
      upperLimit:Float!
  }
  type JobPosting {
      id:ID!
      location:Location!
      category:String!
      skills:[String]!
      postedBy:User!
      description:String,
      budgetRange:BudgetRange
  }
  type JobPostingFeed{
      jobPostings:[JobPosting]!
      cursor:String!
      hasNextPage:Boolean!
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
      jobs:[JobPosting!]
      jobPostingFeed(cursor:String,province:String!,city:String!,town:String!,category:String!):JobPostingFeed
      jobPosting(id:ID!):JobPosting!
      
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
      
#----------------------------------------------------------Job Posting mutations ---------------------------------------------------------
      createJobPosting(province:String!,city:String!,town:String!,
      category:String!,skills:[String],description:String!,lowerLimit:Float!,upperLimit:Float!):JobPosting!
      
  }
`;
