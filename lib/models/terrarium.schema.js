'use strict';

const mongoose = require('mongoose');

const terrariumSchema = new mongoose.Schema({
  plotSize: {type: Number, required: true},
  cost: {type: Number, required: true}
});

module.export = mongoose.model('Terrarium', terrariumSchema);