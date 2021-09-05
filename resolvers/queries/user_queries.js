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
    console.log(user);
    var nameRegex = new RegExp(username);
    return await User.find({ username: { $regex: nameRegex } });
  },
  searchServiceProviderbyProfession: async (
    parent,
    { professionType },
    { models, user }
  ) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }
    console.log(user);

    return await User.find({ profession: { professionType } });
  },
}
