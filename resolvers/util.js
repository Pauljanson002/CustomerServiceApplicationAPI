const {AuthenticationError,ForbiddenError} = require('apollo-server-express')
const models = require('../models')
const util = {
  checkPermission:async (user,role)=>{
    if(!user){
      throw new AuthenticationError("You are not logged in")
    }
    const foundUser = await models.User.findById(user.id)
    if(!foundUser){
      throw new AuthenticationError("You might be using a fake token")
    }
    if(!foundUser.roles.includes(role)){
      throw new ForbiddenError("You are not permitted to use this feature , you are not "+role)
    }
    return foundUser
},
  checkOwnership:async (user,id)=>{
    if(!user){
      throw  new AuthenticationError("You are not logged in")
    }
    if(user.id !== id){
      throw new ForbiddenError("You have no ownership")
    }
  }


}
module.exports = util