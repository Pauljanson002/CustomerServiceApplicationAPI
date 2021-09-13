const User = require('./user');
const JobPosting = require('./JobPosting')
const JobBid = require('./JobBid')
const ServiceRequests=require('./serviceRequests')
const Service=require('./service')
const models = {
  User,
  JobPosting,
  JobBid,
  ServiceRequests,
  Service
};

module.exports = models;
