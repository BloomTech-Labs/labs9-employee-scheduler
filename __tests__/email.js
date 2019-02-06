const supertest = require('supertest')
const server = require('../server/server')
const db = require('../database/dbConfig')
const uuid = require('uuid/v4')
const mockery = require('mockery')
const request = supertest(server)
const sendInvite = require('../utils/email')
const mockery = require('mockery');
const nodemailerMock = require('nodemailer-mock');
const transport = nodemailerMock.createTransport({
    service: 'gmail',
    auth: {
        user: username,
        pass: password
    }
});


// the email you want to send
const email = sendInvite('test@testymctestyface.com', uuid())

// send an email with nodestyle callback
transport.sendMail(email, function(err, info) {
  if (err) {
    console.log('Error!', err, info);
  } else {
    console.log('Success!', info);
  }
}

// send an email with promises
transport.sendMail(email)
.then(function(info) {
  console.log('Success!', info);
})
.catch(function(err) {
  console.log('Error!', err);
});

// verify a transport
transport.verify(function(err, success) {
  if (err) {
    console.log('Error!', err);
  } else {
    console.log('Success!', success);
  }
})

describe('Tests that send email', function() {
  beforeAll(function() {
    // Enable mockery to mock objects
    mockery.enable({
      warnOnUnregistered: false,
    });

    /* Once mocked, any code that calls require('nodemailer')
    will get our nodemailerMock */
    mockery.registerMock('nodemailer', nodemailerMock)
    /*
    ##################
    ### IMPORTANT! ###
    ##################
    */
    /* Make sure anything that uses nodemailer is loaded here,
    after it is mocked just above... */
  });

  afterEach(function() {
    // Reset the mock back to the defaults after each test
    nodemailerMock.mock.reset();
  });

  afterAll(function() {
    // Remove our mocked nodemailer and disable mockery
    mockery.deregisterAll();
    mockery.disable();
  });

  it('should send an email using nodemailer-mock', async (done) => {
    // call a service that uses nodemailer
    const response = await email

    // a fake test for something on our response
    response.value.should.be.exactly('value');

    // get the array of emails we sent
    const sentMail = await nodemailerMock.mock.sentMail();

    // we should have sent one email
    sentMail.length.should.be.exactly(1);

    // check the email for something
    sentMail[0].property.should.be.exactly('foobar');

    done();
  });

  it('should fail to send an email using nodemailer-mock', function(done) {
    // tell the mock class to return an error
    const err = 'My custom error';
    nodemailerMock.mock.shouldFailOnce();
    nodemailerMock.mock.failResponse(err);

    // call a service that uses nodemailer
    var response = ... // <-- your code here

    // a fake test for something on our response
    response.error.should.be.exactly(err);

    done();
  });

  it('should verify using the real nodemailer transport', function(done) {
    // tell the mock class to pass verify requests to nodemailer
    nodemailerMock.mock.mockedVerify(false);

    // call a service that uses nodemailer
    var response = ... // <-- your code here

    /* calls to transport.verify() will be passed through,
       transport.sendMail() is still mocked */

    done();
  });
});