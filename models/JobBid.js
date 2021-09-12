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
    enum:["selected","rejected","started","requested"],
    default:"requested"
  }
},
  {
    timestamps:true,
  })

const JobBid = mongoose.model('JobBid',JobBidSchema);
module.exports = JobBid;