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
    roles:[{
      type:String
    }],
    nic:String,
    contactNum:String,
    address:String,
    profession:String,
    province:String,
    city:String,
    town:String,
    postalCode:String,
    bio:{
      type:String,
      default:""
    },
    service_providing_status:{
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