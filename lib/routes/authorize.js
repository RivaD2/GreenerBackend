'use strict';

const express = require('express');
const router = express.Router();
const User = require('../collection/authorize.collection.js');
const userModel = require('../models/authorize.schema.js');
const authorize = require('../middleware/authorizeBasic');

const DB = User(userModel);

function handleAuthorized(req, res, next){
    res.send('Authorized');
};

router.post('/user/signUp', (req, res, next) => {
    try {
        let user = req.body;
        DB.save(user).then(results => {
            req.body.token = userModel.generateToken(req.body.name)
                console.log(req.body.token);
                res.status(200).json(results);
                next();

        }).catch(err => next(err));
    } catch (error) {
        console.error(error)
    }
});

router.post('/user/signIn', authorize, handleAuthorized);

router.get('/user/read', authorize, verify('read'), handleAuthorized);

router.put('/user/update', authorize, verify('update'), handleAuthorized);

router.post('/user/create', authorize, verify('create'), handleAuthorized);

router.delete('/user/delete', authorize, verify('delete'), handleAuthorized);


module.exports = router;