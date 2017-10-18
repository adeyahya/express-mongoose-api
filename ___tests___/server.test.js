const request = require('supertest')
const app = require('../server.js')
const { actions } = require('../models')

describe('Register User', () => {
  const data = {
    username: 'johndoe',
    email: 'johndoe@gmail.com',
    password: 'supersecret666',
    name: 'John Doe'
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
        expect(res.body.password === data.password).toBeFalsy()
      })
  })
})
