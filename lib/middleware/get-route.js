'use strict';

const collections = require('../collection/collections.js');

module.exports = function getRoute(req, res, next){
    if(req.params.model === 'plants'){
        req.params.model === collections.plants;
        next();
    }
    else if(req.params.model === 'terrariums'){
        req.params.model === collections.terrarium;
        next();
    }
    else if(req.params.model === 'shop'){
        req.params.model === collections.shop;
        next();
    }
    else if(req.params.model === 'user-plants'){
        req.params.model === collections.userPlants;
        next();
    }
    else if(req.params.model === 'user-terrariums'){
        req.params.model === collections.userTerrarium;
        next();
    }
    else{
        next('Invalid model')
    }
}