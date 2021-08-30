module.exports ={
  users: async (parent, args, { models }) => {
    return await models.User.find({}).limit(100);
  }
}