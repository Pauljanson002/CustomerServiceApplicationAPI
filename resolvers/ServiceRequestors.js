const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, ServiceRequestor, Location } = require('../models');
const { UserInputError } = require('apollo-server');

const ServiceRequestors = {
  registerServiceRequestor: async (
    parent,
    {
      username,
      email,
      password,
      confirmPassword,
      contactNum,
      address,
      city,
      town,
      postalCode
    },
    { models }
  ) => {
    //validate user input with confirm password etc
    //check for existing User in user collection
    console.log('hello');
    email = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);
    try {
      //transaction

      const user = await models.User.create(
        [
          {
            username,
            email,
            password: hashed
          }
        ],
        { session: session }
      );

      const user_id = user._id;

      //create in the location collection
      const location = await models.Location.create({
        address,
        city,
        town,
        postalCode
      });
      const location_id = location._id;

      //create in the service requestor collection
      const serviceRequestor = await models.ServiceRequestor.create({
        user_id,
        contactNum,
        location_id
      });

      return jwt.sign({ id: serviceRequestor._id }, process.env.JWT_SECRET);
    } catch (e) {
      throw new Error('Error creating account');
    }
  },
  loginServiceRequestor: async (parent, { username, password }, { models }) => {
    //validate username and password
    const errors = {};
    const user = await User.findOne({ username });

    if (!user) {
      errors.general = 'User not found user';
      throw new UserInputError('User not found', { errors });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      errors.general = 'Wrong credintials';
      throw new UserInputError('Wrong credintials', { errors });
    }

    const user_id = user._id;
    const type = user.type;

    const serviceRequestor = await ServiceRequestor.findOne({ user_id });
    if (!serviceRequestor) {
      errors.general = 'User not found sr';
      throw new UserInputError('User not found sr', { errors });
    }

    const token = jwt.sign(
      { id: serviceRequestor._id },
      process.env.JWT_SECRET
    );

    return {
      ...serviceRequestor._doc,
      id: serviceRequestor._id,
      token
    };
  },

  deleteServiceRequestor: async (parent, { user_id }, { models }) => {
    //const user=checkAuth(context); authenticate the owner
    const user = await models.User.findById(user_id);
    try {
      const serviceRequestor = await models.ServiceRequestor.findOne({
        user_id
      });
      const owner = await models.User.findById(user_id);
      if (user._id.toString() === serviceRequestor.user_id.toString()) {
        //only deletes information about the user in user and service requestor collection
        //make transactional
        await serviceRequestor.delete();
        await owner.delete();
        return 'User is deleted';
      } else {
        throw new Error('Action not allowed');
      }
    } catch (err) {
      throw new Error(err);
    }
  }
};

module.exports = ServiceRequestors;
