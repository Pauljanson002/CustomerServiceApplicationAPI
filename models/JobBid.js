const mongoose = require("mongoose")

const JobBidSchema = new mongoose.Schema({
  proposedAmount:{
    type:Number,
    required:true
  },
  proposedDate:{
    type:Date,
    required:true
  },
  detailedBreakdown:{
    type:String,
    default:""
  },
  bidBy:{
    type:mongoose.Schema.ObjectId,
    ref:"User"
  },
  jobPosting:{
    type:mongoose.Schema.ObjectId,
    ref:"JobPosting"
  },
  state:{
    type:String,
    enum:["selected","rejected","completed","requested","paid","canceled"],
    default:"requested"
  },
  providerReview:{
    type:String,
  },
  requesterReview:{
    type:String
  },
  providerRating:Number,
  requesterRating:Number
},
  {
    timestamps:true,
  })

const JobBid = mongoose.model('JobBid',JobBidSchema);
module.exports = JobBid;