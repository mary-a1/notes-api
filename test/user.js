process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const cookieSession = require('cookie-session');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
  describe('POST /api/auth/login', () => {
    it('should log in a user', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({ email: 'tobias.funke@gmail.com', password: '1' })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.should.have.header('set-cookie');
          res.headers['set-cookie'].should.be.an('array').with.length.above(0);
          done();
        });
    });
  });
  describe('POST /api/auth/signup', () => {
    it('should sign a user up', (done) => {
      chai.request(server)
        .post('/api/auth/signup')
        .send({ email: generateRandomEmail(), password: '123456789' })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          done();
        });
    });
  });
  function generateRandomEmail() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomUsername = Array.from({ length: 10 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
    const randomDomain = Array.from({ length: 7 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('') + '.com';
    return `${randomUsername}@${randomDomain}`;
  }

});