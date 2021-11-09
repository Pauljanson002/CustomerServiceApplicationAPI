const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();

const message_mutations = {
  sendMessage: async (parent, args, { models, user }) => {
    
    try {
      const {  to, body } = args;

      const accountSid = "AC5876bfa1ce1d4481da77ea09aa7d3dff";
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = require('twilio')(accountSid, authToken);
      console.log("send msg");
      toNumber=to;
      //fromNumber=from.substring(1,10);
//IN DEVELOPMENT ENVIROMENT THE TO NUMBER SHOULD JOIN THE SAND BOX BY SENDING join rocket-observe to +14155238886
      client.messages 
      .create({ 
        body: 'There is an urgent service requet placed!. Please check it now in your pending requests', 
        from: 'whatsapp:+14155238886',       
        to: 'whatsapp:+94771293019' 
      }) 
      .then(message => console.log(message.sid)) 
      .done();
      
      return;
 

    } catch (e) {
      console.log('Error in sending message.');
    }
  },

  newConverstion: async (parent, args, { models, user }) => {
    
    try {
      console.log(args,user);
      const { senderID, recieverID } = args;
      members=[senderID, recieverID];
      const savedConversation = await models.Conversation.create({
        members
      });

      return savedConversation;



    }catch(e){
      console.log(e);
    }
  },

  addMessage: async (parent, {conversationID,sender,text}, { models, user }) => {
    
    try {
      

      const newMessage = await models.Message.create({
        conversationID:conversationID,
        sender,
        text
      });

      return newMessage;



    }catch(e){
      console.log(e);
    }
  },



};
module.exports = message_mutations;
