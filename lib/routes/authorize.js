'use strict';
const {OAuth2Client} = require('google-auth-library');
const express = require('express');
const router = express.Router();
const User = require('../collection/authorize.collection.js');
const userModel = require('../models/authorize.schema.js');
const authorize = require('../middleware/authorizeBasic.js');
const CLIENT_ID = process.env.CLIENT_ID;
const collection = require('../collection/collections.js');
const DB = new User(userModel);

function handleAuthorized(req, res, next){
    res.status(200).send({user: req.user, token: req.token});
};

router.post('/user/signUp', (req, res, next) => {
    try {
        let user = req.body;
        DB.save(user).then(results => {
            req.body.id = results._id
            req.body.token = userModel.generateToken(req.body.name)
            res.status(200).json({results, token: req.body.token});
                next();

        }).catch(err => next(err));
    } catch (error) {
        console.error(error)
    }
});

router.post('/user/signIn', authorize, handleAuthorized);

router.post('/user/authenticate', (req, res, next) => {
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: CLIENT_ID,  
        
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        userModel.findOne({"name": payload['name']}).then(result => {
            if (result === null) {
                return userModel.create({
                    password: userid,
                    name: payload['name'],
                    role: "user",
                    currency: 0,
                });
            }
            else{
                return res.status(200).json(result);
            }
        }).then(result => {
            collection.userPlants.create({"userID": result._id, "plantID": "5fe0d70994fdd30017882511"})
            collection.userTerrarium.create({"userID": result._id, "terraID": "5fe0d73594fdd30017882513"})
            res.status(200).json(result);
        })
    }
    verify().catch(console.error);
});

module.exports = router;