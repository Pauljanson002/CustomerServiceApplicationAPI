const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
const { User, ServiceRequests } = require('../../models');

const service_provider_queries = {
  pendingServiceRequestsForMe: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError(
        'You are not registered user'
      );
    }
    return await ServiceRequests.find({ state: 'Pending', provider_id: user.id }).limit(
      100
    );
  },

  acceptedServiceRequestsForMe: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError(
        'You are not registered to become a service provider'
      );
    }
    return await ServiceRequests.find({
      state: 'Accepted',
      provider_id: user.id
    }).limit(100);
  }
};

module.exports = service_provider_queries;
