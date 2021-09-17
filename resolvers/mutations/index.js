const user_mutations = require('./user_mutations');
const admin_mutations = require('./admin_mutations');
const job_posting_mutations = require('./job_posting_mutations');
const service_requester_mutations = require('./service_requester_mutations');
const job_bid_mutations = require('./job_bid_mutations');
module.exports = {
  ...user_mutations,
  ...service_requester_mutations,
  ...job_posting_mutations,
  ...job_bid_mutations,
  ...admin_mutations
};
