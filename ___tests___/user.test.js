const request = require('supertest')
const app = require('../server.js')
const userAction = require("../actions/user-action")

const data = {
  username: 'johndoe',
  email: 'johndoe@gmail.com',
  password: 'supersecret666',
  name: 'John Doe'
}

afterAll(async () => {
  try {
    await userAction.destroy({
      email: data.email
    })
  } catch (e) {
    throw new Error(e)
  }
})

describe('Register User', () => {
  it("Should be an error 422", async () => {
    try {
      await request(app)
      .post("/register")
      .send({
        username: "a a a",
        email: "akk"
      })
      .expect(422)
    } catch(e) {
      throw new Error(e)
    }
  })

  it("Should return 200 with user data", async () => {
    try {
      await request(app)
      .post("/register")
      .send(data)
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toEqual(data.email)
        expect(res.body.password === data.password).toBeFalsy()
      })
    } catch (e) {
      throw new Error(e)
    }
  })
})

describe("Auth User", () => {
  it("should be return 200 and received token", async () => {
    try {
      await request(app)
      .post("/auth")
      .send({
        email: data.email,
        password: data.password
      })
      .expect(200)
      .expect(res => {
        expect(typeof res.body.token).toEqual("string")
      })
    } catch (e) {
      throw new Error(e)
    }
  })

  it("should be return 401", async () => {
    try {
      await request(app)
      .post("/auth")
      .send({
        email: "randomemail@gmail.com",
        password: "lolpassword888"
      })
      .expect(401)
    } catch(e) {
      throw new Error(e)
    }
  })

  it("should be return 422", async () => {
    try {
      await request(app)
      .post("/auth")
      .send({
        email: "worngemail",
        password: "wrong password format"
      })
      .expect(422)
    } catch(e) {
      throw new Error(e)
    }
  })
})

describe("Get all users", () => {
  it("should return 200", async () => {
    try {
      await request(app)
        .get("/users")
        .expect(200)
    } catch(e) {
      throw new Error(e)
    }
  })
})

describe("get user", () => {
  it("should return 200", async () => {
    try {
      const user = await request(app)
        .get(`/users/${data.username}`)
        .expect(200)
        .expect(res => {
          expect(res.body.email).toEqual(data.email)
        })
    } catch(e) {
      throw new Error(e)
    }
  })
})
