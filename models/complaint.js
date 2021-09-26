const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const ComplaintSchema = new mongoose.Schema(
  {
    complainer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    victim: {
      type: String,
      
    },
    title:{
      type:String,
      
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
