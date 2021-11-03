const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime
  type Rating{
      providerRating:Float
      requesterRating:Float
  }  
  type User {
    id: ID!
    username: String!
    email: String!
    nic: String
    fullname: String
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
    provider_rating: String
    provider_review_count: String
    requester_rating: String
    profile_state: String
    rating:Rating  
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
    updatedAt: DateTime
    state: String
  }
  type JobPostingFeed {
    jobPostings: [JobPosting]!
    cursor: String!
    hasNextPage: Boolean!
  }
  type JobBid {
    id: ID!
    proposedAmount: Float!
    proposedDate: DateTime!
    detailedBreakdown: String
    bidBy: User
    jobPosting: JobPosting
    state: String
    providerReview:String,
    providerRating:Float,
    requesterReview:String,
    requesterRating:Float,  
    updatedAt: DateTime
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
    location: String
    image1: String
    image2: String
    image3: String
    state: String
    estimate: String
    requestRating: Int
    requestReview: String
    customerReview: String
    customerRating: Int
    finalAmount: String
    hasPaid:Boolean
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
    complainer: User
    victim: String
    title: String
    complaint: String!
    createdAt: DateTime!
  }

  type Message {
    from: String
    body: String
    to: String!
  }

  type Conversation {
    id:ID
    members: [ID]
    createdAt:DateTime
   
  }

  type NewMessage{
    id:ID
    conversationID:ID
    sender:ID
    text:String
    createdAt:DateTime
  }

  type Query {
    users: [User!]!
    takeUsers(accountState: String!): [User!]!
    takeServiceProviders: [User!]!
    searchServiceProviderbyName(name: String!): [User!]!
    searchServiceProviderbyProfession(profession: String!): [User!]!
    searchServiceProviderbyProfessioninProvince(
      profession: String!
      province: String
      city: String
      rating: String
    ): [User!]!
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
    getMyBids(state: String): [JobBid]
    getJobBidById(id:ID!):JobBid!  
    getUserbyId(id: ID!): User!
    getServiceRequestByID(id: ID!): ServiceRequest!
    viewAllComplaints: [Complaint!]!
    viewAllServices: [Service!]!
    getMyJobPostings(state: String!): [JobPosting]
    getMyJobPostingBids(id: ID!): [JobBid]
    conversationsOfUser:[Conversation]
    getNewMessages(conversationID:ID):[NewMessage]
      
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): String!

    signIn(email: String!, password: String!): String!

    adminSignUp(username: String!, email: String!, password: String!): String!

    adminSignIn(email: String!, password: String!): String!

    makeMeServiceProvider(
      fullname: String!
      nic: String!
      profession: String!
      address: String!
      contactNumber: String!
      province: String!
      city: String!
      town: String!
      bio: String
    ): User!
    updateMe(
      fullname: String
      contactNum: String
      address: String
      profession: String
      province: String
      city: String
      town: String
      postalCode: String
    ): User
    registerServiceRequester(
      fullname: String!
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
      location: String
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

    changeStateJobBid(jobBidId: ID!, jobBidState: String!): JobBid!
    rejectJobBid(jobBidId: ID!): JobBid

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

    completeServiceRequest(id: ID, finalAmount: String): ServiceRequest!

    confirmCashPayment(id: ID): ServiceRequest!

    rescheduleServiceRequest(
      id: ID
      date: String!
      time: String!
    ): ServiceRequest!

    editServiceRequest(
      id: ID
      task: String!
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
      title: String
      complaint: String
    ): Complaint!

    sendMessage(from: String, body: String, to: String): Message

    newConverstion(
      senderID:ID
      recieverID:ID
    ):Conversation

    addMessage(
      conversationID:ID
      sender:ID
      text:String

    ):NewMessage

    approveServiceProvider(provider_id: ID): User!

    suspendServiceProvider(provider_id: ID): User!
    acceptJobBid(jobPostingId: ID!, jobBidId: ID!): JobBid!

    setProfileState(providerID: ID, state: String): User!
    removeServiceProvider(id: ID): Boolean!
    addReviewToBid(type:String,id:ID,rating:Float,review:String):JobBid
  }
`;
