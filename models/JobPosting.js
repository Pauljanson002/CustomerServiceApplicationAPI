const mongoose = require('mongoose');

const JobPostingSchema = new mongoose.Schema({
   heading:{
     type:String,
     required:true
   },
   location:{
     province:String,
     city:String,
     town:String,
   },
   category:String,
   skills:[String],
   postedBy:{
     type:mongoose.Schema.ObjectId,
     ref:"User"
   },
   description:String,
   budgetRange:{
     lowerLimit:Number,
     upperLimit:Number
   }
},{
  timestamps:true
});

const JobPosting = mongoose.model('JobPosting', JobPostingSchema);
module.exports = JobPosting;
