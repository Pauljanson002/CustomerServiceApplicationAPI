module.exports ={
    
    viewAllServiceTypes: async (
      parent,
      args,
      { models, user }
    ) => {
      if (!user) {
        throw new AuthenticationError('You are not registered');
      }

      const services= await models.Service.find({ });
      console.log(services);
      return services;
    },
  }
  