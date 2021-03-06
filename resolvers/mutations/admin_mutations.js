const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');

const admin_mutations = {
  adminSignUp: async (
    parent,
    { username, email, password, securityKey },
    { models }
  ) => {
    email = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);

    if (securityKey !== process.env.JWT_SECRET) {
      throw new AuthenticationError('Error signing up : Invalid Security Key');
    }
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
      console.log(args);
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
        complainer: mongoose.Types.ObjectId(user.id),
        victim,
        title,
        complaint
      });
      return complain;
    } catch (e) {
      throw new Error('Error in creating the complain.');
    }
  },

  // setProfileState(providerID:ID state:String): User!

  setProfileState: async (parent, { providerID, state }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }
    return await models.User.findOneAndUpdate(
      { _id: providerID },
      {
        $set: { profile_state: state, service_providing_status: true },
        $addToSet: {
          roles: 'service_provider'
        }
      },
      { new: true }
    );
  },

  approveServiceProvider: async (parent, { provider_id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError(
        'You are not registered to become a service provider'
      );
    }
    return await models.User.findOneAndUpdate(
      {
        _id: provider_id
      },
      {
        $addToSet: {
          roles: 'service_provider'
        }
      },
      {
        new: true
      }
    );
  },

  suspendServiceProvider: async (parent, { provider_id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError(
        'You are not registered to become a service provider'
      );
    }
    return await models.User.findOneAndUpdate(
      {
        _id: provider_id
      },
      {
        $pull: { roles: 'service_provider' }
      },
      {
        new: true
      }
    );
  },
  removeServiceProvider: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You are not registered.');
    }
    try {
      return await models.User.findByIdAndUpdate(id, {
        $set: {
          username: 'RemovedUser' + id,
          email: 'RemovedUserMail',
          nic: 'removedNIC',
          fullname: 'removedName',
          province: 'removedProvince',
          city: 'removedCity',
          town: 'removedTown',
          service_providing_status: false,
          profile_state: 'deleted'
        }
      });
    } catch (e) {
      throw new Error('Error in Removing Service Provider.');
    }
  },
  removeComplaint: async (parent, { id }, { models, complaint }) => {
    try {
      await models.Complaint.findOneAndRemove({ _id: id });
      return true;
    } catch (e) {
      throw new Error('Error in Removing Complaint.');
    }
  }
};

module.exports = admin_mutations;
