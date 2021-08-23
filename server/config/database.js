const mongoose = require('mongoose');

const connectDB = (URI) => {
  return mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

module.exports = connectDB;
