const {AuthenticationError,ForbiddenError} = require('apollo-server-express')
const {checkPermission} = require('../util')
module.exports = {
  getMyBids:async (parent,args,{models,user})=>{
    const foundUser = await checkPermission(user,"service_provider")
    const foundBids = await models.JobBid.find({
      bidBy:foundUser._id
    })
    return foundBids
  }
}