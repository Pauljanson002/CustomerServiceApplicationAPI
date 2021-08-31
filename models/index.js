const User = require('./user');
const Location = require('./Location');
const ServiceRequestor = require('./ServiceRequester');
const JobPosting = require('./JobPosting')
const models = {
  User,
  Location,
  ServiceRequester: ServiceRequestor,
  JobPosting
};

module.exports = models;
