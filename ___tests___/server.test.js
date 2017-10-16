const request = require('supertest')
const app = require('../server.js')

describe('hahaha', () => {
  it('Should return 200', async () => {
    await request(app)
      .get("/")
      .expect(200)
  })
})
