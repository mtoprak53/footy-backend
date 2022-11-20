"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /favorites */

describe("POST /favorites/:username", function () {
  const newCompany = {
    handle: "new",
    name: "New",
    logoUrl: "http://new.img",
    description: "DescNew",
    numEmployees: 10,
  };

  test("ok for league for admin", async function () {
    const resp = await request(app)
        .post("/favorites/u1")
        .send({ type: "league", favorite_id: 203 })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({ 
      favorite: { username: "u1", leagueId: 203 }
    });
  });

  test("ok for league for correct user", async function () {
    const resp = await request(app)
        .post("/favorites/u1")
        .send({ type: "league", favorite_id: 203 })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({ 
      favorite: { username: "u1", leagueId: 203 }
    });
  });

  test("ok for cup for correct user", async function () {
    const resp = await request(app)
        .post("/favorites/u1")
        .send({ type: "cup", favorite_id: 206 })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({ 
      favorite: { username: "u1", cupId: 206 }
    });
  });

  test("ok for team for correct user", async function () {
    const resp = await request(app)
        .post("/favorites/u1")
        .send({ type: "team", favorite_id: 549 })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({ 
      favorite: { username: "u1", teamId: 549 }
    });
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/favorites/u1")
        .send({ type: "league" })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/favorites/u1")
        .send({ type: "sokko", favorite_id: 203 })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});
