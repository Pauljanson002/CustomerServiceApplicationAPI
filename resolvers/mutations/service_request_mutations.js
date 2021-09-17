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
    console.log("rescheduling");
    const rescheduledReq= await models.ServiceRequests.findOneAndUpdate(
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

    return rescheduledReq;
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
      const editedReq= await models.ServiceRequests.findOneAndUpdate(
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
      return editedReq;

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

      const canceledReq= await models.ServiceRequests.findOneAndUpdate(
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

      return canceledReq;
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

    const rejectedReq= await models.ServiceRequests.findOneAndUpdate(
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
    return rejectedReq;
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

    const acceptedReq= await models.ServiceRequests.findOneAndUpdate(
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

    return acceptedReq;
},

};

module.exports = service_request_mutations;
