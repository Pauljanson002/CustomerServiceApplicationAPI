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
      {id,task},
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
          }
        },
        {
          new: false
        }
      );
      return editedReq;

  },
  feedbackServiceRequest:async(
    parent,
    {id,requestRating,requestReview},
    {models,user}
)=>{
  if (!user) {
      throw new AuthenticationError(
        'You are not registered to become a service provider'
      );
    }
    console.log(user);
    const feedbackedReq= await models.ServiceRequests.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          requestRating,
          requestReview,
          state:"Reviewed"
         
        }
      },
      {
        new: false
      }
    );
    return feedbackedReq;

},

customerfeedbackServiceRequest:async(
  parent,
  {id,customerRating,customerReview},
  {models,user}
)=>{
if (!user) {
    throw new AuthenticationError(
      'You are not registered to become a service provider'
    );
  }
  console.log(customerRating,customerReview);
  const feedbackedReq= await models.ServiceRequests.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: {
        customerRating,
        customerReview,
        
       
      }
    },
    {
      new: false
    }
  );
  return feedbackedReq;

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

startServiceRequest:async(
  parent,
  {id},
  {models,user}
)=>{
  if(!user){
    throw new AuthenticationError(
        'You are not registered to become a service provider'
      );
  }

  const startedReq= await models.ServiceRequests.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: {
        state:"Started"
      }
    },
    {
      new: false
    }
  );
  return startedReq;
},

completeServiceRequest:async(
  parent,
  {id,finalAmount},
  {models,user}
)=>{
  if(!user){
    throw new AuthenticationError(
        'You are not registered to become a service provider'
      );
  }

  const startedReq= await models.ServiceRequests.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: {
        state:"Completed",
        finalAmount:finalAmount

      }
    },
    {
      new: false
    }
  );
  return startedReq;
},

confirmCashPayment:async(
  parent,
  {id},
  {models,user}
)=>{
  if(!user){
    throw new AuthenticationError(
        'You are not registered to become a service provider'
      );
  }

  const paidReq= await models.ServiceRequests.findOneAndUpdate(
    {
      _id: id
    },
    {
      $set: {
        hasPaid:true
      }
    },
    {
      new: false
    }
  );
  return paidReq;
},

acceptServiceRequest:async(
    parent,
    {id,estimate},
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
          state:"Accepted",
          estimate:estimate
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
