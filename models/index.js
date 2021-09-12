const User = require('./user');
const JobPosting = require('./JobPosting')
const JobBid = require('./JobBid')
const ServiceRequests=require('./serviceRequests')
const models = {
  User,
  JobPosting,
  JobBid,
  ServiceRequests,
};

module.exports = models;
