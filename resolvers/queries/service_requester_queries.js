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
    },
    startedServiceRequestsbyMe: async (parent, args, { models, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You are not a registered user'
        );
      }

      const requests= await models.ServiceRequests.find({
        state: 'Started',
        requester_id: user.id
      }).limit(100);
      console.log(requests);
      return requests;
    },
    completedServiceRequestsbyMe: async (parent, args, { models, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You are not a registered user'
        );
      }

      const requests= await models.ServiceRequests.find({
        state: 'Completed',
        requester_id: user.id
      }).limit(100);
      console.log(requests);
      return requests;
    },
    canceledServiceRequestsbyMe: async (parent, args, { models, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You are not a registered user'
        );
      }

      const requests= await models.ServiceRequests.find({
        state: 'Canceled',
        requester_id: user.id
      }).limit(100);
      console.log(requests);
      return requests;
    },
    rejectedServiceRequestsbyMe: async (parent, args, { models, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You are not a registered user'
        );
      }

      const requests= await models.ServiceRequests.find({
        state: 'Rejected',
        requester_id: user.id
      }).limit(100);
      console.log(requests);
      return requests;
    },
    reviewedServiceRequestsbyMe: async (parent, args, { models, user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You are not a registered user'
        );
      }

      const requests= await models.ServiceRequests.find({
        state: 'Reviewed',
        requester_id: user.id
      }).limit(100);
      console.log(requests);
      return requests;
    },

  };

  module.exports = service_requester_queries;