const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    service_name:{
      type:String,
      required:true,
      index:{unique:true}
    },
    description:{
      type:String,
      required:true
    },
    user_type:{
        type:String,
        required:true
    },
    image:{
        type:String
    }
  }
    
)

const Service = mongoose.model('Service',ServiceSchema);
module.exports = Service;