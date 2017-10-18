const request = require('supertest')
const app = require('../server.js')
const { actions } = require('../models')

describe('Root', () => {
  it('Should return 200', async () => {
    await request(app)
      .get("/")
      .expect(200)
  })
})


describe('Register User', () => {
  const data = {
    username: 'adeyahya',
    email: 'adeyahyaprasetyo@gmail.com',
    password: 'islamisme123',
    name: 'ade yahya'
  }

  afterAll(async () => {
    await actions.destroyUser({
      email: data.email
    })
  })

  it("Should return 200 with user data", async () => {
    await request(app)
      .post("/register")
      .send(data)
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toEqual(data.email)
      })
  })
})
