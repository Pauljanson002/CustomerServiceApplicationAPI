const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {AuthenticationError,ForbiddenError} = require('apollo-server-express')

const user_mutations = {
  signUp: async (parent, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);
    try {
      const user = await models.User.create({
        username,
        email,
        password: hashed
      });
      return jwt.sign({ id: user._id,service_provider:user.service_provider}, process.env.JWT_SECRET);

    } catch (e) {
      throw new Error('Error creating account');
    }
  },
  signIn:async (parent,{email,password},{models})=>{
    if(email){
      email = email.trim().toLowerCase();
    }
    const user = await models.User.findOne({
      "email":email
    })
    if(!user){
      throw new AuthenticationError("Error signing in : No account found")
    }
    const valid = await bcrypt.compare(password,user.password);
    if(!valid){
      throw new AuthenticationError('Error signing in : Password invalid')
    }
    return jwt.sign({id:user._id,service_provider:user.service_provider},process.env.JWT_SECRET);
  }
}

module.exports = user_mutations;