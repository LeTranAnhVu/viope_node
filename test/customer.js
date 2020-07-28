const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../server');
const queryCustomer = require('../db/customer');
const should = chai.should();

chai.use(chaihttp);

const testItem = {
  "firstname": "brian",
  "lastname": "le",
  "email": "vu@le.com",
  "phone": "8233243"
}

describe('/POST customer', () => {
  beforeEach((done) => {
    queryCustomer.deleteAll();
    done();
  });


  it('Add new customer', (done) => {
    chai.request(app)
      .post('/api/customers')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(testItem))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('email');
        done();
      });
  });
});


describe('/GET customers', () => {
  it('Fetch all customers', (done) => {
    chai.request(app)
      .get('/api/customers')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
  });
});