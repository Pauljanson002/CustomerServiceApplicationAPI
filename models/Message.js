const mongoose=require("mongoose");

const MessageSchema= new mongoose.Schema(
    {
        conversationID:{
            type:String,
            ref: 'Conversation'
        },
        sender:{
            type:String
        },
        text:{
            type:String
        }

    },{timestamps:true}
);
const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
