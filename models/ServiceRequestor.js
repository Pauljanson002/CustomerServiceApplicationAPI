const mongoose = require('mongoose');

const ServiceRequestorSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: 'user'
  },

  contactNum: {
    type: String,
    required: true
  },

  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: 'Location'
  }
});

const ServiceRequestor = mongoose.model(
  'ServiceRequestor',
  ServiceRequestorSchema
);
module.exports = ServiceRequestor;
