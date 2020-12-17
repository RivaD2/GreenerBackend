'use strict';
// packages
const express = require('express');
require('dotenv').config();
const cors = require('cors');

//middleware
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
const timeStamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');

const app = express();

// routes
const modelRouter = require('./routes/model.js');
const userRoute = require('./routes/authorize.js');

// middleware
app.use(cors());
app.use(express.json());
app.use(timeStamp);
app.use(logger);

//routes
app.use('/api/v1', modelRouter);
app.use('/api/v1', userRoute);

// middleware
app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start: function(port){
    const PORT = process.env.PORT || 3000 || port;
    app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))
  }
}