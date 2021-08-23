const express = require('express');
const logger = require('morgan');
require('dotenv').config();

const connectDB = require('./config/database');

const Mongo_Uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;

const app = express();

const start = async () => {
  try {
    await connectDB(Mongo_Uri);
    console.log('Connected To The Database');
    app.listen(PORT, () => console.log(`Listening on the port ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
