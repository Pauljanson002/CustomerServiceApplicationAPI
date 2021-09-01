module.exports = {
  postedBy:async (jobPosting,args,{models})=>{
    return await models.User.findById(jobPosting.postedBy)
  }
}