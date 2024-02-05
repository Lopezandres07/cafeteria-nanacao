const request = require('supertest')
const { app, server } = require('../../index.js')
const { faker } = require('@faker-js/faker')

describe('Operaciones CRUD de cafes', () => {
  describe('GET /cafes', () => {
    it('Obtain at least 1 object', async () => {
      const response = await request(app).get('/cafes')
      const status = response.statusCode
      const body = response.body

      expect(status).toBe(200)
      expect(body.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('DELETE /cafes/:id', () => {
    const randomId = faker.string.uuid()
    const randomToken = 'randomToken'

    it('Trying to delete an unexist id', async () => {
      const response = await request(app)
        .delete(`/cafes/${randomId}`)
        .set('Authorization', randomToken)

      const status = response.statusCode

      expect(status).toBe(404)
    })
  })

  describe('POST /cafes', () => {
    it('Return 201 adding a new coffe', async () => {
      const newCoffe = {
        id: faker.string.uuid(),
        nombre: 'Cappuccino Vainilla',
      }

      const response = await request(app).post('/cafes').send(newCoffe)

      const status = response.statusCode
      const body = response.body

      expect(status).toBe(201)
      expect(body).toEqual(expect.arrayContaining([newCoffe]))
    })
  })

  describe('PUT /cafes/:id', () => {
    it('Return 400 updating a coffe with different id', async () => {
      const updatingCoffe = {
        id: 1,
        nombre: 'Frappe',
      }

      const randomId = faker.string.uuid()

      const response = await request(app)
        .put(`/cafes/${randomId}`)
        .send(updatingCoffe)

      const status = response.statusCode

      expect(status).toBe(400)
    })
  })

  afterAll(() => {
    server.close()
  })
})
