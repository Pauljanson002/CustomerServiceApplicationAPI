const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, ServiceRequester, Location } = require('../../models');
const { UserInputError } = require('apollo-server');

const ServiceRequester_Mutations = {
  registerServiceRequester: async (
    parent,
    {
      user_id,
      contactNum,
      address,
      city,
      postalCode,

    },
    { models }
  ) => {
    try {
      //create in the service requestor collection
      const serviceRequester = await models.ServiceRequester.create({
        user_id,
        contactNum,
        location:{address, city,postalCode }
      });

      return serviceRequester.contactNum;

      
    } catch (e) {
      console.log(e)
      throw new Error('Error adding details to your account!');
    }
  },

  // Login and delete will be handled in user.



};

module.exports = ServiceRequester_Mutations;
