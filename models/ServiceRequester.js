const mongoose = require('mongoose');

const ServiceRequesterSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  contactNum: {
    type: String,
    required: true
  },

  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  }
});

const ServiceRequester = mongoose.model(
  'ServiceRequester',
  ServiceRequesterSchema
);
module.exports = ServiceRequester;
