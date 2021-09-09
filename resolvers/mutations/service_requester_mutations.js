const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
const { User, ServiceRequests } = require('../../models');

const service_requester_mutations = {
  createServiceRequest: async (
    parent,
    { provider_id, date, time, payMethod, task,min_price,max_price,image1, image2, image3 },
    { models, user }
  ) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }
    try {
      console.log(provider_id, date, time, payMethod, task,min_price,max_price,image1, image2, image3 );
      const serviceRequest = await models.ServiceRequests.create({
        requester_id: user.id,
        accepted_provider_id:provider_id,
        service_date:date,
        service_time:time,
        payment_method:payMethod,
        task,
        min_value:min_price,
        max_value:max_price,
        image1,
        image2,
        image3
      });

      
      return serviceRequest;
    } catch (e) {
      throw new Error('Error in creating the service request.');
    }
  },
  createBiddingJob: async (
    parent,
    { date, time, payMethod, task,min_price,max_price,image1, image2, image3 },
    { models, user }
  ) => {
    if (!user) {
      throw new AuthenticationError('You are not registered');
    }
    try {
      console.log(provider_id, date, time, payMethod, task,min_price,max_price,image1, image2, image3 );
      const serviceRequest = await models.ServiceRequests.create({
        requester_id: user.id,
        service_date:date,
        service_time:time,
        payment_method:payMethod,
        task,
        min_value:min_price,
        max_value:max_price,
        image1,
        image2,
        image3
      });

      
      return serviceRequest;
    } catch (e) {
      throw new Error('Error in creating the service request.');
    }
  }
};

module.exports = service_requester_mutations;
