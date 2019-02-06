const server = require('../server/server')
const supertest = require('supertest')
const request = supertest(server)
const mockery = require('mockery')
const nodemailerMock = require('nodemailer-mock')
const transport = nodemailerMock.createTransport({
  mailer: 'Carlos'
})

// the email you want to send
const email = 'I do not like testing anymore'

// send an email with nodestyle callback
transport.sendMail(email, function(err, info) {
  if (err) {
    return 'Error!'
  } else {
    return 'Success!'
  }
})

// verify a transport
transport.verify(function(err, success) {
  if (err) {
    return 'Error!'
  } else {
    return 'Success!'
  }
})

describe('Tests that send email', function() {
  /* This could be an app, Express, etc. It should be
  instantiated *after* nodemailer is mocked. */
  const server = require('../server/server')

  beforeEach(function() {
    // Enable mockery to mock objects
    mockery.enable({
      warnOnUnregistered: false
    })

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
  })

  afterEach(function() {
    // Reset the mock back to the defaults after each test
    nodemailerMock.mock.reset()
  })

  afterAll(function() {
    // Remove our mocked nodemailer and disable mockery
    mockery.deregisterAll()
    mockery.disable()
  })

  it('should send an email using nodemailer-mock', async done => {
    // call a service that uses nodemailer
    const response = await nodemailerMock.mock.sentMail()

    // a fake test for something on our response
    expect(response).toEqual(['I do not like testing anymore'])
    await done()
  })

  it('should return success messaged', async done => {
    const response = await nodemailerMock.mock.successResponse('success')
    expect(response).toBe(transport.sendMail.success)
    await done()
  })

  it('should fail to send an email using nodemailer-mock', async done => {
    // tell the mock class to return an error
    const err = await ['rejected']
    await nodemailerMock.mock.failResponse(err)

    const response = await transport.sendMail(err)
    console.log(response.rejected)
    // a fake test for something on our response
    expect(response.rejected).toEqual(err)

    await done()
  })
})
