'use strict';

const supergoose = require("@code-fellows/supergoose");
const collections = require('../lib/collection/collections.js');
const { server } = require('../lib/server.js');
const testServer = supergoose(server);

let userTerrariumsId = '';

describe('testing userTerrariums route and db', () => {
    it('should add a terrarium associated with a user to the db', () => {
        const userTerrariums = {
            userID: 'hrgsr',
            terraID: 'gwe'
        };
        return testServer.post('/api/v1/user-terrariums').send(userTerrariums).then(results => {
            expect(results.body.userID).toEqual('hrgsr')
            expect(results.status).toEqual(200);
        })
    })
    it('should get userTerrariums from db', () => {
        return testServer.get('/api/v1/user-terrariums').then(results => {
            userTerrariumsId = results.body[0]._id;
            expect(results.body[0].userID).toEqual('hrgsr');
            expect(results.status).toEqual(200);
        })
    })
    it('should update shop in db', () => {
        const updated = {
            userID: 'ghaer'
        }
        return testServer.put(`/api/v1/user-terrariums/${userTerrariumsId}`).send(updated).then(results => {
            expect(results.body.userID).toEqual('ghaer');
            expect(results.status).toEqual(200);
        })
    })
    it('should delete from db', () => {
        return testServer.delete(`/api/v1/user-terrariums/${userTerrariumsId}`).then(results => {
            expect(results.status).toEqual(200)
        })
    })
})




