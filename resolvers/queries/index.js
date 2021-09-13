const {AuthenticationError,ForbiddenError} = require('apollo-server-express')
const user_queries = require("./user_queries")
const job_posting_queries = require("./job_posting_queries")
const service_requester_queries=require("./service_requester_queries");
const service_provider_queries = require('./service_provider_queries');
const service_types_queries = require('./service_types_queries');
module.exports = {
  ...user_queries,
  ...job_posting_queries,
  ...service_requester_queries,
  ...service_provider_queries,
  ...service_types_queries,
  me:async (parent,args,{models,user})=>{
    if(user){
      return await models.User.findById(user.id);
    }
    else {
      throw new AuthenticationError('Error no authentication token available')
    }
  }
};
