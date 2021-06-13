const request = require("supertest");
const app = require("../server.js");
const expect = require("chai").expect;

/**
 * Testing get all users endpoint
 */
describe("GET /users", () => {
  it("responds with status 200", (done) => {
    request(app)
      .get("/api/v1/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("responds with json containing a list of all users", (done) => {
    request(app)
      .get("/api/v1/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("success");
        expect(res.body.success).to.be.equal(true);
        expect(res.body).to.have.property("payload");
        expect(res.body.payload).to.have.lengthOf(1);
        return done();
      });
  });
});

/**
 * Testing get user by id endpoint
 */
describe("GET /users/:id", () => {
  it("responds with status 200 when get valid user", (done) => {
    request(app)
      .get("/api/v1/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it("responds with json object containing user details", (done) => {
    const expected = {
      success: true,
      payload: {
        id: 1,
        email: "email@email.com",
        givenName: "Joe",
        familyName: "Bloggs",
      },
    };

    request(app)
      .get("/api/v1/users/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.success).to.equal(true);
        expect(res.body.payload.id).to.be.equal(expected.payload.id);
        expect(res.body.payload.email).to.be.equal(expected.payload.email);
        expect(res.body.payload.givenName).to.be.equal(
          expected.payload.givenName
        );
        expect(res.body.payload.familyName).to.be.equal(
          expected.payload.familyName
        );
        return done();
      });
  });

  it("responds with 404 when get user which does not exist", (done) => {
    const expected = {
      success: false,
      payload: "404 Not Found",
    };

    request(app)
      .get("/api/v1/users/23")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect(expected)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});

/**
 * Testing add user endpoint
 */
describe("POST /users", () => {
  it("responds with status 201 created when successful", (done) => {
    const newUser = {
      email: "james@email.com",
      givenName: "james",
      familyName: "bowler",
    };

    request(app)
      .post("/api/v1/users")
      .send(newUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("responds with success true and id of new user when successful", (done) => {
    const newUser = {
      email: "james@email.com",
      givenName: "james",
      familyName: "bowler",
    };

    const expected = {
      success: true,
      payload: 3,
    };

    request(app)
      .post("/api/v1/users")
      .send(newUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .expect(expected)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("respond status 400 and correct message when missing property in body data", (done) => {
    const newUser = {
      email: "james@email.com",
      givenName: "james",
    };

    const expected = {
      success: false,
      message: '"familyName" is required',
    };

    request(app)
      .post("/api/v1/users")
      .send(newUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(expected)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("responds with status 400 and correct message when incorrect data type passed in body data", (done) => {
    const newUser = {
      email: "james@email.com",
      givenName: "james",
      familyName: 123,
    };

    const expected = {
      success: false,
      message: '"familyName" must be a string',
    };

    request(app)
      .post("/api/v1/users")
      .send(newUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(expected)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testing update user endpoint
 */
describe("PATCH /users/:id", () => {
  it("responds with status 200 when update successful", (done) => {
    const newData = {
      email: "john@email.com",
      givenName: "john",
      familyName: "smith",
    };

    request(app)
      .patch("/api/v1/users/1")
      .send(newData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("responds with correct message when update successful", (done) => {
    const newData = {
      email: "john@email.com",
      givenName: "john",
      familyName: "smith",
    };

    const expected = {
      success: true,
      payload: 1,
    };

    request(app)
      .patch("/api/v1/users/1")
      .send(newData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(expected)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("responds with correct message with non-existent user id", (done) => {
    const newData = {
      email: "john@email.com",
      givenName: "john",
      familyName: "smith",
    };

    const expected = {
      success: true,
      payload: 0,
    };

    request(app)
      .patch("/api/v1/users/12")
      .send(newData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(expected)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("responds with 404 and correct message when no user id included", (done) => {
    const newData = {
      email: "john@email.com",
      givenName: "john",
      familyName: "smith",
    };

    const expected = {
      success: false,
      payload: "404 Not Found",
    };

    request(app)
      .patch("/api/v1/users/")
      .send(newData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect(expected)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("responds with status 400 and correct message when incorrect data type passed in body data", (done) => {
    const newData = {
      familyName: 123,
    };

    const expected = {
      success: false,
      message: '"familyName" must be a string',
    };

    request(app)
      .patch("/api/v1/users/1")
      .send(newData)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(expected)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testing delete user endpoint
 */
describe("DELETE /users/:id", () => {
  it("responds with status 404 and correct message with non-existsent user id", (done) => {
    const expected = {
      success: false,
      payload: "No user deleted for id 33",
    };

    request(app)
      .delete("/api/v1/users/33")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect(expected)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("responds with status 404 and correct message when user id is missing", (done) => {
    const expected = {
      success: false,
      payload: "404 Not Found",
    };

    request(app)
      .delete("/api/v1/users/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect(expected)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("responds with status 200 when successful", (done) => {
    const expected = {
      success: true,
      payload: 1,
    };

    request(app)
      .delete("/api/v1/users/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(expected)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Test non-existent urls
 */
describe("GET /random", () => {
  it('should respond status for 404 for non existent url "/"', (done) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should respond status for 404 for non existent url "/admin"', (done) => {
    request(app)
      .get("/admin")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it('should respond status for 404 for non existent url "/1234"', (done) => {
    request(app)
      .get("/1234")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
