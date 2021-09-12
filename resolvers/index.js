const Query = require('./queries');
const Mutation = require('./mutations');
const Nested = require('./nested')
const { GraphQLDateTime } = require('graphql-iso-date');
module.exports = {
  Query,
  Mutation,
  ...Nested,
  DateTime:GraphQLDateTime
};
