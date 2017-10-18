const request = require('supertest')
const app = require('../server')
const { actions, Article } = require('../models')
let token = ''

const data = {
  username: "johndoes",
  email: "johndoes@gmail.com",
  name: "John Doe",
  password: "supersecret111"
}

beforeAll(async () => {
  try {
    const user = await actions.createUser(data)
    const response = await request(app)
      .post('/auth')
      .send({
        email: data.email,
        password: data.password
      })

    token = response.body.token
  } catch (e) {
    throw new Error(e)
  }
})

afterAll(async () => {
  try {
    await actions.destroyUser({email: data.email})
  } catch(e) {
    throw new Error(e)
  }
})

describe('Create New Article', () => {
  it("return 200 with article data", async () => {
    try {
      // without token
      await request(app)
        .post("/api/article")
        .expect(401)

      await request(app)
        .post("/api/article")
        .set('x-auth-token', token)
        .send({
          data: [
            {
              type: 'title',
              style: 'h1',
              content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.'
            }
          ]
        })
        .expect(200)
        .expect(res => {
          expect(typeof res.body.slug).toEqual('string')
        })
    } catch(e) {
      throw new Error(e)
    }
  })
})
