'use strict';

const Schema = require('../models/authorize.schema.js');
const base64 = require('base-64');

function routes(req, res, next) {
    console.log(req.headers.authorization);
    let encodedString = req.headers.authorization.split(' ')[0]
    if (encodedString === 'Basic') {
        return authorizeBasic(req, res, next);
    }
    else if (encodedString === "Bearer") {
        return bearerBasic(req, res, next);
    }
    else {
        next('not a valid header');
    }

}

async function bearerBasic(req, res, next) {
    let tokenString = req.headers.authorization.split(' ')[1];
    try {
        let token = await Schema.validateToken(tokenString);
        if (token) {
            let user = await Schema.findOne({ "name": token.username })
            req.user = user;
        }
        next()
    } catch (error) {
        next(error)
    }
}

function authorizeBasic(req, res, next) {
    let encodedString = req.headers.authorization.split(' ')[1];
    let decodedString = base64.decode(encodedString);
    let user = decodedString.split(':')[0];
    let pass = decodedString.split(':')[1];
    return Schema.authenticateBasic(user, pass)
        .then(results => {
            isValid(results);
        })
        
    function isValid(user) {
        if (user) {
            req.user = user;
            req.token = Schema.generateToken(user.name);
            next();
        }
        else {
            next('User not Valid');
        }
    }
}

module.exports = routes;
