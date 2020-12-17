'use strict';

const supergoose = require("@code-fellows/supergoose");
const collections = require('../lib/collection/collections.js')
const { server } = require('../lib/server.js');
const testServer = supergoose(server);

describe('testing plants route', ()=> {
  it('should add a plant to the database', ()=>{
    const plant = {
      type: 'cactus',
      birthday: new Date(),
      feedingFrequency: '2 minutes',
      productivityFactor: 1,
      maxProductivityFactor: 2,
      minProductivityFactor: 0,
      cost: 100
    };

    testServer.post('/api/v1/plants').send(plant).then(results => {
     
      expect(results.status).toBe(200);
      expect(results.body.type).toEqual('cactus');
    })
  })
  it('should retrieve plant from the database', ()=>{
    testServer.get('/api/v1/plants').send().then(results => {
      console.log(results.body);
    })
  })
})




