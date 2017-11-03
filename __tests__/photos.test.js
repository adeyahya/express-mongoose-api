const app = require("../server")
const request = require("supertest")
const articleAction = require("../actions/article-action")
const userAction = require("../actions/user-action")
let token = ''
let photoid = ''

const data = {
  username: "johndoeng",
  email: "johndoeng@gmail.com",
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

describe("Get all photos", () => {
  it("Should return 200 with array", async () => {
    try {
      await request(app)
        .get("/photos")
        .expect(200)
        .expect(res => {
          expect(Array.isArray(res.body)).toBeTruthy()
        })
    } catch(e) {
      throw new Error(e)
    }
  })
})

describe("Upload photo", () => {
  // changed jasmine timeout
  beforeEach(function (done) {
    window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    setTimeout(function () {
      console.log('inside timeout');
      done();
    }, 500);
  })

  it("Should return 200 with photo", async () => {
    try {
      await request(app)
        .post("/photos")
        .set('x-auth-token', token)
        .attach("photo", "__tests__/dummy.jpg")
        .expect(200)
        .expect(res => {
          photoid = res._id
        })
    } catch(e) {
      throw new Error(e)
    }
  })
})

describe("Show photo", () => {
  it("Should return 200", async () => {
    try {
      await request(app)
        .get(`/photos/${photoid}`)
        .expect(200)
    } catch(e) {
      throw new Error(e)
    }
  })
})
