'use strict';
const collection = require('../collection/collections.js');

function assignDefaultAssets(req,res,next) {
  let plantsArray = collection.plants.get();
  let terrariumArray = collection.terrarium.get();
  collection.userPlants.create({plantID: plantsArray[0]._id, userID: req.body.id});
  collection.userTerrarium.create({terrariumID: terrariumArray[0]._id, userID: req.body.id});
  next();
}

module.exports = assignDefaultAssets;