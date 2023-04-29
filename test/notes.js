//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
const server = require('../app');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Notes', () => {
/*
  * Test the /GET route
  */
  describe('/GET notes', () => {
      it('it should GET all the notes', (done) => {
        chai.request(server)
            .get('/api/notes')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });
});