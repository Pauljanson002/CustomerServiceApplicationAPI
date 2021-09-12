const {AuthenticationError,ForbiddenError} = require('apollo-server-express')
const job_posting_mutations = {
  createJobPosting:async (parent,args,{models,user})=>{
      if(!user){
        throw new AuthenticationError("You must be logged in to create a job posting")
      }
      const foundUser = await models.User.findById(user.id)
      // if(!foundUser.roles.includes("service_requester")){
      //   throw new ForbiddenError("You must be registered as service requester to create a job posting")
      // }
      const {heading,province,city,town,category,skills,description,lowerLimit,upperLimit} = args
      const jobPosting = await models.JobPosting.create({
        heading,
        location:{
          province,city,town
        },
        category,
        skills,
        postedBy:foundUser._id,
        description,
        budgetRange:{
          lowerLimit,
          upperLimit
        }
      })
      return jobPosting
  }
}

module.exports = job_posting_mutations