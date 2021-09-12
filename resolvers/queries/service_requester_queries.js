const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
const { User, ServiceRequests } = require('../../models');

const service_requester_queries = {
    pendingServiceRequestsbyMe: async (parent, args, { models, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You are not registered user'
        );
      }
      const requests=  await ServiceRequests.find({ state: 'Pending', requester_id: user.id }).limit(
        100
      );
      return requests;
    },
  
    acceptedServiceRequestsbyMe: async (parent, args, { models, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You are not a registered user'
        );
      }

      const requests= await models.ServiceRequests.find({
        state: 'Accepted',
        requester_id: user.id
      }).limit(100);
      console.log(requests);
      return requests;
    }
  };

  module.exports = service_requester_queries;