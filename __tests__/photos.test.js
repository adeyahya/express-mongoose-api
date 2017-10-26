const app = require("../server")
const request = require("supertest")

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
        .attach("photo", "__tests__/dummy.jpg")
        .expect(200)
    } catch(e) {
      throw new Error(e)
    }
  })
})
