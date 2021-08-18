const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, ServiceRequester, Location } = require('../../models');
const { UserInputError } = require('apollo-server');

const ServiceRequester_Mutations = {
  registerServiceRequester: async (
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
      const serviceRequester = await models.ServiceRequester.create({
        user_id,
        contactNum,
        location_id
      });

      return jwt.sign({ id: serviceRequester._id }, process.env.JWT_SECRET);
    } catch (e) {
      console.log(e)
      throw new Error('Error creating account');
    }
  },
  loginServiceRequester: async (parent, { username, password }, { models }) => {
    //validate username and password
    const errors = {};
    const user = await User.findOne({ username });

    if (!user) {
      errors.general = 'User not found user';
      throw new UserInputError('User not found', { errors });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      errors.general = 'Wrong credentials';
      throw new UserInputError('Wrong credentials', { errors });
    }

    const user_id = user._id;
    const type = user.type;

    const serviceRequester = await ServiceRequester.findOne({ user_id });
    if (!serviceRequester) {
      errors.general = 'User not found sr';
      throw new UserInputError('User not found sr', { errors });
    }

    const token = jwt.sign(
      { id: serviceRequester._id },
      process.env.JWT_SECRET
    );

    return {
      ...serviceRequester._doc,
      id: serviceRequester._id,
      token
    };
  },

  deleteServiceRequester: async (parent, { user_id }, { models }) => {
    //const user=checkAuth(context); authenticate the owner
    const user = await models.User.findById(user_id);
    try {
      const serviceRequester = await models.ServiceRequester.findOne({
        user_id
      });
      const owner = await models.User.findById(user_id);
      if (user._id.toString() === serviceRequester.user_id.toString()) {
        //only deletes information about the user in user and service requester collection
        //make transactional
        await serviceRequester.delete();
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

module.exports = ServiceRequester_Mutations;
