const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema(
  {
    complainer: {
      type: String,
      required: true
    },
    victim: {
      type: String,
      required: true
    },
    complaint: {
      type: String,
      required: true
    }
  },
  {
    // Assigns createdAt and updatedAt fields with a Date type
    timestamps: true
  }
);

const Complaint = mongoose.model('Complaint', ComplaintSchema);
module.exports = Complaint;
