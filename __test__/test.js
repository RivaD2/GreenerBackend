'use strict';

const supergoose = require("@code-fellows/supergoose");
//const { describe } = require("yargs");
const collections = require('../lib/collection/collections.js')
const { server } = require('../lib/server.js');
const testServer = supergoose(server);
let plantId = '';
let terrariumId = '';
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

    return testServer.post('/api/v1/plants').send(plant).then(results => {
     
      expect(results.status).toBe(200);
      expect(results.body.type).toEqual('cactus');
    })
  })
  it('should retrieve plant from the database', ()=>{
    return testServer.get('/api/v1/plants').send().then(results => {
      plantId = results.body[0]._id
      expect(results.body[0].type).toEqual('cactus');
      expect(results.status).toEqual(200);
    })
  })
  it('should update the catctus to four leaf clover', () =>{
    const updated = {
      type: 'four leaf clover',
      birthday: new Date(),
      feedingFrequency: '2 minutes',
      productivityFactor: 1,
      maxProductivityFactor: 2,
      minProductivityFactor: 0,
      cost: 100
    };
    return testServer.put(`/api/v1/plants/${plantId}`).send(updated).then(res => {
      console.log(res.body)
      expect(res.body.type).toEqual('four leaf clover');
      expect(res.status).toEqual(200);
    })
  })
  it('can delete the plant from the db', () => {
    return testServer.delete(`/api/v1/plants/${plantId}`).then(res => {
      console.log(res.body)
      expect(res.status).toEqual(200);
    })
  })
});


describe('testing terrarium database table', ()=> {
  console.log('i am here');
  it('should be able to add to the terrarium db', ()=> {
    const terrarium = {
      plotSize: 3,
      cost: 50000,
    };
    return testServer.post('/api/v1/terrariums').send(terrarium)
    .then( result => {
      console.log(result.body)
      expect(result.body.plotSize).toEqual(3)
    })
  })
})




