module.exports = {
  bidBy:async (jobBid,args,{models})=>{
    return await models.User.findById(jobBid.bidBy)
  },
  jobPosting:async (jobBid,args,{models})=>{
    return await models.JobPosting.findById(jobBid.jobPosting)
  }
}