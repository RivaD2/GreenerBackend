'use strict';

const supergoose = require("@code-fellows/supergoose");
const collections = require('../lib/collection/collections.js')
const { server } = require('../lib/server.js');
const testServer = supergoose(server);
let authorizeToken = '';
let userId = '';
const base64 = require('base-64');

describe('testing basic auth, bearer, user routes, user db', () => {
    it('user can sign up', () => {
        const user = {
            name: 'bryant',
            password: 'Test123@',
            currency: 0,
            role: 'user'
        }
        return testServer.post('/api/v1/user/signUp').send(user).then(results => {
            authorizeToken = results.body.token
            userId = results.body.results._id;
            expect(results.body.results.name).toEqual('bryant');
            expect(results.status).toEqual(200);
        })
    })
    it('user can signin with basic', () => {
        let string = base64.encode('bryant:Test123@')
        return testServer.post('/api/v1/user/signIn').set('authorization', `Basic ${string}`).then(results => {
            expect(results.body.user.name).toEqual('bryant');
            expect(results.status).toEqual(200)
        })
    })
    it('user can signin with token', () => {
        let string = base64.encode('bryant:Test123@')
        return testServer.post('/api/v1/user/signIn').set('authorization', `Bearer ${authorizeToken}`).then(results => {
            expect(results.body.user.name).toEqual('bryant');
            expect(results.status).toEqual(200)
        })
    })
    it('can retrieve user by name', () => {
        return testServer.post('/api/v1/user/stuff/all').send({name: 'bryant'}).then(results => {
            expect(results.body.name).toEqual('bryant');
            expect(results.status).toEqual(200)
        })
    })
    it('can retrieve user by id', () => {
        return testServer.get(`/api/v1/user/${userId}`).then(results => {
            expect(results.body.name).toEqual('bryant');
            expect(results.status).toEqual(200)
        })
    })
    it('can retrieve all users', () => {
        return testServer.get('/api/v1/user/').then(results => {
            expect(results.body.length).toEqual(1);
            expect(results.status).toEqual(200)
        })
    })
    it('can update currency on user', () => {
        return testServer.put(`/api/v1/user/${userId}`).send({currency: 200}).then(results => {
            expect(results.body.currency).toEqual(200);
            expect(results.status).toEqual(200);
        })
    })
    it('should throw 500 error', () => {
        return testServer.put(`/api/v1/users/${userId}`).send({currency: 200}).then(results => {
            expect(results.status).toEqual(500);
        })
    })
})