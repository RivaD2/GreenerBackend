'use strict';

const collections = require('../collection/collections.js');
const userModel = require('../models/authorize.schema.js');
const Mongo = require('../collection/authorize.collection.js');

function getRoute(req, res, next){
    console.log(req.params.model)
    if(req.params.model === 'plants'){
        req.params.model = collections.plants;
        next();
    }
    else if(req.params.model === 'terrariums'){
        req.params.model = collections.terrariums;
        next();
    }
    else if(req.params.model === 'shop'){
        req.params.model = collections.shop;
        next();
    }
    else if(req.params.model === 'user-plants'){
        req.params.model = collections.userPlants;
        console.log(req.params.model)
        next();
    }
    else if(req.params.model === 'user-terrariums'){
        req.params.model = collections.userTerrarium;
        next();
    }
    else if(req.params.model === 'user'){
        req.params.model = new Mongo(userModel);
        next();
    }
    else{
        next('Invalid model')
    }
}
module.exports = { getRoute }