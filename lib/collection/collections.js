'use strict';

const terrarium = require('../models/terrarium.schema.js');
const plants = require('../models/plants.schema.js');
const shop = require('../models/shop.schema.js');
const userPlants = require('../models/userPlants.schema.js');
const userTerrarium = require('../models/userTerrarium.schema.js');

const Model = require('./model.collection.js');

module.exports = {
    terrarium: new Model(terrarium),
    plants: new Model(plants),
    shop: new Model(shop),
    userPlants: new Model(userPlants),
    userTerrarium: new Model(userTerrarium)
}