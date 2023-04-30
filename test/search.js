process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const cookieSession = require('cookie-session');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);
/*
  * Test the /GET Search route
*/
describe('/GET search notes from a keyword', () => {
  it(' should return 400 if user is not logged', (done) => {
    chai.request(server)
      .get('/api/search')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should return the note which contains the keyword for authenticated user', (done) => {
    const keyword = "New note";
    chai.request(server)
      .post('/api/auth/login')
      .send({ email: "tobias.funke@gmail.com", password: "1" })
      .end((err, res) => {
        chai.request(server)
          .get(`/api/search?q=${keyword}`)
          .set('Cookie', res.headers['set-cookie']) // Set the cookie from login response
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.length.greaterThan(0);
            done();
          });
      });
  });
});


