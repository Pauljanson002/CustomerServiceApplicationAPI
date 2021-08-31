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
      return jwt.sign({ id: user._id}, process.env.JWT_SECRET);

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
    return jwt.sign({id:user._id},process.env.JWT_SECRET);
  },
  makeMeServiceProvider:async (parent,{nic,profession,province, city,town,bio},{models,user})=>{
    if(!user){
      throw new AuthenticationError("You are not registered to become a service provider")
    }
    return await models.User.findOneAndUpdate({
      _id:user.id
    },{
      $set:{
        nic,profession,province,city,town,bio,
        service_providing_status:true
      },
      $addToSet:{
        roles:"service_provider"
      }
    },{
      new:false
    });
  }
}

module.exports = user_mutations;