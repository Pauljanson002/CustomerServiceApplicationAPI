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
    }
}

module.exports = job_bid_mutations