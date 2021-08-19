const {AuthenticationError,ForbiddenError} = require('apollo-server-express')
module.exports = {
  users: async (parent, args, { models }) => {
    return await models.User.find({}).limit(100);
  },
  me:async (parent,args,{models,user})=>{
    if(user){
      return await models.User.findById(user.id);
    }
    else {
      throw new AuthenticationError('Error no authentication token available')
    }
  }
};
