const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const ServiceRequestSchema = new mongoose.Schema(
  {
    requester_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    accepted_provider_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    isBid: {
      type: Boolean,
      default: false
    },
    task: {
      type: String,
      required: true
    },
    image1: 
      {
        data: Buffer,
        contentType: String
      }
    ,
    image2: 
    {
      data: Buffer,
      contentType: String
    }
  ,
  image3: 
  {
    data: Buffer,
    contentType: String
  }
,
    min_value: String,
    max_value: String,
    payment_method: String,
    service_date: String,
    service_time: String,
    state: {
        type:String,
        default:"Pending"
    },    
  },
  {
    timestamps: true
  }
);

const ServiceRequests = mongoose.model('ServiceRequests', ServiceRequestSchema);
module.exports = ServiceRequests;
