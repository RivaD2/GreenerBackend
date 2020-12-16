'use strict';

const mongoose = require('mongoose');

const userTerrarium = mongoose.Schema({
  userID: {type: String, required: true},
  terraID: {type: String, required: true},
})

module.exports = mongoose.model('UserTerrarium', userTerrarium);