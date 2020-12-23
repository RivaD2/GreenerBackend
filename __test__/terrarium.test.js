'use strict';

const supergoose = require("@code-fellows/supergoose");
const collections = require('../lib/collection/collections.js');
const { collection } = require("../lib/models/shop.schema.js");
const { server } = require('../lib/server.js');
const testServer = supergoose(server);

let terrariumId = '';

describe('testing terrarium route and db', () => {
    it('should add a terrarium to the db', () => {
        const terrarium = {
            plotSize: 3,
            cost: 5,
        };
        return testServer.post('/api/v1/terrariums').send(terrarium).then(results => {
            terrariumId = results.body._id;
            expect(results.body.plotSize).toEqual(3)
            expect(results.status).toEqual(200);
        })
    })
    it('should get terrariums from db', () => {
        return testServer.get('/api/v1/terrariums').then(results => {
            expect(results.body.plotSize).toEqual(3);
            expect(results.status).toEqual(200);
        })
    })
    it('should update shop in db', () => {
        const updated = {
            plotSize: 5
        }
        return testServer.put(`/api/v1/terrariums/${terrariumId}`).send(updated).then(results => {
            expect(results.body.plotSize).toEqual(5);
            expect(results.status).toEqual(200);
        })
    })
    it('should delete from db', () => {
        return testServer.delete(`/api/v1/terrariums/${terrariumId}`).then(results => {
            expect(results.status).toEqual(200)
        })
    })
})




