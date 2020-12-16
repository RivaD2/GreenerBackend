'use strict';

const collections = require('../collection/collections.js');

function getRoute(req, res, next){
    console.log(collections.plants.create)
    if(req.params.model === 'plants'){
        console.log('in the plants')
        req.params.model = collections.plants;
        console.log(req.params.model.create)
        next();
    }
    else if(req.params.model === 'terrariums'){
        req.params.model = collections.terrarium;
        next();
    }
    else if(req.params.model === 'shop'){
        req.params.model = collections.shop;
        next();
    }
    else if(req.params.model === 'user-plants'){
        req.params.model = collections.userPlants;
        next();
    }
    else if(req.params.model === 'user-terrariums'){
        req.params.model = collections.userTerrarium;
        next();
    }
    else{
        next('Invalid model')
    }
}
module.exports = { getRoute }