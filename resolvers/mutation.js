const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  signUp: async (parent, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);
    try {
      const user = await models.User.create({
        username,
        email,
        password: hashed
      });
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      
    } catch (e) {
      throw new Error('Error creating account');
    }
  }
};
