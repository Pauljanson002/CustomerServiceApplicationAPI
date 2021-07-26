const mongoose = require('mongoose');

module.exports = {
  connect: DB_HOST => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose
      .connect(DB_HOST)
      .then(() => {
        console.log('Database connection successful ');
      })
      .catch(reason => {
        console.error(reason);
        console.log(
          'MongoDB connection error. Please make sure MongoDB is running'
        );
        process.exit();
      });
  },
  close: () => {
    mongoose.connection
      .close()
      .then(data => {
        console.log('Database connection closed successfully ');
      })
      .catch(reason => {
        console.error(reason);
        console.log('Database connection cannot be closed ');
      });
  }
};