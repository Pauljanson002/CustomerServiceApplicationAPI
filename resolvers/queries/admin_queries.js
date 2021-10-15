const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');

const admin_queries = {
  viewAllComplaints: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }

    const complaints = await models.Complaint.find({});
    return complaints;
  },

  viewAllServices: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }

    const services = await models.Service.find({});
    return services;
  },

  takeUsers: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }
    const users = await models.User.find({});
    return users;
  }
};

module.exports = admin_queries;
