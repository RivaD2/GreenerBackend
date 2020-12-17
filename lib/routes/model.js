'use strict';

const express = require('express');
const router = express.Router();

const { getRoute } = require('../middleware/get-route.js');

router.param('model', getRoute);


// if body is empty it will return all items associated with that model
router.get('/:model', (req, res, next) => {
    try {
        req.params.model.get(req.body.id).then(result => {
            res.status(200).json(result);
        }).catch(err => next(err));

    } catch (error) {
        next(error);
    }
})

router.post('/:model', (req,res,next)=>{
    try {
        req.params.model.create(req.body)
        .then(results => {
            res.status(200).json(results)
        })
        .catch(err => next(err))
        
    } catch (error) {
        next(error)
    }
})

router.put('/:model/:id', (req, res, next) => {
    try {
        req.params.model.update(req.body, req.params.id).then(result => {
            res.status(200).json(result);
        })
            .catch(err => next(err));

    } catch (error) {
        next(error);
    }
})

router.delete('/:model/:id', (req,res,next) => {
    try {
        req.params.model.delete(req.params.id).then(result => {
            res.status(200).json(result)
        })
        .catch(err => next(err));
        
    } catch (error) {
        next(err);
    }
})

module.exports = router;