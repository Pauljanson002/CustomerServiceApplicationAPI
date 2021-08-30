const mongoose = require('mongoose');

const ServiceRequesterSchema = new mongoose.Schema({
  user_id: {
    type: String,
    ref: 'user'
  },

  contactNum: {
    type: String,
    required: true
  },

  location: {
    type: Map,
    of:String,
    ref: 'Location'
  }
});

const ServiceRequester = mongoose.model(
  'ServiceRequester',
  ServiceRequesterSchema
);
module.exports = ServiceRequester;
