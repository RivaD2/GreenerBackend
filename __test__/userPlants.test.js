'use strict';

const supergoose = require("@code-fellows/supergoose");
const collections = require('../lib/collection/collections.js');
const { server } = require('../lib/server.js');
const testServer = supergoose(server);

let userPlantsId = '';

describe('testing userPlants route and db', () => {
    it('should add a plant associated with a user to the db', () => {
        const userPlants = {
            userID: 'wetgsea',
            plantID: 'agse',
        };
        return testServer.post('/api/v1/user-plants').send(userPlants).then(results => {
            expect(results.body.userID).toEqual('wetgsea')
            expect(results.status).toEqual(200);
        })
    })
    it('should get userPlants from db', () => {
        return testServer.get('/api/v1/user-plants').then(results => {
            userPlantsId = results.body[0]._id;
            expect(results.body[0].userID).toEqual('wetgsea');
            expect(results.status).toEqual(200);
        })
    })
    it('should update shop in db', () => {
        const updated = {
            userID: 'ghaer'
        }
        return testServer.put(`/api/v1/user-plants/${userPlantsId}`).send(updated).then(results => {
            expect(results.body.userID).toEqual('ghaer');
            expect(results.status).toEqual(200);
        })
    })
    it('should delete from db', () => {
        return testServer.delete(`/api/v1/user-plants/${userPlantsId}`).then(results => {
            expect(results.status).toEqual(200)
        })
    })
})




