'use strict';

const supergoose = require("@code-fellows/supergoose");
const collections = require('../lib/collection/collections.js')
const { server } = require('../lib/server.js');
const testServer = supergoose(server);
let authorizeToken = '';
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
})