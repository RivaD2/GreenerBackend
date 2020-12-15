'use strict';

const mongoose = require('mongoose');

const plantsSchema = new mongoose.Schema({
  userID: {type: String, required: true},
  plantID: {type: String, required: true},
})

module.exports = mongoose.model('Plants', plantsSchema);