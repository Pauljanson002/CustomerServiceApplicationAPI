module.exports = {
  getServiceRequestByID: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You are not a registered user');
    }
   
    const sr_result = await models.ServiceRequests.findById(id);
   
    //console.log(sr_result);
    return sr_result;
  }
};
