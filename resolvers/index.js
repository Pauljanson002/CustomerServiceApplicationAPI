const Query = require('./queries');
const Mutation = require('./mutations');
const Nested = require('./nested')
module.exports = {
  Query,
  Mutation,
  ...Nested
};
