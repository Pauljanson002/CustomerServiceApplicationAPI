module.exports = {
  complainer: async (complaint, args, { models }) => {
    return await models.User.findById(complaint.complainer);
  }
};
