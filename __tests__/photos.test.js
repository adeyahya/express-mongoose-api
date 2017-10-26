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
