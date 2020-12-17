'use strict';

const supergoose = require("@code-fellows/supergoose");
const collections = require('../lib/collection/collections.js');
const { collection } = require("../lib/models/shop.schema.js");
const { server } = require('../lib/server.js');
const testServer = supergoose(server);

let shopId = '';

describe('testing shop route and db', () => {
    it('should add a shop to the db', () => {
        const shop = {
            itemID: 'sf',
            type: 'stuff',
            category: 'other stuff',
        };
        return testServer.post('/api/v1/shop').send(shop).then(results => {
            expect(results.body.type).toEqual('stuff')
            expect(results.status).toEqual(200);
        })
    })
    it('should get shop from db', () => {
        return testServer.get('/api/v1/shop').then(results => {
            shopId = results.body[0]._id;
            expect(results.body[0].type).toEqual('stuff');
            expect(results.status).toEqual(200);
        })
    })
    it('should update shop in db', () => {
        const updated = {
            type: 'more stuff'
        }
        return testServer.put(`/api/v1/shop/${shopId}`).send(updated).then(results => {
            expect(results.body.type).toEqual('more stuff');
            expect(results.status).toEqual(200);
        })
    })
    it('should delete from db', () => {
        return testServer.delete(`/api/v1/shop/${shopId}`).then(results => {
            expect(results.status).toEqual(200)
        })
    })
})




