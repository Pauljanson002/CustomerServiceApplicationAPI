const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');

const admin_mutations = {
  adminSignUp: async (parent, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);
    try {
      const admin = await models.Admin.create({
        username,
        email,
        password: hashed
      });
      return jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    } catch (e) {
      throw new Error('Error creating account');
    }
  },
  adminSignIn: async (parent, { email, password }, { models }) => {
    if (email) {
      email = email.trim().toLowerCase();
    }
    const admin = await models.Admin.findOne({
      email: email
    });
    if (!admin) {
      throw new AuthenticationError('Error signing in : No account found');
    }
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      throw new AuthenticationError('Error signing in : Invalid Password');
    }
    return jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  },
  createService: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }
    try {
      console.log(args.service_name);
      const { service_name, description, user_type, image } = args;
      const service = await models.Service.create({
        service_name,
        description,
        user_type,
        image
      });
      return service;
    } catch (e) {
      throw new Error('Error in creating the service.');
    }
  },
  makeComplaint: async (parent, args, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }
    try {
      console.log(args.complaint);
      const { complainer, victim, title, complaint } = args;
      const complain = await models.Complaint.create({
        complainer,
        victim,
        title,
        complaint
      });
      return complain;
    } catch (e) {
      throw new Error('Error in creating the complain.');
    }
  }
};

module.exports = admin_mutations;
