const {AuthenticationError,ForbiddenError} = require('apollo-server-express')
const user_queries = require("./user_queries")
const job_posting_queries = require("./job_posting_queries")
module.exports = {
  ...user_queries,
  ...job_posting_queries,
  me:async (parent,args,{models,user})=>{
    if(user){
      return await models.User.findById(user.id);
    }
    else {
      throw new AuthenticationError('Error no authentication token available')
    }
  }
};
