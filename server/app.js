const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const { notFoundError, errorHandler } = require('./middlewares/errorHandler');
const routes = require('./routes');

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

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use(routes);

// 404 Error
app.use(notFoundError);

// Custom Error Handler
app.use(errorHandler);

start();
