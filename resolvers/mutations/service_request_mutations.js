const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');

const service_request_mutations = {
  rescheduleServiceRequest: async (
    parent,
    { id, date, time },
    { models, user }
  ) => {
    if (!user) {
      throw new AuthenticationError(
        'You are not registered to become a service provider'
      );
    }
    console.log(user);
    return await models.ServiceRequests.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          date,
          time
        }
      },
      {
        new: false
      }
    );
  },

  editServiceRequest:async(
      parent,
      {id,task,image1,image2,image3},
      {models,user}
  )=>{
    if (!user) {
        throw new AuthenticationError(
          'You are not registered to become a service provider'
        );
      }
      console.log(user);
      return await models.ServiceRequests.findOneAndUpdate(
        {
          _id: id
        },
        {
          $set: {
            task,
            image1,
            image2,
            image3
          }
        },
        {
          new: false
        }
      );

  },

  cancelServiceRequest:async(
      parent,
      {id},
      {models,user}
  )=>{
      if(!user){
        throw new AuthenticationError(
            'You are not registered to become a service provider'
          );
      }

      return await models.ServiceRequests.findOneAndUpdate(
        {
          _id: id
        },
        {
          $set: {
            state:"Canceled"
          }
        },
        {
          new: false
        }
      );
  },
  rejectServiceRequest:async(
    parent,
    {id},
    {models,user}
)=>{
    if(!user){
      throw new AuthenticationError(
          'You are not registered to become a service provider'
        );
    }

    return await models.ServiceRequests.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          state:"Rejected"
        }
      },
      {
        new: false
      }
    );
},

acceptServiceRequest:async(
    parent,
    {id},
    {models,user}
)=>{
    if(!user){
      throw new AuthenticationError(
          'You are not registered to become a service provider'
        );
    }

    return await models.ServiceRequests.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          state:"Accepted"
        }
      },
      {
        new: false
      }
    );
},

};

module.exports = service_request_mutations;
