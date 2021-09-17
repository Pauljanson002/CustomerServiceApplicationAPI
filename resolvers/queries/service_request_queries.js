module.exports = {
  getServiceRequestByID: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }
   
    const sr_result = await models.ServiceRequests.findById(id);
   
    //console.log(sr_result);
    return sr_result;
  }
};
