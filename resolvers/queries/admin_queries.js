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
  }
};

module.exports = admin_queries;
