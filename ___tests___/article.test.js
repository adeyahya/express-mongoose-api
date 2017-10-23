const request = require('supertest')
const app = require('../server')
const articleAction = require("../actions/article-action")
const userAction = require("../actions/user-action")
let token = ''
let slug = ''

const data = {
  username: "johndoes",
  email: "johndoes@gmail.com",
  name: "John Doe",
  password: "supersecret111"
}

beforeAll(async () => {
  try {
    const user = await userAction.create(data)
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
    await userAction.destroy({email: data.email})
    await articleAction.destroy({slug: 'lorem-ipsum'})
  } catch(e) {
    throw new Error(e)
  }
})

describe("Get all articles", () => {
  it("Should return 200", async () => {
    try {
      await request(app)
        .get("/article")
        .expect(200)
    } catch(e) {
      throw new Error(e)
    }
  })
})

describe('Create New Article', () => {
  it("return 200 with article data", async () => {
    try {
      // without token
      await request(app)
        .post("/article")
        .expect(401)

      await request(app)
        .post("/article")
        .set('x-auth-token', token)
        .send({
          title: 'lorem ipsum',
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
          slug = res.body.slug
          expect(typeof res.body.slug).toEqual('string')
        })
    } catch(e) {
      throw new Error(e)
    }
  })
})

describe("Show article", () => {
  it("Should return 200", async () => {
    try {
      await request(app)
      .get(`/article/${slug}`)
      .expect(200)
      .expect(res => {
        expect(typeof res.body.author.email).toEqual('string')
      })
    } catch(e) {
      throw new Error(e)
    }
  })
})

describe("Update article", () => {
  it("Should return 200 with updated article", async () => {
    try {
      await request(app)
        .patch(`/article/${slug}`)
        .set('x-auth-token', token)
        .send({
          title: "new title"
        })
        .expect(200)
        .expect(res => {
          expect(res.body.title === "new title")
        })
    } catch (e) {
      throw new Error(e)
    }
  })
})

describe("Delete article", () => {
  it("Should return 200", async () => {
    try {
      await request(app)
        .delete(`/article/${slug}`)
        .set('x-auth-token', token)
        .expect(200)
    } catch(e) {
      throw new Error(e)
    }
  })
})
