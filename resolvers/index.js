const Query = require('./query');
const Mutation = require('./mutation');
const ServiceRequestors = require('./ServiceRequestors');

module.exports = {
  Query,
  Mutation,
  ...ServiceRequestors.Mutation
};
