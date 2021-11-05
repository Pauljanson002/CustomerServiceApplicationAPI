const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {AuthenticationError,ForbiddenError} = require('apollo-server-express')

const user_mutations ={
  signUp: async (parent, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);
    try {
      const user = await models.User.create({
        username,
        email,
        password: hashed,
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
  makeMeServiceProvider:async (parent,{fullname,nic,profession,address,province, city,town,bio,contactNumber},{models,user})=>{
    if(!user){
      throw new AuthenticationError("You are not registered to become a service provider")
    }
    return await models.User.findOneAndUpdate({
      _id:user.id
    },{
      $set:{
        fullname,nic,profession,province,city,town,bio,address,
        contactNum:contactNumber,
        profile_state:"created"
      },
    },{
      new:false
    });

  },

  registerServiceRequester:async (parent,{
      fullname,
      contactNum,
      address,
      city,
      postalCode,
  },{models,user})=>{
    if(!user){
      throw new AuthenticationError("You are not registered to become a service provider")
    }
    console.log(user);
    return await models.User.findOneAndUpdate({
      _id:user.id
    },{
      $set:{
        fullname,contactNum,address,city,postalCode,
        
      },
      $addToSet:{
        roles:"service_requester"
      }
    },{
      new:false
    });

  },
  updateMe:async (parent,args,{models,user})=>{
    if(!user){
      throw  new AuthenticationError("You are not signed in")
    }
    const {fullname,contactNum,address,profession,province,city,town,postalCode,profile_url} = args
    return await models.User.findOneAndUpdate({
      _id:user.id
    },{
      $set:{
        fullname,contactNum,address,profession,province,city,town,postalCode,profile_url
      }
    },{
      new:false
    })
  }
}

module.exports = user_mutations;