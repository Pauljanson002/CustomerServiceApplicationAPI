const User = require('./user');
const Admin = require('./admin');
const JobPosting = require('./JobPosting');
const JobBid = require('./JobBid');
const ServiceRequests = require('./serviceRequests');
const Service = require('./service');
const Complaint = require('./complaint');
const Conversation =require('./Conversation');
const Message=require('./Message');
const models = {
  User,
  JobPosting,
  JobBid,
  ServiceRequests,
  Service,
  Admin,
  Complaint,
  Conversation,
  Message,
};

module.exports = models;
