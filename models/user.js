const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username:{
      type:String,
      required:true,
      index:{unique:true}
    },
    email:{
      type:String,
      required:true
    },
    password:{
      type:String,
      required:true
    },
    service_provider:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps:true
  }
)

const User = mongoose.model('User',UserSchema);
module.exports = User;