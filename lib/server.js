'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
const timeStamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');

const app = express();

const modelRouter = require('./routes/model.js');

app.use(cors());
app.use(express.json());
app.use(timeStamp);
app.use(logger);

app.use('/api/v1', modelRouter);

app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start: function(port){
    const PORT = port || process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${PORT}`))
  }
}