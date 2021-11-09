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
      throw new AuthenticationError('Please login to continue');
    }
    const foundUser = await models.User.findById(user.id);
    if (!foundUser.roles.includes('service_provider')) {
      throw new ForbiddenError('You are not a Service Provider. No Permission');
    }

    const pendingRequests = await ServiceRequests.find({
      state: 'Pending',
      provider_id: user.id
    }).limit(100);
    console.log(pendingRequests);
    return pendingRequests;
  },

  acceptedServiceRequestsForMe: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('Please login to continue');
    }
    const foundUser = await models.User.findById(user.id);
    if (!foundUser.roles.includes('service_provider')) {
      throw new ForbiddenError('You are not a Service Provider. No Permission');
    }

    const acceptedRequests = await ServiceRequests.find({
      state: 'Accepted',
      provider_id: user.id
    }).limit(100);
    console.log(acceptedRequests);
    return acceptedRequests;
  },
  startedServiceRequestsForMe: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('Please login to continue');
    }
    const foundUser = await models.User.findById(user.id);
    if (!foundUser.roles.includes('service_provider')) {
      throw new ForbiddenError('You are not a Service Provider. No Permission');
    }

    const acceptedRequests = await ServiceRequests.find({
      state: 'Started',
      provider_id: user.id
    }).limit(100);
    console.log(acceptedRequests);
    return acceptedRequests;
  },
  completedServiceRequestsForMe: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('Please login to continue');
    }
    const foundUser = await models.User.findById(user.id);
    if (!foundUser.roles.includes('service_provider')) {
      throw new ForbiddenError('You are not a Service Provider. No Permission');
    }

    const acceptedRequests = await ServiceRequests.find({
      state: 'Completed',
      provider_id: user.id
    }).limit(100);
    console.log(acceptedRequests);
    return acceptedRequests;
  },
  canceledServiceRequestsForMe: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('Please login to continue');
    }
    const foundUser = await models.User.findById(user.id);
    if (!foundUser.roles.includes('service_provider')) {
      throw new ForbiddenError('You are not a Service Provider. No Permission');
    }

    const acceptedRequests = await ServiceRequests.find({
      state: 'Canceled',
      provider_id: user.id
    }).limit(100);
    console.log(acceptedRequests);
    return acceptedRequests;
  },
  rejectedServiceRequestsForMe: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('Please login to continue');
    }
    const foundUser = await models.User.findById(user.id);
    if (!foundUser.roles.includes('service_provider')) {
      throw new ForbiddenError('You are not a Service Provider. No Permission');
    }

    const acceptedRequests = await ServiceRequests.find({
      state: 'Rejected',
      provider_id: user.id
    }).limit(100);
    console.log(acceptedRequests);
    return acceptedRequests;
  },
  reviewedServiceRequestsForMe: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('Please login to continue');
    }
    const foundUser = await models.User.findById(user.id);
    if (!foundUser.roles.includes('service_provider')) {
      throw new ForbiddenError('You are not a Service Provider. No Permission');
    }

    const reviewedRequests = await ServiceRequests.find({
      state: 'Reviewed',
      provider_id: user.id
    }).limit(100);
    console.log(reviewedRequests);
    return reviewedRequests;
  }
};

module.exports = service_provider_queries;
