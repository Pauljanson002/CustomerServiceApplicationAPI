const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const ServiceRequestSchema = new mongoose.Schema(
  {
    requester_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    provider_id: {
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
        type: String,
        
      }
    ,
    image2: 
    {
      type: String,
    }
  ,
  image3: 
  {
    type: String,
  }
,
    min_price: String,
    max_price: String,
    payMethod: String,
    date: String,
    time: String,
    location:String,
    requestReview:String,
    requestRating:Number,
    customerReview:String,
    customerRating:Number,
    estimate:String,
    hasPaid:{
      type:Boolean,
      default:false
    },
    finalAmount:String,
    
    state: {
        type:String,
        enum:["Pending","Accepted","Started","Completed","Canceled","Rejected","Reviewed","Paid"],
        default:"Pending"
    },    
  },
  {
    timestamps: true
  }
);

const ServiceRequests = mongoose.model('ServiceRequests', ServiceRequestSchema);
module.exports = ServiceRequests;
