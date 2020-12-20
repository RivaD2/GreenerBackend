'use strict';

const mongoose = require('mongoose');

const userPlantsSchema = new mongoose.Schema({
  userID: {type: String, required: true},
  plantID: {type: String, required: true},
})

module.exports = mongoose.model('user-plants', userPlantsSchema);