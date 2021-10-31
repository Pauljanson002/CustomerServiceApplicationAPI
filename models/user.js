const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true }
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    roles: [
      {
        type: String
      }
    ],
    nic: String,
    fullname: String,
    contactNum: String,
    address: String,
    profession: String,
    province: String,
    city: String,
    town: String,
    postalCode: String,
    profile_pic: String,
    provider_review_count: { type: String, default: 0 },
    requester_rating: { type: String, default: 0 },
    provider_rating: { type: String, default: 0 },
    bio: {
      type: String,
      default: ''
    },
    service_providing_status: {
      type: Boolean,
      default: false
    },
    profile_state: {
      type: String,
      required:false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
