const User = require('./user');
const Location = require('./Location');
const ServiceRequestor = require('./ServiceRequester');
const models = {
  User,
  Location,
  ServiceRequester: ServiceRequestor
};

module.exports = models;
