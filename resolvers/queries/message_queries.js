const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');


const message_queries= {
  
    conversationsOfUser: async (parent, args, { models, user }) => {
    
        try {
          
          console.log(user);
          const conversation = await models.Conversation.find({
            members:{$in:[user.id]}
          });
    
          return conversation;
    
    
    
        }catch(e){
          console.log(e);
        }
      },
      getNewMessages: async (parent, {conversationID}, { models, user }) => {
    
        try {
          
          console.log(conversationID);
          const messages = await models.Message.find({
            conversationID:conversationID
          });
    
          return messages;
    
    
    
        }catch(e){
          console.log(e);
        }
      },
    
  
};
module.exports = message_queries;