const {AuthenticationError,ForbiddenError} = require('apollo-server-express')
const {checkPermission} = require('../util')
module.exports = {
  jobs:async (parent,args,{models,user})=>{
    return models.JobPosting.find().limit(100)
  },
  jobPostingFeed:async (parent,args,{models,user})=>{
    if(!user){
      throw new AuthenticationError("Please login to continue")
    }
    const foundUser = await models.User.findById(user.id)
    if(!foundUser.roles.includes("service_provider")){
      throw new ForbiddenError("You don't have enough permission to do this")
    }
    // console.log(args)
    const {cursor,province,city,town,category} =  args
    const limit = 10
    let hasNextPage = false
    let cursorQuery = {location:{province,city,town},category,state:"open",postedBy:{$ne:foundUser._id}}
    if(cursor){
      cursorQuery = {...cursorQuery, _id :{$lt:cursor}}
    }
    let jobPostings = await models.JobPosting.find(cursorQuery).sort({_id:-1}).limit(limit+1)
    if(jobPostings.length > limit){
      hasNextPage = true;
      jobPostings = jobPostings.slice(0,-1);
    }
    const newCursor = ""
    if(jobPostings.length >0){
      jobPostings[jobPostings.length - 1]._id
    }
    return {
      jobPostings,
      cursor:newCursor,
      hasNextPage
    }
  },
  jobPosting:async (parent,args,{models,user})=>{
    const {id}  = args
    return await models.JobPosting.findById(id)
  },
  getMyJobPostings:async (parent,args,{models,user})=>{
    const {state} = args
    const foundUser = await checkPermission(user,"service_requester")
    return await models.JobPosting.find({
      postedBy:foundUser._id,
      state
    }).sort({
      updatedAt:-1
    })
  },
  getMyJobPostingBids:async (parent,args,{models,user})=>{
    const {id} = args
    const foundUser = await checkPermission(user,"service_requester")
    const jobPostingReferred = await models.JobPosting.findById(id)
    if(!jobPostingReferred.postedBy.equals(foundUser._id)){
      throw new ForbiddenError("Forbidden to access this data")
    }
    return await models.JobBid.find({
      jobPosting:jobPostingReferred._id
    })
  },

}