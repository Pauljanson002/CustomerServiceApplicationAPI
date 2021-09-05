const user_mutations = require('./user_mutations');

const service_requester_mutations = require('./service_requester_mutations');
module.exports = {
  ...user_mutations,
  ...service_requester_mutations
};
