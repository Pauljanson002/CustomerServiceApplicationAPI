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
    is_service_requester:{
      type:Boolean,
      default:false
    },
    is_service_provider:{
      type:Boolean,
      default:false
    },
    is_admin:{
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