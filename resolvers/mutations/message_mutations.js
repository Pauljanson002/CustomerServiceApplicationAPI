const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');


const message_mutations = {
  sendMessage: async (parent, args, { models, user }) => {
    
    try {
      const { from, to, body } = args;

      const accountSid = "AC5876bfa1ce1d4481da77ea09aa7d3dff";
      const authToken = "bb471688e33519f6a97af163323bbf34";
      const client = require('twilio')(accountSid, authToken);
      console.log("send msg");
      toNumber=to.substring(1,10);
      fromNumber=from.substring(1,10);
//IN DEVELOPMENT ENVIROMENT THE TO NUMBER SHOULD JOIN THE SAND BOX BY SENDING join rocket-observe to +14155238886
      client.messages
        .create({
            body: `${body} \n- GetItDone\n Please use WebApp or Mobile App to reply`, 
            from: 'whatsapp:+14155238886',       
            to: `whatsapp:+94${toNumber}` 
        })
        .then(message => console.log(message.sid)).catch(error=>console.log(error));

        client.messages 
      .create({ 
         body: 'Your Message has been sent. Please use the web app/ mobile app to send replies.', 
         from: 'whatsapp:+14155238886',       
         to: `whatsapp:+94${fromNumber}` 
       }) 
      .then(message => console.log(message.sid)) 
      .done();

    } catch (e) {
      throw new Error('Error in sending message.');
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
