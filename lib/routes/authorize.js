'use strict';
const {OAuth2Client} = require('google-auth-library');
const express = require('express');
const router = express.Router();
const User = require('../collection/authorize.collection.js');
const userModel = require('../models/authorize.schema.js');
const authorize = require('../middleware/authorizeBasic.js');
const assignDefaultAssets = require('../middleware/assignDefaultAssets.js');
const verify = require('../middleware/acl.js');
const CLIENT_ID = process.env.CLIENT_ID;
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
}, assignDefaultAssets);

router.post('/user/signIn', authorize, handleAuthorized);

router.get('/user/read', authorize, verify('read'), handleAuthorized);

router.put('/user/update', authorize, verify('update'), handleAuthorized);

router.post('/user/authenticate', (req, res, next) => {
    console.log('authentication route', CLIENT_ID);
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: CLIENT_ID,  
     
    });
    const payload = ticket.getPayload();
    console.log('payload', payload)
    const userid = payload['sub'];
    
    res.send(200);
    }
    verify().catch(console.error);
})

router.post('/user/create', authorize, verify('create'), handleAuthorized);

router.delete('/user/delete', authorize, verify('delete'), handleAuthorized);


module.exports = router;