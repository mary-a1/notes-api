process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const cookieSession = require('cookie-session');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Notes', () => {
  /*
    * Test the /GET route
  */
  describe('/GET notes', () => {
    it('should return 400 if user is not logged', (done) => {
      chai.request(server)
        .get('/api/notes')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should GET all the notes for authenticated user', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({ email: "tobias.funke@gmail.com", password: "1" })
        .end((err, res) => {
          chai.request(server)
            .get('/api/notes')
            .set('Cookie', res.headers['set-cookie']) // Set the cookie from login response
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
    });

  });

  /*
    * Test the /GET /:id route
  */
  describe('GET /:id', () => {
    it('should return 400 if user is not logged in', (done) => {
      noteId = 2;
      chai.request(server)
        .get(`/api/notes/${noteId}`)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return a single note for authenticated user', (done) => {
      noteId = 2;
      chai.request(server)
        .post('/api/auth/login')
        .send({ email: "tobias.funke@gmail.com", password: "1" })
        .end((err, res) => {
          chai.request(server)
            .get(`/api/notes/${noteId}`)
            .set('Cookie', res.headers['set-cookie']) // Set the cookie from login response
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
              res.body[0].should.have.property('text');
              res.body[0].should.have.property('created_at');
              done();
            });
        });
    });
    it('should return a 404 error if note is not found', (done) => {
      const noteId = '100'; // ID of a non-existing note
      chai.request(server)
        .post('/api/auth/login')
        .send({ email: "tobias.funke@gmail.com", password: "1" })
        .end((err, res) => {
          chai.request(server)
            .get(`/api/notes/${noteId}`)
            .set('Cookie', res.headers['set-cookie']) // Set the cookie from login response
            .end((err, res) => {
              res.should.have.status(404);
              done();
            });
        });
    });
  });

  /*
  * Test the /POST
  */
  describe('POST /api/notes', () => {
    it('should return 400 if user is not logged in', (done) => {
      chai.request(server)
        .post('/api/notes')
        .send({ text: "New note" })
        .end(function(err, res) {
          res.should.have.status(400);
          done();
        });
    });
    it('should create a new note for authenticated user', (done) => {
      // const newNote = { user_id: 1, text: 'Test note' };
      chai.request(server)
        .post('/api/auth/login')
        .send({ email: "tobias.funke@gmail.com", password: "1" })
        .end((err, res) => {
          chai.request(server)
            .post('/api/notes')
            .set('Cookie', res.headers['set-cookie']) // Set the cookie from login response
            .send({ text: "New note" })
            .end(function(err, res) {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('text').eql('New note');
              done();
            });
        });
    });
  });

  /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id', () => {
    it('should return 400 if user is not logged in', (done) => {
      const noteToUpdate = { note: 'the cat jumped!' };
      chai.request(server)
        .put('/api/notes/1')
        .send(noteToUpdate)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should UPDATE a note given the id for authenticated user', (done) => {
      const noteToUpdate = { note: 'the cat jumped!' };
      chai.request(server)
        .post('/api/auth/login')
        .send({ email: "tobias.funke@gmail.com", password: "1" })
        .end((err, res) => {
          chai.request(server)
            .put('/api/notes/1')
            .set('Cookie', res.headers['set-cookie']) // Set the cookie from login response
            .send(noteToUpdate)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property("message").equal("note updated!");
              done();
            });
        });
    });
  });

  /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id', () => {
    it('should return 400 if user is not logged in', (done) => {
      chai.request(server)
        .delete('/api/notes/1')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should DELETE a note given the id for authenticated user', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({ email: "tobias.funke@gmail.com", password: "1" })
        .end((err, res) => {
          chai.request(server)
            .delete('/api/notes/1')
            .set('Cookie', res.headers['set-cookie']) // Set the cookie from login response
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property("message").equal("note deleted!");
              done();
            });
        });
    });
  });

  /*
  * Test the /POST/:id/share
  */
  describe('/POST/:id/share', () => {
    it('should return 400 if user is not logged in', (done) => {
      chai.request(server)
        .post('/api/notes/:id/share')
        .send({ user_id: 2 })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('should share a note given the id to the other user id for authenticated user', (done) => {
      let noteId = 2;
      chai.request(server)
        .post('/api/auth/login')
        .send({ email: "tobias.funke@gmail.com", password: "1" })
        .end((err, res) => {
          chai.request(server)
            .post(`/api/notes/${noteId}/share`)
            .set('Cookie', res.headers['set-cookie']) // Set the cookie from login response
            .send({ user_id: 2 })
            .end(function(err, res) {
              res.should.have.status(200);
              res.body.should.have.property("message").equal("note shared!");

              // check if other user has the shared note
              chai.request(server)
                .post('/api/auth/login')
                .send({ email: "lindsay.ferguson@gmail.com", password: "1" })
                .end((err, res) => {
                  chai.request(server)
                    .get(`/api/notes/${noteId}`)
                    .set('Cookie', res.headers['set-cookie']) // Set the cookie from login response
                    .end(function(err, res) {
                      res.should.have.status(200);
                      done();
                    });
                });
            });
        });
    });
  });
});


