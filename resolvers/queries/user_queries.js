module.exports ={

  users: async (parent, args, { models }) => {
    return await models.User.find({}).limit(100);
  },
  searchServiceProviderbyName: async (
    parent,
    { name },
    { models, user }
  ) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }
    //console.log(name);
    var nameRegex = new RegExp(name.toUpperCase());
    const users= await models.User.find({ username: { $regex: nameRegex , $options:'i'}});
    console.log(users);
    return users;
  },
  searchServiceProviderbyProfession: async (
    parent,
    { profession },
    { models, user }
  ) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }

    const users= await models.User.find({ profession: profession  });
    //console.log(users);
    return users;
  },
  searchServiceProviderbyProfessioninProvince: async (
    parent,
    { profession,province },
    { models, user }
  ) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }

    const users= await models.User.find({ profession: profession ,province:province });
    //console.log(users);
    return users;
  },

  viewAllServiceProviders: async (
    parent,
    args,
    { models, user }
  ) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }

    const users= await models.User.find({ });
    //console.log(users);
    return users;
  },

  getUserbyId: async (
    parent,
    { id },
    { models, user }
  ) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }

    const user_result= await models.User.findById(id);
    //console.log(users);
    return user_result;
  },
}
