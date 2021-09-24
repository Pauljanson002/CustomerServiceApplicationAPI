const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type User {
    id: ID!
    username: String!
    email: String!
    nic: String
    fullname:String
    profession: String
    contactNum: String
    address: String
    province: String
    postalCode: String
    city: String
    town: String
    bio: String
    service_providing_status: Boolean
    roles: [String]
    provider_rating:String
    provider_review_count:String
    requester_rating:String
  }
  type Admin {
    id: ID!
    username: String!
    email: String!
  }
  type Location {
    province: String!
    city: String!
    town: String!
  }
  type BudgetRange {
    lowerLimit: Float!
    upperLimit: Float!
  }
  type JobPosting {
    id: ID!
    heading: String!
    location: Location!
    category: String!
    skills: [String]!
    postedBy: User!
    description: String
    budgetRange: BudgetRange
  }
  type JobPostingFeed {
    jobPostings: [JobPosting]!
    cursor: String!
    hasNextPage: Boolean!
  }
  type JobBid {
    proposedAmount: Float!
    proposedDate: DateTime!
    detailedBreakdown: String
    bidBy: User
    jobPosting: JobPosting
    state: String
  }

  type ServiceRequest {
    id: ID!
    requester_id: ID
    provider_id: ID
    date: String
    time: String
    payMethod: String
    task: String!
    min_price: String
    max_price: String
    location:String
    image1: String
    image2: String
    image3: String
    state: String
    estimate: String
    requestRating:Int
    requestReview:String
  }

  type Service {
    id: ID!
    service_name: String!
    description: String!
    user_type: String!
    image: String
  }

  type Complaint {
    id: ID!
    complainer: ID
    victim: String
    title:String
    complaint: String!
    createdAt: DateTime!
  }

  type Query {
    users: [User!]!
    searchServiceProviderbyName(name: String!): [User!]!
    searchServiceProviderbyProfession(profession: String!): [User!]!
    searchServiceProviderbyProfessioninProvince(profession: String!, province:String!): [User!]!
    viewAllServiceProviders: [User!]!
    me: User!
    pendingServiceRequestsForMe: [ServiceRequest!]
    acceptedServiceRequestsForMe: [ServiceRequest!]
    startedServiceRequestsForMe: [ServiceRequest!]
    completedServiceRequestsForMe: [ServiceRequest!]
    canceledServiceRequestsForMe: [ServiceRequest!]
    rejectedServiceRequestsForMe: [ServiceRequest!]
    reviewedServiceRequestsForMe: [ServiceRequest!]
    pendingServiceRequestsbyMe: [ServiceRequest!]
    acceptedServiceRequestsbyMe: [ServiceRequest!]
    startedServiceRequestsbyMe: [ServiceRequest!]
    completedServiceRequestsbyMe: [ServiceRequest!]
    canceledServiceRequestsbyMe: [ServiceRequest!]
    rejectedServiceRequestsbyMe: [ServiceRequest!]
    reviewedServiceRequestsbyMe: [ServiceRequest!]
    jobs: [JobPosting]
    jobPostingFeed(
      cursor: String
      province: String!
      city: String!
      town: String!
      category: String!
    ): JobPostingFeed
    jobPosting(id: ID!): JobPosting!
    viewAllServiceTypes: [Service]
    getMyBids: [JobBid]
    getUserbyId(id: ID!): User!
    getServiceRequestByID(id: ID!): ServiceRequest!
    viewAllComplaints: [Complaint!]!
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): String!

    signIn(email: String!, password: String!): String!

    adminSignUp(username: String!, email: String!, password: String!): String!

    adminSignIn(email: String!, password: String!): String!

    makeMeServiceProvider(
      nic: String!
      profession: String!
      province: String!
      city: String!
      town: String!
      bio: String
    ): User!

    registerServiceRequester(
      contactNum: String!
      address: String!
      city: String!
      postalCode: String!
    ): User!

    createServiceRequest(
      provider_id: ID
      date: String
      time: String
      payMethod: String
      task: String!
      min_price: String
      max_price: String
      location:String
      image1: String
      image2: String
      image3: String
    ): ServiceRequest!

    createBiddingJob(
      date: String
      time: String
      payMethod: String
      task: String!
      min_price: String
      max_price: String
      image1: String
      image2: String
      image3: String
    ): ServiceRequest!

    createJobPosting(
      heading: String!
      province: String!
      city: String!
      town: String!
      category: String!
      skills: [String]
      description: String!
      lowerLimit: Float!
      upperLimit: Float!
      payMethod: String
    ): JobPosting!

    createJobBid(
      proposedAmount: Float!
      proposedDate: String!
      detailedBreakdown: String
      jobPosting: ID!
    ): JobBid!

    createService(
      service_name: String
      description: String
      user_type: String
      image: String
    ): Service!

    cancelServiceRequest(id: ID): ServiceRequest!

    rejectServiceRequest(id: ID): ServiceRequest!

    acceptServiceRequest(id: ID, estimate: String): ServiceRequest!

    startServiceRequest(id: ID, estimate: String): ServiceRequest!

    completeServiceRequest(id: ID, finalAmount: Int): ServiceRequest!

    rescheduleServiceRequest(
      id: ID
      date: String!
      time: String!
    ): ServiceRequest!

    editServiceRequest(
      id: ID
      task: String!
      image1: String
      image2: String
      image3: String
    ): ServiceRequest!

    feedbackServiceRequest(
      id: ID
      requestRating: Int
      requestReview: String
    ): ServiceRequest!

    customerfeedbackServiceRequest(
      id: ID
      customerRating: Int
      customerReview: String
    ): ServiceRequest!

    makeComplaint(
      complainer: ID
      victim: String
      title:String
      complaint: String
    ): Complaint!

    acceptServiceProvider(
      provider_id:ID
    ):User!

    suspendServiceProvider(
      provider_id:ID
    ):User!
  }
`;
