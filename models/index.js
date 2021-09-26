const User = require('./user');
const Admin = require('./admin');
const JobPosting = require('./JobPosting');
const JobBid = require('./JobBid');
const ServiceRequests = require('./serviceRequests');
const Service = require('./service');
const Complaint = require('./complaint');
const models = {
  User,
  JobPosting,
  JobBid,
  ServiceRequests,
  Service,
  Admin,
  Complaint
};

module.exports = models;
