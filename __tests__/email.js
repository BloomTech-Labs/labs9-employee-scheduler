const supertest = require('supertest')
const server = require('../server/server')
const db = require('../database/dbConfig')
const uuid = require('uuid/v4')
const mockery = require('mockery')
const request = supertest(server)
// const sendMailMock = jest.fn() // this will return undefined if .sendMail() is called

// In order to return a specific value you can use this instead
const sendMailMock = jest.fn().mockReturnValue({
  from: 'Carlos',
  to: 'rahul@cadence.com',
  subject: 'Invite link',
  html: 'Join our app bro'
})

jest.mock('nodemailer')

const nodemailer = require('nodemailer') //doesn't work with import. idk why
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock })

beforeEach(() => {
  sendMailMock.mockClear()
  nodemailer.createTransport.mockClear()
})

describe('Email Invite', () => {
  it('test that the email is sent with 200', async () => {
    const response = await request
      .post('/invites/invite-supervisor')
      // global variable
      .send({
        name: 'Testing McTestyFace',
        email: 'test@testymctestyface.com'
      })
      .send({ sendMailMock })
      .set('authorization', 'testing')
      .set('user', 'owner')
      .expect('Content-Type', /json/)

    // should complete successfully
    expect(response.status).toBe(201)

    // TODO not sure how to express the expect statement here
    expect(sendMailMock).toHaveBeenCalled()
  })
})
