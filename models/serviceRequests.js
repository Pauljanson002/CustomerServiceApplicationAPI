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
    min_price: String,
    max_price: String,
    payMethod: String,
    date: String,
    time: String,
    location:String,
    estimate:String,
    hasAdvancedPaid:{
      type:Boolean,
      default:false
    },
    
    state: {
        type:String,
        enum:["Pending","Accepted","Started","Completed","Canceled","Rejected"],
        default:"Pending"
    },    
  },
  {
    timestamps: true
  }
);

const ServiceRequests = mongoose.model('ServiceRequests', ServiceRequestSchema);
module.exports = ServiceRequests;
