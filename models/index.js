const User = require('./user');
const JobPosting = require('./JobPosting')
const JobBid = require('./JobBid')
const ServiceRequests=require('./serviceRequests')
const Service=require('./service')
const Admin = require('./admin')
const models = {
  User,
  JobPosting,
  JobBid,
  ServiceRequests,
  Service,
  Admin
};

module.exports = models;
