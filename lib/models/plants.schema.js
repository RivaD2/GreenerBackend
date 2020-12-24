'use strict';
const mongoose = require('mongoose');

const plantsSchema = new mongoose.Schema({
  type:  {type: String, required: true},
  birthday: {type: Date, required: false},
  feedingFrequency: {type: String, required: true},
  productivityFactor: {type: Number, required: true},
  maxProductivityFactor: {type: Number, required: true},
  minProductivityFactor: {type: Number, required: true},
  cost: {type: Number, required: true},
})

module.exports = mongoose.model('plants', plantsSchema);