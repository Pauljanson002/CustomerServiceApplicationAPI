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

  }
}

module.exports = job_bid_mutations