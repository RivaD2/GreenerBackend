'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());

module.exports = {
  server: app,
  start: function(port){
    const PORT = port || process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${PORT}`))
  }
}





