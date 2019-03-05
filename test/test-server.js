'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');
const { PORT, TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

describe('index route', function() {
  it('should GET index page', function() {
    return chai
      .request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });

  it('should GET about page', function() {
    return chai
      .request(app)
      .get('/about')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });
});
