const User = require('./user');
const Location = require('./Location');
const ServiceRequestor = require('./ServiceRequester');
const JobPosting = require('./JobPosting')
const JobBid = require('./JobBid')
const models = {
  User,
  Location,
  ServiceRequester: ServiceRequestor,
  JobPosting,
  JobBid
};

module.exports = models;
