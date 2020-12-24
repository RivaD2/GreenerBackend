'use strict';
const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  itemID: {type: String, required: true},
  type: {type: String, required: true},
  category: {type: String, required: true},
})

module.exports = mongoose.model('Shop',shopSchema);