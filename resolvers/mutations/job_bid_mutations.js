const {AuthenticationError,ForbiddenError} = require('apollo-server-express')
const {checkPermission}= require('../util')
const job_bid_mutations = {
  createJobBid:async (parent,args,{models,user})=>{

    const foundUser =  await checkPermission(user,"service_provider")
    const {proposedAmount,proposedDate,detailedBreakdown,jobPosting} = args
    const jobBid = await models.JobBid.create({
      proposedAmount,
      proposedDate:new Date(proposedDate),
      detailedBreakdown,
      bidBy:foundUser._id,
      jobPosting,
    })
    return jobBid
    },
  acceptJobBid:async (parent,args,{models,user})=>{
    const {jobPostingId, jobBidId} = args
    const foundUser = await checkPermission(user,"service_requester")

    //Check whether it belongs to him
    const jobPosting = await models.JobPosting.findByIdAndUpdate(jobPostingId,{
      $set:{
        state:"bid_selected"
      }
    })
    await models.JobBid.updateMany({
        jobPosting:jobPostingId
    },{
      $set:{
        state:"rejected"
      }
    })
    const selectedJobBid = await models.JobBid.findByIdAndUpdate(jobBidId,{
      $set:{
        state:"selected"
      }
    })
    return selectedJobBid
  },
  changeStateJobBid:async (parent,args,{models,user})=>{
    const foundUser = await checkPermission(user,"service_provider")
    const {jobBidId,jobBidState} = args
    const selectedJobBid = await models.JobBid.findByIdAndUpdate(jobBidId,{
      $set:{
        state:jobBidState
      }
    })
    return selectedJobBid
  },
  rejectJobBid:async (parent,args,{models,user})=>{
    const {jobBidId} = args
    const foundUser = await checkPermission(user,"service_requester")
    const foundJobBid = await models.JobBid.findById(jobBidId).populate("jobPosting")
    if(!foundJobBid.jobPosting.postedBy.equals(foundUser._id)){
      throw new ForbiddenError("This is not your job posting to reject")
    }
    foundJobBid.state = "rejected"
    if (foundJobBid.jobPosting.state === "bid_selected"){
      const jobPosting = await models.JobPosting.findByIdAndUpdate(foundJobBid.jobPosting._id,{
        $set:{
          state:"closed"
        }
      })
    }
    return await foundJobBid.save()

  },
  addReviewToBid:async (parent,args,{models,user})=>{
    const {type,id,rating,review} = args
    const bid = await models.JobBid.findById(id)
    if(type === "provider"){
      const foundUser = await checkPermission(user,"service_requester")
      const jobPosting = await models.JobPosting.findById(bid.jobPosting)
      if(!foundUser._id.equals(jobPosting.postedBy)){
        throw new ForbiddenError("You can't access")
      }
      bid.providerReview = review
      bid.providerRating = rating
      return await bid.save()
    }else if(type === "requester"){
      const foundUser = await checkPermission(user,"service_provider")
      if(!foundUser._id.equals(bid.bidBy)){
        throw new ForbiddenError("You can't access")
      }
      bid.requesterReview = review
      bid.requesterRating = rating
      return await bid.save()
    }else{
      throw new Error("Error")
    }
  }
}

module.exports = job_bid_mutations