const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const uuid = require('uuid/v4')
const { generateTeamData } = require('../database/utils/generateData')

const request = supertest(server)

describe('testing the organizations router', () => {
  describe('GET', () => {
    it('should return all organizations - GET /', async () => {
      const expected = await knex('organizations')
      const response = await request
        .get('/organizations')
        .set('authorization', 'testing')

      expect(response.status).toEqual(200)
      expect(response.body.length).toEqual(expected.length)
    })

    it('should return a JSON response', async () => {
      const response = await request
        .get('/organizations')
        .set('authorization', 'testing')
      expect(response.type).toEqual('application/json')
    })
  })

  describe('GET /:id', () => {
    it('returns the correct organization by ID - GET /:id', async () => {
      const { team, cleanup } = await generateTeamData(knex)
      const { id } = team.organization

      const expected = await knex('organizations').where({
        id: id
      })

      const response = await request
        .get(`/organizations/${id}`)
        .set('authorization', 'testing')

      expect(response.status).toEqual(200)
      expect([response.body]).toEqual(expected)

      await cleanup()
    })

    it('returns status code 404 for non-existent organization - GET/:id', async () => {
      const fake_id = uuid()
      const verifyAbsence = await knex('organizations')
        .where('id', fake_id)
        .first()
      expect(verifyAbsence).toBeFalsy()

      const response = await request
        .get(`/organizations/${fake_id}`)
        .set('authorization', 'testing')

      expect(response.status).toEqual(404)
    })
  })

  describe('POST', () => {
    it('can create a new organization', async () => {
      const org = { name: 'Test Organization' }
      const response = await request
        .post('/organizations')
        .send(org)
        .set('authorization', 'testing')

      // check to see if target is in database
      const target = await knex('organizations').where(org)

      // clean target out of database if created
      await knex('organizations')
        .delete()
        .where(org)
      expect(response.body.length).toEqual(1)
      expect(response.status).toBe(201)
      expect(target.length).toEqual(1)
    })

    it('can reject an empty organization', async () => {
      const org = {}
      const response = await request
        .post('/organizations')
        .send(org)
        .set('authorization', 'testing')
      expect(response.status).toBe(400)
      expect(response.body).toEqual({ error: 'Missing required field "name"' })
    })
  })

  describe('PUT', () => {
    it('can edit an organization', async () => {
      const { team, cleanup } = await generateTeamData(knex)

      const { id } = team.organization
      const edit = await request
        .put(`/organizations/${id}`)
        .send({ name: 'Edited Org' })
        .set('authorization', 'testing')

      const response = await request
        .get(`/organizations/${id}`)
        .set('authorization', 'testing')

      expect(edit.status).toBe(200)
      expect(response.body.name).toBe('Edited Org')

      const target = await knex('organizations')
        .where('id', id)
        .select('name')
        .first()
      expect(target.name).toBe('Edited Org')

      await cleanup()
    })

    it('can reject an empty organization', async () => {
      const { team, cleanup } = await generateTeamData(knex)

      const { id } = team.organization
      const response = await request
        .put(`/organizations/${id}`)
        .send({})
        .set('authorization', 'testing')

      await request.get(`/organizations/${id}`).set('authorization', 'testing')

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ error: 'No fields provided to update' })

      await cleanup()
    })
  })

  describe('DELETE', () => {
    it('can delete an organzation', async () => {
      const { team, cleanup } = await generateTeamData(knex)

      const { id } = team.organization
      const response = await request
        .delete(`/organizations/${id}`)
        .set('authorization', 'testing')

      expect(response.status).toBe(200)

      await cleanup()
    })
  })
})
