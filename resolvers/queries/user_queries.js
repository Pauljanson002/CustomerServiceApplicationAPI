module.exports ={

  users: async (parent, args, { models }) => {
    return await models.User.find({}).limit(100);
  },
  searchServiceProviderbyName: async (
    parent,
    { username },
    { models, user }
  ) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }
    
    var nameRegex = new RegExp(username);
    return await models.User.find({ username: { $regex: nameRegex } , service_providing_status:true});
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
    console.log(users);
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
    console.log(users);
    return users;
  },
}
